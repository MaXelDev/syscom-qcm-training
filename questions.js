"use strict";
const rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
const O=(t,ok=false)=>({t,ok});
const n2=x=>String(+(+x).toFixed(3));
const fr=x=>n2(x).replace(".",",");
const SUM="Σ<sub>n=−∞</sub><sup>+∞</sup>";
const SUMK="Σ<sub>k=−∞</sub><sup>+∞</sup>";

function M(text,good,bad,extra={}){
  return {text,multi:true,options:[...good.map(t=>O(t,true)),...bad.map(t=>O(t))],...extra};
}
function numQ(text,correct,cands,fmt,extra={}){
  const seen=new Set([fmt(correct)]);const opts=[O(fmt(correct),true)];
  for(const c of cands){const s=fmt(c);if(isFinite(c)&&!seen.has(s)){seen.add(s);opts.push(O(s));}}
  let k=1;while(opts.length<5&&k<40){const c=correct+k*(k%2?1:-1)*Math.max(1,Math.round(Math.abs(correct)/4));const s=fmt(c);if(isFinite(c)&&!seen.has(s)){seen.add(s);opts.push(O(s));}k++;}
  return {text,multi:false,options:opts.slice(0,5),...extra};
}
function plot(o){
  const w=o.w||330,h=o.h||175,Lm=32,Rm=10,Tm=12,Bm=24,{x0,x1,y0,y1}=o;
  const sx=x=>Lm+(x-x0)/(x1-x0)*(w-Lm-Rm),sy=y=>h-Bm-(y-y0)/(y1-y0)*(h-Tm-Bm);
  const yax=Math.min(Math.max(0,x0),x1),xay=Math.min(Math.max(0,y0),y1);
  let s=`<svg class="plot" viewBox="0 0 ${w} ${h}" role="img" aria-label="${o.label||"graphique"}">`;
  s+=`<line class="ax" x1="${sx(x0)}" y1="${sy(xay)}" x2="${sx(x1)}" y2="${sy(xay)}"/><line class="ax" x1="${sx(yax)}" y1="${sy(y0)}" x2="${sx(yax)}" y2="${sy(y1)}"/>`;
  for(let t=Math.ceil(x0/o.xs)*o.xs;t<=x1+1e-9;t+=o.xs){s+=`<line class="tk" x1="${sx(t)}" y1="${sy(xay)-3}" x2="${sx(t)}" y2="${sy(xay)+3}"/><text x="${sx(t)}" y="${h-8}" text-anchor="middle">${+t.toFixed(2)}</text>`;}
  for(const v of(o.yt||[])){s+=`<line class="tk" x1="${sx(yax)-3}" y1="${sy(v)}" x2="${sx(yax)+3}" y2="${sy(v)}"/><text x="${sx(yax)-6}" y="${sy(v)+3}" text-anchor="end">${v}</text>`;}
  for(const se of o.series){s+=`<polyline fill="none" stroke="${se.c}" stroke-width="2" stroke-linejoin="round" points="${se.p.map(p=>sx(p[0]).toFixed(1)+","+sy(p[1]).toFixed(1)).join(" ")}"/>`;}
  if(o.title)s+=`<text x="${w-Rm}" y="14" text-anchor="end" class="${o.tcls||""}">${o.title}</text>`;
  return s+"</svg>";
}
const samp=(f,a,b,n=260)=>Array.from({length:n+1},(_,i)=>{const t=a+(b-a)*i/n;return[t,f(t)];});

