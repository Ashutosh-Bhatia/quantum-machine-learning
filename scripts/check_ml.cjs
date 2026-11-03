const assert=require('node:assert/strict'),M=require('../site/assets/ml-math.js');const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
close(M.loss(0,0),35/3);close(M.loss(2,1),0);const g=M.gradient(0,0);close(g[0],-26/3);close(g[1],-6);
for(const [w,b] of [[0,0],[1,-2],[3,1]]){const e=1e-5,g=M.gradient(w,b);close(g[0],(M.loss(w+e,b)-M.loss(w-e,b))/(2*e));close(g[1],(M.loss(w,b+e)-M.loss(w,b-e))/(2*e));}
let w=0,b=0;for(let i=0;i<1000;i++){const g=M.gradient(w,b);w-=.1*g[0];b-=.1*g[1];}close(w,2);close(b,1);
close(M.sigmoid(0),.5);close(M.sigmoid(-1000),0);close(M.sigmoid(1000),1);
for(const x of [[1,2],[-1,3],[0,0]])for(const z of [[2,1],[-3,1]])close(M.dot(M.feature(x),M.feature(z)),M.dot(x,z)**2);
const m=M.metrics(.5);assert.deepEqual([m.tp,m.fp,m.tn,m.fn],[2,1,2,1]);assert.equal(M.metrics(1).precision,null);close(M.qkernel(0,Math.PI),0);close(M.qkernel(1,1),1);
console.log('PASS: independent finite-difference regression gradients, convergence, stable sigmoid, threshold edge cases, explicit polynomial kernel and ideal state overlap.');
