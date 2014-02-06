#!/usr/bin/env python

import requests, json

for endpoint in ['gitprojects', 'gitcommits']:
  DATA = None
  URL = 'http://api.the-huck.com/%s' % endpoint
  while True:
    print URL
    r = requests.get(URL)
    print r.status_code
    data = r.json()
    if DATA is None: DATA = data
    else: DATA['_items'] += data.get('_items')
    next = data.get('_links').get('next')
    if next is not None: URL = ''.join(['http://', next.get('href')])
    else: break
  with open('data/%s.json' % endpoint, 'w') as outfile:
    json.dump(DATA, outfile, indent=2)
