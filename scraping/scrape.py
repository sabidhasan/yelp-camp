#!/usr/bin/env python
# -*- coding: utf-8 -*-

from bs4 import BeautifulSoup
import requests, re, json
import apikey

# Attempts to load camping data from camping-canada

# Words that will be excluded from description
bads = ['camping', 'fair', 'good', 'rate', 'rating', 'sorry', 'click', 'pixel',
'previous', 'search', 'next' 'map', 'share', 'Association', 'RV Council',
'Camping Nova Scotia', 'bec', 'et de caravaning', 'campground recreation',
'campground services', 'next', 'previous', 'map', 'pix']

provinces = {'BC': 'British Columbia', 'AB': 'Alberta', 'SK': 'Saskatchewan',
    'MB': 'Manitoba', 'ON': 'Ontario', 'QC': 'Quebec', 'PE': 'PEI', 'NB': 'New Brunswick',
    'NS': 'Nova Scotia', 'NL': 'Newfoundland', 'YT': 'Yukon', 'NT': 'Nunavut'}

def get_maps_key(address):
    # Given an address, return the lat/lon using google maps API
    url = "https://maps.googleapis.com/maps/api/geocode/json?address=%s&key=%s" % (address, apikey.maps_key)
    parsed_json = json.loads(requests.get(url).text)
    try:
        coordinates = parsed_json['results'][0]['geometry']['location']
    except IndexError, TypeError:
        print "Error with address, couldnt find location ", address
        coordinates = {'lat': None, 'lng': None}
    return (coordinates['lat'], coordinates['lng'])

# loop through all pages
for i in range(1):
    print '############################################################'
    print '\n\n\n\nGetting page number %s of 67' % str(i + 1)
    # Get the page using requests, soup the data
    data  = requests.get('http://www.camping-canada.com/campground_search_results_list_e.asp?str_where=(Province %3C%3E%20%27%27)%20AND%20(Campgrounds.CampgroundId%20%3C%3E%20%27demo%27)%20%20AND%20(Campgrounds.CampgroundId%20%3C%3E%20%27demobasic%27)%20%20AND%20(Campgrounds.CampgroundId%20%3C%3E%20%27demofree%27)%20&PgNo={0}&sortby=&req_origin=paging&sortbyratings=False'.format(1)).text
    soup = BeautifulSoup(data, 'html.parser')

    # Get tables with pertinent class from page
    tables = soup.findAll("table", {'class': 'greytable_1V'})
    print "Page obtained successfully"

# activities [object with name and logo]

    # This is master list of all scraped data
    master_ret = []

    # Loop through tables (each contains one campground)
    for i, table in enumerate(tables):
        print '\tTABLE %s OBTAINED' % str(i+1)

        tmp_dict = {'id': len(master_ret), 'prices': None, 'email': None, 'hours': {}, 'image': 'https://images.freeimages.com/images/large-previews/19a/tent-1-1552981.jpg'}

        for j, elem in enumerate(table.findAll('td')):
            if j not in [2, 3, 5, 6, 7]: continue
            defs = {2: 'name', 3: 'region', 5: 'type', 6: 'sites'}
            tmp_soup = BeautifulSoup(str(elem), 'html.parser').text.strip()

            if j == 7:
                # must find phone, address and description
                try:
                    tmp_dict['phone'] = tmp_soup.split(u'     ')[1]
                except IndexError:
                    tmp_dict['phone'] = None
                tmp_dict['address'] = tmp_soup.split(u'     ')[0]
                # Convert address into latitude/longitude
                tmp_dict['lat'], tmp_dict['lon'] = get_maps_key(tmp_dict['address'])
                tmp_dict['province'] = ''
                for prov in provinces.keys():
                    if prov in tmp_dict['address']:
                        tmp_dict['province'] = provinces[prov]

                # Description
                description = BeautifulSoup(str(elem), 'html.parser').findAll("a", {"class": "popuptext"})
                if len(description):
                    # print description[0].text[9:]
                    print "\t\tFound description"
                else:
                    p = tmp_dict['phone'] if tmp_dict['phone'] != None else ""
                    a = tmp_dict['address'] if tmp_dict['address'] != None else ""
                    print elem.text.replace(p, "").replace(a, "")
                    #.replace(tmp_dict['address'], "")
            else:
                tmp_dict[defs[j]] = tmp_soup

        # Find link to more information
        # try:
        print "\tObtaining campground's page using requests"
        # Get link to obtain: email, hours, paymentMethods, prices, description
        link = table.findAll('a')[0]['href']
        page = BeautifulSoup(requests.get('http://www.camping-canada.com/' + link).text, 'html.parser')

        # 1. Find rates
        print "\tFinding campground rates"
        prices = filter(lambda x: x != '$144', re.findall("\$[0-9.,]*(?: to \$[0-9.,]*)?", page.text))[:-2][:3]
        prices_obj = {"daily": None, "weekly": None, "seasonal": None}
        try:
            prices_obj["daily"] = prices[0]
            prices_obj["weekly"] = prices[1]
            prices_obj["seasonal"] = prices[2]
        except IndexError:
            print "\t\tMissing some rates... Using None", prices_obj
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
            print "\t\tMissing seasonal dates... Using None"
        tmp_dict["hours"]["seasonal"] = [start, end]

        # 3. Find daily hours
        print "\tFinding daily hours"
        office_hours = None
        try:
            office_hours = re.findall('Office hours.*', page.text)[0]
            office_hours = office_hours.replace("Office hours:", "").strip()
        except:
            print "\t\tError getting office hours. Using None"
        tmp_dict["hours"]["daily"] = office_hours

        # 3. Get payment methods
            # for idx, line in enumerate(page.findAll('img')):

    # except:
        # No link must exist
        # print "\t\tError occured in parsing child campground page"

        master_ret.append(tmp_dict)

        if i == len(tables) - 1:
            cgs = str(table.parent.parent.parent).split('class="greytable_1V"')
            for i, campground in enumerate(cgs):
                print '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
                ret = []
                for x in re.findall(r'alt=".*?"', str(campground)):
                    keep = True
                    for bad in bads:
                        if bad.lower() in x.lower(): keep = False
                    if keep: ret.append(x.replace('alt=', '').replace('"', ''))
                # print ret
                master_ret[i - 1]['amenities'] = ret
    for line in master_ret:
        print line, '\n'
