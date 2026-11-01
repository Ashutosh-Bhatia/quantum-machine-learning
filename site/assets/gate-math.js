/* Ideal one-qubit gate model. Angles are radians; time-order sequences act left to right. */
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./math-foundations.js'):root.MathFoundations);if(typeof module==='object'&&module.exports)module.exports=api;else root.GateMath=api;})(typeof globalThis!=='undefined'?globalThis:this,function(M){
 'use strict';const z=M.z,exp=t=>z(Math.cos(t),Math.sin(t));
 function matrix(name,angle=0){if(!Number.isFinite(angle))throw new RangeError('Use a finite angle in radians.');const c=Math.cos(angle/2),s=Math.sin(angle/2),r=Math.SQRT1_2;
 const gates={I:[[z(1),z(0)],[z(0),z(1)]],X:[[z(0),z(1)],[z(1),z(0)]],Y:[[z(0),z(0,-1)],[z(0,1),z(0)]],Z:[[z(1),z(0)],[z(0),z(-1)]],H:[[z(r),z(r)],[z(r),z(-r)]],S:[[z(1),z(0)],[z(0),z(0,1)]],T:[[z(1),z(0)],[z(0),exp(Math.PI/4)]],P:[[z(1),z(0)],[z(0),exp(angle)]],Rx:[[z(c),z(0,-s)],[z(0,-s),z(c)]],Ry:[[z(c),z(-s)],[z(s),z(c)]],Rz:[[exp(-angle/2),z(0)],[z(0),exp(angle/2)]]};if(!gates[name])throw new RangeError('Unknown gate.');return gates[name];}
 function run(v,steps){return steps.reduce((state,g)=>M.apply(matrix(g.name,g.angle),state),v);}
 function probabilities(v,basis='Z'){if(basis==='X')v=run(v,[{name:'H'}]);else if(basis==='Y')v=M.apply(M.product(matrix('H'),M.adjoint(matrix('S'))),v);else if(basis!=='Z')throw new RangeError('Choose X, Y or Z readout.');return v.map(M.abs2);}
 function equivalent(u,v){return Math.abs(M.abs2(M.inner(u,v))-1)<1e-10;}
 return {matrix,run,probabilities,equivalent};
});
