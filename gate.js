"use strict";
/* Code d'accès : vérifié en lisant pass.json (le code n'apparaît pas dans le HTML) + encart des sources */
const _home=home;
home=function(){
  _home();
  const go=$("#go"),rules=document.querySelector(".rules");
  rules.insertAdjacentHTML("beforebegin",`<div class="sources"><h3>Questions utilisées</h3><ul><li>Les 6 QCMs de Chantal Prime</li><li>Le QCM noté tombé l'an dernier</li><li>Les questions créées par l'IA sont repérées par le badge <span class="badge ai">✦ Créée par IA avec le cours</span></li></ul></div>`);
  go.insertAdjacentHTML("beforebegin",`<form id="gate" class="gate" autocomplete="off"><div class="gate-title">🔒 Accès au QCM</div><input id="pw" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Code d'accès" aria-label="Code d'accès"><div id="pwerr" class="pwerr" role="alert"></div></form>`);
  const err=m=>{
    const g=$("#gate");
    $("#pwerr").textContent=m;
    g.classList.remove("shake");void g.offsetWidth;g.classList.add("shake");
    $("#pw").focus();$("#pw").select();
  };
  go.onclick=async()=>{
    const v=$("#pw").value.trim();
    if(!v){err("Entre le code d'accès.");return;}
    try{
      const r=await fetch("pass.json",{cache:"no-store"});
      const j=await r.json();
      if(v===String(j.code))start();else err("Code incorrect.");
    }catch(e){err("Impossible de vérifier le code (ouvre le site par son adresse web, pas en fichier local).");}
  };
  $("#gate").onsubmit=e=>{e.preventDefault();go.click();};
};
home();
