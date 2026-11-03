"""Original academic concept figures; replace the earlier schematic box sequences."""
from pathlib import Path
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
O=Path(__file__).resolve().parents[1]/'site/figures/part-b';O.mkdir(exist_ok=True)
plt.rcParams.update({'font.size':11,'svg.fonttype':'none','axes.spines.top':False,'axes.spines.right':False})
def save(fig,name):fig.tight_layout();fig.savefig(O/(name+'.svg'),bbox_inches='tight',metadata={'Creator':'Original course figure'});p=O/(name+'.svg');p.write_text('\n'.join(line.rstrip() for line in p.read_text().splitlines())+'\n');plt.close(fig)
f,ax=plt.subplots(1,2,figsize=(9,3));img=np.array([[0,1],[1,0]]);ax[0].imshow(img,cmap='gray',vmin=0,vmax=1);ax[0].set_title('A 2×2 grayscale image');ax[0].set_xticks([0,1]);ax[0].set_yticks([0,1]);ax[1].imshow(img.reshape(1,4),cmap='gray',vmin=0,vmax=1);ax[1].set_xticks(range(4),['x₁ = 0','x₂ = 1','x₃ = 1','x₄ = 0']);ax[1].set_yticks([]);ax[1].set_title('Same pixels, row-major feature vector');save(f,'ml-data')
x=np.array([0,1,2]);y=np.array([1,3,5]);xx=np.linspace(-.1,2.1,100)
for name in ['ml-objective','ml-linear']:
 f,ax=plt.subplots(1,2,figsize=(9,3.5));ax[0].scatter(x,y,label='Training observations');ax[0].plot(xx,.8*xx+.6,label='Current prediction');ax[0].vlines(x,.8*x+.6,y,color='#a34c32',linestyles='dashed',label='Residuals');ax[0].set(xlabel='x',ylabel='y');ax[0].legend(fontsize=9)
 if name=='ml-linear':ax[1].plot(xx,2*xx+1,label='Least-squares fit');ax[1].scatter(x,y);ax[1].set(xlabel='x',ylabel='y',title='Reference: w=2, b=1');ax[1].legend()
 else:
  w=np.linspace(-1,4,200);L=np.mean((w[:,None]*x+.6-y)**2,axis=1);ax[1].plot(w,L);ax[1].set(xlabel='Slope w (b fixed at 0.6)',ylabel='MSE',title='One slice through the loss surface')
 save(f,name)
f,ax=plt.subplots(figsize=(8,3.5));t=np.linspace(0,1,100);ax.plot(t,.08+.7*np.exp(-5*t),label='Training error (illustrative)');ax.plot(t,.18+1.8*(t-.45)**2,label='Validation error (illustrative)');ax.axvline(.45,ls=':',c='gray');ax.set(xlabel='Increasing model flexibility',ylabel='Prediction error',title='Training fit and held-out prediction are different questions');ax.legend();save(f,'ml-evaluation')
f,ax=plt.subplots(figsize=(9,4));layers=[[.25,.5,.75],[.12,.37,.63,.88],[.35,.65]]
for layer in range(2):
 for a in layers[layer]:
  for b in layers[layer+1]:ax.plot([layer,layer+1],[a,b],c='#b5bec5',lw=1,zorder=0)
for k,ys in enumerate(layers):
 ax.scatter([k]*len(ys),ys,s=650,facecolor='white',edgecolor='#286a9b',zorder=2)
 for j,y in enumerate(ys):ax.text(k,y,['x','h','a'][k]+str(j+1),ha='center',va='center')
 ax.text(k,1.04,['Input features','Nonlinear hidden layer','Output scores'][k],ha='center')
ax.annotate('Forward: predictions',xy=(2,-.04),xytext=(0,-.04),arrowprops={'arrowstyle':'->'},ha='center');ax.annotate('Backward: chain-rule gradients',xy=(0,-.2),xytext=(1.8,-.2),arrowprops={'arrowstyle':'->'},ha='center');ax.set(xlim=(-.4,2.4),ylim=(-.3,1.15));ax.axis('off');save(f,'ml-neural')
f,ax=plt.subplots(1,2,figsize=(9,3.5));l=np.linspace(0,6,100);w=2/(1+l);ax[0].plot(l,w);ax[0].set(xlabel='Penalty λ',ylabel='Optimal w',title='Shrinkage: w*=2/(1+λ)');ax[1].plot(l,(w-2)**2,label='Unpenalized fit term');ax[1].plot(l,l*w*w,label='Penalty term');ax[1].set(xlabel='Penalty λ',ylabel='Contribution to objective');ax[1].legend();save(f,'ml-regularization')
f=plt.figure(figsize=(10,4));ax=f.add_subplot(121);az=f.add_subplot(122,projection='3d');t=np.linspace(0,2*np.pi,24,endpoint=False)
for r,c in [(.65,'#286a9b'),(1.55,'#a34c32')]:
 a=r*np.cos(t);b=r*np.sin(t);z=1.5-a*a-b*b;ax.scatter(a,b,c=c);az.scatter(a,b,z,c=c)
g=np.linspace(-1.6,1.6,4);A,B=np.meshgrid(g,g);az.plot_surface(A,B,np.zeros_like(A),alpha=.15,color='gray');ax.set(xlabel='x₁',ylabel='x₂',title='Input: no separating straight line',aspect='equal');az.set(xlabel='x₁',ylabel='x₂',zlabel='1.5 − r²',title='Lift: a separating plane');save(f,'ml-features')
f,ax=plt.subplots(figsize=(8,4));ax.scatter([-1,-1],[-1,1],s=70,c='#a34c32',label='−1 class');ax.scatter([1,1],[-1,1],s=70,c='#286a9b',label='+1 class');ax.scatter([-1,-1,1,1],[-1,1,-1,1],s=260,facecolor='none',edgecolor='#555',label='Support vectors: α=1/4');ax.axvline(0,c='#222',label='Score 0');ax.axvline(-1,c='#888',ls='--');ax.axvline(1,c='#888',ls='--');ax.annotate('',xy=(1,0),xytext=(-1,0),arrowprops={'arrowstyle':'<->'});ax.text(0,.15,'width = 2/||w|| = 2',ha='center');ax.set(xlim=(-2,2),ylim=(-1.8,1.8),xlabel='x₁',ylabel='x₂',title='Maximum-margin solution for the four-point example');ax.legend(loc='upper left',fontsize=8);save(f,'ml-svm')
f,ax=plt.subplots(1,2,figsize=(9,3.5));a=np.linspace(-np.pi,np.pi,60);K=np.cos((a[:,None]-a[None,:])/2)**2;im=ax[0].imshow(K,origin='lower',extent=[-np.pi,np.pi,-np.pi,np.pi],vmin=0,vmax=1,cmap='Blues');ax[0].set(xlabel='Angle z',ylabel='Angle x',title='Ideal Ry fidelity Gram geometry');f.colorbar(im,ax=ax[0]);ax[1].plot(a,np.cos(a/2)**2);ax[1].set(xlabel='Angle difference',ylabel='Fidelity kernel',title='Similarity is periodic, not raw distance');save(f,'ml-comparison')
