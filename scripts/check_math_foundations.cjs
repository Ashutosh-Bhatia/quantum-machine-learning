const assert=require('node:assert/strict'),M=require('../site/assets/math-foundations.js');
const {z}=M,eps=1e-10;
const close=(a,b)=>assert.ok(Math.abs(a-b)<eps,`${a} != ${b}`);
const eq=(a,b)=>{close(a.r,b.r);close(a.i,b.i);};
const vector=(a,b)=>{assert.equal(a.length,b.length);a.forEach((x,i)=>eq(x,b[i]));};
const matrix=(a,b)=>{assert.equal(a.length,b.length);a.forEach((r,i)=>vector(r,b[i]));};
eq(M.mul(z(1,2),z(2,-1)),z(4,3));eq(M.mul(z(1,2),z(1,2)),z(-3,4));
close(M.abs2(z(1/3,2/3)),5/9);
const r=Math.SQRT1_2,u=[z(r),z(0,r)],v=[z(0,r),z(r)];
eq(M.inner(u,v),z(0));close(M.norm(u),1);
assert.throws(()=>M.normalize([z(0),z(0)]));assert.throws(()=>M.inner([z(1)],[z(1),z(0)]));
assert.throws(()=>M.apply([[z(1)]],[z(1),z(2)]));assert.throws(()=>M.adjoint([[z(1)],[z(1),z(2)]]));assert.throws(()=>z(Infinity));
const P=M.outer(u,u);matrix(P,[[z(.5),z(0,-.5)],[z(0,.5),z(.5)]]);matrix(M.product(P,P),P);matrix(M.adjoint(P),P);
const H=[[z(r),z(r)],[z(r),z(-r)]],S=[[z(1),z(0)],[z(0),z(0,1)]],U=[[z(r),z(0,r)],[z(0,r),z(r)]];
for(const A of [H,S,U,M.product(S,H)])assert.ok(M.unitary(A));
assert.ok(!M.unitary(P));assert.ok(!M.unitary([[z(1),z(0)],[z(0),z(2)]]));assert.ok(!M.unitary([[z(1),z(0)]]));
vector(M.tensor([z(1),z(2)],[z(3),z(4)]),[z(3),z(4),z(6),z(8)]);
vector(M.tensor([z(r),z(r)],u),[z(.5),z(0,.5),z(.5),z(0,.5)]);
// Multiple arbitrary vectors check adjoint identities, conjugate symmetry, and full inner-product preservation.
for(let k=1;k<=30;k++){
 const a=[z(k/7,(k%3)-1),z(2-k/5,k/11)],b=[z(k/13,-1),z(-k/9,.5)];
 eq(M.inner(a,b),M.conj(M.inner(b,a)));close(M.norm(M.normalize(a)),1);
 close(M.norm(M.tensor(a,b)),M.norm(a)*M.norm(b));
 eq(M.inner(M.apply(U,a),M.apply(U,b)),M.inner(a,b));
 const normalized=M.normalize(a),Q=M.outer(normalized,normalized);matrix(M.product(Q,Q),Q);
 vector(M.apply(Q,M.apply(Q,b)),M.apply(Q,b));
}
matrix(M.adjoint(M.product(S,H)),M.product(M.adjoint(H),M.adjoint(S)));
console.log('PASS: complex arithmetic, conjugation, normalization/zero boundary, inner/outer/tensor products, projectors, adjoints, dimensions and unitary preservation.');
