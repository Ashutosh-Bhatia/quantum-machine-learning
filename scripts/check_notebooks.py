"""Run notebook code cells locally; install notebook dependencies first."""
from pathlib import Path
import json, os
os.environ.setdefault('MPLBACKEND','Agg')
for file in sorted((Path(__file__).resolve().parents[1]/'notebooks').glob('*.ipynb')):
 scope={'__name__':'__main__'}
 for cell in json.loads(file.read_text())['cells']:
  if cell['cell_type']=='code':
   code=''.join(cell['source'])
   if not code.startswith('%pip'):exec(compile(code,str(file),'exec'),scope)
 print('PASS',file.name)
