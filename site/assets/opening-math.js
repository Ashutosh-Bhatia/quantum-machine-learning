/* Ideal pure-qubit calculations used by the introductory phase experiment. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.OpeningMath=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const clamp=x=>Math.max(0,Math.min(1,x));
 function qubit(thetaDegrees,phiDegrees){
  if(!Number.isFinite(thetaDegrees)||thetaDegrees<0||thetaDegrees>180)throw new RangeError('Use a polar angle from 0 to 180 degrees.');
  if(!Number.isFinite(phiDegrees)||phiDegrees< -180||phiDegrees>180)throw new RangeError('Use a relative phase from −180 to 180 degrees.');
  const t=thetaDegrees*Math.PI/180,p=phiDegrees*Math.PI/180;
  const alpha=Math.cos(t/2),betaReal=Math.sin(t/2)*Math.cos(p),betaImag=Math.sin(t/2)*Math.sin(p);
  const x=Math.sin(t)*Math.cos(p),y=Math.sin(t)*Math.sin(p),z=Math.cos(t);
  return {alpha,betaReal,betaImag,x,y,z,zOne:clamp((1-z)/2),afterHOne:clamp((1-x)/2)};
 }
 function projection(x,y,z){
  if([x,y,z].some(v=>!Number.isFinite(v)))throw new RangeError('Use finite Bloch coordinates.');
  const a=Math.PI/4,e=Math.PI/9;
  return {x:150+95*(-Math.sin(a)*x+Math.cos(a)*y),y:140-95*(-Math.cos(a)*Math.sin(e)*x-Math.sin(a)*Math.sin(e)*y+Math.cos(e)*z)};
 }
 function chsh(a0,a1,b0,b1,visibility=1){
  if([a0,a1,b0,b1].some(v=>v!==0&&v!==1)||!Number.isFinite(visibility)||visibility<0||visibility>1)throw new RangeError('Use bit answers and visibility between zero and one.');
  const a=[a0,a1],b=[b0,b1];
  const rows=[0,1].flatMap(x=>[0,1].map(y=>({x,y,a:a[x],b:b[y],win:(a[x]^b[y])===(x&y)})));
  return {rows,classical:rows.filter(r=>r.win).length/4,quantum:.5+visibility*Math.SQRT2/4};
 }
 return {qubit,projection,chsh};
});
