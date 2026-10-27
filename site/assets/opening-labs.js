(function(){
 'use strict';
 const fmt=x=>Number(x.toFixed(4)).toString();
 function workflow(host){
  const stages=[
   {name:'1 · Encode data',title:'What is the input?',body:'Choose classical features x and specify how a circuit prepares a state from them. Preprocessing and state preparation have costs; they are part of the proposed method.'},
   {name:'2 · Apply circuit',title:'What can the model change?',body:'Apply a sequence of quantum gates. Adjustable parameters θ control some transformations. The circuit architecture and encoding together define the candidate model.'},
   {name:'3 · Measure',title:'What can we observe?',body:'Prepare and run the circuit repeatedly to estimate an output probability or expectation. One run gives a measurement record, not a list of all amplitudes. Finite samples introduce uncertainty.'},
   {name:'4 · Evaluate loss',title:'How does the output become a learning signal?',body:'Turn the estimate into a prediction and compare it with the training target using a specified classical loss. Keep evaluation data separate from training choices.'},
   {name:'5 · Update parameters',title:'What closes the loop?',body:'A classical optimizer uses loss or gradient estimates to propose new θ. One update may require many circuit evaluations. Repeat the process, then evaluate the fitted model against an appropriate classical baseline.'}
  ];
  host.innerHTML='<section class="lab"><p class="eyebrow">Explore the workflow</p><h3>Where does the quantum component fit?</h3><p>Select a stage and follow its role in the learning process. This is a conceptual walkthrough, not a model-training simulation.</p><div class="workflow-steps" role="group" aria-label="Stages of a quantum learning workflow">'+stages.map((s,i)=>'<button type="button" data-stage="'+i+'" aria-pressed="'+(i===0)+'">'+s.name+'</button>').join('')+'</div><div data-workflow-result aria-live="polite"></div></section>';
  function update(i){host.querySelectorAll('[data-stage]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.stage)===i)));const s=stages[i];host.querySelector('[data-workflow-result]').innerHTML='<h4>'+s.title+'</h4><p>'+s.body+'</p>';}
  host.querySelectorAll('[data-stage]').forEach(b=>b.onclick=()=>update(Number(b.dataset.stage)));update(0);
 }
 function phase(host){
  host.innerHTML='<section class="lab"><p class="eyebrow">Predict, change, explain</p><h3>Keep the Z probabilities, change the relative phase</h3><p>Start with θ=90°. Change φ from 0° to 180°. Predict which probabilities stay fixed and which change after H. Then vary θ too.</p><div class="controls lab-grid"><label>Polar angle θ (degrees)<input data-theta type="range" min="0" max="180" step="1" value="90"></label><label>Relative phase φ (degrees)<input data-phi type="range" min="-180" max="180" step="1" value="0"></label></div><button type="button" data-plus>Set plus (90°, 0°)</button><button type="button" data-minus>Set minus (90°, 180°)</button><div class="phase-display"><svg viewBox="0 0 300 280" role="img" aria-label="Projected pure-qubit Bloch vector; exact model coordinates and probabilities appear alongside"><circle cx="150" cy="140" r="95" fill="white" stroke="#bbb"/><ellipse cx="150" cy="140" rx="95" ry="32.5" fill="none" stroke="#ccc"/><path d="M150 140L83 163M150 140L217 163M150 235V45" fill="none" stroke="#aaa"/><text x="55" y="183">x</text><text x="224" y="183">y</text><text x="155" y="36">z · |0⟩</text><text x="155" y="259">|1⟩</text><line data-vector x1="150" y1="140" stroke="#286a9b" stroke-width="4"/><circle data-tip r="5" fill="#286a9b"/></svg><div data-phase-result aria-live="polite"></div></div><details><summary>Why does the final H depend on phase?</summary><p>Its output-1 amplitude is (α − β)/√2. Squaring the magnitude gives P(1 after H) = (1 − x)/2, where x is the Bloch x-coordinate. At θ=90° this becomes (1 − cos φ)/2. The intermediate Z probability depends on θ alone.</p></details><p class="meta">Ideal pure-state model; exact probabilities rounded to four decimals. No shots or noise are simulated. This projected sphere omits global phase.</p></section>';
  const theta=host.querySelector('[data-theta]'),phi=host.querySelector('[data-phi]');
  function update(){
   const v=window.OpeningMath.qubit(Number(theta.value),Number(phi.value)),point=window.OpeningMath.projection(v.x,v.y,v.z);
   host.querySelector('[data-vector]').setAttribute('x2',point.x);host.querySelector('[data-vector]').setAttribute('y2',point.y);host.querySelector('[data-tip]').setAttribute('cx',point.x);host.querySelector('[data-tip]').setAttribute('cy',point.y);
   host.querySelector('[data-phase-result]').innerHTML='<p>θ = '+theta.value+'°; φ = '+phi.value+'°</p><p>α = '+fmt(v.alpha)+'<br>β = '+fmt(v.betaReal)+(v.betaImag<0?' − ':' + ')+fmt(Math.abs(v.betaImag))+'i</p><p>Bloch (x,y,z) = ('+[v.x,v.y,v.z].map(fmt).join(', ')+')</p><p><strong>Before H: P_Z(1) = '+fmt(v.zOne)+'</strong><br><strong>After H: P_Z(1) = '+fmt(v.afterHOne)+'</strong></p>';
  }
  theta.oninput=update;phi.oninput=update;host.querySelector('[data-plus]').onclick=()=>{theta.value=90;phi.value=0;update();};host.querySelector('[data-minus]').onclick=()=>{theta.value=90;phi.value=180;update();};update();
 }
 window.mountOpeningLabs=scope=>scope.querySelectorAll('[data-opening-lab]').forEach(host=>({workflow,phase}[host.dataset.openingLab]?.(host)));
})();
