"use strict";
/* ===== Lot 2 : questions issues du QCM1 3TC (screens du 14/10) ===== */
BANK.push(

()=>{ // association rect(...) <-> figures
  let defs;
  do{
    const c=pick([1.5,2,2.5,3]),w=pick([2,3,4]),d=pick([2,3]),v=pick([2,3]),k=pick([2,4]),e=pick([3,4]),m=pick([2,3,4]),f=pick([1,2,3]);
    defs=[
      {l:`x1=rect((t-${c})/${w})`,lo:c-w/2,hi:c+w/2},
      {l:`x2=rect((-${d}-t)/${v})`,lo:-d-v/2,hi:-d+v/2},
      {l:`x3=rect(${k}*(t+${e}))`,lo:-e-1/(2*k),hi:-e+1/(2*k)},
      {l:`x4=rect(1/${m}*(t+${f}))`,lo:-f-m/2,hi:-f+m/2}];
  }while(new Set(defs.map(d=>d.lo+"|"+d.hi)).size<4||defs.some(d=>d.lo<-5||d.hi>5));
  const order=shuffle([0,1,2,3]);
  const figs=order.map((i,j)=>plot({w:300,h:150,x0:-5,x1:5,y0:-0.05,y1:1.1,xs:1,yt:[0,0.5,1],title:"abcd"[j]+")",tcls:"lg1",series:[{c:"var(--blue)",p:[[-5,0],[defs[i].lo,0],[defs[i].lo,1],[defs[i].hi,1],[defs[i].hi,0],[5,0]]}],label:"figure "+"abcd"[j]})).join("");
  return {text:"Le code matlab est le suivant :<br><code>syms t</code><br><code>rect=@(t) rectangularPulse(-0.5,0.5,t)</code><br>"+defs.map(d=>`<code>${d.l}</code>`).join("<br>")+"<br>Associer la représentation des signaux à chacune des figures suivantes.",
    fig:`<div class="figs">${figs}</div>`,choices:["a)","b)","c)","d)"],rows:defs.map((d,i)=>({l:d.l,a:order.indexOf(i)})),keep:true};
},

()=>{ // TF inverse vrai/faux
  const V=[["1/(2π)","exp(−jω)",false],["1/(2π)","exp(+jωt)",true],["1/(2π)","exp(−jωt)",false],["1/π","exp(+jωt)",false]];
  const [pre,ex,ok]=pick(V);
  return {text:`La transformée de Fourier inverse d'un signal temps-continu est la suivante :<br><i>x</i>(<i>t</i>) = ${pre} ∫<sub>−∞</sub><sup>+∞</sup> X(jω)·${ex} dω`,multi:false,keep:true,options:[O("Vrai",ok),O("Faux",!ok)]};
},

()=>M("Echantillonner en temps c'est :<br>Cochez les bonnes réponses :",
["périodiser en fréquence"],
["multiplier en fréquence","convoluer en fréquence","échantillonner en fréquence"]),

()=>{ // rectangle dilaté / décalé
  const k=pick([2,3,4]),s=pick([2,3,5]),av=pick([true,false]),a=av?"+":"−",b=av?"−":"+";
  const o=[[`rect((t${a}${s})/${k})`,true],[`rect((t${b}${s})/${k})`],[`${k}·rect(t${a}${s})`],[`rect(${k}(t${a}${s}))`],[`rect(${k}(t${b}${s}))`],[`${k}·rect(t${b}${s})`]];
  return {text:`Parmi ces expressions, laquelle correspond à un rectangle dilaté d'un facteur ${k} et en ${av?"avance":"retard"} de ${s} secondes ?`,multi:false,options:o.map(([t,ok])=>O(t,!!ok))};
},

()=>{ // largeur de bande / Shannon
  const fmin=pick([1,2]),fmax=pick([4,5,6]),B=fmax-fmin,lo=2*fmax-2,hi=2*fmax;
  const e=(F,r)=>`Si on échantillonne ce signal avec une fréquence d'échantillonnage de ${F}kHz, le signal discret obtenu ${r}`;
  return M(`Un signal continu apériodique a une fréquence minimale de ${fmin}kHz et une fréquence maximale de ${fmax}kHz.`,
  [`La largeur de bande du signal est de ${B} kHz`,e(lo,"sera distordu."),e(hi,"correspondra bien au signal original.")],
  [`La bande passante du signal est de ${B} kHz`,e(lo,"correspondra bien au signal original."),e(hi,"sera distordu.")]);
},

()=>{ // TF -> signal temporel
  const a=pick([2,3]),b=pick([1,2]),c=pick([0.5,1.5]),T1=pick([1,2,3]),T2=T1+pick([1,2]);
  const cf=x=>x===1?"":x,tw=T=>(T>1?T:"")+"ω",ex=T=>`e<sup>−j${tw(T)}</sup>`;
  const mk=(s1,s2,x1,x2)=>`${a}δ(t) + ${cf(b)}δ(t${s1}${x1}) + ${c}δ(t${s2}${x2})`;
  return M(`La transformée de Fourier ayant pour expression : ${a} + ${cf(b)}${ex(T1)} + ${c}${ex(T2)}<br>peut correspondre au signal temporel :`,
  [mk("−","−",T1,T2)],[mk("+","+",T1,T2),mk("−","−",tw(T1),tw(T2)),mk("+","+",tw(T1),tw(T2))]);
},

()=>M("Choisir les propositions correctes.",
["L'opération de multiplication en temps correspond à une opération de convolution en fréquence.","L'opération de convolution en temps correspond à une opération de multiplication en fréquence.","Un spectre discret est le résultat d'une périodisation en temps","La convolution avec un peigne de Dirac en fréquence correspond à un échantillonnage en temps","La convolution d'un peigne de Dirac P<sub>T</sub>(t) en temps conduit avec un signal à durée finie T revient à échantillonner le spectre du signal à durée finie et à le multiplier par un facteur de 1/T."],
["L'opération de convolution en temps correspond à une opération de convolution en fréquence.","L'opération de convolution en temps correspond à une périodisation du signal.","Une multiplication en temps correspond à une périodisation du spectre en fréquence","L'opération de multiplication en temps correspond à une opération de multiplication en fréquence."]),

()=>{ // script matlab : relier
  const rows=["xc=(sin(2*pi*F0*t))*rectangularPulse(0,T,t);","f=fplot(xc, 'r')","sig1d=sin(2*pi*F0*td)","stem(td,sig1d)","plot(td,sig1d)","stem(n,sig1d)","plot(n,sig1d)","stem(sig1d)","plot(sig1d)"];
  const ds=["Définit une fonction xc égale à une portion de sinusoïde en temps continu.","Trace une fonction en Maths Symboliques","Crée un vecteur dont les valeurs correspondent à une sinusoïde échantillonnée tous les Ts",
  "Trace les échantillons de sig1d en représentation discrète en fonction du temps","Trace les échantillons de sig1d en représentation continue en fonction du temps",
  "Trace les échantillons de sig1d en représentation discrète en fonction du temps en fonction des indices associés au temps","Trace les échantillons de sig1d en représentation continue en fonction du temps en fonction des indices associés au temps",
  "Trace les échantillons de sig1d en représentation discrète en fonction du temps en fonction de l'indice des échantillons dans le vecteur.","Trace les échantillons de sig1d en représentation continue en fonction du temps en fonction de l'indice des échantillons dans le vecteur."];
  const perm=shuffle(ds.map((_,i)=>i)),rowOrder=shuffle(rows.map((_,i)=>i));
  return {text:"Voici le début d'un script matlab<br><code>N=Fs*T;</code> <code>n=0:N-1;</code> <code>td=n*Ts;</code> <code>F0=2</code> <code>T=1;</code> <code>syms t</code><br>La suite des instructions est donnée ci-dessous. Relier les bonnes réponses.",
    choices:perm.map(i=>ds[i]),rows:rowOrder.map(i=>({l:rows[i],a:perm.indexOf(i)})),keep:true};
},

()=>{ // signaux rectangulaires <-> spectres
  const ws=shuffle([2,4,5,6,8,10]).slice(0,3),ord=shuffle([0,1,2]);
  const sinc=x=>x===0?1:Math.sin(Math.PI*x)/(Math.PI*x);
  const times=ws.map((w,i)=>plot({w:300,h:130,x0:-6,x1:6,y0:-0.05,y1:1.1,xs:2,yt:[0,1],title:"x"+(i+1),tcls:"lg1",series:[{c:"var(--blue)",p:[[-6,0],[-w/2,0],[-w/2,1],[w/2,1],[w/2,0],[6,0]]}],label:"signal x"+(i+1)})).join("");
  const specs=ord.map((i,j)=>{const w=ws[i];return plot({w:300,h:130,x0:-2,x1:2,y0:0,y1:w*1.1,xs:0.5,yt:[0,w],title:"abc"[j]+")",tcls:"lg2",series:[{c:"var(--blue)",p:samp(f=>w*Math.abs(sinc(w*f)),-2,2,500)}],label:"spectre "+"abc"[j]});}).join("");
  return {text:"Les signaux temporels (rectangles de hauteur 1) et leurs spectres en amplitude sont représentés dans les figures ci-dessous.<br>Associer chaque signal à sa représentation spectrale.",
    fig:`<div class="figs">${times}</div><div class="figs">${specs}</div>`,choices:["a)","b)","c)"],rows:ws.map((w,i)=>({l:"x"+(i+1),a:ord.indexOf(i)})),keep:true};
}

);
