"""Original editable academic diagrams for Chapter 8."""
from pathlib import Path
from html import escape
import math
O=Path(__file__).resolve().parents[1]/'site/figures/quantum-algorithms';O.mkdir(exist_ok=True)
def start(title,desc,h=360):return [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 {h}" role="img" aria-labelledby="t d"><title id="t">{escape(title)}</title><desc id="d">{escape(desc)}</desc><rect width="1000" height="{h}" fill="white"/><defs><marker id="arrow" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="#286a9b"/></marker></defs><style>text{{font-family:Arial,sans-serif;fill:#243746}}.box{{fill:#f7f9fb;stroke:#c4cfd8}}</style>']
def text(s,x,y,t,n=22):s.append(f'<text x="{x}" y="{y}" font-size="{n}">{escape(t)}</text>')
def box(s,x,y,w,h):s.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="5" class="box"/>')
def line(s,x,y,X,Y):s.append(f'<path d="M{x} {y}L{X} {Y}" fill="none" stroke="#286a9b" stroke-width="2" marker-end="url(#arrow)"/>')
def save(s,n):(O/f'{n}.svg').write_text('\n'.join(s+['</svg>'])+'\n')
s=start('Classical query ambiguity','Query zero returning zero leaves constant zero and the identity function compatible.',400);text(s,30,42,'One response does not determine the relation',28)
box(s,35,130,270,100);text(s,55,170,'Query f(0)',27);text(s,55,210,'Response: 0',25)
for y,title,body in [(80,'Table 00: constant','f(1) = 0'),(240,'Table 01: balanced','f(1) = 1')]:
 line(s,310,180,475,y+40);box(s,485,y,465,100);text(s,505,y+38,title,26);text(s,505,y+78,body,24)
text(s,35,380,'Querying the other input resolves the two compatible possibilities.',23);save(s,'classical-tree')
s=start('Deutsch circuit','Input zero and target one receive Hadamards, one oracle, and final H on input.',400);text(s,30,42,'One coherent oracle call; read only the input',28)
for y,label in [(140,'X: |0⟩'),(265,'Y: |1⟩')]:text(s,30,y+8,label,25);s.append(f'<path d="M145 {y}H940" stroke="#999" stroke-width="2"/>');box(s,210,y-35,70,70);text(s,230,y+9,'H',29)
box(s,415,90,170,225);text(s,460,200,'U_f',33);box(s,715,105,70,70);text(s,735,149,'H',29);text(s,815,115,'Z readout',21)
text(s,35,370,'Target stays |−⟩ after preparation. Oracle target is q0; input is q1.',23);save(s,'deutsch-circuit')
s=start('Signed interference sums','Equal branch signs reinforce zero; different signs reinforce one.',380);text(s,30,42,'The property lives in a relative sign',28)
for x,title,a,b,out in [(35,'Equal signs',1,1,'Output 0: amplitude 1'),(535,'Opposite signs',1,-1,'Output 1: amplitude 1')]:
 box(s,x,90,430,220);text(s,x+20,135,title,27);text(s,x+20,190,f'Zero: ({a} + {b})/2 = {(a+b)//2}',24);text(s,x+20,235,f'One:  ({a} − {b})/2 = {(a-b)//2}',24);text(s,x+20,285,out,23)
text(s,35,355,'A common negative sign changes amplitudes but preserves all outcome probabilities.',21);save(s,'signed-sums')
s=start('Four-term Deutsch Jozsa sum','For f=x0, output zero contributions cancel and output 01 contributions reinforce.',400);text(s,30,42,'Two input bits make every contribution visible',28)
text(s,35,100,'Input labels:          00            01            10            11',25);text(s,35,150,'Function signs:       +              −              +              −',25)
box(s,35,195,925,135);text(s,55,240,'A(00) = (1 − 1 + 1 − 1)/4 = 0',27);text(s,55,295,'A(01) = (1 + 1 + 1 + 1)/4 = 1',27)
text(s,35,380,'Table 0101 is balanced. The ideal input readout is 01 with certainty.',23);save(s,'dj-sum')
s=start('Query comparisons','Exact deterministic worst-case queries and bounded-error sampling have different criteria.',420);text(s,30,42,'State the resource and the success requirement',27)
for y,title,body in [(90,'Classical, exact worst case','N/2 + 1 distinct function evaluations'),(185,'Quantum, ideal exact promise problem','1 coherent oracle call'),(280,'Classical, independent random samples','k queries: balanced-case error 2 raised to (1−k)')]:
 box(s,35,y,925,80);text(s,55,y+30,title,24);text(s,55,y+63,body,23)
text(s,35,405,'An oracle-query count does not include all implementation or hardware costs.',22);save(s,'query-comparison')
