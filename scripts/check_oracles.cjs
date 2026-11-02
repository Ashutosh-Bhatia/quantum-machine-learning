const assert=require('node:assert/strict'),O=require('../site/assets/oracle-math.js'),M=require('../site/assets/math-foundations.js');
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} != ${b}`),vclose=(a,b)=>a.forEach((z,i)=>{close(z.r,b[i].r);close(z.i,b[i].i);});
close(O.index(2,1,2),5);
for(const m of [2,4])for(let mask=0;mask<2**m;mask++){
 const f=Array.from({length:m},(_,x)=>(mask>>x)&1),p=O.transitions(f);assert.equal(new Set(p).size,2*m);
 p.forEach((to,k)=>{assert.equal(p[to],k);assert.equal(Math.floor(to/2),Math.floor(k/2));assert.equal(to%2,(k%2)^f[Math.floor(k/2)]);});
 const alpha=M.normalize(Array.from({length:m},(_,x)=>M.z(x+1,x%2?-.4:.7)));
 const minus=[M.z(Math.SQRT1_2),M.z(-Math.SQRT1_2)],plus=[M.z(Math.SQRT1_2),M.z(Math.SQRT1_2)];
 const input=M.tensor(alpha,minus),post=O.apply(input,f);vclose(O.apply(post,f),input);vclose(post,M.tensor(alpha.map((a,x)=>M.mul(a,M.z(f[x]?-1:1))),minus));vclose(O.apply(M.tensor(alpha,plus),f),M.tensor(alpha,plus));
 vclose(O.inputH(O.inputH(input)),input);close(M.norm(post),1);
}
const parity=[0,1,1,0],and=[0,0,0,1];
O.marginal(O.inputH(O.apply(O.uniform(parity,'minus'),parity))).forEach((p,i)=>close(p,i===3?1:0));
O.marginal(O.inputH(O.apply(O.uniform(and,'minus'),and))).forEach(p=>close(p,.25));
const probs=O.apply(O.uniform(parity),parity).map(M.abs2);probs.forEach((p,i)=>close(p,[0,3,5,6].includes(i)?.25:0));
assert.throws(()=>O.transitions([0,2]));assert.throws(()=>O.transitions([0]));assert.throws(()=>O.index(4,0,2));assert.throws(()=>O.apply([M.z(1)],parity));
console.log('PASS: all small Boolean oracle permutations, reversibility, target-one actions, complex-amplitude kickback, plus-target invariance, input-H involution and parity/AND interference.');
