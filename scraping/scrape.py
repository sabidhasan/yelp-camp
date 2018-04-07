#!/usr/bin/env python
# -*- coding: utf-8 -*-

from bs4 import BeautifulSoup
import requests, re

#
#http://www.camping-canada.com/campground_search_results_list_e.asp?str_where=(Province%20%3C%3E%20%27%27)%20AND%20(Campgrounds.CampgroundId%20%3C%3E%20%27demo%27)%20%20AND%20(Campgrounds.CampgroundId%20%3C%3E%20%27demobasic%27)%20%20AND%20(Campgrounds.CampgroundId%20%3C%3E%20%27demofree%27)%20&PgNo=3&sortby=&req_origin=paging&sortbyratings=False
bads = ['camping', 'fair', 'good', 'rate', 'rating', 'sorry', 'click', 'pixel', 'previous', 'search', 'next' 'map',
'share', 'Association', 'RV Council', 'Camping Nova Scotia', 'bec',
'et de caravaning', 'campground recreation', 'campground services', 'next', 'previous', 'map', 'pix']


for i in range(1):
    print '\n\n\n\nGetting page number %s of 67' % str(i + 1)
    r  = requests.get('http://www.camping-canada.com/campground_search_results_list_e.asp?str_where=(Province %3C%3E%20%27%27)%20AND%20(Campgrounds.CampgroundId%20%3C%3E%20%27demo%27)%20%20AND%20(Campgrounds.CampgroundId%20%3C%3E%20%27demobasic%27)%20%20AND%20(Campgrounds.CampgroundId%20%3C%3E%20%27demofree%27)%20&PgNo={0}&sortby=&req_origin=paging&sortbyratings=False'.format(30))

    data = r.text
    soup = BeautifulSoup(data, 'html.parser')
    tables = soup.findAll("table", {'class': 'greytable_1V'})

    master_ret = []

    for i, table in enumerate(tables):
        print '############################################################'
        print 'TABLE OBTAINED'
        print 'Reading line %s' % (i + 1)
        print '############################################################'
        tmp_dict = {}
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
