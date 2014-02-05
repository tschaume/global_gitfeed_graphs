#!/usr/bin/env python

import requests, json

DATA = None
URL = 'http://api.the-huck.com/gitcommits'
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
with open('data.txt', 'w') as outfile:
  json.dump(DATA, outfile, indent=2)
