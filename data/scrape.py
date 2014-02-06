#!/usr/bin/env python

import requests, json, re, sys
endpoint = "http://api.the-huck.com/gitcommits"
headers = {'Accept': 'application/json', 'Pragma': 'no-cache'}
r = requests.get(endpoint, headers=headers).json()
print "#commits = ", len(r["_items"])
with open('data/gitcommits.json', 'w') as outfile:
  json.dump(r, outfile, indent=2)
