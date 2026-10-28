"""Editable academic figures for Lesson 2.1."""
from pathlib import Path
from html import escape
OUT=Path(__file__).resolve().parents[1]/'site/figures/classical-information'
def start(title,desc,h=370):
 return [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 {h}" role="img" aria-labelledby="title desc"><title id="title">{escape(title)}</title><desc id="desc">{escape(desc)}</desc><rect width="1000" height="{h}" fill="white"/><style>text{{font-family:Arial,sans-serif;fill:#243746}}.box{{fill:#f7f9fb;stroke:#ccd5dc;stroke-width:1.5}}.line{{fill:none;stroke:#286a9b;stroke-width:2}}.selected{{fill:#e3eff8;stroke:#286a9b;stroke-width:2}}</style>']
def text(s,x,y,t,size=20):s.append(f'<text x="{x}" y="{y}" font-size="{size}">{escape(t)}</text>')
def rect(s,x,y,w,h,cls='box'):s.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="5" class="{cls}"/>')
def save(s,name): (OUT/name).write_text('\n'.join(s+['</svg>'])+'\n')
s=start('Choose a question, then a state set','A binary switch, a six-face die and a four-setting control have two, six and four labels respectively.')
text(s,30,40,'A state set records the distinctions our question needs',26)
for x,title,question,labels in [(30,'On/off switch','Which position?','{off, on}'),(355,'Resting die','Which face is uppermost?','{1, 2, 3, 4, 5, 6}'),(680,'Four-setting control','Which setting?','{off, low, medium, high}')]:
 rect(s,x,75,290,240);text(s,x+18,108,title,22);text(s,x+18,245,question,18);text(s,x+18,283,labels,18)
rect(s,104,140,130,55);s.append('<circle cx="135" cy="167" r="19" fill="#286a9b"/>');text(s,100,220,'2 possible labels',17)
rect(s,455,128,76,76);s.append('<circle cx="470" cy="143" r="5" fill="#286a9b"/><circle cx="493" cy="166" r="5" fill="#286a9b"/><circle cx="516" cy="189" r="5" fill="#286a9b"/>');text(s,427,220,'6 possible labels',17)
for i,t in enumerate(['off','low','med','high']):
 rect(s,704+61*i,148,56,42,'selected' if i==2 else 'box');text(s,709+61*i,175,t,16)
text(s,752,220,'4 possible labels',17);text(s,30,350,'We model a selected position or face, not every physical property of the object.',18)
save(s,'state-sets.svg')
s=start('The state stays medium while coordinate order changes','Medium is the third coordinate in off-low-medium-high order, and second in high-medium-low-off order.',410)
text(s,30,40,'Same setting, different coordinate conventions',26)
for x,title,labels,vals in [(45,'Order A',['off','low','medium','high'],[0,0,1,0]),(545,'Order B',['high','medium','low','off'],[0,1,0,0])]:
 text(s,x,90,title,22);text(s,x+230,90,'column',18)
 for i,(label,v) in enumerate(zip(labels,vals)):
  y=110+49*i;rect(s,x,y,380,43,'selected' if v else 'box');text(s,x+18,y+29,label);text(s,x+260,y+29,str(v),23)
text(s,45,355,'The 1 follows the label “medium”.',22);text(s,45,387,'The device has not changed; its fixed binary code remains 10.',19)
save(s,'coordinate-order.svg')
s=start('Basis columns reconstruct a vector','The vector with entries 2, 1, 3, 0 is the sum of 2 e_off, 1 e_low and 3 e_medium. This algebra example is not a probability distribution.',410)
text(s,30,40,'Each basis column contributes to one coordinate',26)
terms=[('2 × e_off',[2,0,0,0]),('1 × e_low',[0,1,0,0]),('3 × e_medium',[0,0,3,0]),('0 × e_high',[0,0,0,0]),('v',[2,1,3,0])]
for j,(name,values) in enumerate(terms):
 x=35+195*j;text(s,x,100,name,20)
 for i,v in enumerate(values):
  rect(s,x+15,120+43*i,85,38,'selected' if v else 'box');text(s,x+50,147+43*i,str(v),22)
 if j<4:text(s,x+145,210,'=' if j==3 else '+',27)
text(s,30,340,'Coordinate order: (off, low, medium, high). Add each row separately.',19)
text(s,30,380,'This is a vector-algebra example; (2, 1, 3, 0) is not a probability distribution.',18)
save(s,'basis-reconstruction.svg')
