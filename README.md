# SysCom – Entraînement QCM

Site 100 % statique (HTML/CSS/JS, aucune dépendance, aucun appel réseau) pour s'entraîner au QCM de SysCom.

- Toute la banque de questions à chaque session, ordre aléatoire, options mélangées.
- Questions issues des QCM (screens) + questions marquées « ✦ Créée par IA avec le cours ».
- Valeurs numériques / graphiques régénérés à chaque session.
- Correction uniquement après validation finale : 1 point si la sélection est exactement la bonne, 0 sinon.
- Mode clair / sombre. Aucun cookie, aucun localStorage, rien n'est envoyé : un rechargement remet tout à zéro.

## Publier avec GitHub Pages

Settings → Pages → Source : *Deploy from a branch* → `main` / `/ (root)`.
Note : GitHub Pages sur un dépôt privé demande un plan payant ; sinon, passer le dépôt en public.

## Ajouter une question

Dans `questions.js`, ajouter une fonction dans `BANK` : `()=>M("énoncé",[bonnes réponses],[mauvaises réponses])` (ajouter `{ai:true}` en 4ᵉ argument pour une question créée par IA).
