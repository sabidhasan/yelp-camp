#!/usr/bin/env python
# -*- coding: utf-8 -*-

from bs4 import BeautifulSoup
import requests, re

# Attempts to load camping data from camping-canada

# Words that will be excluded
bads = ['camping', 'fair', 'good', 'rate', 'rating', 'sorry', 'click', 'pixel',
'previous', 'search', 'next' 'map', 'share', 'Association', 'RV Council',
'Camping Nova Scotia', 'bec', 'et de caravaning', 'campground recreation',
'campground services', 'next', 'previous', 'map', 'pix']

provinces = {'BC': 'British Columbia', 'AB': 'Alberta', 'SK': 'Saskatchewan',
    'MB': 'Manitoba', 'ON': 'Ontario', 'QC': 'Quebec', 'PE': 'PEI', 'NB': 'New Brunswick',
    'NS': 'Nova Scotia', 'NL': 'Newfoundland', 'YT': 'Yukon', 'NT': 'Nunavut'}

# loop through all pages
for i in range(1):
    print '############################################################'
    print '\n\n\n\nGetting page number %s of 67' % str(i + 1)
    # Get the page using requests, soup the data
    data  = requests.get('http://www.camping-canada.com/campground_search_results_list_e.asp?str_where=(Province %3C%3E%20%27%27)%20AND%20(Campgrounds.CampgroundId%20%3C%3E%20%27demo%27)%20%20AND%20(Campgrounds.CampgroundId%20%3C%3E%20%27demobasic%27)%20%20AND%20(Campgrounds.CampgroundId%20%3C%3E%20%27demofree%27)%20&PgNo={0}&sortby=&req_origin=paging&sortbyratings=False'.format(30)).text
    soup = BeautifulSoup(data, 'html.parser')

    # Get tables with pertinent class from page
    tables = soup.findAll("table", {'class': 'greytable_1V'})

# email, hours, paymentMethods, prices
# latitude, longitude, description, image
# activities [object with name and logo]

    # This is master list of all scraped data
    master_ret = []

    # Loop through tables (each contains one campground)
    for i, table in enumerate(tables):
        print '\tTABLE OBTAINED'
        print '\tReading line %s' % (i + 1)
        tmp_dict = {'id': len(master_ret)}
        for j, elem in enumerate(table.findAll('td')):
            if j not in [2, 3, 5, 6, 7]: continue
            defs = {2: 'name', 3: 'region', 5: 'type', 6: 'sites'}
            # print '~~~~~~~~~~~~~~~~~~~~~~~~~~'
            tmp_soup = BeautifulSoup(str(elem), 'html.parser').text.strip()

            if j == 7:
                # must find phone and address
                # re.search(tmp_dict
                tmp_dict['phone'] = tmp_soup.split(u'     ')[1]
                tmp_dict['address'] = tmp_soup.split(u'     ')[0]
                tmp_dict['province'] = ''
                for prov in provinces.keys():
                    if prov in tmp_dict['address']:
                        tmp_dict['province'] = provinces[prov]
            else:
                tmp_dict[defs[j]] = tmp_soup
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
        print line
    #     print '############################################################'
    #     print '############################################################'
    #     print '############################################################'
    #     print '############################################################'
        # print '\n', table.findAll('table'))
