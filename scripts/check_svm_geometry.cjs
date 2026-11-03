const assert=require('node:assert/strict'),S=require('../site/assets/svm-geometry');const near=(x,y)=>assert.ok(Math.abs(x-y)<1e-8);
const best=S.model(.25,.25);near(best.gap,0);near(best.dual,.5);near(best.width,2);best.margins.forEach(x=>near(x,1));
for(let i=0;i<=20;i++)for(let j=0;j<=20;j++){const a=i/20,b=j/20,m=S.model(a,b,.3);near(m.equality,0);assert.ok(m.dual<=.5+1e-10);assert.ok(m.gap>=-1e-10);const w=[0,0];S.points.forEach((p,k)=>p.forEach((x,d)=>w[d]+=m.alpha[k]*S.labels[k]*x));w.forEach((x,d)=>near(x,m.w[d]));}
assert.equal(S.model(0,0).width,null);
for(let d=1;d<=8;d++)for(const l of [0,.01,1]){const m=S.polynomial(d,l);assert.ok(m.weights.every(Number.isFinite));assert.ok(m.train>=0&&m.reference>=0);}
console.log('PASS: alpha feasibility, reconstructed normal, duality gap, known optimum, zero-normal handling and polynomial solves.');
