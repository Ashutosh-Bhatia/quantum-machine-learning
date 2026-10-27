/* Shared classical model; all vectors use declared column order (0,1). */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.ClassicalMath = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  function probability(x) {
    if (!Number.isFinite(x) || x < 0 || x > 1) throw new RangeError('A probability must be between 0 and 1.');
    return x;
  }
  function distribution(p) {
    if (!Array.isArray(p) || p.length < 1 || p.some(x => !Number.isFinite(x) || x < 0) || Math.abs(p.reduce((a,b)=>a+b,0)-1)>1e-10) throw new RangeError('Use a nonnegative distribution summing to one.');
    return p;
  }
  function matrix(M) {
    if (!Array.isArray(M) || !M.length || !Array.isArray(M[0]) || !M[0].length) throw new RangeError('Use a rectangular matrix.');
    const width=M[0].length;
    if(M.some(row=>!Array.isArray(row)||row.length!==width||row.some(x=>!Number.isFinite(x)||x<0))) throw new RangeError('Use a nonnegative rectangular matrix.');
    for(let j=0;j<width;j++) if(Math.abs(M.reduce((s,row)=>s+row[j],0)-1)>1e-10) throw new RangeError('Each input column must sum to one.');
    return M;
  }
  function matVec(M,p) {
    matrix(M);distribution(p);
    if(M[0].length!==p.length) throw new RangeError('Matrix input dimension does not match the distribution.');
    return M.map(row=>row.reduce((sum,x,j)=>sum+x*p[j],0));
  }
  function matMul(B,A) {
    matrix(B);matrix(A);
    if(B[0].length!==A.length) throw new RangeError('Intermediate dimensions do not match.');
    return B.map(row=>A[0].map((_,j)=>row.reduce((sum,x,k)=>sum+x*A[k][j],0)));
  }
  function operation(name,error=.25) {
    if(name==='identity')return [[1,0],[0,1]];
    if(name==='flip')return [[0,1],[1,0]];
    if(name==='reset0')return [[1,1],[0,0]];
    if(name==='reset1')return [[0,0],[1,1]];
    if(name==='random'){probability(error);return [[1-error,error],[error,1-error]];}
    if(name==='asymmetric')return [[1,.5],[0,.5]];
    throw new RangeError('Unknown operation.');
  }
  function sampleBit(pOne,N,rng=Math.random) {
    probability(pOne);
    if(!Number.isInteger(N)||N<1||N>10000) throw new RangeError('Choose a whole number of trials between 1 and 10,000.');
    let one=0;
    for(let i=0;i<N;i++) {
      const r=rng();if(!Number.isFinite(r)||r<0||r>=1)throw new RangeError('Random draws must lie in [0,1).');
      if(r<pOne)one++;
    }
    return [N-one,one];
  }
  function bitsFor(d){if(!Number.isInteger(d)||d<1)throw new RangeError('Use at least one state.');return Math.ceil(Math.log2(d));}
  return {probability,distribution,matrix,matVec,matMul,operation,sampleBit,bitsFor};
});
