/* Shared validator for questions.json — ginagamit ng Host (index.html) at ng Editor (editor.html).
   Kailangan ng 26 items: [0] = practice, [1..25] = mga tanong. Bawat item: {q, o:[4], a:0-3, r?, x?} */
function qLabel(i){return i<0?'':i?'Q'+i:'Practice'}
function qMsg(x){return(x.i<0?'':qLabel(x.i)+': ')+x.m}
function qCheck(a){
  const E=[],W=[],seen=new Map();
  const e=(i,m)=>(i>25?W:E).push({i,m}),w=(i,m)=>W.push({i,m});
  if(!Array.isArray(a)){E.push({i:-1,m:'Dapat listahan (array) ang JSON.'});return{E,W}}
  if(a.length<26)E.push({i:-1,m:'Kulang ang tanong: '+a.length+' lang. Kailangan ng 26 (1 practice + 25 tanong).'});
  else if(a.length>26)W.push({i:-1,m:a.length+' items ang nasa listahan. Ang unang 26 lang ang gagamitin ng laro.'});
  a.forEach((it,i)=>{
    if(!it||typeof it!=='object'||Array.isArray(it)){e(i,'Hindi valid na item.');return}
    const q=typeof it.q==='string'?it.q.trim():'';
    if(!q)e(i,'Walang tanong.');
    if(!Array.isArray(it.o)||it.o.length!==4)e(i,'Dapat eksaktong 4 ang choices (A–D).');
    else{
      let blank=0;
      it.o.forEach((t,k)=>{if(typeof t!=='string'||!t.trim()){blank++;e(i,'Walang laman ang choice '+'ABCD'[k]+'.')}});
      if(!blank&&new Set(it.o.map(t=>t.trim().toLowerCase())).size<4)w(i,'May magkaparehong choices.');
    }
    if(!Number.isInteger(it.a)||it.a<0||it.a>3)e(i,'Walang piniling tamang sagot.');
    if(i>0){
      if(typeof it.r!=='string'||!it.r.trim())w(i,'Walang Bible reference (r).');
      if(typeof it.x!=='string'||!it.x.trim())w(i,'Walang paliwanag (x).');
    }
    if(q){const k=q.toLowerCase();if(seen.has(k))w(i,'Kapareho ng tanong sa '+qLabel(seen.get(k))+'.');else seen.set(k,i)}
  });
  return{E,W};
}
