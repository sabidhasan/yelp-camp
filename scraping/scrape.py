#!/usr/bin/env python
# -*- coding: utf-8 -*-

from bs4 import BeautifulSoup
import requests, re, json, shelve, pymongo
from pymongo import MongoClient
import apikey

class Bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

# Attempts to load camping data from camping-canada

#MongoDB client
client = MongoClient()
db = client.yelp_camp
dbtable = db.campgrounds

# Words that will be excluded from description
bads = ['camping', 'fair', 'good', 'rate', 'rating', 'sorry', 'click', 'pixel',
'previous', 'search', 'next' 'map', 'share', 'Association', 'RV Council',
'Camping Nova Scotia', 'bec', 'et de caravaning', 'campground recreation',
'campground services', 'next', 'previous', 'map', 'pix', 'listing', 'Excellent',
'Discounts', 'phone']

provinces = {'BC': 'British Columbia', 'AB': 'Alberta', 'SK': 'Saskatchewan',
    'MB': 'Manitoba', 'ON': 'Ontario', 'QC': 'Quebec', 'PE': 'PEI', 'NB': 'New Brunswick',
    'NS': 'Nova Scotia', 'NL': 'Newfoundland', 'YT': 'Yukon', 'NT': 'Nunavut'}

defs = {2: 'name', 3: 'region', 5: 'type', 6: 'sites'}

def get_maps_key(address):
    # Given an address, return the lat/lon using google maps API
    url = "https://maps.googleapis.com/maps/api/geocode/json?address=%s&key=%s" % (address, apikey.maps_key)
    parsed_json = json.loads(requests.get(url).text)
    try:
        coordinates = parsed_json['results'][0]['geometry']['location']
    except IndexError, TypeError:
        print "\t", Bcolors.FAIL + "Error with address, couldn't find location ", address, Bcolors.ENDC
        coordinates = {'lat': None, 'lng': None}
    return (coordinates['lat'], coordinates['lng'])

# This is master list of all scraped data
master_ret = []

shelf = shelve.open('shelf')
def download_page(url, page_type):
    if page_type == 'mainpage':
        slug = page_type + str(url)
        url = 'http://www.camping-canada.com/campground_search_results_list_e.asp?str_where=(Province %3C%3E%20%27%27)%20AND%20(Campgrounds.CampgroundId%20%3C%3E%20%27demo%27)%20%20AND%20(Campgrounds.CampgroundId%20%3C%3E%20%27demobasic%27)%20%20AND%20(Campgrounds.CampgroundId%20%3C%3E%20%27demofree%27)%20&PgNo={0}&sortby=&req_origin=paging&sortbyratings=False'.format(str(url))

    if not shelf.has_key(slug):
        page = requests.get(url)
        shelf[slug] = page

    return shelf[slug]

