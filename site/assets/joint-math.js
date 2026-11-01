/* Two-qubit ideal model: |AB>, ordered 00,01,10,11; A is the left factor. */
(function(root,factory){const node=typeof module==='object'&&module.exports,api=factory(node?require('./math-foundations.js'):root.MathFoundations,node?require('./gate-math.js'):root.GateMath);if(node)module.exports=api;else root.JointMath=api;})(typeof globalThis!=='undefined'?globalThis:this,function(M,G){
 const z=M.z;
 function tensor(A,B){return A.flatMap(row=>B.map(r=>row.flatMap(a=>r.map(b=>M.mul(a,b)))));}
 function valid(v){if(!Array.isArray(v)||v.length!==4||Math.abs(M.norm(v)-1)>1e-10)throw new RangeError('Use a normalized four-entry state.');}
 function local(v,A,B){valid(v);return M.apply(tensor(A,B),v);}
 function cx(v){valid(v);return [v[0],v[1],v[3],v[2]];}
 function family(theta,phi=0){if(!Number.isFinite(theta)||!Number.isFinite(phi))throw new RangeError('Use finite angles.');const c=theta===Math.PI/2?0:theta===Math.PI/4?Math.SQRT1_2:Math.cos(theta),s=theta===0?0:theta===Math.PI/4?Math.SQRT1_2:Math.sin(theta);return [z(c),z(0),z(0),z(s*Math.cos(phi),s*Math.sin(phi))];}
 const readout=b=>b==='Z'?G.matrix('I'):b==='X'?G.matrix('H'):b==='Y'?M.product(G.matrix('H'),M.adjoint(G.matrix('S'))):(()=>{throw new RangeError('Choose X, Y or Z');})();
 function probabilities(v,a='Z',b='Z'){return local(v,readout(a),readout(b)).map(M.abs2);}
 function marginals(p){return {A:[p[0]+p[1],p[2]+p[3]],B:[p[0]+p[2],p[1]+p[3]]};}
 function determinant(v){valid(v);const a=M.mul(v[0],v[3]),b=M.mul(v[1],v[2]);return z(a.r-b.r,a.i-b.i);}
 function branch(v,which,basis,outcome){valid(v);if(!['A','B'].includes(which)||![0,1].includes(outcome))throw new RangeError('Choose subsystem A/B and outcome 0/1.');const w=local(v,which==='A'?readout(basis):G.matrix('I'),which==='B'?readout(basis):G.matrix('I')),idx=which==='A'?[outcome*2,outcome*2+1]:[outcome,outcome+2],raw=idx.map(i=>w[i]),p=raw.reduce((s,a)=>s+M.abs2(a),0);return {p,raw,state:p===0?null:raw.map(a=>z(a.r/Math.sqrt(p),a.i/Math.sqrt(p)))};}
 function mixture(basis){const zero=[z(1),z(0),z(0),z(0)],one=[z(0),z(0),z(0),z(1)],a=probabilities(zero,basis,basis),b=probabilities(one,basis,basis);return a.map((x,i)=>(x+b[i])/2);}
 return {tensor,local,cx,family,probabilities,marginals,determinant,branch,mixture};
});
