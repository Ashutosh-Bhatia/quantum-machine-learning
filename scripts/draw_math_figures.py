"""Original editable academic figures for Chapter 3."""
from pathlib import Path
from html import escape
O=Path(__file__).resolve().parents[1]/'site/figures/mathematical-language';O.mkdir(exist_ok=True)
def start(title,desc,h=380):return [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 {h}" role="img" aria-labelledby="t d"><title id="t">{escape(title)}</title><desc id="d">{escape(desc)}</desc><rect width="1000" height="{h}" fill="white"/><defs><marker id="a" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="#286a9b"/></marker></defs><style>text{{font-family:Arial,sans-serif;fill:#243746}}.line{{fill:none;stroke:#286a9b;stroke-width:2;marker-end:url(#a)}}.guide{{fill:none;stroke:#b4bfc8;stroke-width:1.5;stroke-dasharray:5 4}}.box{{fill:#f7f9fb;stroke:#c4cfd8}}</style>']
def tx(s,x,y,t,n=20):s.append(f'<text x="{x}" y="{y}" font-size="{n}">{escape(t)}</text>')
def line(s,x,y,X,Y,cls='line'):s.append(f'<path d="M{x} {y}L{X} {Y}" class="{cls}"/>')
def box(s,x,y,w,h):s.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="5" class="box"/>')
def save(s,n):(O/f'{n}.svg').write_text('\n'.join(s+['</svg>'])+'\n')
s=start('One complex number, two coordinates','The point 1+2i and its conjugate 1−2i have equal distance from the origin.',440);tx(s,30,38,'Magnitude, phase and conjugation',26)
line(s,60,240,480,240);line(s,210,405,210,60);tx(s,445,270,'Re');tx(s,220,70,'Im');line(s,210,240,280,100);line(s,210,240,280,380);line(s,280,100,280,380,'guide');tx(s,320,105,'1 + 2i');tx(s,320,382,'1 − 2i');tx(s,225,218,'φ');tx(s,65,430,'The real axis is the mirror line.',18)
box(s,540,95,420,250)
for i,t in enumerate(['z = a + bi','z* = a − bi','|z|² = a² + b²','z = r(cos φ + i sin φ)','Conjugation changes φ to −φ.']):tx(s,565,135+i*43,t,21)
save(s,'complex-plane')
s=start('Real vector projection','Vector v equals its projection onto unit u plus an orthogonal residual.');tx(s,30,38,'Projection onto a unit direction',26);line(s,90,290,450,290);line(s,90,290,360,90);line(s,360,90,360,290,'guide');tx(s,452,295,'û');tx(s,370,90,'v');tx(s,190,320,'(û · v) û');tx(s,375,200,'residual',18);tx(s,120,275,'θ');box(s,575,100,380,210)
for i,t in enumerate(['Signed component: û · v','Vector projection: (û · v) û','Residual is perpendicular to û.','For non-unit u, divide by u · u.']):tx(s,590,140+43*i,t,19)
save(s,'dot-projection')
s=start('Ket to bra','Conjugate the entries of a column and transpose to obtain its bra.');tx(s,30,38,'A bra is more than a transposed complex column',26)
for x,title,lines in [(30,'Ket |v⟩',['1 + i','2 − i']),(360,'Conjugate entries',['1 − i','2 + i']),(690,'Transpose to bra',['(1 − i,  2 + i)'])]:
 box(s,x,100,280,170);tx(s,x+15,137,title,22)
 for k,t in enumerate(lines):tx(s,x+30,190+36*k,t,24)
line(s,315,185,350,185);line(s,645,185,680,185);tx(s,30,335,'For real basis columns, conjugation changes nothing. For complex entries, it matters.',20);save(s,'bra-ket')
s=start('Three different products','Inner gives a scalar, outer a matrix and tensor a longer column.');tx(s,30,38,'Check the shape before calculating',26)
for x,title,formula,shape in [(30,'Inner product','⟨u|v⟩','(1 × d)(d × 1) → scalar'),(355,'Outer product','|u⟩⟨v|','(m × 1)(1 × n) → m × n'),(680,'Tensor product','u ⊗ v','m entries, n entries → mn')]:
 box(s,x,90,290,215);tx(s,x+18,130,title,23);tx(s,x+70,195,formula,26);tx(s,x+15,265,shape,18)
tx(s,30,350,'The bra includes conjugation; the tensor product combines separate spaces.',20);save(s,'products')
s=start('A shear changes basis directions','A maps e0 to (1,0) and e1 to (2,1); the second basis direction tilts.');tx(s,30,38,'A matrix stores the transformed basis columns',26)
for origin,title,shear in [(120,'Before',False),(570,'After A = [[1,2],[0,1]]',True)]:
 tx(s,origin-40,90,title,22);line(s,origin,290,origin+150,290);line(s,origin,290,origin+(240 if shear else 0),170);tx(s,origin+135,320,'Ae₀' if shear else 'e₀');tx(s,origin+(245 if shear else 10),160,'Ae₁' if shear else 'e₁')
tx(s,30,360,'For any v, combine the transformed columns with the original coefficients.',20);save(s,'matrix-map')
s=start('Rotation versus unequal scaling','Real rotations preserve inner products; unequal scaling generally does not.');tx(s,30,38,'Preserve every inner product, not just one length',26)
for x,title,rx,ry in [(230,'Rotation: U†U = I',100,100),(740,'Unequal scaling: A†A ≠ I',145,75)]:
 tx(s,x-190,90,title,23);s.append(f'<ellipse cx="{x}" cy="210" rx="{rx}" ry="{ry}" fill="none" stroke="#286a9b" stroke-width="2"/>');line(s,x,210,x+rx,210);line(s,x,210,x,210-ry)
tx(s,30,350,'The circle-to-ellipse picture illustrates the real case; complex unitarity uses adjoints.',19);save(s,'unitary')
s=start('Tensor expansion','Read ac, ad, bc, bd in row-major order for labels 00,01,10,11.');tx(s,30,38,'Every pair of subsystem labels contributes one coefficient',25)
for i,(lab,coef) in enumerate([('00','ac'),('01','ad'),('10','bc'),('11','bd')]):
 x=50+(i%2)*180;y=95+(i//2)*105;box(s,x,y,160,85);tx(s,x+15,y+29,'label '+lab,18);tx(s,x+60,y+64,coef,24)
line(s,430,190,560,190)
for i,t in enumerate(['ac','ad','bc','bd']):box(s,610,85+55*i,100,48);tx(s,640,118+55*i,t,23);tx(s,740,118+55*i,['00','01','10','11'][i],20)
tx(s,30,350,'Order: first subsystem label first. Swapping factors generally changes the array.',20);save(s,'tensor-expansion')
