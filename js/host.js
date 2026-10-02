const DUR=45000,HID='soe-bq-2026-host',L='ABCD',EM=['🟥','🟦','🟨','🟪'],A=document.getElementById('app');
const QF=Object.assign(document.createElement('input'),{type:'file',accept:'.json,application/json',hidden:true,onchange(){if(this.files[0])loadQ(this.files[0]);this.value=''}});document.body.appendChild(QF);
let Q=JSON.parse(localStorage.soe_q||'null'),S=Object.assign(fresh(),JSON.parse(localStorage.soe_s||'{}')),conns={},auds={},PR=new Set(),CO=new Set(),au=null,miss=false,warn=0,note='';S.rtime=Array.isArray(S.rtime)?S.rtime:Array(9).fill(0);S.rm=S.rm||{};S.done=Array.isArray(S.done)?S.done:[];
function fresh(){return{n:0,ph:'idle',sc:Array(9).fill(0),ans:{},tt:{},aa:{},ast:{},log:[],end:0,lb:false,fin:false,step:0,voids:[],done:[],au:false,own:{},aud:{},ban:{},ao:'proj',pin:String(1000+Math.floor(Math.random()*9000)),rtime:Array(9).fill(0),rm:{}}}
const pad=n=>String(n).padStart(2,'0'),q0=()=>Q&&Q[S.n],esc=s=>String(s).replace(/[&<>"]/g,c=>'&#'+c.charCodeAt(0)+';'),rem=()=>S.ao==='proj'&&PR.size>0,tell=m=>PR.forEach(c=>c.send(m));
const stopLocalAudio=()=>{if(au){au.pause();au.currentTime=0;au=null}};
const loc=n=>{stopLocalAudio();try{au=new Audio('assets/audio/sfx/'+n+'.wav');au.onended=()=>{au=null};au.onerror=()=>{au=null};au.play().catch(()=>{au=null})}catch(e){au=null}},sfx=n=>rem()?tell({t:'sfx',n}):loc(n);
const totalTime=(g,rt=S.rtime)=>Number(rt?.[g-1]||0);
const ranks=(sc,rt=S.rtime)=>sc.map((s,i)=>({g:i+1,s,tt:totalTime(i+1,rt)})).sort((a,b)=>b.s-a.s||a.tt-b.tt||a.g-b.g).map((x,i)=>({...x,r:i+1}));
function V(){const q=q0();return{ph:S.ph,n:S.n,au:S.au,q:q&&q.q,o:q&&q.o,end:S.end,c:S.ph==='reveal'&&q?q.a:-1,sc:S.sc,lb:S.lb,fin:S.fin,step:S.step,hide:S.n>20&&!S.fin,vd:S.voids.includes(S.n),cn:Object.keys(conns).map(Number),ac:Object.keys(auds).length,as:S.ast[S.n]||null,left:Math.max(0,S.end-Date.now()),rf:S.ph==='reveal'&&q?q.r||'':'',ex:S.ph==='reveal'&&q?q.x||'':'',ad:Object.keys(S.ans).map(Number),rm:S.rm[S.n]||{},rtime:S.rtime,topAud:Object.values(S.aud).sort((a,b)=>b.sc-a.sc||String(a.n).localeCompare(String(b.n))).slice(0,3).map(x=>({n:x.n,sc:x.sc})),ok:S.ph==='reveal'&&q?Object.keys(S.ans).filter(g=>S.ans[g]===q.a).map(Number):[]}}
function CV(){const q=q0();return Object.assign(V(),{a:q?q.a:-1,r:q?q.r||'':'',x:q?q.x||'':'',ans:S.ans,own:Object.keys(S.own).map(Number)})}
function sync(l){localStorage.soe_s=JSON.stringify(S);const v=V();PR.forEach(c=>c.send({t:'v',v}));if(CO.size){const cv=CV();CO.forEach(c=>c.send({t:'c',v:cv}))}if(!l){for(const g in conns)push(+g);for(const d in auds)pushA(d)}ui()}
const mk=(pick,sc)=>({t:'s',ph:S.ph==='idle'?'wait':S.ph,au:S.au,left:Math.max(0,S.end-Date.now()),pick,c:S.ph==='reveal'?q0().a:-1,sc});
function push(g,late){const c=conns[g];if(c&&c.open)c.send(late?{t:'late'}:mk(S.ans[g]??-1,S.sc[g-1]))}
function pushA(d,late){const c=auds[d];if(c&&c.open)c.send(late?{t:'late'}:mk(S.aa[d]??-1,(S.aud[d]||{}).sc||0))}
const acc=a=>S.ph==='run'&&Date.now()<S.end&&a>=0&&a<4;
function chk(){if(S.ph!=='run')return;const g=Object.keys(conns).filter(x=>conns[x]&&conns[x].open);if(g.length&&g.every(x=>S.ans[x]!==undefined))lock()}
function onAns(g,a){if(acc(a)&&S.ans[g]===undefined){S.ans[g]=a;S.tt[g]=((Date.now()-(S.end-DUR))/1000).toFixed(3);push(g);sync(1);chk()}else push(g,S.ans[g]===undefined)}
function onAAns(d,a){if(acc(a)&&S.aa[d]===undefined){S.aa[d]=a;pushA(d);sync(1)}else pushA(d,S.aa[d]===undefined)}
function dc(g){S.log.push([S.n,'EVENT','DISCONNECT G'+g,'','']);delete S.own[g];const c=conns[g];if(c){c.send({t:'kick'});setTimeout(()=>c.close(),300);delete conns[g]}sync();chk()}
function dca(d){S.ban[d]=1;delete S.aud[d];const c=auds[d];if(c){c.send({t:'kick'});setTimeout(()=>c.close(),300);delete auds[d]}sync()}
function pick(){QF.click()}
function setNote(m){note=m;ui();clearTimeout(setNote.t);setNote.t=setTimeout(()=>{note='';ui()},7000)}
function install(a,text,fromEd){
if(S.ph==='run'){alert('Tumatakbo pa ang timer. Hintayin munang matapos ang tanong bago mag-reinstall ng mga tanong.');return}
const{E,W}=qCheck(a);
if(E.length){alert('❌ Hindi na-install ang mga tanong:\n\n'+E.slice(0,8).map(x=>'• '+qMsg(x)).join('\n')+(E.length>8?'\n…at '+(E.length-8)+' pa':'')+(Q?'\n\nNananatili ang dating mga tanong.':''));return}
if(Q&&!confirm('Papalitan ang mga tanong ng '+a.length+' items'+(S.ph!=='idle'?'. Tuloy ang laro at hindi mabubura ang scores':'')+'. Magpatuloy?'))return;
Q=a;localStorage.soe_q=text;if(!fromEd)localStorage.removeItem('soe_q_edit');
setNote('✅ Na-install ang '+a.length+' items'+(W.length?' · ⚠ '+W.length+' babala (hal. '+qMsg(W[0])+')':''));sync()}
function loadQ(f){const r=new FileReader();r.onload=()=>{let a;try{a=JSON.parse(String(r.result).replace(/^\uFEFF/,''))}catch(e){alert('❌ Sira ang JSON file: '+e.message);return}install(a,JSON.stringify(a),0)};r.readAsText(f)}
function fromEd(){let a;try{a=JSON.parse(localStorage.soe_q_edit)}catch(e){alert('❌ Walang valid na tanong mula sa Editor.');return}install(a,localStorage.soe_q_edit,1)}
function reset(){const pin=S.pin,o=S.own,a=S.aud,ao=S.ao,b=S.ban;S=fresh();S.pin=pin;S.own=o;S.ao=ao;S.ban=b;for(const d in a)S.aud[d]={n:a[d].n,sc:0}}
function st(){reset();S.ph='ready';sfx('question_start');sync()}
function play(){stopLocalAudio();miss=false;S.au=true;if(rem())tell({t:'audio',n:'q'+pad(S.n)});else{au=new Audio(`assets/audio/q${pad(S.n)}.mp3`);au.onended=()=>{au=null;S.au=false;sync()};au.onerror=()=>{au=null;S.au=false;miss=true;sync()};au.play().catch(()=>{au=null;S.au=false;miss=true;sync()})}sync()}
function go30(){if(S.ph!=='ready')return;stopLocalAudio();rem()&&tell({t:'audio',n:null});S.au=false;S.ph='run';S.end=Date.now()+DUR;warn=0;sfx('timer_start');sync()}
function lock(){S.ph='locked';sfx('times_up');sync()}
function rev(){if(S.ph!=='locked')return;
const q=q0(),sc=S.n>0&&!S.voids.includes(S.n),before=S.sc.slice(),beforeR=ranks(before);
for(let g=1;g<=9;g++){
  const ok=S.ans[g]===q.a;
  const tm=Number(S.tt[g]||0);
  if(S.ans[g]!==undefined)S.rtime[g-1]+=tm;
  if(sc&&ok)S.sc[g-1]+=40;
  S.log.push([S.n,'G'+g,S.ans[g]===undefined?'NO ANSWER':L[S.ans[g]],S.tt[g]||'',ok?1:0]);
}
const afterR=ranks(S.sc),rm={};
for(const x of afterR){const old=beforeR.find(y=>y.g===x.g)?.r||x.r;rm[x.g]={from:old,to:x.r,delta:S.sc[x.g-1]-before[x.g-1]};}
S.rm[S.n]=rm;
let ok=0;for(const d in S.aud)if(S.aa[d]===q.a){ok++;if(sc)S.aud[d].sc+=40}
S.ast[S.n]=[ok,Math.max(ok,Object.keys(auds).length)];if(!S.done.includes(S.n))S.done.push(S.n);S.ph='reveal';sfx('correct');sync()}
function selectQ(n){n=Number(n);if(!Q||n<1||n>25||n>Q.length)return;if(S.done.includes(n)){setNote('🔒 Question '+n+' ay tapos na at hindi na maaaring piliin ulit.');return}if(S.ph==='run'){setNote('⏱️ Tumatakbo pa ang timer. Hintayin munang matapos ang kasalukuyang tanong.');return}S.n=n;S.ph='ready';S.ans={};S.tt={};S.aa={};delete S.ast[S.n];S.lb=false;miss=false;sfx('question_start');sync()}
function endQuiz(){if(S.ph==='run'){setNote('⏱️ Hindi maaaring i-End Quiz habang tumatakbo ang timer.');return}if(!confirm('End Quiz na? Ang kasalukuyang scores at completed questions ay gagamitin sa final results.'))return;const w=window.open('champion.html','_blank');S.fin=true;S.step=0;S.lb=false;sync();if(w)w.focus()}
function rq(){if(S.done.includes(S.n)){setNote('🔒 Question '+S.n+' ay tapos na at hindi na maaaring i-reset.');return}S.ph='ready';S.ans={};S.tt={};S.aa={};delete S.ast[S.n];sync()}
function vd(){if(!S.voids.includes(S.n))S.voids.push(S.n);sync()}
function nx(){const next=[...Array(Math.min(25,Q?.length||25))].map((_,i)=>i+1).find(n=>!S.done.includes(n)&&n>S.n)||[...Array(Math.min(25,Q?.length||25))].map((_,i)=>i+1).find(n=>!S.done.includes(n));if(!next){S.fin=true;S.step=0;sfx('drumroll')}else{S.n=next;S.ph='ready';S.ans={};S.tt={};S.aa={};S.lb=false;miss=false;sfx('question_start')}sync()}
function rk(){S.step++;if(S.step===9)sfx('winner');sync()}
function lbt(){S.lb=!S.lb;if(S.lb)sfx('leaderboard');sync()}
function ao(){S.ao=S.ao==='proj'?'host':'proj';sync()}
function ng(){if(confirm('Burahin ang scores at simulan ang bagong game?')){reset();miss=false;sync()}}
function csv(){const R=ranks(S.sc),t='Question,Group,Group Color,Leader,Answer,Seconds,Correct\n'+S.log.map(row=>{const g=Number(String(row[1]).replace('G','')),x=groupInfo(g);return [row[0],row[1],x?.name||'',x?.leader||'',row[2],row[3],row[4]].join(',')}).join('\\n')+'\\n\\nAudience correct (Question,Correct,Total)\\n'+Object.keys(S.ast).map(n=>[n,...S.ast[n]].join(',')).join('\\n')+'\\n\\nAudience,Score\\n'+Object.values(S.aud).map(x=>[x.n.replace(/,/g,' '),x.sc]).join('\\n')+'\\n\\nRank,Group,Group Color,Leader,Score,Total Answer Seconds\\n'+R.map(x=>{const g=groupInfo(x.g);return [x.r,g.code,g.name,g.leader,x.s,x.tt.toFixed(2)].join(',')}).join('\\n'),a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:'text/csv'}));a.download='soe-quiz-results.csv';a.click()}
function ui(){const q=q0(),ph=S.ph,B=(t,f,c='')=>`<button class="${c}" onclick="${f}">${t}</button>`;let b='';
const ED=localStorage.soe_q_edit;
const qNav=Q?`<section class="qnav"><div class="qnav-title">QUESTION NAVIGATION</div><div class="qnav-buttons">${[...Array(25)].map((_,i)=>{const n=i+1,done=S.done.includes(n),active=S.n===n&&!S.fin;return `<button class="qnav-btn ${done?'done':''} ${active?'active':''}" ${(!Q[n-1]||done||ph==='run'||S.fin||ph==='idle')?'disabled':''} onclick="selectQ(${n})">${n}</button>`}).join('')}</div><button class="end-quiz" ${(!Q||ph==='idle'||S.fin)?'disabled':''} onclick="endQuiz()">⛔ END QUIZ</button></section>`:'';
if(!Q)b+=B('LOAD QUESTIONS','pick()','blue');
else if(ph==='idle')b+=B('START GAME','st()','go');
else if(S.fin)b+=S.step<9?B('NEXT RANK','rk()','go'):'🏆 Tapos na ang laro';
else if(ph==='ready')b+=B('🔊 PLAY / REPLAY','play()')+B('🔥 TIMER STARTS NOW','go30()','go')+B('VOID','vd()');
else if(ph==='run')b+=B('RESET QUESTION','rq()');
else if(ph==='locked')b+=B('REVEAL ANSWER','rev()','go')+B('VOID','vd()')+B('RESET QUESTION','rq()');
else if(ph==='reveal')b+=B('LEADERBOARD','lbt()')+B(S.n<25?'NEXT QUESTION':'FINAL RESULTS','nx()','go');
b+=B('🔊 Audio: '+(S.ao==='proj'?'PROJECTOR':'LAPTOP'),'ao()')+B('EXPORT CSV','csv()')+B('NEW GAME','ng()')+(Q?B('🔄 REINSTALL QUESTIONS','pick()','blue'):'')+(ED&&ED!==localStorage.soe_q?B('📝 REINSTALL FROM EDITOR','fromEd()','blue'):'')+'<a class=lnk href=editor.html target=_blank rel=noopener>📝 QUESTION EDITOR</a>';
const chips=[...Array(9)].map((_,i)=>{const g=i+1,x=groupInfo(g);return `<div class="chip" style="border-color:${x.color};background:${x.color};color:${x.textColor}"><b>${x.code}</b> · ${x.name} · <span>${x.leader}</span> · ${conns[g]?'🟢':S.own[g]?'🟡':'🔴'} · ${S.sc[i]} pts · ${S.ans[g]!==undefined?EM[S.ans[g]]:'–'}${S.own[g]?`<button class=x onclick="dc(${g})">DISCONNECT</button>`:''}</div>`}).join('');
const ach=Object.keys(S.aud).map(d=>`<span class=chip>${esc(S.aud[d].n)} ${auds[d]?'🟢':'🔴'} ${S.aa[d]!==undefined?EM[S.aa[d]]:''} ${S.aud[d].sc}<button class=x onclick="dca('${d}')">✕</button></span>`).join(' ');
const as=S.ast[S.n];
const body=q&&!S.fin?`<h2>${S.n?'Question '+S.n+' / 25':'Practice (hindi binibilang)'} <span id=t></span></h2>${S.voids.includes(S.n)?'<p class=warn>VOID — walang puntos</p>':''}${miss?'<p class=warn>⚠ AUDIO PLACEHOLDER — basahin nang malakas ang tanong</p>':''}${S.ao==='proj'&&!PR.size?'<p class=warn>Walang nakakonektang projector — sa laptop tutunog ang audio.</p>':''}<p>${q.q}</p><ol type=A>${q.o.map((t,i)=>`<li class="${i===q.a?'ok':''}">${EM[i]} ${t}</li>`).join('')}</ol>${q.r?`<div class=clue>💡 <b>${q.r}</b> — ${q.x}</div>`:''}${as?`<p>👥 Audience: ${as[0]} / ${as[1]} ang tama</p>`:''}`:'';
A.innerHTML=`<div class=hp><h1>🔥 SOE Bible Quiz — Controller</h1><div>${b}</div>${qNav}<p>📚 ${Q?Q.length+' items':'walang tanong'} · ${Object.keys(conns).length}/9 groups · 🖥 ${PR.size} projector · 🤝 ${CO.size} co-host (PIN <b>${S.pin}</b>) · 👥 ${Object.keys(auds).length} audience · ${S.ph}${S.au?' · 🔊 AUDIO PLAYING':''}</p>${note?`<p class=note>${note}</p>`:''}<div class=chips>${chips}</div>${body}<details><summary>Audience (${Object.keys(S.aud).length})</summary>${ach}</details></div>`;tick()}
function tick(){const e=document.getElementById('t');if(e)e.textContent=S.ph==='run'?Math.max(0,Math.ceil((S.end-Date.now())/1000)):'';
if(S.ph==='run'){const l=S.end-Date.now();if(l<=5000&&!warn){warn=1;sfx('timer_warning')}if(l<=0)lock()}}
setInterval(tick,200);
if(S.ph==='run'){S.ph='ready';S.ans={};S.tt={};S.aa={}}S.au=false;
const peer=new Peer(HID);peer.on('error',e=>alert('Peer error: '+e.type+'. Isara ang ibang Controller tab at i-refresh.'));
peer.on('connection',c=>{c.on('data',m=>{
if(m.t==='hello'&&m.g>=1&&m.g<=9&&m.d){const o=S.own[m.g];if(o&&o!==m.d){c.send({t:'taken'});setTimeout(()=>c.close(),300);return}S.own[m.g]=m.d;const old=conns[m.g];if(old&&old!==c){old.send({t:'bye'});setTimeout(()=>old.close(),200)}c.g=m.g;conns[m.g]=c;push(m.g);sync(1)}
else if(m.t==='ans'&&c.g)onAns(c.g,m.a);
else if(m.t==='aud'&&m.d&&m.n){if(S.ban[m.d]){c.send({t:'kick'});return}const n=String(m.n).slice(0,20);S.aud[m.d]=S.aud[m.d]||{n,sc:0};S.aud[m.d].n=n;const old=auds[m.d];if(old&&old!==c){old.send({t:'bye'});setTimeout(()=>old.close(),200)}c.d=m.d;auds[m.d]=c;pushA(m.d);sync(1)}
else if(m.t==='aans'&&c.d)onAAns(c.d,m.a);
else if(m.t==='co'){if(String(m.pin)===String(S.pin)){CO.add(c);c.send({t:'c',v:CV()});ui()}else c.send({t:'nopin'})}
else if(m.t==='proj'){PR.add(c);c.send({t:'v',v:V()});ui()}
else if(m.t==='aend'){S.au=false;sync()}else if(m.t==='aerr'){S.au=false;miss=true;sync()}});
c.on('close',()=>{PR.delete(c);CO.delete(c);if(c.g&&conns[c.g]===c)delete conns[c.g];if(c.d&&auds[c.d]===c)delete auds[c.d];sync(1);chk()})});
addEventListener('storage',()=>ui());
sync();
