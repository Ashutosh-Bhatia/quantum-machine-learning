"""Original editable academic diagrams for Chapter 6."""
from pathlib import Path
from html import escape
import math
O=Path(__file__).resolve().parents[1]/'site/figures/composite-systems';O.mkdir(exist_ok=True)
def start(title,desc,h=360):return [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 {h}" role="img" aria-labelledby="t d"><title id="t">{escape(title)}</title><desc id="d">{escape(desc)}</desc><rect width="1000" height="{h}" fill="white"/><defs><marker id="arrow" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="#286a9b"/></marker></defs><style>text{{font-family:Arial,sans-serif;fill:#243746}}.box{{fill:#f7f9fb;stroke:#c4cfd8}}</style>']
def text(s,x,y,t,n=22):s.append(f'<text x="{x}" y="{y}" font-size="{n}">{escape(t)}</text>')
def box(s,x,y,w,h):s.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="5" class="box"/>')
def line(s,x,y,X,Y):s.append(f'<path d="M{x} {y}L{X} {Y}" fill="none" stroke="#286a9b" stroke-width="2" marker-end="url(#arrow)"/>')
def save(s,n):(O/f'{n}.svg').write_text('\n'.join(s+['</svg>'])+'\n')
s=start('Joint basis order','Rows group the A value and columns show the B value.',380);text(s,30,42,'A on the left, B on the right: |AB⟩',28)
for i,name in enumerate(['00','01','10','11']):
 x=35+240*i;box(s,x,95,210,165);text(s,x+65,145,'|'+name+'⟩',30);text(s,x+25,195,'column entry '+str(i),21);text(s,x+25,230,'amplitude '+['a','b','c','d'][i],22)
text(s,35,310,'A=0: entries 0 and 1.       B=0: entries 0 and 2.',24);text(s,35,355,'Notebook mapping: A=q1, B=q0. Ket order and top-to-bottom wire order differ.',21);save(s,'joint-order')
s=start('Product or entangled','The determinant of the coefficient matrix tests a normalized pure two-qubit state.',380);text(s,30,42,'A pure-state factorization test',28)
for x,title,rows,det in [(35,'Plus ⊗ plus',['1/2       1/2','1/2       1/2'],'ad − bc = 0: product'),(535,'Bell Φ-positive',['1/√2       0','0          1/√2'],'ad − bc = 1/2: entangled')]:
 box(s,x,90,430,225);text(s,x+25,130,title,26)
 for j,row in enumerate(rows):text(s,x+90,185+j*45,row,25)
 text(s,x+25,287,det,23)
text(s,35,355,'This criterion applies to a specified pure-state column, not to a measured histogram.',21);save(s,'factorization')
s=start('Local gate pairing','H on A pairs a with c and b with d; H on B pairs a with b and c with d.',370);text(s,30,42,'Which entries can a local gate mix?',28)
for x,title,groups in [(35,'H on A: H ⊗ I',['(a, c): same B=0','(b, d): same B=1']),(535,'H on B: I ⊗ H',['(a, b): same A=0','(c, d): same A=1'])]:
 box(s,x,90,430,210);text(s,x+25,135,title,26)
 for j,t in enumerate(groups):text(s,x+25,200+j*50,t,25)
text(s,35,345,'Each local action is represented on the whole joint column. Factor order matters.',22);save(s,'local-gates')
s=start('Bell preparation circuit','The top A wire receives H and controls the X gate on B. This diagram labels A and B explicitly.',420);text(s,30,42,'Prepare a Bell pair without an intermediate measurement',27)
for y,label in [(140,'A: |0⟩'),(250,'B: |0⟩')]:text(s,30,y+8,label,26);s.append(f'<path d="M150 {y}H900" stroke="#888" stroke-width="2"/>')
box(s,260,105,80,70);text(s,285,150,'H',29);s.append('<path d="M610 140V250" stroke="#286a9b" stroke-width="3"/><circle cx="610" cy="140" r="7" fill="#286a9b"/><circle cx="610" cy="250" r="22" fill="white" stroke="#286a9b" stroke-width="3"/><path d="M588 250H632M610 228V272" stroke="#286a9b" stroke-width="2"/>')
text(s,170,325,'After H: (|00⟩+|10⟩)/√2',23);text(s,590,325,'After CX: (|00⟩+|11⟩)/√2',23);text(s,30,395,'Time runs left to right. Notebook: H on q1, then cx(1,0).',23);save(s,'bell-circuit')
s=start('Conditional branches','A measured value labels a normalized conditional B state with a branch probability.',410);text(s,30,42,'Measure A; keep probability and conditional state separate',26)
box(s,30,135,290,100);text(s,45,175,'Input (1, i, 1, 0)ᵀ/√3',23);text(s,45,210,'Measure A in Z',23)
for y,title,body in [(85,'A=0, probability 2/3','B: (|0⟩ + i|1⟩)/√2'),(235,'A=1, probability 1/3','B: |0⟩')]:
 line(s,325,185,470,y+45);box(s,480,y,475,100);text(s,500,y+37,title,25);text(s,500,y+75,body,24)
text(s,30,390,'Ignore A’s record: PB(0) = (2/3)(1/2) + (1/3)(1) = 2/3.',24);save(s,'partial-branches')
s=start('Correlation comparison','Bell and random zero-zero or one-one preparations share ZZ statistics but differ in XX.',360);text(s,30,42,'One matching histogram is not enough',28)
for x,t in [(35,'Preparation'),(455,'Equal Z records'),(735,'Equal X records')]:text(s,x,115,t,23)
for y,title,z,x in [(190,'Bell Φ-positive','1','1'),(265,'Fair random 00/11','1','1/2')]:text(s,35,y,title,25);text(s,510,y,z,27);text(s,790,y,x,27)
text(s,35,330,'Both local marginals are uniform. Compare measurements under stated assumptions.',21);save(s,'correlation-table')
