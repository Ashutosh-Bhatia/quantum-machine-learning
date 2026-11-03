const assert=require('node:assert/strict'),A=require('../site/assets/algorithm-math.js'),O=require('../site/assets/oracle-math.js'),M=require('../site/assets/math-foundations.js');
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} != ${b}`);
for(const N of [2,4,8])for(let mask=0;mask<2**N;mask++){
 const f=Array.from({length:N},(_,x)=>(mask>>x)&1),amp=A.amplitudes(f),p=A.probabilities(f),r=f.reduce((a,b)=>a+b);close(p.reduce((a,b)=>a+b),1);close(p[0],(1-2*r/N)**2);
 if(A.classify(f)==='constant')close(p[0],1);if(A.classify(f)==='balanced')close(p[0],0);
 const complement=f.map(x=>1-x);A.amplitudes(complement).forEach((x,i)=>close(x,-amp[i]));
 if(N<=4){const v=A.stage(f,3),marginal=O.marginal(v);marginal.forEach((x,i)=>close(x,p[i]));close(M.norm(v),1);if(N===2){const answer=f[0]^f[1];close(p[answer],1);}}
}
const majority=Array.from({length:8},(_,i)=>Number(i.toString(2).replaceAll('0','').length>=2));assert.equal(A.classify(majority),'balanced');assert.equal(A.probabilities(majority).filter(p=>p>1e-10).length,4);
// Direct enumeration, independent of the closed-form randomized error.
for(let k=1;k<=5;k++){let total=0,bad=0;function visit(a){if(a.length===k){total++;if(new Set(a.map(x=>[0,0,1,1][x])).size===1)bad++;return;}for(let x=0;x<4;x++)visit([...a,x]);}visit([]);close(A.costs(2,k).withReplacement,bad/total);}
close(A.costs(5,8).exact,17);close(A.costs(5,8).withReplacement,1/128);close(A.costs(2,2).withoutReplacement,1/3);close(A.costs(2,3).withoutReplacement,0);assert.equal(A.costs(1,3).withoutReplacement,null);
assert.throws(()=>A.amplitudes([0,0,1]));assert.throws(()=>A.contributions([0,1],2));assert.throws(()=>A.costs(0,2));assert.throws(()=>A.costs(2,0));
console.log('PASS: every 1/2/3-input Boolean signed sum, promise guarantees, outside-promise probabilities, global complement phase, full Deutsch states, multi-output majority and randomized error criteria.');
