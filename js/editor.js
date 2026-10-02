(()=>{
'use strict';
const LET='ABCD',DRAFT='soe_editor_draft',$=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let D=null,view='form',snap,tt=0,rawBase='';

/* ---------- data ---------- */
const blankQ=()=>({q:'',o:['','','',''],a:-1,r:'',x:''});
const blankSet=()=>[{q:'PRACTICE: Pindutin ang BLUE (B).',o:['Pula','Asul','Dilaw','Lila'],a:1,r:'',x:''}].concat(Array.from({length:25},blankQ));
function norm(arr){
  const cut=[];
  const out=arr.map((it,i)=>{
    it=it&&typeof it==='object'&&!Array.isArray(it)?it:{};
    const o=Array.isArray(it.o)?it.o.map(v=>String(v==null?'':v)):[];
    if(o.length>4)cut.push(i);
    while(o.length<4)o.push('');
    return Object.assign({},it,{q:String(it.q==null?'':it.q),o:o.slice(0,4),a:Number.isInteger(it.a)&&it.a>=0&&it.a<4?it.a:-1,r:String(it.r==null?'':it.r),x:String(it.x==null?'':it.x)});
  });
  return{out,cut};
}
function ser(it){
  const{q,o,a,r,x,...rest}=it,res={q:q.trim(),o:o.map(t=>t.trim()),a};
  if(r.trim())res.r=r.trim();
  if(x.trim())res.x=x.trim();
  return Object.assign(res,rest);
}
const out=()=>D.map(ser);
const mark=()=>{snap=JSON.stringify(D)};
function undo(){if(snap===undefined)return;D=JSON.parse(snap);snap=undefined;render();toast('Na-undo ang huling pagbabago.')}

function toast(msg,o={}){
  const t=$('toast');
  t.className='toast'+(o.err?' err':'');
  t.innerHTML='<span>'+esc(msg)+'</span>'+(o.undo?'<button data-act="undo">I-undo</button>':'');
  t.hidden=false;clearTimeout(tt);tt=setTimeout(()=>{t.hidden=true},o.err?9000:6500);
}

/* ---------- render ---------- */
function card(it,i){
  const acts=i
    ?`<div class="acts"><button data-act="up" title="Itaas" ${i<2?'disabled':''}>↑</button><button data-act="down" title="Ibaba" ${i>=D.length-1?'disabled':''}>↓</button><button data-act="dup">Kopyahin</button><button data-act="ins">Magdagdag sa ibaba</button><button data-act="del" class="danger">Burahin</button></div>`
    :`<div class="acts"><button data-act="ins">Magdagdag sa ibaba</button></div>`;
  const opts=it.o.map((t,k)=>`<div class="opt"><input type="radio" name="a${i}" id="a${i}_${k}" value="${k}" data-f="a" ${it.a===k?'checked':''}><label class="lt" for="a${i}_${k}" title="Itakda bilang tamang sagot">${LET[k]}</label><input type="text" data-f="o${k}" value="${esc(t)}" aria-label="Choice ${LET[k]}" placeholder="Choice ${LET[k]}"></div>`).join('');
  return `<article class="card" data-i="${i}" id="c${i}"><header><h2>${i?'Question '+i:'Practice'}${i?'':' <small>hindi binibilang sa score</small>'}</h2>${acts}</header><ul class="msgs"></ul>
<label class="fl" for="q${i}">Tanong</label><textarea id="q${i}" data-f="q" rows="2">${esc(it.q)}</textarea>
<div class="ops">${opts}</div>
<div class="two"><div><label class="fl" for="r${i}">Bible reference</label><input type="text" id="r${i}" data-f="r" value="${esc(it.r)}" placeholder="hal. 2 Timoteo 2:2"></div>
<div><label class="fl" for="x${i}">Paliwanag (lalabas sa projector pagkatapos ng reveal)</label><textarea id="x${i}" data-f="x" rows="2">${esc(it.x)}</textarea></div></div></article>`;
}
function render(){
  $('empty').hidden=!!D;$('work').hidden=!D;$('savegrp').hidden=!D;$('statgrp').hidden=!D;
  if(D)$('list').innerHTML=D.map(card).join('');
  $('undo').disabled=snap===undefined;
  paint();
}
function paint(){
  if(!D)return;
  const a=out(),{E,W}=qCheck(a),eb={},wb={};
  E.forEach(x=>eb[x.i]=1);W.forEach(x=>wb[x.i]=1);
  document.querySelectorAll('.card').forEach(c=>{
    const i=+c.dataset.i;
    c.classList.toggle('bad',!!eb[i]);c.classList.toggle('meh',!eb[i]&&!!wb[i]);
    c.querySelector('.msgs').innerHTML=E.filter(x=>x.i===i).map(x=>`<li class="e">${esc(x.m)}</li>`).join('')+W.filter(x=>x.i===i).map(x=>`<li class="w">${esc(x.m)}</li>`).join('');
  });
  $('count').textContent=`${a.length} items (kailangan: 26)`;
  const cnt=[0,0,0,0];a.forEach((it,i)=>{if(i>0&&it.a>=0&&it.a<4)cnt[it.a]++});
  const mx=Math.max(1,...cnt);
  $('dist').innerHTML=cnt.map((n,k)=>`<div style="--c:var(--c${k})"><b>${LET[k]}</b><i style="width:${Math.round(n/mx*100)}%"></i><span>${n}</span></div>`).join('');
  $('grid').innerHTML=D.map((it,i)=>`<button class="sq${eb[i]?' bad':wb[i]?' meh':''}" data-go="${i}" title="${qLabel(i)}" style="--c:${it.a>=0?'var(--c'+it.a+')':'var(--mu)'}"><b>${i?i:'P'}</b><i>${it.a>=0?LET[it.a]:'?'}</i></button>`).join('');
  const all=E.map(x=>({...x,k:'e'})).concat(W.map(x=>({...x,k:'w'})));
  $('issues').innerHTML=all.length
    ?all.slice(0,12).map(x=>`<li><button class="${x.k}" data-go="${x.i}">${esc(qMsg(x))}</button></li>`).join('')+(all.length>12?`<li class="more">…at ${all.length-12} pa</li>`:'')
    :'<li class="none">Walang nakitang problema.</li>';
  try{localStorage.setItem(DRAFT,JSON.stringify(D))}catch(e){}
}
function go(i){
  if(view!=='form'&&!showView('form'))return;
  const c=i<0?null:$('c'+i);
  if(!c){window.scrollTo(0,0);return}
  c.scrollIntoView({block:'center'});
  const f=c.querySelector('[data-f=q]');f&&f.focus({preventScroll:true});
}

/* ---------- raw view ---------- */
function rawText(){return JSON.stringify(out(),null,2)}
function applyRaw(){
  const t=$('raw').value;
  if(t===rawBase)return true;
  let a;
  try{a=JSON.parse(t.replace(/^\uFEFF/,''))}catch(e){$('rawerr').textContent='Sira ang JSON: '+e.message;return false}
  if(!Array.isArray(a)){$('rawerr').textContent='Dapat listahan (array) ng mga tanong ang JSON.';return false}
  mark();D=norm(a).out;render();
  $('raw').value=rawBase=rawText();$('rawerr').textContent='';
  return true;
}
function showView(v){
  if(v==='form'&&view==='raw'&&!applyRaw())return false;
  view=v;
  $('formview').hidden=v!=='form';$('rawview').hidden=v!=='raw';
  $('tab-form').setAttribute('aria-selected',v==='form');$('tab-raw').setAttribute('aria-selected',v==='raw');
  if(v==='raw'){$('raw').value=rawBase=rawText();$('rawerr').textContent=''}
  return true;
}

/* ---------- load / save ---------- */
function load(text,src){
  let a;
  try{a=JSON.parse(String(text).replace(/^\uFEFF/,''))}catch(e){toast('Sira ang JSON: '+e.message,{err:1});return}
  if(!Array.isArray(a)){toast('Dapat listahan (array) ng mga tanong ang JSON file.',{err:1});return}
  mark();const r=norm(a);D=r.out;
  if(view==='raw')showView('raw');
  render();window.scrollTo(0,0);
  toast('Nabuksan: '+src+' ('+D.length+' items).'+(r.cut.length?' Pinutol sa 4 ang choices sa '+r.cut.map(qLabel).join(', ')+'.':''),{undo:1});
}
function ready(){return view!=='raw'||applyRaw()}
function openFile(){$('file').click()}
function fromHost(){
  let t=null;try{t=localStorage.getItem('soe_q')}catch(e){}
  if(!t){toast('Walang naka-install na tanong sa browser na ito. Buksan ang JSON file.',{err:1});return}
  load(t,'tanong na naka-install sa Host');
}
function newSet(){mark();D=blankSet();if(view==='raw')showView('raw');render();window.scrollTo(0,0);toast('Bagong set: 1 practice + 25 blangkong tanong.',{undo:1})}

$('file').onchange=()=>{
  const f=$('file').files[0];$('file').value='';if(!f)return;
  const r=new FileReader();r.onload=()=>load(r.result,f.name);r.readAsText(f);
};
['open','open2'].forEach(id=>$(id).onclick=openFile);
['fromhost','fromhost2'].forEach(id=>$(id).onclick=fromHost);
['blank','blank2'].forEach(id=>$(id).onclick=newSet);

$('dl').onclick=()=>{
  if(!D||!ready())return;
  const{E}=qCheck(out());
  if(E.length&&!confirm('May '+E.length+' error pa sa mga tanong (hindi ito tatanggapin ng Host). I-download pa rin?'))return;
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([JSON.stringify(out(),null,2)],{type:'application/json'}));
  a.download='questions.json';document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(a.href),1500);
  toast('Na-download ang questions.json.');
};
$('send').onclick=()=>{
  if(!D||!ready())return;
  const{E}=qCheck(out());
  if(E.length){toast('May '+E.length+' error — ayusin muna bago ipadala sa Host.',{err:1});return}
  try{localStorage.setItem('soe_q_edit',JSON.stringify(out()))}catch(e){toast('Hindi maipadala: puno o bawal ang browser storage.',{err:1});return}
  toast('Naipadala. Sa Controller (index.html), pindutin ang REINSTALL FROM EDITOR.');
};

