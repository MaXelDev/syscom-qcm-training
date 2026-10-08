"use strict";
/* ===== Lot 4 : transformée de Fourier (screens) + questions créées par IA ===== */
const INT="∫<sub>−∞</sub><sup>+∞</sup>";
const VF=(text,ok,extra={})=>({text,multi:false,keep:true,options:[O("Vrai",ok),O("Faux",!ok)],...extra});
BANK.push(

/* ----- issues des screens ----- */
()=>({...M("Choisir les propositions correctes.",
["x(t/a) ↔<sub>TF</sub> |a|·X(af)","x(−t) ↔<sub>TF</sub> X(−f)","x(at) ↔<sub>TF</sub> (1/|a|)·X(f/a)","a·x(t) + b·y(t) ↔<sub>TF</sub> a·X(f) + b·Y(f)"],
["x(−t) ↔<sub>TF</sub> −X*(−f)","a·x(t) + b·y(t) ↔<sub>TF</sub> a·|X(f)| + b·|Y(f)|","x(t − t<sub>0</sub>) ↔<sub>TF</sub> X(f)·e<sup>−j2πft</sup>"]),ref:"p. 113 ; p. 250"}),

()=>({...M("Un signal temps-continu d'énergie finie a un spectre :",["Apériodique","Continu"],["Discret","Périodique"]),ref:"p. 108–110"}),

()=>({...VF("La transformée de Fourier d'un signal temps-continu et d'énergie finie suivante :<br>X(f) = "+INT+" x(t)·e<sup>−j2πft</sup> dt",true),ref:"p. 109–111"}),

()=>({...M("Enoncé simplifié du théorème de Parseval pour un signal à énergie finie.",
["l'énergie du signal se conserve dans le domaine fréquentiel, suite à la transformée de Fourier"],
["l'auto-corrélation temporelle ne peut pas être conservée dans le domaine fréquentiel, suite à la transformée de Fourier","l'énergie du signal ne peut pas être conservée dans le domaine fréquentiel, suite à la transformée de Fourier","l'auto-corrélation temporelle se conserve dans le domaine fréquentiel, suite à la transformée de Fourier"]),ref:"p. 114–115"}),

()=>({...VF("La transformée de Fourier d'un signal temps-continu et d'énergie finie suivante :<br>X(jω) = "+INT+" x(t)·e<sup>−jωt</sup> dt",true),ref:"p. 109–111"}),

()=>({...VF("La transformée de Fourier inverse d'un signal temps-continu est la suivante :<br>x(t) = "+INT+" X(f)·e<sup>j2πft</sup> df",true),ref:"p. 109–111"}),

()=>({...M("Le spectre d'un signal temps-continu périodique de puissance finie est :",["Apériodique","Discret"],["Périodique","Continu"]),ref:"p. 108–110"}),

()=>({...M("Soit X(jω) la transformée de Fourier du signal x(t).<br>La dérivée du signal x(t) a pour Transformée de Fourier :",
["jω·X(jω)","j2πf·X(f)"],["(1/jω)·X(jω)","−jω·X(jω)","X(jω)·e<sup>−jωt</sup>"]),ref:"p. 113"}),

/* ----- créées par IA ----- */
()=>{ // propriétés de la TF, facteur a variable
  const a=pick([2,3,4]);
  const g=[`x(${a}t) ↔<sub>TF</sub> (1/${a})·X(f/${a})`,`x(t/${a}) ↔<sub>TF</sub> ${a}·X(${a}f)`,"x(t − t<sub>0</sub>) ↔<sub>TF</sub> X(f)·e<sup>−j2πft<sub>0</sub></sup>","x(−t) ↔<sub>TF</sub> X(−f)","x(t)·e<sup>j2πf<sub>0</sub>t</sup> ↔<sub>TF</sub> X(f − f<sub>0</sub>)","a·x(t) + b·y(t) ↔<sub>TF</sub> a·X(f) + b·Y(f)"];
  const b=[`x(${a}t) ↔<sub>TF</sub> ${a}·X(f/${a})`,`x(t/${a}) ↔<sub>TF</sub> (1/${a})·X(${a}f)`,"x(t − t<sub>0</sub>) ↔<sub>TF</sub> X(f)·e<sup>+j2πft<sub>0</sub></sup>","x(t − t<sub>0</sub>) ↔<sub>TF</sub> X(f − t<sub>0</sub>)","x(t)·e<sup>j2πf<sub>0</sub>t</sup> ↔<sub>TF</sub> X(f + f<sub>0</sub>)","x(−t) ↔<sub>TF</sub> −X*(−f)"];
  return M("Choisir les propositions correctes.",shuffle(g).slice(0,3),shuffle(b).slice(0,3),{ai:true,ref:"p. 113 ; p. 250"});
},

()=>{ // dérivée première ou seconde
  const n=pick([1,2]);
  const q=n===1?[["jω·X(jω)","j2πf·X(f)"],["(1/jω)·X(jω)","−jω·X(jω)","X(jω)·e<sup>−jωt</sup>"]]:[["(jω)²·X(jω)","−ω²·X(jω)","(j2πf)²·X(f)"],["jω·X(jω)","−jω·X(jω)","ω²·X(jω)"]];
  return M(`Soit X(jω) la transformée de Fourier du signal x(t).<br>La dérivée ${n===1?"première":"seconde"} du signal x(t) a pour Transformée de Fourier :`,q[0],q[1],{ai:true,ref:"p. 113"});
},

()=>{ // Parseval numérique
  const A=pick([1,2,3]),T=pick([1,2,4]),E=A*A*T;
  return numQ(`Le signal x(t) = ${A}·rect(t/${T}) vaut ${A} pour |t| &lt; ${fr(T/2)} et 0 ailleurs. Quelle est la valeur de ${INT} |X(f)|² df (énergie calculée dans le domaine fréquentiel) ?`,E,[A*T,A*A*T*T,2*Math.PI*E,E/2,A*A],v=>fr(+v.toFixed(2)),{ai:true,ref:"p. 114"});
},

()=>{ // type de spectre selon le signal
  const C=[["Un signal temps-continu <b>périodique</b> de puissance finie",["Discret","Apériodique"],["Continu","Périodique"],"p. 108–110"],
  ["Un signal temps-continu <b>apériodique</b> d'énergie finie",["Continu","Apériodique"],["Discret","Périodique"],"p. 108–110"],
  ["Un signal <b>temps-discret apériodique</b> d'énergie finie (DtFT)",["Continu","Périodique"],["Discret","Apériodique"],"p. 149–151"],
  ["Un signal <b>temps-discret périodique</b> de N points (DFT)",["Discret","Périodique"],["Continu","Apériodique"],"p. 158–162"]];
  const [t,g,b,r]=pick(C);
  return M(t+" a un spectre :",g,b,{ai:true,ref:r});
},

()=>{ // TF directe / inverse : vrai-faux
  const D="La transformée de Fourier d'un signal temps-continu et d'énergie finie est la suivante :<br>",I="La transformée de Fourier inverse d'un signal temps-continu est la suivante :<br>";
  const V=[[D+"X(f) = "+INT+" x(t)·e<sup>+j2πft</sup> dt",false],[D+"X(f) = "+INT+" x(t)·e<sup>−jπft</sup> dt",false],[D+"X(jω) = "+INT+" x(t)·e<sup>−jωt</sup> dt",true],
  [I+"x(t) = "+INT+" X(f)·e<sup>−j2πft</sup> df",false],[I+"x(t) = (1/2π)·"+INT+" X(jω)·e<sup>jωt</sup> dω",true],[I+"x(t) = "+INT+" X(jω)·e<sup>jωt</sup> dω",false]];
  const [t,ok]=pick(V);
  return VF(t,ok,{ai:true,ref:"p. 109–111"});
},

()=>{ // X(0) d'une porte
  const A=pick([1,2,3,4]),T=pick([0.5,1,2,4]);
  return numQ(`Soit x(t) = ${A}·rect(t/${fr(T)}) : une porte d'amplitude ${A} et de largeur ${fr(T)} s. Que vaut X(0), la valeur de son spectre en f = 0 ?`,A*T,[A,T,A/T,A*A*T,2*A*T],v=>fr(v),{ai:true,ref:"p. 111 ; p. 113"});
}

);
