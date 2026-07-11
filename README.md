# SWELTR — boutique anti-canicule (Next.js + Stripe)

Site vitrine + paiement animé, construit avec Next.js 14 (App Router), TypeScript,
Tailwind CSS, Framer Motion et Stripe Checkout.

## 1. Installer et lancer en local

```bash
npm install
cp .env.local.example .env.local
```

Ouvre `.env.local` et colle ta **clé secrète Stripe** (mode test pour commencer) :
Tableau de bord Stripe → Développeurs → Clés API → "Clé secrète" (`sk_test_...`).

```bash
npm run dev
```

Le site tourne sur http://localhost:3000. Le slider de chaleur, les animations
et le tunnel de paiement Stripe (mode test) fonctionnent directement.

Pour tester un vrai paiement en mode test, utilise la carte Stripe de test
`4242 4242 4242 4242`, une date future, n'importe quel CVC.

## 2. Déployer sur Vercel (5 minutes)

1. Crée un dépôt GitHub avec ce dossier (`git init`, `git add .`, `git commit`, push).
2. Va sur vercel.com → "Add New Project" → importe le dépôt.
3. Dans les "Environment Variables" du projet Vercel, ajoute :
   - `STRIPE_SECRET_KEY` = ta clé Stripe (test puis, plus tard, live `sk_live_...`)
   - `NEXT_PUBLIC_SITE_URL` = l'URL Vercel de ton site (ex: `https://sweltr.vercel.app`)
4. Déploie. C'est en ligne.

Quand tu es prêt à encaisser en vrai : dans Stripe, active ton compte (infos
bancaires + société), remplace `sk_test_...` par `sk_live_...` dans Vercel, et
redéploie.

## 3. Remplacer les placeholders par tes vrais visuels produit

- `components/FanVisual.tsx` : visuel animé provisoire (icône qui tourne).
  Une fois le produit sourcé chez le fournisseur, remplace ce bloc par une
  vraie vidéo produit en boucle :
  ```jsx
  <video autoPlay muted loop playsInline className="rounded-[2.5rem] w-full h-full object-cover" src="/product-loop.mp4" />
  ```
  Dépose le fichier vidéo dans `public/product-loop.mp4`.
- Mets aussi à jour les prix, noms et descriptions dans `lib/data.ts` une fois
  que ton coût fournisseur réel est confirmé (garde une marge d'au moins x2.5
  sur le prix d'achat livré).

## 4. Ce qui est déjà branché

- Paiement Stripe Checkout (montant dynamique selon le kit choisi, redirection
  vers pages `/succes` et `/annulation`).
- Frais de port et pays de livraison configurables dans
  `app/api/checkout/route.ts` (`shipping_address_collection`).
- Toutes les animations (fond qui dérive au scroll, apparitions au scroll,
  slider de chaleur interactif, visuel produit flottant, FAQ animée,
  compte à rebours) sont en Framer Motion, sans dépendance externe payante.

## 5. Ce qu'il te reste à faire côté business

- Ouvrir un compte Stripe (si pas déjà fait) et passer en mode live.
- Sourcer le produit chez CJ Dropshipping (voir échange précédent) et
  remplacer prix/visuels.
- Configurer l'envoi d'email de confirmation (Stripe peut le faire nativement
  dans ses paramètres "Emails de reçus").

## 6. Automatisation CJ Dropshipping (Stripe → CJ automatique)

Le site peut créer automatiquement la commande chez CJ dès qu'un client paie,
sans que tu touches à rien. Voici comment l'activer, étape par étape.

### 6.1 Récupérer les "vid" de tes produits

Une fois un produit ajouté à "Mes produits" sur CJ, appelle cette route (déployée
avec ton site) pour récupérer ses identifiants de variantes :

```
https://TON-SITE.vercel.app/api/admin/find-vid?sku=TON_SKU&secret=TON_ADMIN_SECRET
```

Remplace `TON_SKU` (ex: `CJYD202348102BY`) et `TON_ADMIN_SECRET` (celui que tu as
mis dans la variable d'environnement `ADMIN_SECRET`). La réponse JSON contient un
`vid` par couleur/variante.

### 6.2 Remplir `lib/data.ts`

Pour chaque kit (`solo`, `duo`, `trio`), remplis le champ `cjItems` avec les vid
et quantités correspondants, par exemple :

```ts
cjItems: [{ vid: "92511400-c758-4474-93ca-66d442f5f787", quantity: 1 }],
```

Le kit "Trio" aura 3 entrées (une par produit inclus).

### 6.3 Créer le webhook Stripe

1. Dashboard Stripe → **Développeurs → Webhooks → Add endpoint**
2. URL : `https://TON-SITE.vercel.app/api/webhooks/stripe`
3. Événement à écouter : `checkout.session.completed`
4. Une fois créé, Stripe affiche un **"Signing secret"** (`whsec_...`) → copie-le

### 6.4 Variables d'environnement à ajouter dans Vercel

- `STRIPE_WEBHOOK_SECRET` = le `whsec_...` de l'étape précédente
- `CJ_API_KEY` = déjà fait
- `ADMIN_SECRET` = une chaîne aléatoire de ton choix
- `CJ_AUTO_PAY` = laisse `false` au début (voir avertissement ci-dessous)

Redéploie après chaque ajout de variable.

### 6.5 ⚠️ Avant d'activer `CJ_AUTO_PAY=true`

Tant que `CJ_AUTO_PAY` n'est pas `true`, le webhook crée bien la commande chez
CJ automatiquement, mais **ne la paie pas** — elle reste visible et modifiable
dans MyCJ, à valider toi-même. C'est le mode recommandé les premières semaines.

Quand tu passes `CJ_AUTO_PAY=true` :
- Chaque commande payée sur ton site déclenche une **vraie dépense automatique**
  sur le solde de ton compte CJ, sans validation humaine.
- Assure-toi d'avoir **crédité ton wallet CJ** en amont (Mon Portefeuille sur CJ).
- Teste d'abord plusieurs commandes en mode `false`, vérifie que les adresses,
  quantités et produits sont corrects, avant de basculer en automatique complet.
- Surveille les logs Vercel (`Deployments → ton déploiement → Functions →
  /api/webhooks/stripe`) pour repérer toute erreur de commande.