const BANK=[
/* ===== Questions issues des QCM ===== */
()=>M("On considère la chaine de traitement numérique réalisée par une carte son d'un ordinateur.<br>Sélectionner les propositions correctes.",
["Les effets sonores effectués par la carte son sont réalisés par des calculs numériques.","Le signal d'entrée provenant d'un micro connecté par une prise jack est analogique.","La quantification conduit à une discrétisation des valeurs prises par le signal numérique.","Un filtrage anti-aliasing est le premier traitement réalisé dans la chaine."],
["Le signal de sortie délivré aux haut-parleurs connectés par une prise jack est numérique.","Le signal audio est directement échantillonné par l'ADC.","L'échantillonnage conduit à une discrétisation des valeurs prises par le signal échantillonné.","Le signal numérique obtenu à la sortie de l'ADC a une précision infinie."]),

()=>M("On considère la chaine de traitement numérique réalisée par un système de transmission.<br>Sélectionner les propositions correctes.",
["On trouve forcément un DAC dans l'émetteur et un ADC dans le récepteur.","Dans le cas d'une transmission radio, la fréquence d'échantillonnage au niveau du récepteur dépend de la largeur de bande du signal ramené en bande de base (autour de la fréquence 0).","Lors d'une transmission hertzienne, il est indispensable de transposer le spectre du signal à transmettre sur une fréquence porteuse adaptée à la bande passante du canal.","Dans les systèmes de communication numériques, le signal transmis par le canal est toujours analogique."],
["A l'entrée du récepteur, il y a un filtre anti-repliement suivi d'un DAC.","Le DAC réalise un échantillonnage suivi d'une quantification.","On trouve forcément un ADC dans l'émetteur et un DAC dans le récepteur.","A la sortie de l'émetteur, le signal est numérique."]),

()=>M("Sélectionner les propositions correctes.",
["Un filtre de reconstruction permet de lisser le signal analogique obtenu après une conversion numérique analogique à la sortie d'une chaine de traitement numérique.","Un filtre de reconstruction est placé après un DAC.","Un filtre de reconstruction est un filtre analogique passe bas."],
["Un filtre de reconstruction permet de lisser le signal obtenu après l'ADC.","Un filtre de reconstruction est un filtre qui reconstruit les signaux numériques.","Un filtre de reconstruction est placé après un ADC.","Un filtre de reconstruction est indispensable avant l'étape d'échantillonnage du signal qui sera traité par la chaine de traitement numérique."]),

()=>M("Sélectionner les propositions correctes.",
["Un filtre anti-repliement supprime toutes les fréquences supérieures à Fe/2 du signal analogique.","Un filtre anti-repliement est indispensable avant l'étape d'échantillonnage du signal qui sera traité par la chaine de traitement numérique."],
["Un filtre anti-repliement est un filtre analogique passe-haut.","Un filtre anti-repliement est placé après un DAC.","Un filtre anti-repliement est un filtre qui reconstruit les signaux numériques.","Un filtre anti-repliement supprime toutes les fréquences supérieures à Fe/2 du signal numérique.","Un filtre anti-repliement est placé après un ADC."]),

()=>M("Cochez les affirmations correctes.",
["L'intégrale d'un Dirac retardé de t0 multiplié par un signal donne la valeur de ce signal en t0.","Le Dirac a une intégrale égale à 1.","Le Dirac est la dérivée d'un échelon.","La multiplication d'un Dirac avec un signal donne un Dirac pondéré par la valeur du signal en 0."],
["Le Dirac est la dérivée d'une rampe.","Le Dirac est la dérivée d'un cosinus.","Le Dirac a une intégrale nulle.","Le Dirac est l'intégrale d'un échelon.","Le Dirac a une hauteur nulle."]),

()=>{ // signal inconnu (données variables)
  const D=pick([2,3]),s=pick([2,3]),c=pick([1,2,3]),A=pick([2,3,4]);
  const fx=plot({x0:-1,x1:D+1,y0:-0.25,y1:1.35,xs:1,yt:[1],title:"x(t)",tcls:"lg1",series:[{c:"var(--blue)",p:[[-1,0],[0,0],[0,1],[D,0],[D+1,0]]}],label:"x(t)"});
  const X0=-c-s*D-1;
  const fy=plot({x0:X0,x1:1,y0:-0.3*A,y1:A+0.7,xs:s>2?2:1,yt:[A],title:"signal inconnu",tcls:"lg2",series:[{c:"var(--red)",p:[[X0,0],[-c-s*D,0],[-c,A],[-c,0],[1,0]]}],label:"signal inconnu"});
  const f=t=>`${t}`;
  const items=[[`${A}×x((−${c}−t)/${s})`,true],[`${A}×x((${c}−t)/${s})`],[`x(−t/${s} − ${c}) + ${A}`],[`${A}×x(−t/${s} − ${c})`],[`x((${A}t − ${c})/${s})`],[`x((${c} − ${A}t)/${s})`]];
  return {text:"A quelle version correspond le signal inconnu ?",fig:`<div class="figs">${fx}${fy}</div>`,multi:true,options:items.map(([t,ok])=>O("y(t) = "+t,!!ok))};
},

()=>M("On multiplie un signal continu apériodique <i>x</i>(<i>t</i>) par un peigne de Dirac "+SUM+" δ(<i>t</i>−<i>nT</i>).<br>Quel est le signal obtenu y(t) ?<br>Quelle est l'opération effectuée par cette multiplication ?",
["On échantillonne le signal x(t).",`y(t) = ${SUM} x(nT)·δ(t−nT)`],
["On périodise le signal x(t).",`y(t) = x(T)·${SUM} δ(t−nT)`,`y(t) = ${SUM} x(T)·δ(t−nT)`,`y(t) = ${SUM} x(t−nT)`]),

()=>M("On convolue un signal continu apériodique <i>x</i>(<i>t</i>) de durée T par un peigne de Dirac "+SUM+" δ(<i>t</i>−<i>nT</i>).<br>Quel est le signal obtenu y(t) ?<br>Quelle est l'opération effectuée par cette convolution ?",
[`y(t) = ${SUM} x(t−nT)`,"On périodise le signal x(t)."],
[`y(t) = ${SUM} x(nT)·δ(t−nT)`,`y(t) = ${SUM} (x(t−nT))·δ(t−nT)`,`y(t) = x(nT)·${SUM} δ(t−nT)`,"On échantillonne le signal x(t)."]),

()=>{ // autocorrélation discrète (données variables)
  let x;do{x=Array.from({length:6},()=>rnd(-3,4));}while(new Set(x).size<4||x.every(v=>v===0));
  const N=x.length,R=[];
  for(let m=-(N-1);m<=N-1;m++){let s=0;for(let n=0;n<N;n++){const k=n+m;if(k>=0&&k<N)s+=x[n]*x[k];}R.push(s);}
  const cv=[];for(let k=0;k<2*N-1;k++){let s=0;for(let n=0;n<N;n++){const j=k-n;if(j>=0&&j<N)s+=x[n]*x[j];}cv.push(s);}
  const mid=N-1,E=R[mid];
  const mod=(f)=>{const r=R.slice();f(r);return r;};
  const ds=[mod(r=>r[mid]+=rnd(1,3)),mod(r=>r[mid]-=rnd(1,3)),mod(r=>{const i=rnd(0,N-2);r[i]=-r[i];}),cv,R.map((v,i)=>i<mid?0:v),R.map((v,i)=>i>mid?-v:v),R.map((v,i)=>i===mid?E:0),mod(r=>{const i=rnd(0,N-2);r[i]+=rnd(1,3);})];
  const f=a=>`Rxx=[${a.join(" ")}]`,seen=new Set([f(R)]),opts=[O(f(R),true)];
  for(const d of shuffle(ds)){const s=f(d);if(!seen.has(s)&&opts.length<7){seen.add(s);opts.push(O(s));}}
  return {text:`Soit un signal discret x qui prend les valeurs suivantes :<br>x=[${x.join(" ")}]<br><br>L'autocorrélation du signal x est égale à :`,multi:false,options:opts};
},

()=>M("La fonction d'autocorrélation d'un signal de durée finie permet de mesurer :",
["l'auto-similarité d'un signal","l'énergie du signal en t=0"],
["la puissance instantanée du signal","l'auto-distance entre 2 signaux","la puissance du signal en t=0","la similarité entre 2 signaux","la distance entre 2 signaux"]),

()=>{ // intercorrélation graphique (données variables)
  const a=pick([2,3]),W=pick([3,4,5,6]);
  const C=t=>{if(t>=0)return 0;const u=Math.min(t+W,0);return u<=t?0:a*(Math.exp(u/a)-Math.exp(t/a))/a;};
  const fs=[C,t=>C(t-W),t=>C(-t),t=>C(-t-W)];
  const R=W+3*a+2;
  const x1=plot({x0:-5*a,x1:3,y0:-0.15,y1:1.2,xs:a>2?5:5,yt:[0.5,1],title:"x1(t)",tcls:"lg1",series:[{c:"var(--blue)",p:[...samp(t=>Math.exp(t/a),-5*a,0,200),[0,0],[3,0]]}],label:"x1(t)"});
  const x2=plot({x0:-2,x1:W+2,y0:-0.15,y1:1.2,xs:1,yt:[0.5,1],title:"x2(t)",tcls:"lg1",series:[{c:"var(--blue)",p:[[-2,0],[0,0],[0,1],[W,1],[W,0],[W+2,0]]}],label:"x2(t)"});
  const opts=fs.map((f,i)=>O(plot({x0:-R,x1:R,y0:-0.15,y1:1.1,xs:5,yt:[0.5,1],series:[{c:"var(--blue)",p:samp(t=>f(t)/ (1-Math.exp(-W/a)),-R,R,300)}],label:"proposition"}),i===0));
  return {text:"Déterminer R<sub>x1x2</sub>(τ) l'inter-corrélation de x1(t) avec x2(t) représentés ci-dessous : <br><small>x1(t)=e<sup>t/"+a+"</sup> pour t&lt;0 (nul sinon) ; x2(t)=1 sur [0 ; "+W+"] (nul sinon). Courbes normalisées par leur maximum.</small>",fig:`<div class="figs">${x1}${x2}</div>`,multi:false,grid:true,options:opts};
},

()=>{ // expression de y(t) (données variables)
  const s=pick([2,2,4]),c=pick([1,2,3]),fq=0.7;
  const X0=-c-5*s-1,xf=t=>(t>=0&&t<=5)?Math.sin(2*Math.PI*fq*t):0;
  const yf=t=>xf((-t-c)/s);
  const fig=plot({w:560,h:230,x0:X0,x1:6,y0:-1.25,y1:1.25,xs:s>2?4:2,yt:[-1,0,1],series:[{c:"var(--blue)",p:samp(xf,X0,6,900)},{c:"var(--red)",p:samp(yf,X0,6,900)}],label:"x(t) en bleu, y(t) en rouge"}).replace("</svg>",`<text x="340" y="16" class="lg1">x(t)</text><text x="380" y="16" class="lg2">y(t)</text></svg>`);
  const good=[`y(t) = x((−t−${c})/${s})`,`y(t) = x(−${n2(1/s)}t − ${n2(c/s)})`];
  const bad=[`y(t) = x(−t/${s} − ${c})`,`y(t) = x(${n2(1/s)}(t+${c}))`,`y(t) = x(${s}(−t−${c}))`,`y(t) = x((−t+${c})/${s})`];
  return {text:"Quelle est l'expression de y(t) ? <small>(x(t) en bleu, y(t) en rouge)</small>",fig:`<div class="figs">${fig}</div>`,multi:true,options:[...good.map(t=>O(t,true)),...bad.map(t=>O(t))]};
},

()=>{ // série de Fourier réelle (données variables)
  const T=pick([2,4,5,10,20]),m=pick([1,2,3]),Am=m+pick([1,2]),f0=1000/T,fw=f0*2.5;
  return M(`Soit x(t) un signal réel et périodique de période T=${T}ms, de valeur moyenne égale à ${m}V, d'amplitude max de ${Am}V.<br>On considère sa décomposition en Série de Fourier réelle à l'aide des coefficients de Fourier a<sub>k</sub> et b<sub>k</sub>.`,
  ["Le signal x(t) peut être entièrement reconstruit à l'aide de fonctions trigonométriques.",`La fréquence fondamentale du signal est égale à ${n2(f0)}Hz.`,"Si x(t) est pair, les b<sub>k</sub> sont nuls.","La série de Fourier est une somme infinie de fonctions cosinus et sinus pondérées respectivement par les coefficients a<sub>k</sub> et b<sub>k</sub>.","La valeur moyenne du signal est égale à a<sub>0</sub>, coefficient de Fourier calculé pour une pulsation nulle.","Le coefficient a<sub>k</sub> mesure la ressemblance du signal x(t) avec le cos(k·ω<sub>0</sub>·t) avec ω<sub>0</sub>=2π/T."],
  [`La fréquence fondamentale est égale à ${n2(fw)}Hz.`,"Le 3eme harmonique du signal oscille à une fréquence 3 fois moins rapide que la fréquence du signal périodique.",`a<sub>0</sub> = (1/T)∫<sub>−T/2</sub><sup>+T/2</sup> x(t)dt = ${Am}`]);
},

()=>M("Soit x(t) un signal de durée finie T, correspondant au motif fondamental du signal périodique x<sub>p</sub>(t).",
["Les coefficients de Fourier X<sub>k</sub> peuvent être déterminés à l'aide de la transformée de Fourier de x(t).","Le spectre de x<sub>p</sub>(t) est discret.","X<sub>k</sub> = (1/T)·X(k/T) avec X(f) = TF{x(t)}."],
["X<sub>k</sub> = ⟨x<sub>p</sub>(t), e<sup>−jkω<sub>0</sub>t</sup>⟩ avec ω<sub>0</sub> = 2π/T (produit scalaire sur une période).","Le spectre de x(t) est discret."]),

()=>M("Soit x(t) un signal périodique de puissance finie, de période T.<br>Soit P sa puissance moyenne.",
[`P = ${SUMK} |X<sub>k</sub>|²`,"X<sub>n</sub> = (1/T)∫<sub>(T)</sub> x(t)·exp(−j2πnt/T) dt est le coefficient de Fourier de la Série de Fourier Complexe.","Le module de X<sub>n</sub> est pair et la phase de X<sub>n</sub> est impaire si x(t) est réel."],
["Le coefficient de Fourier X<sub>n</sub> est un nombre réel quel que soit le signal périodique.","X<sub>n</sub> = (1/T)∫<sub>(T)</sub> x(t)·exp(+j2πnt/T) dt est le coefficient de Fourier de la Série de Fourier Complexe.","Le signal harmonique de rang k est égal à x<sub>harmk</sub> = X<sub>k</sub>·exp(−jkω<sub>0</sub>t) + X<sub>−k</sub>·exp(jkω<sub>0</sub>t).","Le module de X<sub>n</sub> est impair et la phase de X<sub>n</sub> est paire si x(t) est réel."]),

()=>M("Soit x(t) un signal périodique réel de puissance finie, de période T.<br>Soit P sa puissance moyenne.",
["Si x(t) est pair : b<sub>n</sub> = 0 et a<sub>n</sub> = (4/T)∫<sub>(T/2)</sub> x(t)cos(2πnt/T)dt pour n&gt;1.","Si x(t) est impair : a<sub>n</sub> = 0 pour n&gt;=0 et b<sub>n</sub> = (4/T)∫<sub>(T/2)</sub> x(t)sin(2πnt/T)dt pour n&gt;1.","P = a<sub>0</sub>² + Σ<sub>k=1</sub><sup>+∞</sup> (a<sub>k</sub>²+b<sub>k</sub>²)/2.","La puissance moyenne du signal x(t) est égale à la somme des puissances moyennes des différents harmoniques et de sa valeur moyenne au carré.","P = (1/T)∫<sub>T</sub> |x(t)|² dt."],
["a<sub>n</sub> = (4/T)∫<sub>(T/2)</sub> x(t)cos(2πnt/T)dt pour n&gt;=0."]),

/* ===== Questions créées par IA ===== */
()=>{const f=pick([3,4,5,8,10,12,20]);return numQ(`Un signal analogique a un spectre limité à <b>${f} kHz</b> (aucune composante au-delà). Quelle est la fréquence d'échantillonnage minimale pour pouvoir le reconstruire sans repliement (théorème de Shannon) ?`,2*f,[f,f/2,4*f,1.5*f],v=>`${fr(v)} kHz`,{ai:true});},
()=>{const Fe=pick([8,10,12,16,20]);let f0,a;do{f0=rnd(Fe/2+1,Math.floor(1.5*Fe));a=f0%Fe;if(a>Fe/2)a=Fe-a;}while(a===0||f0%Fe===0);return numQ(`Une sinusoïde de fréquence <b>${f0} kHz</b> est échantillonnée sans filtre anti-repliement à <b>Fe = ${Fe} kHz</b>. A quelle fréquence apparaît-elle dans le spectre du signal échantillonné (entre 0 et Fe/2) ?`,a,[f0,Math.abs(f0-Fe),f0-Fe/2,Fe/2,a+1,a+2],v=>`${fr(v)} kHz`,{ai:true});},
()=>{const N=pick([8,10,12,16]),V=pick([2,4,5,10]),q=V*1000/2**N;const fm=v=>v>=1?`${n2(+v.toPrecision(3)).replace(".",",")} mV`:`${n2(+(v*1000).toPrecision(3)).replace(".",",")} µV`;return numQ(`Un CAN (ADC) de <b>${N} bits</b> numérise des tensions sur une plage de <b>${V} V</b> (de 0 à ${V} V). Quel est le pas de quantification q ?`,q,[V*1000/2**(N-1),V*1000/2**(N+1),V*1000/N,V*1000/(2*N)],fm,{ai:true});},
()=>{const N=pick([6,8,10,12]);return numQ(`Combien de niveaux de quantification distincts un CAN de <b>${N} bits</b> peut-il fournir ?`,2**N,[N*N,2*N,2**(N-1),10*N],v=>String(v),{ai:true});},
()=>{const a0=rnd(1,4),A=rnd(1,4),B=rnd(1,4),P=a0*a0+(A*A+B*B)/2;return numQ(`Soit x(t) = ${a0} + ${A}·cos(2πf<sub>0</sub>t) + ${B}·sin(2πf<sub>0</sub>t) (en V). Quelle est sa puissance moyenne P (en V²) ?`,P,[a0*a0+A*A+B*B,(A*A+B*B)/2,a0*a0+(A+B)**2/2,a0+(A*A+B*B)/2],v=>`${fr(v)} V²`,{ai:true});},
()=>{const T=pick([2,4,5,8,10,20]),k=pick([2,3,4,5]),f0=1000/T;return numQ(`Un signal périodique a pour période <b>T = ${T} ms</b>. Quelle est la fréquence de son <b>harmonique de rang ${k}</b> ?`,k*f0,[f0/k,f0,(k+1)*f0,k*f0*2,1000*k/(T*T)],v=>`${fr(v)} Hz`,{ai:true});},
()=>{const a=rnd(1,3),b=rnd(1,5),t0=pick([-2,-1,1,2,3]);return numQ(`Calculer l'intégrale ∫<sub>−∞</sub><sup>+∞</sup> (${a}t² + ${b})·δ(t − ${t0}) dt`.replace("− -","+ "),a*t0*t0+b,[b,a*t0+b,a+b,0,a*t0*t0],v=>fr(v),{ai:true});},
()=>{const a=pick([2,4]),b=pick([2,4,6]),D=pick([2,4,6,8]);const iv=([p,q])=>`[${fr(p)} ; ${fr(q)}]`;const q=numQ(`Le signal x(t) est nul en dehors de [0 ; ${D}]. Quel est le support de y(t) = x(${a}t − ${b}) ?`,0,[],v=>"",{ai:true});const c=[[b/a,(b+D)/a],[-b/a,(D-b)/a],[a*b,a*(b+D)],[b/a,b/a+D*a],[b,b+D],[b-D,b]];const seen=new Set(),opts=[];c.forEach((p,i)=>{const s=iv(p);if(!seen.has(s)&&opts.length<5){seen.add(s);opts.push(O(s,i===0));}});q.options=opts;return q;},
()=>{let x;do{x=Array.from({length:5},()=>rnd(-3,4));}while(x.every(v=>v===0));const E=x.reduce((s,v)=>s+v*v,0),S=x.reduce((s,v)=>s+v,0);return numQ(`Soit le signal discret x=[${x.join(" ")}]. Combien vaut son autocorrélation en 0, R<sub>xx</sub>(0) ?`,E,[S*S,x.reduce((s,v)=>s+Math.abs(v),0),Math.max(...x)**2,E+1,E-2],v=>String(v),{ai:true});},
()=>M("Soit un signal réel x(t) d'énergie finie et R<sub>xx</sub>(τ) son autocorrélation. Sélectionner les propositions correctes.",
["R<sub>xx</sub>(τ) = R<sub>xx</sub>(−τ).","|R<sub>xx</sub>(τ)| ≤ R<sub>xx</sub>(0) pour tout τ.","R<sub>xx</sub>(0) est égale à l'énergie du signal.","Pour un signal discret de N échantillons, R<sub>xx</sub> comporte 2N−1 échantillons."],
["R<sub>xx</sub> est antisymétrique (impaire) pour un signal réel.","R<sub>xx</sub>(0) est la valeur minimale de R<sub>xx</sub>.","R<sub>xx</sub>(τ) mesure la distance entre le signal et sa version décalée.","Pour un signal discret de N échantillons, R<sub>xx</sub> comporte N échantillons."]).constructor===Object?(()=>{const q=M("Soit un signal réel x(t) d'énergie finie et R<sub>xx</sub>(τ) son autocorrélation. Sélectionner les propositions correctes.",["R<sub>xx</sub>(τ) = R<sub>xx</sub>(−τ).","|R<sub>xx</sub>(τ)| ≤ R<sub>xx</sub>(0) pour tout τ.","R<sub>xx</sub>(0) est égale à l'énergie du signal.","Pour un signal discret de N échantillons, R<sub>xx</sub> comporte 2N−1 échantillons."],["R<sub>xx</sub> est antisymétrique (impaire) pour un signal réel.","R<sub>xx</sub>(0) est la valeur minimale de R<sub>xx</sub>.","R<sub>xx</sub>(τ) mesure la distance entre le signal et sa version décalée.","Pour un signal discret de N échantillons, R<sub>xx</sub> comporte N échantillons."],{ai:true});return q;})():null,
()=>M("Soit un signal x(t) et un Dirac retardé δ(t−t<sub>0</sub>) avec t<sub>0</sub>&gt;0. Sélectionner les propositions correctes.",
["x(t) * δ(t−t<sub>0</sub>) = x(t−t<sub>0</sub>) : la convolution retarde le signal de t<sub>0</sub>.","x(t) * δ(t) = x(t) : le Dirac est l'élément neutre de la convolution.","x(t)·δ(t−t<sub>0</sub>) = x(t<sub>0</sub>)·δ(t−t<sub>0</sub>)."],
["x(t) * δ(t−t<sub>0</sub>) = x(t<sub>0</sub>)·δ(t−t<sub>0</sub>).","x(t)·δ(t−t<sub>0</sub>) = x(t−t<sub>0</sub>).","La convolution par un Dirac retardé échantillonne le signal."],{ai:true}),
()=>M("Soit x(t) un signal réel périodique de période T, de coefficients de Fourier complexes X<sub>k</sub> (ω<sub>0</sub>=2π/T) et de série réelle x(t) = a<sub>0</sub> + Σ<sub>k≥1</sub> (a<sub>k</sub>cos(kω<sub>0</sub>t) + b<sub>k</sub>sin(kω<sub>0</sub>t)). Sélectionner les propositions correctes.",
["X<sub>0</sub> = a<sub>0</sub> est la valeur moyenne de x(t).","X<sub>−k</sub> est le complexe conjugué de X<sub>k</sub>.","a<sub>k</sub> = 2·Re(X<sub>k</sub>) pour k ≥ 1.","b<sub>k</sub> = −2·Im(X<sub>k</sub>) pour k ≥ 1."],
["Les coefficients X<sub>k</sub> sont réels quel que soit le signal.","Le spectre de x(t) est continu.","a<sub>k</sub> = Re(X<sub>k</sub>) pour k ≥ 1.","La puissance de x(t) vaut |X<sub>0</sub>|² uniquement."],{ai:true}),
()=>{const ch=["Filtre anti-repliement","Échantillonneur-bloqueur / CAN (ADC)","Traitement numérique","CNA (DAC)","Filtre de reconstruction"];const good=ch.join(" → ");const bad=[[0,2,1,3,4],[1,0,2,3,4],[0,1,2,4,3],[4,1,2,3,0]].map(p=>p.map(i=>ch[i]).join(" → "));return {text:"Dans une chaine de traitement numérique d'un signal analogique, quel est l'ordre correct des blocs, de l'entrée vers la sortie ?",multi:false,ai:true,options:[O(good,true),...bad.map(t=>O(t))]};}
].filter(Boolean);
