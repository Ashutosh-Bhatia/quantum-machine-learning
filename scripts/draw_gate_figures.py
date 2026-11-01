"""Original editable academic diagrams for Chapter 5."""
from pathlib import Path
from html import escape
import math
O=Path(__file__).resolve().parents[1]/'site/figures/gates-interference';O.mkdir(exist_ok=True)
def start(title,desc,h=360):return [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 {h}" role="img" aria-labelledby="t d"><title id="t">{escape(title)}</title><desc id="d">{escape(desc)}</desc><rect width="1000" height="{h}" fill="white"/><defs><marker id="arrow" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="#286a9b"/></marker></defs><style>text{{font-family:Arial,sans-serif;fill:#243746}}.box{{fill:#f7f9fb;stroke:#c4cfd8}}</style>']
def text(s,x,y,t,n=22):s.append(f'<text x="{x}" y="{y}" font-size="{n}">{escape(t)}</text>')
def box(s,x,y,w,h):s.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="5" class="box"/>')
def line(s,x,y,X,Y):s.append(f'<path d="M{x} {y}L{X} {Y}" fill="none" stroke="#286a9b" stroke-width="2" marker-end="url(#arrow)"/>')
def save(s,n):(O/f'{n}.svg').write_text('\n'.join(s+['</svg>'])+'\n')
s=start('Unitary evolution and its inverse','A state is transformed by U and returned by U adjoint. Measurement is separate.');text(s,30,42,'Coherent transformation is reversible',28)
for x,w,label in [(30,180,'Input |ψ⟩'),(280,150,'U'),(500,180,'U|ψ⟩'),(750,150,'U†')]:box(s,x,100,w,90);text(s,x+20,155,label,25)
for x,X in [(215,270),(435,490),(685,740)]:line(s,x,145,X,145)
text(s,35,245,'U†U|ψ⟩ = |ψ⟩      Squared norm before and after = 1',24);text(s,35,300,'A gate produces a transformed state; a measurement produces an outcome record.',22);save(s,'unitary-route')
s=start('Pauli rotations','Half-turns reverse two coordinates and fix the coordinate on their own axis.');text(s,30,42,'Pauli gates as half-turns of the Bloch state map',27)
for x,name,coords,note in [(30,'X','(x, −y, −z)','Fixes the x-axis'),(355,'Y','(−x, y, −z)','Fixes the y-axis'),(680,'Z','(−x, −y, z)','Fixes the z-axis')]:
 box(s,x,90,290,200);text(s,x+25,135,name,32);text(s,x+25,200,coords,25);text(s,x+25,255,note,21)
text(s,30,335,'Input coordinates (x,y,z). A fixed Bloch point may still acquire a statevector global phase.',20);save(s,'pauli-map')
s=start('Hadamard recombination','For plus input, the contributions to zero reinforce and those to one cancel.',430);text(s,30,42,'Add amplitudes first; square the final sum',28)
text(s,40,110,'Input components of |+⟩',23);text(s,70,175,'α = 1/√2',26);text(s,70,285,'β = 1/√2',26)
for a,b,c,d in [(250,165,490,145),(250,165,490,285),(250,275,490,145),(250,275,490,285)]:line(s,a,b,c,d)
box(s,510,95,445,95);text(s,530,132,'Output 0: 1/2 + 1/2 = 1',25);text(s,530,168,'Probability = |1|² = 1',22)
box(s,510,245,445,95);text(s,530,282,'Output 1: 1/2 − 1/2 = 0',25);text(s,530,318,'Probability = |0|² = 0',22)
text(s,30,400,'No measurement is made on the two contributions before they recombine.',23);save(s,'hadamard-paths')
s=start('Phase-dependent interference fringe','H, phase P, H followed by Z gives complementary cosine squared and sine squared probabilities.',470);text(s,30,42,'A relative phase becomes visible after recombination',27)
text(s,35,95,'|0⟩  →  H  →  P(φ)  →  H  →  measure Z',27)
s.append('<path d="M80 150V385H925" fill="none" stroke="#aaa"/>')
for outcome,color in [(0,'#286a9b'),(1,'#777')]:
 pts=[]
 for i in range(181):
  phi=i*math.pi/90;p=(1+(1 if outcome==0 else -1)*math.cos(phi))/2;pts.append(f'{80+i*4.6:.2f},{385-210*p:.2f}')
 s.append(f'<polyline points="{" ".join(pts)}" fill="none" stroke="{color}" stroke-width="3"/>')
text(s,35,185,'1',20);text(s,35,390,'0',20)
for x,t in [(75,'0'),(475,'π'),(875,'2π')]:text(s,x,418,t,22)
text(s,160,455,'Blue: P(0) = (1+cos φ)/2      Grey: P(1) = (1−cos φ)/2',23);save(s,'interference-fringe')
s=start('Two rotation paths','Ry rotates the north pole along a meridian; Rz rotates an equatorial point.',420);text(s,30,42,'Rotation axes determine which coordinates change',27)
for cx,title in [(260,'Ry(θ) on |0⟩'),(750,'Rz(φ) on |+⟩')]:
 s.append(f'<circle cx="{cx}" cy="215" r="105" fill="white" stroke="#bbb"/><ellipse cx="{cx}" cy="215" rx="105" ry="32" fill="none" stroke="#ddd"/>');text(s,cx-85,90,title,24);text(s,cx+8,105,'+z',20)
 line(s,cx,215,cx,115) if cx==260 else line(s,cx,215,cx+100,215)
 if cx==260:s.append(f'<path d="M{cx} 110 A105 105 0 0 1 {cx+105} 215" fill="none" stroke="#286a9b" stroke-width="4"/>');text(s,cx-130,365,'Output: (sin θ, 0, cos θ)',22)
 else:s.append(f'<path d="M{cx+105} 215 A105 32 0 0 1 {cx} 247" fill="none" stroke="#286a9b" stroke-width="4"/>');text(s,cx-170,365,'Output: (cos φ, sin φ, 0)',22)
text(s,30,405,'These are Bloch coordinates. Statevector coefficients use the rotation half-angle.',21);save(s,'rotation-map')
s=start('Readout basis conversion','X readout uses H then Z. Y readout uses S adjoint then H then Z.',380);text(s,30,42,'Rotate the input basis into the detector basis',28)
for y,label,ops in [(100,'X readout',['H','measure Z']),(225,'Y readout',['S†','H','measure Z'])]:
 text(s,30,y+40,label,24);xx=225
 for op in ops:box(s,xx,y,170,75);text(s,xx+15,y+45,op,24);line(s,xx+175,y+37,xx+205,y+37);xx+=215
text(s,30,355,'Record 0: positive basis state. Record 1: negative basis state. Time runs left to right.',21);save(s,'basis-readout')
