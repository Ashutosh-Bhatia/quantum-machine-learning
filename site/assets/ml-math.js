(function(root,factory){const a=factory();if(typeof module==='object'&&module.exports)module.exports=a;else root.MLMath=a;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 const data=[[0,1],[1,3],[2,5]];
 function loss(w,b){return data.reduce((s,[x,y])=>s+(w*x+b-y)**2,0)/data.length;}
 function gradient(w,b){return [2*data.reduce((s,[x,y])=>s+(w*x+b-y)*x,0)/3,2*data.reduce((s,[x,y])=>s+w*x+b-y,0)/3];}
 const sigmoid=x=>x>=0?1/(1+Math.exp(-x)):Math.exp(x)/(1+Math.exp(x));
 function metrics(threshold){const p=[.9,.8,.6,.4,.3,.1],y=[1,0,1,1,0,0];let tp=0,fp=0,tn=0,fn=0;p.forEach((v,i)=>{if(v>=threshold)y[i]?tp++:fp++;else y[i]?fn++:tn++;});return {tp,fp,tn,fn,accuracy:(tp+tn)/6,precision:tp+fp?tp/(tp+fp):null,recall:tp+fn?tp/(tp+fn):null};}
 const feature=x=>[x[0]**2,Math.SQRT2*x[0]*x[1],x[1]**2],dot=(x,z)=>x.reduce((s,v,i)=>s+v*z[i],0),qkernel=(x,z)=>Math.cos((x-z)/2)**2;
 return {data,loss,gradient,sigmoid,metrics,feature,dot,qkernel};
});
