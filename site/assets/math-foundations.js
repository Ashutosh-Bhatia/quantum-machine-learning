/* Small complex linear-algebra model for the Chapter 3 experiments. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.MathFoundations=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const z=(r,i=0)=>{if(!Number.isFinite(r)||!Number.isFinite(i))throw new RangeError('Use finite complex entries.');return {r,i};};
 const add=(a,b)=>z(a.r+b.r,a.i+b.i),mul=(a,b)=>z(a.r*b.r-a.i*b.i,a.r*b.i+a.i*b.r),conj=a=>z(a.r,-a.i),abs2=a=>a.r*a.r+a.i*a.i;
 function vec(v){if(!Array.isArray(v)||!v.length)throw new RangeError('Use a nonempty vector.');v.forEach(a=>z(a.r,a.i));}
 function inner(u,v){vec(u);vec(v);if(u.length!==v.length)throw new RangeError('Inner-product dimensions must match.');return u.reduce((s,a,j)=>add(s,mul(conj(a),v[j])),z(0));}
 const norm=v=>Math.sqrt(inner(v,v).r);
 function normalize(v){const n=norm(v);if(n===0)throw new RangeError('The zero vector cannot be normalized.');return v.map(a=>z(a.r/n,a.i/n));}
 function outer(u,v){vec(u);vec(v);return u.map(a=>v.map(b=>mul(a,conj(b))));}
 function tensor(u,v){vec(u);vec(v);return u.flatMap(a=>v.map(b=>mul(a,b)));}
 function shape(A){if(!Array.isArray(A)||!A.length||!Array.isArray(A[0])||!A[0].length)throw new RangeError('Use a nonempty matrix.');const n=A[0].length;A.forEach(r=>{vec(r);if(r.length!==n)throw new RangeError('Matrix rows must have equal lengths.');});return [A.length,n];}
 function adjoint(A){const [m,n]=shape(A);return Array.from({length:n},(_,j)=>Array.from({length:m},(_,i)=>conj(A[i][j])));}
 function apply(A,v){const [,n]=shape(A);vec(v);if(n!==v.length)throw new RangeError('Matrix and vector dimensions do not match.');return A.map(r=>r.reduce((s,a,j)=>add(s,mul(a,v[j])),z(0)));}
 function product(A,B){const [m,n]=shape(A),[p,q]=shape(B);if(n!==p)throw new RangeError('Matrix dimensions do not match.');return Array.from({length:m},(_,i)=>Array.from({length:q},(_,j)=>A[i].reduce((s,a,k)=>add(s,mul(a,B[k][j])),z(0))));}
 function unitary(A,tol=1e-10){const [m,n]=shape(A);if(m!==n)return false;const C=product(adjoint(A),A);return C.every((r,i)=>r.every((a,j)=>Math.hypot(a.r-(i===j?1:0),a.i)<tol));}
 return {z,add,mul,conj,abs2,inner,norm,normalize,outer,tensor,adjoint,apply,product,unitary};
});
