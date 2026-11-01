const assert=require('node:assert/strict'),M=require('../site/assets/math-foundations.js'),G=require('../site/assets/gate-math.js'),Q=require('../site/assets/qubit-math.js'),J=require('../site/assets/joint-math.js');
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} != ${b}`),vclose=(a,b)=>a.forEach((z,i)=>{close(z.r,b[i].r);close(z.i,b[i].i);}),zero=[M.z(1),M.z(0),M.z(0),M.z(0)],bell=J.family(Math.PI/4),I=G.matrix('I'),H=G.matrix('H');
// Asymmetric ordering tests, not merely a symmetric Bell-state check.
vclose(M.tensor(Q.preset('plus'),Q.preset('one')),[M.z(0),M.z(Math.SQRT1_2),M.z(0),M.z(Math.SQRT1_2)]);
vclose(J.local(zero,H,I),[M.z(Math.SQRT1_2),M.z(0),M.z(Math.SQRT1_2),M.z(0)]);
vclose(J.local(zero,I,H),[M.z(Math.SQRT1_2),M.z(Math.SQRT1_2),M.z(0),M.z(0)]);
vclose(J.cx(J.local(zero,H,I)),bell);
for(let k=0;k<4;k++){const v=zero.map((_,i)=>M.z(i===k?1:0));vclose(J.cx(J.cx(v)),v);const target=k<2?k:5-k;close(J.probabilities(J.cx(v))[target],1);}
close(M.abs2(J.determinant(M.tensor(Q.preset('plus'),Q.preset('plusi')))),0);close(J.determinant(bell).r,.5);
for(const basis of ['Z','X','Y']){const p=J.probabilities(bell,basis,basis),m=J.marginals(p);close(p.reduce((a,b)=>a+b),1);m.A.forEach(x=>close(x,.5));m.B.forEach(x=>close(x,.5));close(p[0]+p[3],basis==='Y'?0:1);if(basis==='Z')J.mixture(basis).forEach((x,i)=>close(x,p[i]));else J.mixture(basis).forEach(x=>close(x,.25));}
const psi=[M.z(1/Math.sqrt(3)),M.z(0,1/Math.sqrt(3)),M.z(1/Math.sqrt(3)),M.z(0)],t=J.branch(psi,'A','Z',0);close(t.p,2/3);vclose(t.state,Q.preset('plusi'));
assert.equal(J.branch(M.tensor(Q.preset('zero'),Q.preset('plus')),'A','Z',1).state,null);
// Do not discard legitimate rare branches as zero.
const rare=[M.z(Math.sqrt(1-1e-16)),M.z(0),M.z(1e-8),M.z(0)];assert.ok(J.branch(rare,'A','Z',1).p>0);vclose(J.branch(rare,'A','Z',1).state,Q.preset('zero'));
// For a complex entangled input, ignored-record remote distributions agree in all local bases.
for(const which of ['A','B'])for(const measured of ['X','Y','Z'])for(const remote of ['X','Y','Z']){let average=[0,0];for(let out=0;out<2;out++){const t=J.branch(psi,which,measured,out);if(t.state)G.probabilities(t.state,remote).forEach((x,i)=>average[i]+=t.p*x);}const joint=J.probabilities(psi,which==='A'?'Z':remote,which==='A'?remote:'Z'),original=J.marginals(joint)[which==='A'?'B':'A'];average.forEach((x,i)=>close(x,original[i]));}
for(let theta=0;theta<=180;theta+=30){const u=Q.angles(theta,55),v=M.tensor(u,Q.preset('plusi'));close(M.abs2(J.determinant(v)),0);close(M.abs2(J.determinant(J.local(bell,G.matrix('Ry',theta/80),G.matrix('S')))),.25);}
assert.throws(()=>J.probabilities([M.z(1)]));assert.throws(()=>J.branch(bell,'C','Z',0));
console.log('PASS: tensor/bit order, local operators, CNOT permutations, factorization, Bell XX/YY/ZZ correlations, complex/zero/rare conditional branches and ignored-record remote marginals.');
