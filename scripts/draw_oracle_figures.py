"""Original editable academic diagrams for Chapter 7."""
from pathlib import Path
from html import escape
import math
O=Path(__file__).resolve().parents[1]/'site/figures/registers-oracles';O.mkdir(exist_ok=True)
def start(title,desc,h=360):return [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 {h}" role="img" aria-labelledby="t d"><title id="t">{escape(title)}</title><desc id="d">{escape(desc)}</desc><rect width="1000" height="{h}" fill="white"/><defs><marker id="arrow" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="#286a9b"/></marker></defs><style>text{{font-family:Arial,sans-serif;fill:#243746}}.box{{fill:#f7f9fb;stroke:#c4cfd8}}</style>']
def text(s,x,y,t,n=22):s.append(f'<text x="{x}" y="{y}" font-size="{n}">{escape(t)}</text>')
def box(s,x,y,w,h):s.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="5" class="box"/>')
def line(s,x,y,X,Y):s.append(f'<path d="M{x} {y}L{X} {Y}" fill="none" stroke="#286a9b" stroke-width="2" marker-end="url(#arrow)"/>')
def save(s,n):(O/f'{n}.svg').write_text('\n'.join(s+['</svg>'])+'\n')
s=start('Register roles','Input, target and temporary workspace are parts of one joint state.',390);text(s,30,42,'Group qubits by purpose; keep the full state',28)
for x,title,line1,line2 in [(30,'Input X','n qubits, 2ⁿ labels','Keep the input x'),(355,'Target Y','1 qubit, labels 0/1','Update y ⊕ f(x)'),(680,'Workspace W','Temporary work','Restore coherently')]:
 box(s,x,95,290,205);text(s,x+20,140,title,27);text(s,x+20,200,line1,23);text(s,x+20,255,line2,22)
text(s,30,350,'Register names specify roles. They do not imply the joint state is a product.',23);save(s,'register-roles')
s=start('Bit positions and measurement wiring','The label 100 is index four; reversed classical wiring stores 001.',370);text(s,30,42,'Quantum state order and classical record layout',27)
text(s,35,110,'Ket |q2 q1 q0⟩ = |100⟩',27);text(s,35,158,'Column index: 4×1 + 2×0 + 0 = 4',25)
box(s,35,210,425,95);text(s,55,249,'qi → ci',25);text(s,55,284,'Record c2c1c0 = 100',23)
box(s,535,210,425,95);text(s,555,249,'q2 → c0, q1 → c1, q0 → c2',22);text(s,555,284,'Record c2c1c0 = 001',23)
text(s,35,350,'Changing a drawing does not apply a SWAP gate or change the circuit.',23);save(s,'bit-order')
s=start('Compute copy uncompute','Temporary registers are restored by the inverse computation after the target update.',390);text(s,30,42,'Clean workspace without measuring the input branch',27)
for x,title,body in [(30,'Compute C','work holds g(x), f(x)'),(355,'Toggle target','y becomes y ⊕ f(x)'),(680,'Uncompute C†','work returns to zero')]:
 box(s,x,100,290,130);text(s,x+20,145,title,26);text(s,x+20,202,body,21)
line(s,325,165,345,165);line(s,650,165,670,165)
text(s,35,295,'Input x is retained throughout. The useful target is excluded from C†.',23);text(s,35,350,'Measuring or ignoring correlated workspace is not the same as reversing it.',22);save(s,'uncompute')
s=start('XOR oracle interface','An oracle leaves x unchanged and flips y only where the truth table is one.',360);text(s,30,42,'Define the action on both target inputs',28)
for y,inp,out in [(125,'|x, 0⟩','|x, f(x)⟩'),(250,'|x, 1⟩','|x, 1 ⊕ f(x)⟩')]:
 text(s,35,y,inp,29);box(s,330,y-45,230,75);text(s,415,y+2,'U_f',30);line(s,185,y-10,320,y-10);line(s,565,y-10,700,y-10);text(s,720,y,out,27)
text(s,35,335,'Applying this full basis permutation twice returns the original state.',23);save(s,'oracle-interface')
s=start('A superposed parity query','Four coherent components are possible; one readout gives one record.',390);text(s,30,42,'One statevector description, one record per shot',27)
for i,label in enumerate(['000','011','101','110']):
 x=30+245*i;box(s,x,95,215,130);text(s,x+35,140,'|'+label+'⟩',29);text(s,x+20,190,'amplitude 1/2',23)
text(s,35,285,'Uniform input, parity f, target starts at zero: each joint probability is 1/4.',22);text(s,35,350,'A physical Z readout selects one label. It does not return the amplitude list.',23);save(s,'superposed-records')
s=start('Phase kickback','Minus target stays unchanged while function-dependent signs appear on input amplitudes.',410);text(s,30,42,'A conditional eigenvalue becomes a relative phase',27)
box(s,35,95,420,150);text(s,55,140,'Target: X|−⟩ = −|−⟩',28);text(s,55,190,'Input x receives (−1) raised to f(x)',21);text(s,55,225,'Target factors out as |−⟩',24)
box(s,535,95,425,150);text(s,555,140,'Parity input signs: +, −, −, +',24);text(s,555,190,'Input state: |−⟩ ⊗ |−⟩',25);text(s,555,225,'H ⊗ H sends it to |11⟩',25)
text(s,35,305,'Before mixing: all four input Z probabilities are 1/4.',24);text(s,35,365,'After mixing: parity gives input label 11 with certainty. Other functions can differ.',21);save(s,'kickback-signs')
