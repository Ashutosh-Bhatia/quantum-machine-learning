"""Adapt the supplied classroom visualization to a standalone static lesson asset."""
from pathlib import Path
from html.parser import HTMLParser
import re
ROOT=Path(__file__).resolve().parents[1]
source=ROOT.parent/'resources/Animations/SVM_Alpha_Classroom.html'
class Extract(HTMLParser):
    document=None
    def handle_starttag(self,tag,attrs):
        values=dict(attrs)
        if tag=='iframe' and 'data-srcdoc' in values:self.document=values['data-srcdoc']
p=Extract();p.feed(source.read_text());inner=p.document
assert inner
start=inner.index('<div id="svm-alpha-lab">');end=inner.index('<style>',start)
markup=inner[start:end]
scripts=re.findall(r'<script(?:\s[^>]*)?>([\s\S]*?)</script>',inner)
d3=next(s for s in scripts if '// https://d3js.org v7.9.0' in s)
app=next(s for s in scripts if "const root=document.getElementById('svm-alpha-lab')" in s)
# No host bridge, state persistence or messaging is needed for the static book.
a=app.index('function save()');b=app.index('function restore(',a)
app=app[:a]+'function save(){}\n'+app[b:]
app=app.replace('restore(window.openai?.widgetState)','restore(null)')
app=re.sub(r"window.addEventListener\('openai:set_globals',[^\n]*\n",'',app)
css='''
:root{color-scheme:light;--foreground:#243746;--border:#c7cfd5;--viz-series-1:#286a9b;--viz-series-2:#a34c32}
*{box-sizing:border-box}body{margin:0;padding:16px;background:white;color:var(--foreground);font:15px/1.5 Arial,sans-serif}h3{font-size:21px;margin:0 0 12px}.viz-row{display:flex;flex-wrap:wrap;gap:12px;margin:12px 0}.viz-controls{display:flex;flex-wrap:wrap;gap:14px;margin:14px 0}.form-label{display:flex;flex-direction:column;flex:1 1 160px;gap:6px}.alpha-label{display:flex;justify-content:space-between;gap:12px}.alpha-input{min-width:0;flex:1 1 175px}.form-range{width:100%;accent-color:#286a9b;min-height:30px}.form-select,.btn{font:inherit;padding:8px;border:1px solid var(--border);border-radius:4px;background:white;color:inherit}.btn{cursor:pointer}.btn-primary{background:#286a9b;color:white}.form-check{display:flex;align-items:center;gap:7px}.text-small{font-size:13px}.tabular-nums{font-variant-numeric:tabular-nums}#alpha-plot{width:100%;margin:8px 0}svg text{fill:var(--foreground);font-size:12px}.axis path,.axis line{stroke:var(--border)}#alpha-status{margin-top:10px;min-height:40px}.point{cursor:grab;touch-action:none}.point:active{cursor:grabbing}button:focus-visible,input:focus-visible,select:focus-visible{outline:3px solid #286a9b;outline-offset:3px}footer{font-size:12px;color:#607080;margin-top:14px}
'''
out=ROOT/'site/animations/svm-alpha-classroom.html'
out.write_text('<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SVM Alpha Classroom</title><style>'+css+'</style></head><body>'+markup+'<p class="text-small">This is a separable hard-margin demonstration. Alpha values have no fixed C upper bound; the slider range can expand. At a fitted optimum, the strip touches the nearest class points. Manual alpha settings need not be optimal, and disabling balance can violate the dual equality constraint.</p><footer>Visualization uses D3.js 7.9.0, copyright 2010–2023 Mike Bostock, under the MIT license. <a href="../assets/vendor/d3-LICENSE.txt" target="_blank" rel="noopener">License</a>.</footer><script>'+d3+'</script><script>'+app+'</script></body></html>\n')
print('Prepared standalone SVM classroom asset without export-host dependencies.')
