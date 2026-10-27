"""Generate editable SVG academic figure drafts for Chapter 1."""
from pathlib import Path
from html import escape
OUT=Path(__file__).resolve().parents[1]/'site/figures/classical-information'
OUT.mkdir(parents=True,exist_ok=True)
def start(title,description,w=960,h=380):
 return [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-labelledby="title description"><title id="title">{escape(title)}</title><desc id="description">{escape(description)}</desc><rect width="100%" height="100%" fill="white"/><style>text{{font-family:Arial,Helvetica,sans-serif;fill:#242424}}.muted{{fill:#666}}.accent{{fill:#286a9b}}.rule{{stroke:#d6d6d6;stroke-width:1}}.flow{{stroke:#555;stroke-width:2;fill:none}}</style>']
def text(parts,x,y,s,size=20,weight='normal',cls=''):
 parts.append(f'<text x="{x}" y="{y}" font-size="{size}" font-weight="{weight}" class="{cls}">{escape(s)}</text>')
def line(parts,x1,y1,x2,y2):parts.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" class="rule"/>')
def finish(parts,name):
 parts.append('</svg>');(OUT/name).write_text('\n'.join(parts)+'\n')
p=start('One setting, two representations','Four switch settings are mapped to four-component one-hot vectors and fixed two-bit codes. All four codes are used.',h=435)
text(p,35,42,'One setting, two representations',25,'bold');text(p,35,78,'Coordinate order: (off, low, medium, high)',18,cls='muted')
for x,label in [(35,'Switch setting'),(325,'Basis column'),(665,'Binary code')]:text(p,x,126,label,19,'bold')
line(p,35,145,925,145)
for y,label,v,code in [(188,'off','(1, 0, 0, 0)ᵀ','00'),(242,'low','(0, 1, 0, 0)ᵀ','01'),(296,'medium','(0, 0, 1, 0)ᵀ','10'),(350,'high','(0, 0, 0, 1)ᵀ','11')]:
 text(p,35,y,label);text(p,325,y,v);text(p,665,y,code,20,cls='accent');line(p,35,y+16,925,y+16)
text(p,35,410,'Four basis coordinates; two storage bits. Every two-bit string has a label.',18,cls='muted')
finish(p,'state-representations.svg')
p=start('Model probabilities and an illustrative sample','Exact probabilities 0.75 and 0.25 are compared with illustrative counts 72 and 28 from a batch of 100. These are different quantities.',h=410)
text(p,35,42,'Model probability and observed frequency',25,'bold')
text(p,65,88,'Model probabilities',21,'bold');text(p,560,88,'Illustrative batch: N = 100',21,'bold')
line(p,480,72,480,352)
for x0,vals,maxval,labels in [(90,[.75,.25],1,['0.75','0.25']),(610,[72,28],100,['72','28'])]:
 line(p,x0-15,302,x0+240,302)
 for i,(v,label) in enumerate(zip(vals,labels)):
  x=x0+i*145;h=185*v/maxval
  p.append(f'<rect x="{x}" y="{302-h}" width="72" height="{h}" fill="#286a9b"/>')
  text(p,x+8,290-h,label,20,'bold');text(p,x+28,331,str(i),19)
 text(p,x0-5,365,'Outcome',17,cls='muted')
text(p,35,398,'Observed P̂(1) = 28/100 = 0.28; model P(1) = 0.25. Counts shown are an illustration.',17,cls='muted')
finish(p,'probability-frequency.svg')
p=start('Operation order matters','An arbitrary bit distribution reset to zero and then flipped yields one. Flipping and then resetting yields zero. Temporal order A then B corresponds to product BA.',h=390)
text(p,35,42,'Operation order matters',25,'bold')
text(p,35,78,'The input is any normalized distribution p = (p₀, p₁)ᵀ.',18,cls='muted')
for y,first,mid,second,out,product in [(145,'Reset to 0','(1, 0)ᵀ','Flip','(0, 1)ᵀ','X R₀ = R₁'),(265,'Flip','(p₁, p₀)ᵀ','Reset to 0','(1, 0)ᵀ','R₀ X = R₀')]:
 for x,w,label in [(35,145,'Input p'),(225,150,first),(425,155,second)]:
  p.append(f'<rect x="{x}" y="{y-32}" width="{w}" height="56" fill="#fafafa" stroke="#ccc"/>');text(p,x+14,y+4,label,18)
 for x1,x2 in [(180,225),(375,425),(580,635)]:
  p.append(f'<path d="M{x1} {y-4} H{x2-8} M{x2-15} {y-10} L{x2-7} {y-4} L{x2-15} {y+2}" class="flow"/>')
 text(p,640,y+4,out,21,'bold',cls='accent');text(p,225,y+60,'After first: '+mid,17,cls='muted');text(p,640,y+60,product,20)
text(p,35,365,'A then B acts as BA on a column vector. Regrouping is allowed; exchanging factors is not.',17,cls='muted')
finish(p,'composition-order.svg')
print('Generated 3 editable figure drafts.')
