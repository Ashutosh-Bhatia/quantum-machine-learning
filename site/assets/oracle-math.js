/* Boolean XOR oracles. |x,y> has integer index 2*x+y; target is the low bit. */
(function(root,factory){const node=typeof module==='object'&&module.exports,api=factory(node?require('./math-foundations.js'):root.MathFoundations);if(node)module.exports=api;else root.OracleMath=api;})(typeof globalThis!=='undefined'?globalThis:this,function(M){
 const z=M.z;
 function truth(f){if(!Array.isArray(f)||![2,4].includes(f.length)||!f.every(v=>v===0||v===1))throw new RangeError('Use a 2- or 4-entry Boolean truth table.');}
 function index(x,y,n){if(![1,2].includes(n)||!Number.isInteger(x)||x<0||x>=2**n||![0,1].includes(y))throw new RangeError('Invalid input label.');return 2*x+y;}
 function transitions(f){truth(f);return Array.from({length:2*f.length},(_,k)=>2*Math.floor(k/2)+((k%2)^f[Math.floor(k/2)]));}
 function apply(v,f){const perm=transitions(f);if(!Array.isArray(v)||v.length!==perm.length||Math.abs(M.norm(v)-1)>1e-10)throw new RangeError('Use a normalized state matching the oracle dimensions.');const out=perm.map(()=>z(0));perm.forEach((to,from)=>out[to]=v[from]);return out;}
 function uniform(f,target='zero'){truth(f);const r=Math.SQRT1_2,t=target==='zero'?[z(1),z(0)]:target==='minus'?[z(r),z(-r)]:target==='plus'?[z(r),z(r)]:null;if(!t)throw new RangeError('Choose zero, plus or minus target.');return M.tensor(f.map(()=>z(1/Math.sqrt(f.length))),t);}
 function inputH(v){if(![4,8].includes(v.length))throw new RangeError('Use one or two input qubits and a target.');const m=v.length/2;return Array.from({length:v.length},(_,k)=>{const x=Math.floor(k/2),y=k%2;return Array.from({length:m},(_,j)=>{let bits=x&j,parity=0;while(bits){parity^=bits&1;bits>>=1;}const a=v[2*j+y],s=(parity?-1:1)/Math.sqrt(m);return z(a.r*s,a.i*s);}).reduce(M.add,z(0));});}
 function marginal(v){const p=v.map(M.abs2);return Array.from({length:p.length/2},(_,x)=>p[2*x]+p[2*x+1]);}
 return {index,transitions,apply,uniform,inputH,marginal};
});
