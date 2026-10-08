"use strict";
/* ===== Lot 5 : Matlab (vecteur, xcorr) et spectres de signaux périodiques ===== */
BANK.push(

()=>{ // création d'un vecteur sous Matlab (valeurs variables)
  const s=pick([1,2,3]),d=pick([2,3,4]),v=Array.from({length:5},(_,i)=>s+i*d),e=s+4*d+rnd(0,d-1);
  const c=t=>`<code>${t}</code>`;
  const good=[c(`x=(0:${d}:${4*d})+${s}`),c(`x=${s}:${d}:${e}`),c(`x=[${v.join(" ")}]`)];
  const bad=[c(`x={${v.join(" ")}}`),c(`x=(${v.join(" ")})`),c(`x=${s}:${s+4*d}:${d}`)];
  return M(`On veut créer le vecteur x suivant sous Matlab :<br><code>x = ${v.join("  ")}</code><br>Sélectionner les instructions permettant de créer le vecteur.`,good,bad,{ref:"p. 29 ; p. 167"});
},

()=>{ // spectres de T·|Xk| pour différentes périodes (association)
  const al=pick([0.25,0.5]),pool=al===0.25?[0.5,1,2,4]:[1,2,4];
  const Ts=shuffle(pool).slice(0,3),sorted=Ts.slice().sort((a,b)=>a-b);
  const sinc=x=>x===0?1:Math.sin(Math.PI*x)/(Math.PI*x);
  const panel=T=>{const p=[],K=Math.floor(30*T);for(let k=-K;k<=K;k++){const f=k/T,v=al*Math.abs(sinc(f*al));p.push([f,0],[f,v],[f,0]);}return p;};
  const figs=Ts.map((T,i)=>plot({w:560,h:130,x0:-30,x1:30,y0:-0.04,y1:al*1.2,xs:10,yt:[0,al],title:"Figure "+"abc"[i],tcls:"lg1",series:[{c:"var(--blue)",p:panel(T)}],label:"spectre "+"abc"[i]})).join("");
  return {text:`Soit un signal périodique de période T en temps continu, constant et égal à 1 pendant une durée α = ${fr(al)}s.<br>On trace le spectre des T × |X<sub>k</sub>| pour différentes valeurs de la période (X<sub>k</sub> : coefficient de Fourier de rang k).<br>Associer chacun des spectres à la valeur de la période correspondante.`,
    fig:`<div class="figs">${figs}</div>`,choices:sorted.map(T=>`T=${fr(T)} s`),
    rows:Ts.map((T,i)=>({l:`Figure ${"abc"[i]}) correspond au signal périodique de période`,a:sorted.indexOf(T)})),keep:true,ref:"p. 102 ; p. 107–108 ; p. 128"};
},

()=>({...M("Soit l'instruction suivante :<br><code>[msg_decode, lag]=xcorr(code_x1,code_x1)</code><br>Sélectionner les bonnes affirmations.",
["lag est le vecteur d'indices associé aux valeurs de msg_decode.","msg_decode est le résultat de l'autocorrélation du signal code_x1.","msg_decode est identique au résultat de la convolution du signal code_x1[n] avec code_x1[-n]."],
["stem(msg_decode) affiche le maximum de msg_decode en n=0","msg_decode est le résultat de la convolution du signal code_x1 avec lui-même."]),ref:"p. 84 ; p. 92–94"})

);
