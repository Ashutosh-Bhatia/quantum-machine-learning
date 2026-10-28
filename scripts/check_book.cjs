const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const Q=require('../site/assets/opening-math.js'),katex=require('../site/assets/vendor/katex/katex.min.js');
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,a+' != '+b);
for(let theta=0;theta<=180;theta+=15)for(let phi=-180;phi<=180;phi+=30){
 const q=Q.qubit(theta,phi);
 close(q.alpha*q.alpha+q.betaReal*q.betaReal+q.betaImag*q.betaImag,1);
 close(q.x*q.x+q.y*q.y+q.z*q.z,1);
 close(q.afterHOne,((q.alpha-q.betaReal)**2+q.betaImag**2)/2);
 close(q.zOne,q.betaReal**2+q.betaImag**2);
 const point=Q.projection(q.x,q.y,q.z);assert.ok(Math.hypot(point.x-150,point.y-140)<=95+1e-8);
}
close(Q.qubit(90,0).zOne,.5);close(Q.qubit(90,180).zOne,.5);
close(Q.qubit(90,0).afterHOne,0);close(Q.qubit(90,180).afterHOne,1);
assert.throws(()=>Q.qubit(-1,0));assert.throws(()=>Q.qubit(181,0));assert.throws(()=>Q.qubit(90,NaN));assert.throws(()=>Q.qubit(90,181));
// Independent amplitude calculation for the figure's Bell/classical-mixture comparison.
const H=[[1,1],[1,-1]].map(r=>r.map(x=>x/Math.sqrt(2)));
const HH=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>H[Math.floor(i/2)][Math.floor(j/2)]*H[i%2][j%2]));
const act=v=>HH.map(row=>row.reduce((sum,x,j)=>sum+x*v[j],0));
const bell=act([1/Math.sqrt(2),0,0,1/Math.sqrt(2)]);close(bell[0]**2+bell[3]**2,1);
const first=act([1,0,0,0]),second=act([0,0,0,1]);
close((first[0]**2+first[3]**2+second[0]**2+second[3]**2)/2,.5);
const context={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../site/course-data.js'),'utf8'),context);
const c=context.window.COURSE;
assert.equal(c.preface.id,'preface');assert.equal(c.chapters[0].number,1);assert.equal(c.chapters[1].number,2);
const pages=[c.preface,...c.chapters,...c.lessons],ids=pages.map(p=>p.id);
assert.equal(new Set(ids).size,ids.length);assert.equal(c.readingOrder.length,pages.length);
assert.deepEqual([...c.readingOrder].sort(),[...ids].sort());
assert.deepEqual(Array.from(c.lessons,p=>p.number),['2.1','2.2','2.3','2.4','3.1','3.2','3.3','3.4','3.5','3.6','3.7']);
assert.ok(c.legacyLessons.some(p=>p.id==='gates'));
let equations=0,figures=0;
for(const p of pages){
 for(const match of p.body.matchAll(/\\\[([\s\S]*?)\\\]|\\\(([\s\S]*?)\\\)/g)){
  const tex=(match[1]??match[2]).replaceAll('&lt;','<').replaceAll('&gt;','>').replaceAll('&amp;','&');
  katex.renderToString(tex,{throwOnError:true,displayMode:match[1]!==undefined,strict:'error'});equations++;
 }
 for(const m of p.body.matchAll(/<img[^>]+src="([^"]+)"/g)){assert.ok(fs.existsSync(path.join(__dirname,'../site',m[1])));figures++;}
}
assert.equal(pages.flatMap(p=>p.quizzes||[]).length,27);
for(let bits=0;bits<16;bits++){const a=Array.from({length:4},(_,i)=>(bits>>i)&1);assert.ok(Q.chsh(...a).classical<=.75);}
close(Q.chsh(0,0,0,0).classical,.75);close(Q.chsh(0,0,0,0).quantum,(2+Math.sqrt(2))/4);close(Q.chsh(0,0,0,0,0).quantum,.5);close(Q.chsh(0,0,0,0,1/Math.sqrt(2)).quantum,.75);
for(const p of pages)assert.ok(!/instructor.review|draft for|review edition|Dr\. Ashutosh/i.test(p.body));
const sectionIds=[...c.chapters[0].body.matchAll(/<section id="([^"]+)"/g)].map(m=>m[1]);
for(const id of ['applications','history','abstraction','chsh','evolution','evaluation'])assert.ok(sectionIds.includes(id));
assert.equal(fs.readdirSync(path.join(__dirname,'../site/figures/book-opening')).filter(x=>x.endsWith('.svg')).length,12);
console.log('PASS: pure-qubit amplitudes, H probabilities, projected geometry, Bell/mixture comparison, reading order, stable IDs, '+equations+' math expressions and '+figures+' embedded figures.');
