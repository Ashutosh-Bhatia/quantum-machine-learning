"""Original editable academic diagrams for Part B."""
from pathlib import Path
from html import escape
import math
O=Path(__file__).resolve().parents[1]/'site/figures/part-b';O.mkdir(exist_ok=True)
def start(title,desc,h=360):return [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 {h}" role="img" aria-labelledby="t d"><title id="t">{escape(title)}</title><desc id="d">{escape(desc)}</desc><rect width="1000" height="{h}" fill="white"/><defs><marker id="arrow" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="#286a9b"/></marker></defs><style>text{{font-family:Arial,sans-serif;fill:#243746}}.box{{fill:#f7f9fb;stroke:#c4cfd8}}</style>']
def text(s,x,y,t,n=22):s.append(f'<text x="{x}" y="{y}" font-size="{n}">{escape(t)}</text>')
def box(s,x,y,w,h):s.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="5" class="box"/>')
def line(s,x,y,X,Y):s.append(f'<path d="M{x} {y}L{X} {Y}" fill="none" stroke="#286a9b" stroke-width="2" marker-end="url(#arrow)"/>')
def save(s,n):(O/f'{n}.svg').write_text('\n'.join(s+['</svg>'])+'\n')

flows=[
('ml-data','From examples to a learning problem',['Represent x','Declare target y','Choose model','Evaluate']),
('ml-objective','The training loop',['Predict','Calculate loss','Differentiate','Update']),
('ml-evaluation','Separate fit, selection and final evaluation',['Training fit','Validation choice','Test estimate','Deployment']),
('ml-linear','A regression prediction has distinct ingredients',['Features x','Weights w','Bias b','Prediction']),
('ml-neural','Nonlinear layers learn new representations',['Input x','Affine map','Activation','Output score']),
('ml-regularization','Select capacity using held-out evidence',['Model family','Penalty λ','Validation','Final test']),
('ml-features','A kernel is an inner product in a representation',['Input pair','Feature maps','Inner product','Similarity']),
('ml-svm','From geometry to a kernel classifier',['Margin','Support vectors','Kernel score','Decision']),
('ml-comparison','Compare the complete learning procedures',['Same data','Validation','Quality + cost','Conclusion'])]
for name,title,labels in flows:
 s=start(title,' → '.join(labels),300);text(s,30,45,title,27)
 for i,t in enumerate(labels):
  x=30+245*i;box(s,x,110,215,95);text(s,x+15,165,t,22)
  if i<3:line(s,x+218,155,x+240,155)
 text(s,30,265,'Read the calculation and assumptions alongside the diagram.',22);save(s,name)
