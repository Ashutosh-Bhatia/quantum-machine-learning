(function(root,factory){const a=factory();if(typeof module==='object'&&module.exports)module.exports=a;else root.SVMGeometry=a;})(typeof globalThis!=='undefined'?globalThis:this,function(){
 const points=[[-1,-1],[-1,1],[1,-1],[1,1]],labels=[-1,-1,1,1];
 function model(a,b,bias=0){const alpha=[a,b,b,a],w=[2*(a+b),2*(a-b)],norm=Math.hypot(...w),margins=points.map((p,i)=>labels[i]*(w[0]*p[0]+w[1]*p[1]+bias)),hinge=margins.map(m=>Math.max(0,1-m)),dual=2*(a+b)-.5*norm**2,primal=.5*norm**2+hinge.reduce((x,y)=>x+y,0);return {alpha,w,norm,margins,hinge,dual,primal,gap:primal-dual,width:norm?2/norm:null,equality:alpha.reduce((s,x,i)=>s+x*labels[i],0)};}
 function polynomial(degree,lambda){
 const xs=Array.from({length:9},(_,i)=>-1+i/4),ys=xs.map((x,i)=>Math.sin(3*x)+[.18,-.14,.22,-.19,.08,.2,-.18,.12,-.1][i]);
 const rows=xs.map(x=>Array.from({length:degree+1},(_,k)=>x**k)),n=degree+1,A=Array.from({length:n},(_,i)=>Array.from({length:n+1},(_,j)=>j===n?rows.reduce((s,r,k)=>s+r[i]*ys[k],0):rows.reduce((s,r)=>s+r[i]*r[j],0)+(i===j&&i>0?lambda:0)));
 for(let i=0;i<n;i++){let k=i;for(let j=i+1;j<n;j++)if(Math.abs(A[j][i])>Math.abs(A[k][i]))k=j;[A[k],A[i]]=[A[i],A[k]];const d=A[i][i];for(let j=i;j<=n;j++)A[i][j]/=d;for(let k=0;k<n;k++)if(k!==i){const t=A[k][i];for(let j=i;j<=n;j++)A[k][j]-=t*A[i][j];}}
 const weights=A.map(r=>r[n]),predict=x=>weights.reduce((s,w,k)=>s+w*x**k,0),train=xs.reduce((s,x,i)=>s+(predict(x)-ys[i])**2,0)/xs.length,ref=Array.from({length:81},(_,i)=>-1+i/40),reference=ref.reduce((s,x)=>s+(predict(x)-Math.sin(3*x))**2,0)/ref.length;return {xs,ys,weights,predict,train,reference};
 }
 return {points,labels,model,polynomial};
});
