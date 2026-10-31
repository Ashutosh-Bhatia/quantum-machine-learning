/* Ideal pure-qubit preparations and projective measurements; no hardware or noise. */
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./math-foundations.js'):root.MathFoundations);if(typeof module==='object'&&module.exports)module.exports=api;else root.QubitMath=api;})(typeof globalThis!=='undefined'?globalThis:this,function(M){
 'use strict';const z=M.z,r=Math.SQRT1_2;
 const bases={Z:[[z(1),z(0)],[z(0),z(1)]],X:[[z(r),z(r)],[z(r),z(-r)]]};
 function check(v){if(!Array.isArray(v)||v.length!==2)throw new RangeError('Use exactly two complex amplitudes.');v.forEach(a=>z(a.r,a.i));return v;}
 function valid(v){check(v);return Math.abs(M.norm(v)-1)<1e-10;}
 function requireState(v){if(!valid(v))throw new RangeError('Normalize the nonzero state before measuring.');}
 function preset(name){const states={zero:[z(1),z(0)],one:[z(0),z(1)],plus:[z(r),z(r)],minus:[z(r),z(-r)],plusi:[z(r),z(0,r)],complex:[z(1/3,2/3),z(-2/3)],biased:[z(Math.sqrt(3)/2),z(0,.5)],raw:[z(1),z(0,1)]};if(!states[name])throw new RangeError('Unknown preparation.');return states[name];}
 function normalize(v){check(v);return M.normalize(v);}
 function basis(name){if(!bases[name])throw new RangeError('Choose Z or X.');return bases[name];}
 const clamp=p=>Math.max(0,Math.min(1,p));
 function probabilities(v,name='Z'){requireState(v);return basis(name).map(b=>clamp(M.abs2(M.inner(b,v))));}
 function branch(v,name,outcome){requireState(v);if(outcome!==0&&outcome!==1)throw new RangeError('Choose outcome index 0 or 1.');const b=basis(name)[outcome],a=M.inner(b,v),raw=b.map(t=>M.mul(t,a)),p=clamp(M.abs2(a));return {raw,p,state:p===0?null:raw.map(t=>z(t.r/Math.sqrt(p),t.i/Math.sqrt(p)))};}
 function trial(v,name='Z',rng=Math.random){const p=probabilities(v,name),draw=rng();if(!Number.isFinite(draw)||draw<0||draw>=1)throw new RangeError('Random draws must be in [0,1).');const outcome=draw<p[0]?0:1;return {outcome,...branch(v,name,outcome)};}
 function sample(v,name,n,rng=Math.random){if(!Number.isInteger(n)||n<1||n>10000)throw new RangeError('Choose 1 to 10000 fresh shots.');const p=probabilities(v,name),counts=[0,0];for(let i=0;i<n;i++){const t=rng();if(t<0||t>=1||!Number.isFinite(t))throw new RangeError('Random draws must be in [0,1).');counts[t<p[0]?0:1]++;}return counts;}
 function phase(degrees){const d=((degrees%360)+360)%360;if(d===0)return z(1);if(d===90)return z(0,1);if(d===180)return z(-1);if(d===270)return z(0,-1);const t=d*Math.PI/180;return z(Math.cos(t),Math.sin(t));}
 function global(v,degrees){check(v);if(!Number.isFinite(degrees))throw new RangeError('Use a finite angle.');const g=phase(degrees);return v.map(a=>M.mul(g,a));}
 function angles(theta,phi){if(!Number.isFinite(theta)||theta<0||theta>180||!Number.isFinite(phi))throw new RangeError('Use polar angle 0–180° and finite phase.');const t=theta*Math.PI/180,a=theta===180?0:theta===90?r:Math.cos(t/2),b=theta===0?0:theta===90?r:Math.sin(t/2);return [z(a),M.mul(z(b),phase(phi))];}
 function bloch(v){requireState(v);const ab=M.mul(M.conj(v[0]),v[1]);return {x:2*ab.r,y:2*ab.i,z:M.abs2(v[0])-M.abs2(v[1])};}
 function ensemble(name,b){if(name==='plus')return probabilities(preset('plus'),b);if(name==='random')return [0,1].map(j=>(probabilities(preset('zero'),b)[j]+probabilities(preset('one'),b)[j])/2);throw new RangeError('Unknown preparation procedure.');}
 return {preset,valid,normalize,probabilities,branch,trial,sample,global,angles,bloch,ensemble};
});
