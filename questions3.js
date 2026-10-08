"use strict";
/* ===== Lot 3 : échantillonnage (screens) + variantes créées par IA ===== */
BANK.push(

()=>({...M("Le signal x(t) est échantillonné avec une période d'échantillonnage Te. On obtient le signal x<sub>e</sub>(t).",
[`x<sub>e</sub>(t) = x(t) · ${SUMK} δ(t − kT<sub>e</sub>)`,"La fréquence d'échantillonnage Fe est égale au nombre d'échantillons échantillonnés en 1s.","Le signal échantillonné est une somme infinie de Dirac translatés de kTe et pondérés par la valeur du signal x(t) aux instants d'échantillonnage."],
[`x<sub>e</sub>(t) = x(t) * ${SUMK} δ(t − kT<sub>e</sub>)`,"x<sub>e</sub>(t) = x(nT<sub>e</sub>)"]),ref:"p. 22 ; p. 78–80"}),

()=>({...M("Soit x(t) un signal de bande limitée telle que : X(f) = 0 pour |f| &gt; f<sub>M</sub>.<br>On choisit une fréquence d'échantillonnage Fe = f<sub>M</sub>.",
["La reconstruction du signal temps continu à l'aide des échantillons x(nTe) ne pourra jamais être égale au signal x(t).","X(f) le spectre de x(t) ne peut pas être restitué par filtrage passe-bas."],
["A partir de ces échantillons, il est possible de reconstruire x(t) en générant un train d'impulsions dont les impulsions successives ont pour amplitude la valeur des échantillons. Ce train d'impulsions est alors filtré par un filtre passe-bas idéal de gain Te et de fréquence de coupure égale à f<sub>M</sub>. Le signal résultant sera alors exactement égal à x(t).","x(t) est parfaitement déterminé par ses échantillons x(nTe), n ∈ ℤ."]),ref:"p. 139–142"}),

()=>({...M("Echantillonner en fréquence équivaut à :",["périodiser en temps"],["échantillonner en temps","multiplier en temps","convoluer en temps"]),ref:"p. 127 ; p. 137–139"}),

()=>{ // IA : échantillonnage temporel, valeurs variables
  const Te=pick([0.25,0.5,1,2,4]),Fe=1000/Te;
  const good=[`x<sub>e</sub>(t) = x(t) · ${SUMK} δ(t − kT<sub>e</sub>)`,`x<sub>e</sub>(t) = ${SUMK} x(kT<sub>e</sub>)·δ(t − kT<sub>e</sub>)`,`La fréquence d'échantillonnage vaut F<sub>e</sub> = 1/T<sub>e</sub> = ${fr(Fe)} Hz.`,"Le spectre de x<sub>e</sub>(t) est périodique, de période F<sub>e</sub>."];
  const bad=[`x<sub>e</sub>(t) = x(t) * ${SUMK} δ(t − kT<sub>e</sub>)`,"x<sub>e</sub>(t) = x(nT<sub>e</sub>)",`La fréquence d'échantillonnage vaut F<sub>e</sub> = ${fr(Fe/2)} Hz.`,"Le spectre de x<sub>e</sub>(t) est périodique, de période T<sub>e</sub>."];
  return M(`Le signal x(t) est échantillonné avec une période d'échantillonnage T<sub>e</sub> = ${fr(Te)} ms. On obtient le signal x<sub>e</sub>(t).`,shuffle(good).slice(0,3),shuffle(bad).slice(0,3),{ai:true,ref:"p. 22 ; p. 78–80 ; p. 139"});
},

()=>{ // IA : Shannon selon Fe / fM
  const fM=pick([2,3,4,5,8]),k=pick([1,1.5,3,4]),Fe=fM*k,ok=Fe>=2*fM;
  const T=[["x(t) est parfaitement déterminé par ses échantillons x(nT<sub>e</sub>), n ∈ ℤ.",ok],["Le spectre du signal échantillonné présente du repliement (aliasing).",!ok],["X(f) peut être restitué par un filtre passe-bas idéal appliqué au signal échantillonné.",ok],["La reconstruction à partir des échantillons ne pourra jamais être égale au signal x(t).",!ok],["Le critère de Shannon (F<sub>e</sub> ≥ 2·f<sub>M</sub>) est respecté.",ok]];
  return {text:`Soit x(t) un signal de bande limitée : X(f) = 0 pour |f| &gt; f<sub>M</sub> = ${fM} kHz.<br>On choisit une fréquence d'échantillonnage F<sub>e</sub> = ${fr(Fe)} kHz.<br>Sélectionner les propositions correctes.`,multi:true,ai:true,ref:"p. 139–142",options:shuffle(T).map(([t,o])=>O(t,o))};
},

()=>({...M("Périodiser en fréquence équivaut à :",["échantillonner en temps"],["périodiser en temps","échantillonner en fréquence","convoluer en temps"]),ai:true,ref:"p. 137–139"})

);
