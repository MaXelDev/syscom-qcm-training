"use strict";
const $=s=>document.querySelector(s),app=$("#app"),LT="abcdefghijklmnopqrstuvwxyz";
let S=null;

function setTheme(t){document.documentElement.dataset.theme=t;$("#theme").textContent=t==="dark"?"☀️ Mode clair":"🌙 Mode sombre";}
setTheme(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
$("#theme").onclick=()=>setTheme(document.documentElement.dataset.theme==="dark"?"light":"dark");

const isOK=i=>{const q=S.qs[i];return q.rows?q.rows.every((r,ri)=>S.ans[i].has(ri*100+r.a)):q.options.every((o,j)=>o.ok===S.ans[i].has(j));};
const answered=()=>S.ans.filter(a=>a.size).length;

function home(){
  S=null;
  const probe=BANK.map(f=>f()),ai=probe.filter(q=>q.ai).length;
  app.innerHTML=`<section class="hero"><div style="font-size:3rem">∿</div><h1>Entraînement QCM SysCom</h1>
  <p>Signaux, échantillonnage, Dirac, corrélation, séries de Fourier.</p>
  <div class="stats"><div class="stat"><b>${probe.length}</b>questions</div><div class="stat"><b>${probe.length-ai}</b>issues des QCM</div><div class="stat"><b>${ai}</b>créées par IA</div></div>
  <ul class="rules"><li>Toute la banque, dans un ordre aléatoire à chaque lancement.</li><li>Réponds, reviens en arrière, modifie : la correction n'apparaît qu'à la validation finale.</li><li>1 point si toutes les bonnes réponses (et seulement elles) sont cochées, 0 sinon.</li><li>Les valeurs numériques changent à chaque session.</li><li>Aucune donnée collectée, aucun cookie : un rechargement repart de zéro.</li></ul>
  <button id="go" class="btn primary big" type="button">Lancer le QCM</button></section>`;
  $("#go").onclick=start;
}

function start(){
  const qs=shuffle(BANK.map(f=>f())).map(q=>({...q,options:(q.options&&!q.keep)?shuffle(q.options):q.options}));
  S={qs,ans:qs.map(()=>new Set()),flag:qs.map(()=>false),cur:0,done:false,filter:"all"};
  renderQuiz();window.scrollTo(0,0);
}

function navHTML(){
  return S.qs.map((q,i)=>{let c="nv";
    if(!S.done){if(S.ans[i].size)c+=" answered";if(S.flag[i])c+=" flagged";if(i===S.cur)c+=" current";}
    else c+=isOK(i)?" good":" wrong";
    return `<button class="${c}" data-i="${i}" type="button" aria-label="Question ${i+1}">${i+1}</button>`;}).join("");
}

function head(i){
  const q=S.qs[i];
  let h=`<span class="qn">Question ${i+1}<small> / ${S.qs.length}</small></span>`;
  if(q.ai)h+=`<span class="badge ai" title="Question créée par IA à partir du cours">✦ Créée par IA avec le cours</span>`;
  if(S.done)h+=isOK(i)?`<span class="badge ok">✓ Juste · +1</span>`:`<span class="badge bad">✗ Faux · 0</span>`;
  h+=`<span class="hint">${q.rows?"Associer chaque ligne à une réponse":q.multi?"Plusieurs réponses possibles":"Une seule réponse"}</span>`;
  return `<div class="qh">${h}</div>`;
}

function matchHTML(i){
  const q=S.qs[i],s=S.ans[i];
  return `<div class="mt">`+q.rows.map((r,ri)=>{
    const cur=[...s].find(v=>Math.floor(v/100)===ri),val=cur===undefined?-1:cur%100;
    const opts=`<option value="">— choisir —</option>`+q.choices.map((c,ci)=>`<option value="${ci}" ${val===ci?"selected":""}>${c}</option>`).join("");
    if(!S.done)return `<div class="mrow"><span class="ml">${r.l}</span><select data-r="${ri}">${opts}</select></div>`;
    const ok=val===r.a;
    return `<div class="mrow ${ok?"ok":"bad"}"><span class="ml">${r.l}</span><select disabled>${opts}</select><span class="tag">${ok?"✓ Juste":"✗ Faux — bonne réponse : "+q.choices[r.a]}</span></div>`;
  }).join("")+"</div>";
}

function optsHTML(i){
  const q=S.qs[i],type=q.multi?"checkbox":"radio";
  if(q.rows)return matchHTML(i);
  return `<div class="opts ${q.grid?"grid2":""}">`+q.options.map((o,j)=>{
    const sel=S.ans[i].has(j);
    if(!S.done)return `<label class="opt ${q.multi?"":"radio"}"><input type="${type}" name="q${i}" data-j="${j}" ${sel?"checked":""}><span class="mark"></span><span class="lt">${LT[j]}.</span><span class="ot">${o.t}</span></label>`;
    let c="opt rv "+(q.multi?"":"radio"),tag="";
    if(sel&&o.ok){c+=" ok";tag="Bonne réponse";}
    else if(sel){c+=" bad";tag="Faux";}
    else if(o.ok){c+=" miss";tag="À cocher (oubliée)";}
    return `<div class="${c}"><input type="${type}" disabled ${sel?"checked":""}><span class="mark"></span><span class="lt">${LT[j]}.</span><span class="ot">${o.t}</span>${tag?`<span class="tag">${tag}</span>`:""}</div>`;
  }).join("")+"</div>";
}

function card(i){
  const q=S.qs[i];
  return `<article class="card ${S.done?(isOK(i)?"isok":"iswrong"):""}" id="rq${i}">${head(i)}<div class="qt">${q.text}</div>${q.fig||""}${optsHTML(i)}</article>`;
}

function refresh(){
  const n=S.qs.length;
  $("#nvg").innerHTML=navHTML();$("#cnt").textContent=`${answered()} / ${n} répondues`;$("#bar").style.width=answered()/n*100+"%";
}

function renderQuiz(){
  const n=S.qs.length,i=S.cur,a=answered();
  app.innerHTML=`<div class="layout"><aside class="side"><h3>Navigation</h3><div class="sub" id="cnt">${a} / ${n} répondues</div><div class="bar"><i id="bar" style="width:${a/n*100}%"></i></div>
  <div class="grid" id="nvg">${navHTML()}</div>
  <div class="legend"><span><i class="dot" style="background:var(--accent)"></i>Répondue</span><span><i class="dot" style="background:var(--bg)"></i>Sans réponse</span><span>⚑ Marquée pour revoir</span></div>
  <button class="btn primary" id="fin" type="button">Terminer le QCM</button></aside>
  <section class="main">${card(i)}<div class="nav"><button class="btn" id="prev" type="button" ${i===0?"disabled":""}>← Précédente</button>
  <span><button class="btn ghost" id="clr" type="button">Effacer ma réponse</button> <button class="btn ghost" id="flg" type="button">${S.flag[i]?"⚑ Retirer le marquage":"⚐ Marquer"}</button></span>
  <button class="btn" id="next" type="button" ${i===n-1?"disabled":""}>Suivante →</button></div></section></div>`;
  $("#nvg").onclick=e=>{const b=e.target.closest(".nv");if(b){S.cur=+b.dataset.i;renderQuiz();window.scrollTo(0,0);}};
  $("#prev").onclick=()=>{S.cur--;renderQuiz();window.scrollTo(0,0);};
  $("#next").onclick=()=>{S.cur++;renderQuiz();window.scrollTo(0,0);};
  $("#clr").onclick=()=>{S.ans[S.cur].clear();renderQuiz();};
  $("#flg").onclick=()=>{S.flag[S.cur]=!S.flag[S.cur];renderQuiz();};
  $("#fin").onclick=askFinish;
  document.querySelectorAll(".opt input").forEach(inp=>inp.onchange=()=>{
    const j=+inp.dataset.j,s=S.ans[S.cur];
    if(S.qs[S.cur].multi){inp.checked?s.add(j):s.delete(j);}else{s.clear();s.add(j);}
    refresh();
  });
  document.querySelectorAll(".mrow select").forEach(sel=>sel.onchange=()=>{
    const s=S.ans[S.cur],r=+sel.dataset.r;
    [...s].filter(v=>Math.floor(v/100)===r).forEach(v=>s.delete(v));
    if(sel.value!=="")s.add(r*100+Number(sel.value));
    refresh();
  });
}

function askFinish(){
  const n=S.qs.length,un=n-answered(),fl=S.flag.filter(Boolean).length;
  $("#dlgBody").innerHTML=`<h3 style="margin-top:0">Valider le QCM ?</h3><p>Tu as répondu à <b>${answered()} / ${n}</b> questions.${un?` <b>${un}</b> sans réponse compteront 0.`:""}${fl?` ${fl} question(s) marquée(s) ⚑.`:""}</p><p>Après validation, tu ne pourras plus modifier tes réponses.</p>`;
  $("#dlg").showModal();
}
$("#dlgNo").onclick=()=>$("#dlg").close();
$("#dlgYes").onclick=()=>{$("#dlg").close();S.done=true;renderReview();window.scrollTo(0,0);};

function renderReview(){
  const n=S.qs.length,sc=S.qs.filter((_,i)=>isOK(i)).length,pct=Math.round(sc/n*100);
  app.innerHTML=`<div class="layout"><aside class="side"><h3>Correction</h3><div class="sub">${sc} juste(s) · ${n-sc} faux</div><div class="grid" id="nvg">${navHTML()}</div>
  <div class="legend"><span><i class="dot" style="background:var(--okbg);border-color:var(--ok)"></i>Question juste</span><span><i class="dot" style="background:var(--badbg);border-color:var(--bad)"></i>Question fausse</span></div>
  <button class="btn primary" id="again" type="button">Recommencer (nouveau tirage)</button><button class="btn" id="hm" type="button">Accueil</button></aside>
  <section class="main ${S.filter==="bad"?"f-bad":S.filter==="ok"?"f-ok":""}" id="mainrv"><div class="card"><div class="score"><span class="big">${sc} / ${n}</span><div><b>${pct} % de questions justes</b><br><span style="color:var(--muted)">1 point par question entièrement juste, 0 sinon.</span></div></div>
  <div class="filters"><button class="btn small ${S.filter==="all"?"on":""}" data-f="all" type="button">Toutes</button><button class="btn small ${S.filter==="bad"?"on":""}" data-f="bad" type="button">Fausses uniquement</button><button class="btn small ${S.filter==="ok"?"on":""}" data-f="ok" type="button">Justes uniquement</button></div></div>
  ${S.qs.map((_,i)=>card(i)).join("")}</section></div>`;
  $("#nvg").onclick=e=>{const b=e.target.closest(".nv");if(b){const el=$("#rq"+b.dataset.i);if(el.offsetParent===null){S.filter="all";renderReview();}$("#rq"+b.dataset.i).scrollIntoView({behavior:"smooth",block:"start"});}};
  $("#again").onclick=start;$("#hm").onclick=home;
  document.querySelectorAll(".filters .btn").forEach(b=>b.onclick=()=>{S.filter=b.dataset.f;renderReview();});
}

home();
