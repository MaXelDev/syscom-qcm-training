"use strict";
/* Code d'accès : vérifié en lisant pass.json (le code n'apparaît pas dans le HTML) */
const _home=home;
home=function(){
  _home();
  const go=$("#go");
  go.insertAdjacentHTML("beforebegin",`<form id="gate" class="gate" autocomplete="off"><label for="pw">Code d'accès</label><input id="pw" type="password" autocomplete="off" placeholder="Entre le code pour commencer"><div id="pwerr" class="pwerr" role="alert"></div></form>`);
  const err=m=>{$("#pwerr").textContent=m;$("#pw").focus();};
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
