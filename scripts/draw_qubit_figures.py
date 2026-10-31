"""Original editable academic figures for Chapter 4."""
from pathlib import Path
from html import escape
import math
O=Path(__file__).resolve().parents[1]/'site/figures/qubits-measurement';O.mkdir(exist_ok=True)
def start(title,desc,h=380):return [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 {h}" role="img" aria-labelledby="t d"><title id="t">{escape(title)}</title><desc id="d">{escape(desc)}</desc><rect width="1000" height="{h}" fill="white"/><defs><marker id="a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="#286a9b"/></marker></defs><style>text{{font-family:Arial,sans-serif;fill:#243746}}.line{{fill:none;stroke:#286a9b;stroke-width:2;marker-end:url(#a)}}.guide{{fill:none;stroke:#c3cbd2;stroke-width:1.5}}.box{{fill:#f7f9fb;stroke:#c4cfd8}}</style>']
def text(s,x,y,t,n=20):s.append(f'<text x="{x}" y="{y}" font-size="{n}">{escape(t)}</text>')
def box(s,x,y,w,h):s.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="5" class="box"/>')
def line(s,x,y,X,Y):s.append(f'<path d="M{x} {y}L{X} {Y}" class="line"/>')
def save(s,name):(O/f'{name}.svg').write_text('\n'.join(s+['</svg>'])+'\n')
s=start('Classical probabilities and quantum amplitudes','Two different column types have different normalization rules.');text(s,30,40,'Same basis labels, different meanings',27)
for x,title,values,rule in [(35,'Randomized 0/1 preparation',['1/2','1/2'],'p₀ + p₁ = 1'),(535,'Pure quantum amplitude column',['1/√2','1/√2'],'|α|² + |β|² = 1')]:
 box(s,x,85,430,230);text(s,x+18,122,title,22)
 for j,(a,v) in enumerate(zip(['0','1'],values)):text(s,x+40,180+j*48,'label '+a,18);text(s,x+205,180+j*48,v,25)
 text(s,x+40,285,rule,23)
text(s,30,355,'A random 0/1 qubit preparation and pure plus agree in Z, but can differ in X.',20);save(s,'state-columns')
s=start('Fresh shots','Every shot uses a new preparation before the measurement.',430);text(s,30,40,'Repeat the preparation, not just the readout',26)
for i,outcome in enumerate(['0','1','0']):
 y=80+95*i
 for x,w,title in [(35,250,'Prepare the same |ψ⟩'),(400,200,'Measure Z'),(720,230,'Record '+outcome)]:box(s,x,y,w,55);text(s,x+15,y+35,title,21)
 line(s,285,y+28,390,y+28);line(s,600,y+28,710,y+28)
text(s,30,395,'These records are illustrative. Counts fluctuate around the prediction across batches.',19);save(s,'fresh-shots')
s=start('Global and relative phase','A common phase changes both amplitude arrows; a relative phase changes their relation.',410);text(s,30,40,'Global phase and relative phase ask different questions',26)
for x,title,heads,note in [(35,'Common phase γ',[(90,120),(90,120)],'All measurement probabilities unchanged'),(535,'Relative phase φ',[(120,90),(90,120)],'Another basis can reveal a difference')]:
 box(s,x,75,430,275);text(s,x+18,112,title,23)
 for j,(dx,dy) in enumerate(heads):
  ox=x+110+190*j;oy=240;s.append(f'<circle cx="{ox}" cy="{oy}" r="55" fill="none" stroke="#d3dbe1"/>');line(s,ox,oy,ox+(dx-90)*1.5,oy-(dy-90)*1.5);text(s,ox-8,oy+80,['α','β'][j],23)
 text(s,x+18,335,note,17)
text(s,30,390,'Arrows represent complex amplitudes; this is not a Bloch-sphere diagram.',20);save(s,'phase-comparison')
s=start('Branches and preparation procedures','A branch is normalized only after its probability is computed. Fresh preparation and repeated readout are different procedures.',460);text(s,30,40,'Separate the branch, its probability and its conditional state',25)
for x,title,body in [(30,'Projected branch','P₀ψ = (1/2, 0)ᵀ'),(370,'Squared norm','p₀ = 1/4'),(710,'Conditional state','P₀ψ / √p₀ = (1, 0)ᵀ')]:box(s,x,85,260,105);text(s,x+14,120,title,21);text(s,x+14,163,body,19)
line(s,295,139,360,139);line(s,635,139,700,139)
text(s,35,240,'Fresh trials:',21);text(s,35,280,'prepare ψ → measure → record; prepare ψ again → measure → record',20)
text(s,35,335,'Retain the system:',21);text(s,35,375,'prepare ψ → measure → conditional state → same-basis measurement',20)
text(s,35,430,'The second procedure repeats the outcome only under the stated ideal assumptions.',18);save(s,'measurement-branches')
s=start('Pure state Bloch map','The poles, equator and a sample pure-state vector appear beside amplitudes and probability formulas.',440);text(s,30,40,'A point on the sphere is a state map, not an amplitude column',25)
cx,cy,r=240,235,135
s.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="#b5c2cc"/><ellipse cx="{cx}" cy="{cy}" rx="{r}" ry="43" fill="none" stroke="#c8d1d8"/>')
line(s,cx,cy,cx,cy-r);line(s,cx,cy,cx-95,cy+33);line(s,cx,cy,cx+95,cy+33);line(s,cx,cy,cx+80,cy-80)
for x,y,t in [(cx+8,cy-r-12,'z · |0⟩'),(cx+8,cy+r+25,'|1⟩'),(cx-115,cy+58,'x'),(cx+102,cy+58,'y'),(cx+86,cy-85,'|ψ⟩'),(cx+8,cy-45,'θ')]:text(s,x,y,t,20)
text(s,130,420,'Equator: equal Z probabilities',18)
box(s,490,100,475,265)
for i,t in enumerate(['α = cos(θ/2)','β = exp(iφ) sin(θ/2)','z = cos θ','PZ(0) = (1 + z)/2','PZ(1) = (1 − z)/2','φ labels azimuth around the z-axis.']):text(s,510,139+39*i,t,21 if i<5 else 18)
save(s,'bloch-map')
s=start('Two preparation procedures','Pure plus and an equal random basis preparation agree in Z but differ in X.',480);text(s,30,40,'Choose a measurement on each freshly prepared trial',26)
for y,prep,z,x in [(75,'Pure plus','Z: (1/2, 1/2)','X: (1, 0)'),(270,'Fair random choice: 0 or 1','Z: (1/2, 1/2)','X: (1/2, 1/2)')]:
 box(s,30,y+30,360,90);text(s,45,y+82,prep,20)
 for Y,t in [(y,z),(y+85,x)]:box(s,530,Y,430,60);text(s,550,Y+38,t,22)
 s.append(f'<path d="M390 {y+75}H465M465 {y+75}V{y+30}H520M465 {y+75}V{y+115}H520" fill="none" stroke="#286a9b" stroke-width="2"/>')
text(s,30,460,'The branches are alternative detector choices, not successive Z and X readouts.',19);save(s,'preparation-comparison')
