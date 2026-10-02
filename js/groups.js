/* SOE Bible Quiz — single source of truth for group identity/colors */
const GROUPS = {
  1:{code:'G1',name:'Sky Blue',color:'#4FC3F7',leader:'Perlito',textColor:'#08212B'},
  2:{code:'G2',name:'Royal Blue',color:'#2F5BFF',leader:'Artemio',textColor:'#FFFFFF'},
  3:{code:'G3',name:'Mint Green',color:'#5EE6A8',leader:'Christina',textColor:'#082117'},
  4:{code:'G4',name:'Yellow',color:'#FFD93B',leader:'Luisa',textColor:'#241D00'},
  5:{code:'G5',name:'Orange',color:'#FF8A1F',leader:'Rodel',textColor:'#2B1600'},
  6:{code:'G6',name:'Violet',color:'#8E4CE0',leader:'Veron',textColor:'#FFFFFF'},
  7:{code:'G7',name:'Pink',color:'#FF6FB5',leader:'Marisa',textColor:'#351022'},
  8:{code:'G8',name:'Red',color:'#E0243A',leader:'Albert',textColor:'#FFFFFF'},
  9:{code:'G9',name:'White',color:'#FFFFFF',leader:'Jonathan',textColor:'#172033'}
};
const AUDIENCE_THEME={name:'Graphite Gray',color:'#3A4457',accent:'#C7CDD8',textColor:'#FFFFFF'};
const ANSWER_COLORS=['#d8344a','#2a6fdb','#e2b32a','#7a4cc2'];
const ANSWER_EMOJI=['🟥','🟦','🟨','🟪'];
function groupInfo(g){return GROUPS[Number(g)]||null}
function groupLabel(g){const x=groupInfo(g);return x?`${x.code} · ${x.leader}`:''}
function groupStyle(g){const x=groupInfo(g);return x?`--group-color:${x.color};--group-text:${x.textColor}`:''}
function groupChipHTML(g,extra=''){const x=groupInfo(g);return x?`<span class="group-chip" style="${groupStyle(g)}"><b>${x.code}</b><span>${x.name}</span><small>${x.leader}</small>${extra}</span>`:''}
function applyGroupTheme(g){
  const x=groupInfo(g); if(!x)return;
  document.documentElement.style.setProperty('--group-color',x.color);
  document.documentElement.style.setProperty('--group-text',x.textColor);
  document.body.dataset.group=x.code;
  document.body.style.background=x.color;
  document.body.style.color=x.textColor;
}
