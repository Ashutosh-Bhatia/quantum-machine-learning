"""List changed source material; never extract or publish source contents."""
from pathlib import Path
import argparse, hashlib, json
p=argparse.ArgumentParser()
p.add_argument('source',type=Path)
p.add_argument('--update',action='store_true')
a=p.parse_args()
if not a.source.is_dir():p.error('Source directory does not exist')
target=Path(__file__).resolve().parents[1]/'docs/resource-inventory.json'
old={r['path']:r for r in json.loads(target.read_text())} if target.exists() else {}
new={}
for f in sorted(a.source.rglob('*')):
 if not f.is_file() or any(x.startswith('.') for x in f.relative_to(a.source).parts):continue
 key=str(f.relative_to(a.source)); h=hashlib.sha256(f.read_bytes()).hexdigest()
 new[key]={**old.get(key,{}),'path':key,'bytes':f.stat().st_size,'sha256':h}
 if key not in old:print('ADDED',key)
 elif h!=old[key]['sha256']:
  new[key].pop('pages',None)
  print('CHANGED',key)
for key in old.keys()-new.keys(): print('REMOVED',key)
if old==new:print('No resource changes.')
if a.update:target.write_text(json.dumps(list(new.values()),indent=2)+'\n')
