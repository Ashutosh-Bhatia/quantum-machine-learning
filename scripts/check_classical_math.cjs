const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const M=require('../site/assets/classical-math.js');
const katex=require('../site/assets/vendor/katex/katex.min.js');
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} != ${b}`);
const vector=(a,b)=>{assert.equal(a.length,b.length);a.forEach((x,i)=>close(x,b[i]));};
vector(M.matVec(M.operation('random',.25),[.75,.25]),[.625,.375]);
vector(M.matVec(M.operation('asymmetric'),[.75,.25]),[.875,.125]);
const asymmetric=M.operation('asymmetric'),identity=M.operation('identity'),reset=M.operation('reset0');
asymmetric.forEach((row,i)=>vector(row,identity[i].map((x,j)=>(x+reset[i][j])/2)));
vector(M.matVec(asymmetric,[1,0]),[1,0]);vector(M.matVec(asymmetric,[0,1]),[.5,.5]);
vector(M.matVec(M.matMul(M.operation('flip'),asymmetric),[.75,.25]),[1/8,7/8]);
vector(M.matVec(M.matMul(asymmetric,M.operation('flip')),[.75,.25]),[5/8,3/8]);
const joint=[[1/12,1/4],[1/3,1/3]],condition=M.conditionOnRow(joint,0);
close(condition.eventProbability,1/3);vector(condition.marginal,[5/12,7/12]);vector(condition.conditional,[1/4,3/4]);
vector(M.conditionOnRow(joint,1).conditional,[.5,.5]);
for(const row of [0,1]){
 vector(M.conditionOnRow([[.25,.25],[.25,.25]],row).conditional,[.5,.5]);
 vector(M.conditionOnRow([[.5,0],[0,.5]],row).conditional,row===0?[1,0]:[0,1]);
}
assert.throws(()=>M.conditionOnRow([[0,0],[.5,.5]],0),/probability zero/);
assert.throws(()=>M.conditionOnRow([[.2,.2],[.2,.2]],0));
assert.throws(()=>M.conditionOnRow([[1.2,-.2],[0,0]],0));
assert.throws(()=>M.conditionOnRow([[.5],[.25,.25]],0));
assert.throws(()=>M.conditionOnRow(joint,-1));assert.throws(()=>M.conditionOnRow(joint,.5));
assert.throws(()=>M.conditionOnRow([],0));
for(const p of [[1,0],[0,1],[.5,.5],[.75,.25]]){
 vector(M.matVec(M.matMul(M.operation('flip'),M.operation('reset0')),p),[0,1]);
 vector(M.matVec(M.matMul(M.operation('reset0'),M.operation('flip')),p),[1,0]);
}
const names=['identity','flip','reset0','reset1','random','asymmetric'];
for(const first of names)for(const second of names){
 const A=M.operation(first),B=M.operation(second),C=M.matMul(B,A);
 M.matrix(C);for(const p of [[1,0],[0,1],[.123,.877]]){
  const out=M.matVec(C,p);M.distribution(out);vector(out,M.matVec(B,M.matVec(A,p)));
 }
}
// Rectangular maps: a 2-state input, 3-state intermediate and 2-state output.
const A=[[1,0],[0,.4],[0,.6]],B=[[1,.5,0],[0,.5,1]];
vector(M.matVec(M.matMul(B,A),[.2,.8]),M.matVec(B,M.matVec(A,[.2,.8])));
assert.throws(()=>M.distribution([1.2,-.2]));assert.throws(()=>M.distribution([.2,.3]));
assert.throws(()=>M.matrix([[1,0],[.5,.5]]));assert.throws(()=>M.probability(NaN));
assert.throws(()=>M.sampleBit(.5,0));assert.throws(()=>M.sampleBit(.5,1.5));
assert.throws(()=>M.sampleBit(.5,10001));assert.throws(()=>M.sampleBit(.5,1,()=>1));
vector(M.sampleBit(0,5,()=>0),[5,0]);vector(M.sampleBit(1,5,()=>.999),[0,5]);
const fixed=[.1,.9,.2,.8];let i=0;vector(M.sampleBit(.25,4,()=>fixed[i++]),[2,2]);
assert.equal(M.bitsFor(1),0);assert.equal(M.bitsFor(3),2);assert.equal(M.bitsFor(5),3);
assert.equal(M.bitsFor(4),2);
assert.throws(()=>M.bitsFor(0));
let mathCount=0;
const folder=path.join(__dirname,'../content/chapters/classical-information');
for(const file of fs.readdirSync(folder).filter(f=>f.endsWith('.html'))){
 const html=fs.readFileSync(path.join(folder,file),'utf8');
 for(const match of html.matchAll(/\\\[([\s\S]*?)\\\]|\\\(([\s\S]*?)\\\)/g)){
  const tex=(match[1]??match[2]).replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&amp;','&');
  katex.renderToString(tex,{throwOnError:true,displayMode:match[1]!==undefined,strict:'error'});mathCount++;
 }
}
console.log(`PASS: asymmetric rule/decomposition, joint conditioning/independence/zero events, stochastic evolution/order/closure, rectangular dimensions, invalid inputs, deterministic sampling and ${mathCount} authored math expressions.`);