# loop through all pages
for i in range(67):
    print Bcolors.OKGREEN, '############################################################', Bcolors.ENDC
    print Bcolors.OKGREEN, '\n\n\nGetting page number %s of 67' % str(i + 1), Bcolors.ENDC
    # Get the page using requests, soup the data
    data  = download_page(i+1, 'mainpage').text
    soup = BeautifulSoup(data, 'html.parser')

    # Get tables with pertinent class from page
    tables = soup.findAll("table", {'class': 'greytable_1V'})
    print Bcolors.OKGREEN, "\tPage obtained successfully!", Bcolors.ENDC

    # Loop through tables (each contains one campground)
    for i, table in enumerate(tables):
        print '\n\n\tTABLE %s OBTAINED' % str(i+1)

        tmp_dict = {'id': len(master_ret), 'prices': None,
        'email': None, 'hours': {}, 'comments': [],
        'image': 'https://images.freeimages.com/images/large-previews/19a/tent-1-1552981.jpg'}

        #Check for old data in MONGO DB
        if dbtable.find_one({"id": tmp_dict['id']}) is not None:
            print Bcolors.FAIL, "\nWARNING: MONGO DB ID %s ALREADY EXISTS. USE drop table FIRST " % tmp_dict['id'], Bcolors.ENDC
            master_ret.append(0)
            continue

        for j, elem in enumerate(table.findAll('td')):
            if j not in [2, 3, 5, 6, 7]: continue

            tmp_soup = BeautifulSoup(str(elem), 'html.parser').text.strip()

            if j == 7:
                # must find phone, address and description
                try:
                    tmp_dict['phone'] = re.findall("\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}", tmp_soup)[0]
                except IndexError:
                    print Bcolors.FAIL, "\tError with phone number", Bcolors.ENDC
                    tmp_dict['phone'] = None
                tmp_dict['address'] = tmp_soup.split(u'     ')[0]
                # Convert address into latitude/longitude
                tmp_dict['lat'], tmp_dict['lon'] = get_maps_key(tmp_dict['address'])
                tmp_dict['province'] = ''
                for prov in provinces.keys():
                    if prov in tmp_dict['address']: tmp_dict['province'] = provinces[prov]

                # Description
                description = BeautifulSoup(str(elem), 'html.parser').findAll("a", {"class": "popuptext"})
                if len(description):
                    print "\tFound description"
                    description = description[0].text.replace("more info", "").strip()
                else:
                    print "\tReading description from main page"
                    try:
                        description = re.findall("(?:\w+[. ';,]{1,}){8,}", elem.text)[0].strip()
                    except IndexError:
                        print "\t" + Bcolors.FAIL + "\tNo description found!" + Bcolors.ENDC
                        description = None
                tmp_dict['description'] = description
            else:
                try:
                    tmp_dict[defs[j]] = int(tmp_soup)
                except ValueError:
                    tmp_dict[defs[j]] = tmp_soup

        # Find link to more information
        try:
            print "\tObtaining campground's page using requests"
            # Get link to obtain: email, hours, paymentMethods, prices, description
            link = table.findAll('a')[0]['href']
            page = BeautifulSoup(requests.get('http://www.camping-canada.com/' + link).text, 'html.parser')
            print Bcolors.OKGREEN, "\t\tPage obtained successfully", Bcolors.ENDC
            # 1. Find rates
            print "\tFinding campground rates"
            prices = filter(lambda x: x != '$144', re.findall("\$[0-9.,]*(?: to \$[0-9.,]*)?", page.text))[:-2][:3]
            prices_obj = {"daily": None, "weekly": None, "seasonal": None}
            try:
                prices_obj["daily"] = prices[0]
                prices_obj["weekly"] = prices[1]
                prices_obj["seasonal"] = prices[2]
            except IndexError:
                print Bcolors.FAIL, "\t\tMissing some rates... Using None", prices_obj, Bcolors.ENDC
            tmp_dict["prices"] = prices_obj

            # 2. Find Email address
            print "\tFinding email address"
            email = None
            for link in page.findAll("a"):
                if 'mailto:' in link.get('href', '') and "@" in link.get('href', '') and not "camping-canada" in link.get('href', ''):
                    email = link['href'].replace("mailto:", "")
            tmp_dict["email"] = email

            # 3. Get seasonal hours (dates)
            print "\tFinding seasonal dates"
            start, end = None, None
            expression = "(?:January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}"
            try:
                start, end = re.findall(expression, page.text)[0], re.findall(expression, page.text)[1]
            except:
                print Bcolors.FAIL, "\t\tMissing seasonal dates... Using None", Bcolors.ENDC
            tmp_dict["hours"]["seasonal"] = [start, end]

            # 3. Find daily hours
            print "\tFinding daily hours"
            office_hours = None
            try:
                office_hours = re.findall('Office hours.*', page.text)[0]
                office_hours = office_hours.replace("Office hours:", "").strip()
            except:
                print Bcolors.FAIL, "\t\tError getting office hours. Using None", Bcolors.ENDC
            tmp_dict["hours"]["daily"] = office_hours

            # 3. Get payment methods
                # for idx, line in enumerate(page.findAll('img')):

        except:
            # No link must exist
            print Bcolors.WARNING, "\tCouldn't download child page - must not exist", Bcolors.ENDC

        master_ret.append(tmp_dict)

        curr_cg = str(table.parent.parent.parent).split('class="greytable_1V"')[i]
        ret = []
        for amenity in re.findall(r'alt=".*?"', curr_cg):
            keep = True
            for bad in bads:
                if bad.lower() in amenity.lower(): keep = False
            if keep: ret.append(amenity.replace('alt=', '').replace('"', ''))
        master_ret[-1]['activities'] = list(set(ret))

        print Bcolors.BOLD, ":::LENGTH:::", len(master_ret[-1]), Bcolors.ENDC
        print "\n\n", master_ret[-1]

        # Insert into MONGODB
        new_id = dbtable.insert_one(master_ret[-1]).inserted_id
        print "\nInserted new record successfully. ID: ", new_id

    print master_ret[-len(tables)]
    x = raw_input('\nEnter to continue...')
    print "\n" * 90
