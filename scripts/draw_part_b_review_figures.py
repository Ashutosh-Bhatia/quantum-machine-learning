"""Additional original academic figures for the Part B reading sequence."""
from pathlib import Path
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle
out=Path(__file__).resolve().parents[1]/'site/figures/part-b'
plt.rcParams.update({'font.size':11,'svg.fonttype':'none','axes.spines.top':False,'axes.spines.right':False})
def save(fig,name):
    fig.tight_layout();p=out/(name+'.svg')
    fig.savefig(p,bbox_inches='tight',metadata={'Creator':'Original course figure'})
    p.write_text('\n'.join(x.rstrip() for x in p.read_text().splitlines())+'\n');plt.close(fig)
fig,ax=plt.subplots(figsize=(10,4))
colors=['#dbe9f3','#e8e8e8','#f3e5dc']
for i,(title,body) in enumerate([
 ('Training','Fit scaler + model\non these examples'),
 ('Validation','Compare settings using\ntraining-fitted transforms'),
 ('Test','Evaluate the selected\nprocedure after choices')]):
    ax.add_patch(Rectangle((i*3.3,1.2),3,1.6,fc=colors[i],ec='#627385'))
    ax.text(i*3.3+1.5,2.35,title,ha='center',weight='bold')
    ax.text(i*3.3+1.5,1.8,body,ha='center',va='center')
ax.annotate('Choose settings; refit on development data',xy=(1.5,.85),xytext=(6.2,.25),ha='center',arrowprops={'arrowstyle':'->','color':'#627385'})
ax.set(xlim=(-.2,10),ylim=(-.15,3.1));ax.axis('off')
fig.text(.5,.015,'Cross-validation repeats the training/validation roles within development data; the test set stays separate.',ha='center',fontsize=10)
save(fig,'ml-evaluation-protocol')
fig,axs=plt.subplots(1,3,figsize=(10,3.3));t=np.linspace(-4,4,200)
for ax,y,title in zip(axs,[np.maximum(0,t),1/(1+np.exp(-t)),np.tanh(t)],['ReLU: hidden activation','Sigmoid: output probability map','tanh: hidden activation']):
    ax.axhline(0,c='#ccc',lw=1);ax.axvline(0,c='#ccc',lw=1);ax.plot(t,y,c='#286a9b',lw=2);ax.set(xlabel='Preactivation',ylabel='Output',title=title)
save(fig,'ml-activations')
fig,axs=plt.subplots(1,2,figsize=(9,3.8));X=np.array([[1,0],[0,1],[1,1]]);K=(X@X.T)**2
axs[0].axhline(0,c='#ddd');axs[0].axvline(0,c='#ddd')
for i,(x,y) in enumerate(X):
    axs[0].annotate('',xy=(x,y),xytext=(0,0),arrowprops={'arrowstyle':'->','color':'#286a9b','lw':2})
    axs[0].text(x+.05,y+.05,f'x{i+1} = ({x},{y})')
axs[0].set(xlim=(-.2,1.85),ylim=(-.2,1.45),xlabel='First coordinate',ylabel='Second coordinate',title='Three input examples')
axs[1].imshow(K,cmap='Blues',vmin=0,vmax=4)
for i in range(3):
    for j in range(3):axs[1].text(j,i,str(K[i,j]),ha='center',va='center',color='white' if K[i,j]>2 else '#222',fontsize=16)
axs[1].set(xticks=range(3),yticks=range(3),xticklabels=['x1','x2','x3'],yticklabels=['x1','x2','x3'],title='Kij = (xi · xj)²')
save(fig,'ml-gram-worked')
