const assert=require('node:assert/strict'),Q=require('../site/assets/qubit-math.js'),M=require('../site/assets/math-foundations.js');
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} != ${b}`),arr=(a,b)=>{assert.equal(a.length,b.length);a.forEach((x,i)=>close(x,b[i]));};
arr(Q.probabilities(Q.preset('complex')),[5/9,4/9]);arr(Q.probabilities(Q.preset('complex'),'X'),[5/18,13/18]);
arr(Q.probabilities(Q.preset('plus'),'X'),[1,0]);arr(Q.probabilities(Q.preset('minus'),'X'),[0,1]);
assert.ok(!Q.valid(Q.preset('raw')));assert.ok(Q.valid(Q.normalize(Q.preset('raw'))));
assert.throws(()=>Q.normalize([M.z(0),M.z(0)]));assert.throws(()=>Q.probabilities(Q.preset('raw')));assert.throws(()=>Q.preset('invalid'));assert.throws(()=>Q.probabilities(Q.preset('plus'),'Y'));
assert.throws(()=>Q.angles(-1,0));assert.throws(()=>Q.angles(181,0));assert.throws(()=>Q.valid([M.z(1)]));assert.throws(()=>Q.global(Q.preset('zero'),Infinity));
assert.throws(()=>Q.trial(Q.preset('plus'),'Z',()=>1));assert.throws(()=>Q.sample(Q.preset('plus'),'Z',0));assert.throws(()=>Q.branch(Q.preset('plus'),'Z',2));
const v=Q.preset('complex'),copy=JSON.stringify(v),b=Q.branch(v,'Z',0);close(b.p,5/9);close(b.state[0].r,1/Math.sqrt(5));close(b.state[0].i,2/Math.sqrt(5));close(M.norm(b.state),1);
assert.equal(Q.branch(Q.preset('zero'),'Z',1).state,null);
// A very small but nonzero branch must not be silently labelled impossible.
const tiny=[M.z(Math.sqrt(1-1e-16)),M.z(1e-8)];assert.ok(Q.branch(tiny,'Z',1).p>0);assert.ok(Q.branch(tiny,'Z',1).state);
for(const theta of [0,30,60,90,120,150,180])for(const phi of [0,45,90,180,270,360]){
 const v=Q.angles(theta,phi),r=Q.bloch(v);close(M.norm(v),1);close(r.x*r.x+r.y*r.y+r.z*r.z,1);
 close(Q.probabilities(v)[1],(1-r.z)/2);close(Q.probabilities(v,'X')[0],(1+r.x)/2);
 for(const basis of ['Z','X']){
  const p=Q.probabilities(v,basis);close(p[0]+p[1],1);
  for(const gamma of [0,90,137,270])arr(Q.probabilities(Q.global(v,gamma),basis),p);
  for(let i=0;i<2;i++){const branch=Q.branch(v,basis,i);if(branch.p>0){close(M.norm(branch.state),1);close(Q.probabilities(branch.state,basis)[i],1);}}
 }
}
for(const phi of [0,90,180,270]){arr(Q.probabilities(Q.angles(0,phi)),[1,0]);arr(Q.probabilities(Q.angles(180,phi)),[0,1]);}
const point=Q.bloch(Q.angles(120,90));arr([point.x,point.y,point.z],[0,Math.sqrt(3)/2,-.5]);
for(const basis of ['Z','X'])arr(Q.ensemble('random',basis),[.5,.5]);arr(Q.ensemble('plus','X'),[1,0]);
// Explicit random draws demonstrate fresh preparation versus retained-state remeasurement.
const fresh=[.1,.9,.1].map(x=>Q.trial(Q.preset('plus'),'Z',()=>x).outcome);assert.deepEqual(fresh,[0,1,0]);
let retained=Q.trial(Q.preset('plus'),'Z',()=>.9).state;
for(const draw of [.1,.9,.5]){const t=Q.trial(retained,'Z',()=>draw);assert.equal(t.outcome,1);retained=t.state;}
for(const outcome of [0,1])arr(Q.probabilities(Q.branch(Q.preset('zero'),'X',outcome).state),[.5,.5]);
assert.deepEqual(Q.sample(Q.preset('zero'),'Z',20,()=>.7),[20,0]);assert.deepEqual(Q.sample(Q.preset('one'),'Z',20,()=>.7),[0,20]);
Q.sample(v,'Z',100,()=>.2);assert.equal(JSON.stringify(v),copy);
console.log('PASS: Born rules, phase equivalence, branch phases/zero and rare branches, projection repeatability, fresh versus retained trials, Bloch geometry, ensemble statistics and invalid inputs.');
