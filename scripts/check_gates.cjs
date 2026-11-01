const assert=require('node:assert/strict'),M=require('../site/assets/math-foundations.js'),G=require('../site/assets/gate-math.js'),Q=require('../site/assets/qubit-math.js');
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} != ${b}`),vector=(u,v)=>u.forEach((a,i)=>{close(a.r,v[i].r);close(a.i,v[i].i);}),matrix=(A,B)=>A.forEach((row,i)=>vector(row,B[i]));
const I=G.matrix('I'),X=G.matrix('X'),Y=G.matrix('Y'),Z=G.matrix('Z'),H=G.matrix('H'),S=G.matrix('S'),T=G.matrix('T');
for(const name of ['I','X','Y','Z','H','S','T','P','Rx','Ry','Rz'])for(const angle of [-Math.PI,0,.23,Math.PI/2,2*Math.PI])assert.ok(M.unitary(G.matrix(name,angle)));
for(const name of ['X','Y','Z','H'])matrix(M.product(G.matrix(name),G.matrix(name)),I);
matrix(M.product(T,T),S);matrix(M.product(S,S),Z);matrix(M.product(Z,Z),I);
const state=Q.preset('complex');
for(const name of ['X','Y','Z','H','S','T']){const U=G.matrix(name);vector(M.apply(M.adjoint(U),M.apply(U,state)),state);}
// Independent identities for Born readout and Bloch rotations across a grid.
for(let theta=0;theta<=180;theta+=30)for(let phi=0;phi<360;phi+=45){const v=Q.angles(theta,phi),b=Q.bloch(v);close(G.probabilities(v,'X')[0],(1+b.x)/2);close(G.probabilities(v,'Y')[0],(1+b.y)/2);close(G.probabilities(v,'Z')[0],(1+b.z)/2);
 for(const a of [-1.3,.4,2.2]){const ca=Math.cos(a),sa=Math.sin(a),expected={Rx:[b.x,ca*b.y-sa*b.z,sa*b.y+ca*b.z],Ry:[ca*b.x+sa*b.z,b.y,-sa*b.x+ca*b.z],Rz:[ca*b.x-sa*b.y,sa*b.x+ca*b.y,b.z]};for(const name of Object.keys(expected)){const out=Q.bloch(G.run(v,[{name,angle:a}]));[out.x,out.y,out.z].forEach((x,i)=>close(x,expected[name][i]));}}
}
for(let i=0;i<=36;i++){const a=i*Math.PI/18,v=G.run(Q.preset('zero'),[{name:'H'},{name:'P',angle:a},{name:'H'}]);close(G.probabilities(v)[0],(1+Math.cos(a))/2);}
vector(G.run(Q.preset('zero'),[{name:'H'},{name:'S'},{name:'H'},{name:'T'}]),[M.z(.5,.5),M.z(Math.SQRT1_2)]);
close(G.probabilities(G.run(Q.preset('zero'),[{name:'H'},{name:'Z'}]),'X')[0],0);close(G.probabilities(G.run(Q.preset('zero'),[{name:'Z'},{name:'H'}]),'X')[0],1);
assert.ok(G.equivalent(G.run(state,[{name:'Rz',angle:.7}]),G.run(state,[{name:'P',angle:.7}])));
assert.throws(()=>G.matrix('bad'));assert.throws(()=>G.matrix('Ry',NaN));assert.throws(()=>G.probabilities(state,'bad'));
console.log('PASS: gate unitarity/inverses, phase powers, circuit order, complex amplitudes, independent Bloch rotation identities, X/Y readout and interference fringes.');
