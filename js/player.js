const A=document.getElementById('app'),E=['🟥','🟦','🟨','🟪'],DEV=localStorage.soe_dev||(localStorage.soe_dev=Math.random().toString(36).slice(2)+Date.now().toString(36));
let NM=localStorage.soe_name||'',S={ph:'wait',pick:-1},end=0,peer,conn,on=false,flash='',dead='',rt;
function render(){
if(dead)return A.innerHTML=`<div class=c><h1>${dead}</h1>${G&&dead.startsWith('Naka-claim')?'<button class=go onclick="location=\'audience.html\'">Maglaro bilang Audience</button>':''}</div>`;
if(G)applyGroupTheme(G); else {document.body.style.background=AUDIENCE_THEME.color;document.body.style.color=AUDIENCE_THEME.textColor;document.body.dataset.group='AUDIENCE';}
const gi=groupInfo(G),p=S.pick,run=S.ph==='run'&&p<0;
let t={wait:'WAIT FOR HOST',ready:S.au?'LISTEN TO THE QUESTION':'GET READY',run:p>=0?'✅ ANSWER SUBMITTED':'',locked:'🔒 ANSWERS LOCKED',reveal:p<0?'❌ WALANG SAGOT':S.c===p?'✅ TAMA!':'❌ MALI'}[S.ph]||'';if(flash)t=flash;
const timerClass=G&&(G===3||G===4)?'dark-timer':'';
A.innerHTML=`<div class=top><b>${gi?`${gi.code} · ${gi.leader}`:'👥 '+NM.replace(/[<>&"]/g,'')}</b><span id=t class="${timerClass}"></span><span>${on?'🟢':'🔴'}</span></div><div class="msg">${gi?`<small>${gi.name}</small> · ${t}`:t}</div><div class="answer-panel btns">${[0,1,2,3].map(i=>`<button class="b${i}${p===i?' pick':''}${S.ph==='reveal'&&S.c===i?' right double-right':''}" ${run?'':'disabled'} onclick="tap(${i})">${E[i]} ${'ABCD'[i]}</button>`).join('')}</div><div class=sc>Score: ${S.sc||0}</div>`;tick()}
function tap(i){if(!(S.ph==='run'&&S.pick<0))return;S.pick=i;conn.send(G?{t:'ans',g:G,a:i}:{t:'aans',a:i});navigator.vibrate&&navigator.vibrate(60);navigator.wakeLock&&navigator.wakeLock.request('screen').catch(()=>{});render()}
function tick(){const e=document.getElementById('t');if(e)e.textContent=S.ph==='run'?Math.max(0,Math.ceil((end-Date.now())/1000)):''}setInterval(tick,200);
function join(){const v=document.getElementById('nm').value.trim().slice(0,20);if(!v)return;NM=v;localStorage.soe_name=v;connect()}
function connect(){on=false;render();try{peer&&peer.destroy()}catch(e){}peer=new Peer();peer.on('open',()=>{conn=peer.connect('soe-bq-2026-host',{reliable:true});conn.on('open',()=>{on=true;conn.send(G?{t:'hello',g:G,d:DEV}:{t:'aud',d:DEV,n:NM});render()});
conn.on('data',m=>{if(m.t==='s'){S=m;end=Date.now()+m.left;flash=''}else if(m.t==='late'){S.pick=-1;flash='⛔ TOO LATE'}else if(m.t==='bye')dead='REPLACED — ibang tab ang gumagamit nito';else if(m.t==='kick')dead='Na-disconnect ng Host';else if(m.t==='taken'){dead='Naka-claim na ang G'+G+' — inililipat ka sa Audience…';location.replace('audience.html')}render()});conn.on('close',retry)});peer.on('error',retry)}
function retry(){on=false;if(dead)return render();render();clearTimeout(rt);rt=setTimeout(connect,2000)}
if(!G&&!NM)A.innerHTML='<div class=c><h1>👥 Audience</h1><p>Ilagay ang pangalan mo</p><input id=nm class=nm maxlength=20 placeholder="Pangalan"><button class=go onclick="join()">Pumasok</button></div>';else connect();
