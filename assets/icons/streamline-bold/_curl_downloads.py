#!/usr/bin/env python3
import json, os, sys, urllib.request, re
base = os.path.dirname(os.path.abspath(__file__))
need = {x['hash']: x for x in json.load(open(os.path.join(base,'_need_files.json')))}
# also map from progress for all resolved
prog = json.load(open(os.path.join(base,'_bold_progress.json')))
for name,v in prog['resolved'].items():
    need.setdefault(v['hash'], {'name':name,'hash':v['hash'],'path':v['path']})
# allow multiple names per hash
from collections import defaultdict
h2 = defaultdict(list)
for name,v in prog['resolved'].items():
    h2[v['hash']].append(v)
downloads = json.load(open(sys.argv[1]))
if isinstance(downloads, dict):
    downloads = downloads['downloads']
ok=fail=0
for d in downloads:
    h=d['iconHash']
    entries=h2.get(h) or [need.get(h)]
    entries=[e for e in entries if e]
    if not entries:
        print('UNKNOWN', h); fail+=1; continue
    url=d['downloadUrl']
    try:
        req=urllib.request.Request(url, headers={'User-Agent':'CareApp-BoldImport/1.0'})
        with urllib.request.urlopen(req, timeout=60) as resp:
            data=resp.read()
        if b'<svg' not in data.lower():
            raise ValueError('not svg')
        for e in entries:
            path=os.path.join(base, e['path'])
            os.makedirs(os.path.dirname(path), exist_ok=True)
            open(path,'wb').write(data)
            print('OK', e['path'], len(data))
            ok+=1
    except Exception as ex:
        print('FAIL', h, ex); fail+=1
print(f'DONE ok={ok} fail={fail}')
