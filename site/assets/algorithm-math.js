/* Signed Hadamard sums and ideal Deutsch/Deutsch-Jozsa query comparisons. */
(function(root,factory){const node=typeof module==='object'&&module.exports,api=factory(node?require('./oracle-math.js'):root.OracleMath,node?require('./math-foundations.js'):root.MathFoundations);if(node)module.exports=api;else root.AlgorithmMath=api;})(typeof globalThis!=='undefined'?globalThis:this,function(O,M){
 function valid(f){if(!Array.isArray(f)||f.length<2||f.length>256||(f.length&(f.length-1))||!f.every(x=>x===0||x===1))throw new RangeError('Use a Boolean truth table of power-of-two length from 2 to 256.');}
 function parity(x){let p=0;while(x){p^=x&1;x>>=1;}return p;}
 function classify(f){valid(f);const r=f.reduce((a,b)=>a+b);return r===0||r===f.length?'constant':r===f.length/2?'balanced':'outside promise';}
 function contributions(f,outcome){valid(f);if(!Number.isInteger(outcome)||outcome<0||outcome>=f.length)throw new RangeError('Choose an output label in range.');return f.map((b,x)=>((b^parity(x&outcome))?-1:1)/f.length);}
 function amplitudes(f){valid(f);return f.map((_,z)=>contributions(f,z).reduce((a,b)=>a+b,0));}
 function probabilities(f){return amplitudes(f).map(x=>x*x);}
 function stage(f,s){if(![2,4].includes(f.length)||![0,1,2,3].includes(s))throw new RangeError('Use 1/2 input qubits and circuit stage 0–3.');valid(f);if(s===0)return Array.from({length:f.length*2},(_,i)=>M.z(i===1?1:0));const v=O.uniform(f,'minus');if(s===1)return v;const w=O.apply(v,f);return s===2?w:O.inputH(w);}
 function costs(n,k){if(!Number.isInteger(n)||n<1||n>20||!Number.isInteger(k)||k<1||k>100)throw new RangeError('Use n=1–20 and k=1–100.');const N=2**n;let without=k>N?null:k>N/2?0:2;if(without!==null&&without!==0)for(let i=0;i<k;i++)without*=(N/2-i)/(N-i);return {N,exact:N/2+1,quantum:1,withReplacement:2**(1-k),withoutReplacement:without};}
 return {classify,contributions,amplitudes,probabilities,stage,costs};
});