/* ---------- events ---------- */
$('list').addEventListener('input',e=>{
  const el=e.target,c=el.closest('.card'),f=el.dataset.f;
  if(!c||!f)return;
  const i=+c.dataset.i;
  if(f==='a')D[i].a=+el.value;else if(f[0]==='o')D[i].o[+f[1]]=el.value;else D[i][f]=el.value;
  paint();
});
$('list').addEventListener('click',e=>{
  const b=e.target.closest('[data-act]');
  if(!b||b.disabled)return;
  const i=+b.closest('.card').dataset.i,a=b.dataset.act;
  if(a==='up'||a==='down'){
    const j=a==='up'?i-1:i+1;
    if(j<1||j>=D.length)return;
    [D[i],D[j]]=[D[j],D[i]];render();go(j);
  }else if(a==='dup'){
    mark();D.splice(i+1,0,JSON.parse(JSON.stringify(D[i])));render();go(i+1);toast('Nakopya ang Q'+i+' bilang Q'+(i+1)+'.',{undo:1});
  }else if(a==='ins'){
    mark();D.splice(i+1,0,blankQ());render();go(i+1);toast('Nadagdag ang Q'+(i+1)+'.',{undo:1});
  }else if(a==='del'){
    mark();D.splice(i,1);render();toast('Binura ang Q'+i+'.',{undo:1});
  }
});
$('add').onclick=()=>{mark();D.push(blankQ());render();go(D.length-1);toast('Nadagdag ang Q'+(D.length-1)+'.',{undo:1})};
document.addEventListener('click',e=>{
  const g=e.target.closest('[data-go]');if(g){go(+g.dataset.go);return}
  if(e.target.closest('[data-act=undo]'))undo();
});
$('tab-form').onclick=()=>showView('form');
$('tab-raw').onclick=()=>showView('raw');
$('applyraw').onclick=()=>{if(applyRaw())toast('Na-apply ang JSON.')};

/* ---------- start: ibalik ang huling draft ---------- */
try{
  const d=localStorage.getItem(DRAFT);
  if(d){const a=JSON.parse(d);if(Array.isArray(a)&&a.length){D=norm(a).out;toast('Naibalik ang huling draft sa browser na ito.')}}
}catch(e){}
render();
})();
