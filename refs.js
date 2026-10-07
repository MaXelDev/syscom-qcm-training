"use strict";
/* Pages du poly de cours (numéros de pages du PDF) pour chaque question, dans l'ordre de BANK (questions.js puis questions2.js).
   Les numéros imprimés sur les diapos peuvent être décalés de 1 à 2 pages. */
const REFS=[
"p. 14, 20–22, 34, 38, 42",
"p. 15, 19, 33, 37 ; p. 132–136 ; p. 141",
"p. 39–42 ; p. 142",
"p. 35–38 ; p. 140",
"p. 72–75 ; p. 126",
"p. 76–77",
"p. 78–79 ; p. 138",
"p. 126–127 ; p. 75",
"p. 82–86",
"p. 82–84",
"p. 87–94",
"p. 76–77",
"p. 96–99 ; p. 105",
"p. 107–109 ; p. 128",
"p. 100–101 ; p. 104–105",
"p. 97–99 ; p. 105",
"p. 139–142",
"p. 45–49 ; p. 140",
"p. 21, 26–28",
"p. 21, 26–27",
"p. 69 ; p. 105",
"p. 97 ; p. 101",
"p. 75",
"p. 76–77",
"p. 84",
"p. 84–86",
"p. 126",
"p. 100–101 ; p. 105",
"p. 13–15 ; p. 35–42",
"p. 76–77",
"p. 109–111",
"p. 137–139 ; p. 78–79",
"p. 76–77",
"p. 139–142 ; p. 209",
"p. 111 ; p. 113 ; p. 126",
"p. 118 ; p. 127 ; p. 129–130 ; p. 137–139",
"p. 29–30",
"p. 111 ; p. 113"
];
BANK.forEach((f,i)=>{if(REFS[i]){BANK[i]=()=>({...f(),ref:REFS[i]});}});
const _card=card;
card=function(i){
  const h=_card(i),r=S.qs[i].ref;
  return(S.done&&r)?h.replace(/<\/article>\s*$/,`<div class="ref">📖 <b>Poly de cours :</b> ${r}</div></article>`):h;
};
