'use strict';
const course=window.COURSE;
const coreLessons=course.lessons;
const pages=[course.preface,...course.chapters,...coreLessons];
const $=s=>document.querySelector(s);
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pageById=id=>pages.find(p=>p.id===id);
const chapterFor=l=>course.chapters.find(ch=>ch.id===l.chapter_id);
let saved={};try{const stored=JSON.parse(localStorage.getItem('qml-chapter1-checks-v1')||'{}');if(stored&&typeof stored==='object'&&!Array.isArray(stored))saved=stored;}catch{}
let activeRoute=null;
function progress(){const checks=pages.flatMap(p=>p.quizzes||[]);$('#progress').textContent=checks.filter(q=>saved[q.id]).length+' of '+checks.length+' concept checks answered correctly · saved in this browser. This is a study aid, not a mastery score.';}
function math(scope){if(window.renderMathInElement)window.renderMathInElement(scope,{delimiters:[{left:'\\[',right:'\\]',display:true},{left:'\\(',right:'\\)',display:false}],throwOnError:false,strict:'warn',trust:false});}
function notebook(l){
 if(!l.notebook)return '';
 const classical=l.notebook_kind==='classical',mathematics=l.notebook_kind==='mathematics';
 return '<section class="notebook" id="programming"><h2>'+(classical||mathematics?'Programming companion · Python and NumPy':'Programming companion · Qiskit')+'</h2><p>'+(mathematics?'Use Python and NumPy to reproduce the complex arithmetic, inner products, projectors, unitary checks and tensor expansions in Chapter 3. No hardware account is required.':classical?'The companion follows Chapter 2’s switch, envelope, joint-probability and operation examples: predict, calculate by hand, run and explain. It uses Python and NumPy; Qiskit enters with quantum circuits. Written explanations do not depend on running it.':'Run an ideal quantum simulation and compare it with your predictions. No hardware account is required.')+'</p><a href="https://colab.research.google.com/github/Ashutosh-Bhatia/quantum-machine-learning/blob/main/notebooks/'+l.notebook+'" target="_blank" rel="noopener">Open in Google Colab ↗</a> · <a download href="notebooks/'+l.notebook+'">Download notebook ↓</a><p class="meta">In Colab choose Runtime → Run all. The setup cell installs the notebook’s Python dependencies.</p></section>';
}
function navLink(p,route,label,sub=false){return '<a href="#'+p.id+'" class="'+(route===p.id?'active':'')+' '+(sub?'nav-lesson':'')+'" '+(route===p.id?'aria-current="page"':'')+'>'+label+'</a>';}
function nav(route){
 let html=navLink(course.preface,route,'Preface · About this book')+'<p class="nav-heading">Part A · Quantum computing foundations</p>';
 for(const ch of course.chapters){
  html+=navLink(ch,route,'<span>Chapter '+ch.number+'</span> '+ch.title);
  for(const id of ch.lessons){const l=pageById(id);html+=navLink(l,route,'<span>Lesson '+l.number+'</span> '+l.title,true);}
 }
 $('#nav').innerHTML=html;
}
function mountQuizzes(page){
 for(const q of page.quizzes||[]){
  const host=$('#lesson').querySelector('[data-quiz="'+q.id+'"]');
  host.innerHTML='<section class="quiz"><p class="eyebrow">Check your reasoning</p><form><fieldset><legend>'+escapeHTML(q.question)+'</legend>'+q.options.map((o,i)=>'<label><input type="radio" name="answer" value="'+i+'" required> '+escapeHTML(o)+'</label>').join('')+'</fieldset><button type="submit">Check answer</button></form><p class="feedback" role="status"></p></section>';
  host.querySelector('form').addEventListener('submit',e=>{e.preventDefault();const index=Number(new FormData(e.target).get('answer'));host.querySelector('.feedback').textContent=q.feedback[index];if(index===q.answer){saved[q.id]=true;try{localStorage.setItem('qml-chapter1-checks-v1',JSON.stringify(saved));}catch{}progress();}});
 }
}
function toc(route){$('#toc').innerHTML=[...$('#lesson').querySelectorAll('section[id]>h2')].map(h=>'<a href="#'+route+'/'+h.parentElement.id+'">'+escapeHTML(h.textContent)+'</a>').join('')||'<p class="meta">Read the explanation and follow its examples.</p>';}
function shortLabel(p){return p.id===course.preface.id?'Preface':p.number?(p.chapter_id?'Lesson ':'Chapter ')+p.number:p.title;}
function pagination(page){
 const i=course.readingOrder.indexOf(page.id),prev=pageById(course.readingOrder[i-1]),next=pageById(course.readingOrder[i+1]);
 return '<nav class="lesson-pagination" aria-label="Previous and next page">'+(prev?'<a href="#'+prev.id+'">← '+shortLabel(prev)+'</a>':'<span></span>')+(next?'<a href="#'+next.id+'">'+shortLabel(next)+' →</a>':'<a href="#'+course.preface.id+'">Return to the Preface →</a>')+'</nav>'+(!next?'<p class="meta">Next planned: Part A, Chapter 4 · Qubits and measurement. Later material is not published yet.</p>':'');
}
function legacyMarkup(l){return '<p class="eyebrow">Earlier prototype archive</p><h1>'+l.title+'</h1><p class="review-note">These additional examples are outside the book’s main reading sequence.</p>'+l.body+'<div id="lab"></div><section class="quiz"><h2>'+l.quiz.question+'</h2><form id="legacy-quiz"><fieldset><legend>Choose one answer</legend>'+l.quiz.options.map((o,i)=>'<label><input type="radio" name="answer" value="'+i+'" required> '+o+'</label>').join('')+'</fieldset><button>Check answer</button></form><p class="feedback" id="legacy-feedback" role="status"></p></section><h2>Practice</h2><p>'+l.exercise+'</p><details><summary>Reveal a hint / worked answer</summary><p>'+l.solution+'</p></details>'+notebook(l);}
function render(route){
 const page=pageById(route),legacy=course.legacyLessons.find(l=>l.id===route);nav(route);
 if(page){
  const parent=chapterFor(page),preface=page.id===course.preface.id;
  const label=parent?'<p class="breadcrumb"><a href="#'+parent.id+'">Chapter '+parent.number+'</a> / Lesson '+page.number+'</p>':'<p class="eyebrow">'+(preface?'Quantum Machine Learning · Preface':page.part+' · Chapter '+page.number)+'</p>';
  const goals=page.objectives?'<details class="learning-goals"><summary>Learning goals and prerequisites</summary><ul>'+page.objectives.map(o=>'<li>'+o+'</li>').join('')+'</ul><p>'+page.prerequisites+'</p></details>':'';
  $('#lesson').innerHTML=label+'<h1>'+page.title+'</h1>'+(preface?'<p class="book-author">By Ashutosh Bhatia</p>':'')+goals+page.body+notebook(page)+pagination(page);
  mountQuizzes(page);window.mountClassicalLabs($('#lesson'));window.mountOpeningLabs($('#lesson'));window.mountMathLabs($('#lesson'));
 }else{
  $('#lesson').innerHTML=legacyMarkup(legacy);$('#legacy-quiz').onsubmit=e=>{e.preventDefault();const i=Number(new FormData(e.target).get('answer'));$('#legacy-feedback').textContent=(i===legacy.quiz.answer?'Correct. ':'Try again. ')+legacy.quiz.explanation;};if(legacy.lab==='bloch')bloch();if(legacy.lab==='classifier')classifier();
 }
 document.title=(page?page.title:legacy.title)+' · Quantum Machine Learning';
 math($('#lesson'));toc(route);progress();activeRoute=route;
}
function route(initial=false){
 let parts;try{parts=decodeURIComponent(location.hash.slice(1)).split('/');}catch{parts=[];}
 const target=parts[0]||course.preface.id;
 if(target==='roadmap'){if(!activeRoute)render(course.preface.id);$('#roadmap-details').open=true;$('#roadmap').scrollIntoView();return;}
 const resolved=pageById(target)||course.legacyLessons.some(l=>l.id===target)?target:course.preface.id;
 if(resolved!==activeRoute){render(resolved);if(window.matchMedia('(max-width: 900px)').matches){$('#course-menu').open=false;$('#outline-menu').open=false;}if(!initial){$('#lesson').focus({preventScroll:true});window.scrollTo({top:0,behavior:'auto'});}}
 if(parts[1]){const el=$('#lesson').querySelector('[id="'+CSS.escape(parts[1])+'"]');if(el)el.scrollIntoView({behavior:'auto'});}
}
$('#planned').innerHTML=course.planned.map(p=>'<li><strong>'+p.title+'</strong> <span class="meta">· planned</span><p>'+p.needs+'</p></li>').join('');
if(window.matchMedia('(max-width: 900px)').matches){$('#course-menu').open=false;$('#outline-menu').open=false;}
document.querySelector('.skip').addEventListener('click',e=>{e.preventDefault();$('#lesson').focus();$('#lesson').scrollIntoView();});
window.addEventListener('hashchange',()=>route());route(true);
function bloch(){
 $('#lab').innerHTML=`<section class="lab"><h3>Pure-state explorer</h3><div class="lab-grid"><svg viewBox="0 0 300 280" role="img" aria-label="Projected Bloch sphere; exact coordinates are shown alongside"><circle cx="150" cy="140" r="95" fill="#fff" stroke="#aaa"/><ellipse cx="150" cy="140" rx="95" ry="32" fill="none" stroke="#ccc"/><path d="M45 140H255 M150 245V35 M80 180L220 100" stroke="#ccc"/><text x="155" y="30">z · |0⟩</text><text x="258" y="145">x</text><text x="222" y="95">y</text><text x="155" y="265">|1⟩</text><line id="vector" x1="150" y1="140" stroke="#286a9b" stroke-width="5"/><circle id="tip" r="6" fill="#286a9b"/></svg><div class="controls"><label>Polar angle θ <input id="theta" type="range" min="0" max="180" value="90" step="1"></label><label>Relative phase φ <input id="phi" type="range" min="0" max="360" value="0" step="1"></label><output id="coords"></output><p id="probabilities"></p><label>Z-basis P(1)</label><div class="meter"><div id="zbar"></div></div><label>X-basis P(+)</label><div class="meter"><div id="xbar"></div></div></div></div><button id="reset" class="secondary">Reset to |+⟩</button></section>`;
 function update(){const t=Number($('#theta').value)*Math.PI/180,p=Number($('#phi').value)*Math.PI/180;const x=Math.sin(t)*Math.cos(p),y=Math.sin(t)*Math.sin(p),z=Math.cos(t);const px=150+88*x+50*y,py=140-88*z-28*y;$('#vector').setAttribute('x2',px);$('#vector').setAttribute('y2',py);$('#tip').setAttribute('cx',px);$('#tip').setAttribute('cy',py);$('#coords').textContent=`θ=${$('#theta').value}°, φ=${$('#phi').value}° · (x,y,z)=(${x.toFixed(2)}, ${y.toFixed(2)}, ${z.toFixed(2)})`;$('#probabilities').textContent=`P_Z(1)=${((1-z)/2).toFixed(3)} · P_X(+)=${((1+x)/2).toFixed(3)}`;$('#zbar').style.width=`${50*(1-z)}%`;$('#xbar').style.width=`${50*(1+x)}%`;}
 $('#theta').oninput=update;$('#phi').oninput=update;$('#reset').onclick=()=>{$('#theta').value=90;$('#phi').value=0;update()};update();
}
function classifier(){
 $('#lab').innerHTML=`<section class="lab controls"><h3>One-qubit prediction lab</h3><p>|0⟩ → Rᵧ(x) → Rᵧ(w) → measure</p><label>Feature x (radians)<input id="feature" type="range" min="-3.141593" max="3.141593" step="any" value="0"></label><label>Weight w (radians)<input id="weight" type="range" min="-3.141593" max="3.141593" step="any" value="0"></label><output id="prediction"></output><div class="meter"><div id="predbar"></div></div><p>Ideal probabilities, without shot noise.</p></section>`;
 function update(){const x=Number($('#feature').value),w=Number($('#weight').value),p=Math.sin((x+w)/2)**2;$('#prediction').textContent=`x=${x.toFixed(2)}, w=${w.toFixed(2)} · P(1)=${p.toFixed(3)} · ⟨Z⟩=${(1-2*p).toFixed(3)}`;$('#predbar').style.width=`${100*p}%`;}
 $('#feature').oninput=update;$('#weight').oninput=update;update();
}
