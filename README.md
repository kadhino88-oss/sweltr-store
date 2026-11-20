# SWELTR — boutique confort saisonnier, livraison internationale

SWELTR est une boutique saisonnière de produits pour l'hiver, construite avec Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, Stripe Checkout et l'API CJ Dropshipping.

## Catalogue actuel

Les prix de vente affichés sont en CHF :
- **Solo Chaleur Mains** — gants chauffants — CHF 36.99
- **Duo Chaleur Totale** — gants chauffants + écharpe chauffante USB — CHF 52.99
- **Kit Grand Froid** — gants chauffants + écharpe chauffante USB + chaussettes thermiques — CHF 62.99

Les prix de vente ne sont pas une confirmation de marge nette. Avant d'ouvrir les ventes, vérifier les prix fournisseur actuels, frais d'expédition, taxes/douane éventuelles, frais Stripe et coûts de retour pour la Suisse et la France.

## Développement local

Prérequis : Node.js compatible avec Next.js 15 et npm.

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Le site démarre sur http://localhost:3000.

## Variables d'environnement

Configurer les valeurs dans Vercel (Production et Preview séparément selon les besoins) :
- `STRIPE_SECRET_KEY` — clé Stripe du mode de test ou live utilisé.
- `STRIPE_WEBHOOK_SECRET` — secret de signature de l'endpoint webhook Stripe.
- `SITE_URL` — URL canonique du déploiement utilisé.
- `CJ_API_KEY` — clé API CJ Dropshipping.
- `ADMIN_SECRET` — secret long et aléatoire pour la route d'administration de recherche de variantes.
- `CJ_AUTO_PAY` — payer automatiquement les commandes CJ avec le solde du compte SWELTR ; laisser `false` tant que le sandbox n'a pas validé le flux.
- `THERMAL_PRODUCT_SALES_ENABLED` — laisser `false` tant que la variante exacte, le stock, l’expédition et le coût livré de l’ensemble thermique n’ont pas été confirmés pour CH et FR.
- `CJ_PAYMENT_FLOW_VALIDATED` — garder `false` jusqu'à ce que le test sandbox confirme la création, la confirmation, la génération du paiement parent et le paiement simulé.
- `STORE_SALES_ENABLED` — garder `false` jusqu'à ce que les tests fournisseurs/Stripe passent et que les prix, stocks, transports, règles de livraison et pages légales soient validés.

Ne jamais committer de fichier `.env.local`, de clé Stripe, de clé CJ ou de secret administrateur.

## Activation des ventes en mode live

Le checkout reste fermé tant que les trois drapeaux `STORE_SALES_ENABLED`, `CJ_AUTO_PAY` et `CJ_PAYMENT_FLOW_VALIDATED` ne sont pas tous à `true`. Il vérifie à nouveau la variante, le stock, la marge, le devis logistique sous 10 jours et le solde CJ avant de créer une session de paiement. Une destination sans transport conforme, ou un solde CJ insuffisant pour financer produit et transport, est refusé avant le paiement Stripe.

## Disponibilité de l’ensemble thermique

La fiche « Ensemble thermique » reste consultable, mais les variantes et le paiement sont bloqués par défaut. Ne définir `THERMAL_PRODUCT_SALES_ENABLED=true` qu’après validation documentée de la couleur et de la taille exactes, du stock réel, du coût et délai d’expédition vers la Suisse et la France, de la marge après frais, et d’un parcours de commande test. La simple présence d’un VID dans la réponse API CJ ne prouve pas le stock ni la disponibilité logistique.

## Paiement et traitement des commandes

1. Le client paie à SWELTR le prix public et les frais de livraison affichés avec Stripe Checkout.
2. Le webhook signé confirme le paiement, puis revalide la commande et le transport.
3. SWELTR crée la commande fournisseur CJ avec l'adresse de livraison du client, l'ajoute au panier CJ, la confirme et génère l'ordre parent / identifiant de paiement.
4. `CJ_AUTO_PAY=true` paie la commande fournisseur avec le solde du compte CJ via `payBalanceV2`. CJ prépare puis expédie le colis à l'adresse transmise après réception du paiement fournisseur.
5. Si le statut CJ confirme qu'une commande est restée non payée, le webhook rembourse le paiement Stripe avec une clé idempotente. Si l'état du paiement fournisseur est ambigu, le webhook renvoie une erreur temporaire afin que Stripe retente au lieu de déclarer la commande traitée.

**Flux de trésorerie :** Stripe encaisse la vente pour SWELTR ; il n'y a aucun partage Stripe automatique avec CJ. Le coût fournisseur et le transport sont débités séparément du solde CJ de SWELTR. La marge brute reste dans le solde Stripe, moins les frais Stripe, remboursements, impôts/taxes et autres charges. Le versement bancaire suit le calendrier Stripe et le solde CJ doit être approvisionné pour financer les commandes.

Le webhook Stripe peut être rejoué. Une commande fournisseur doit être vérifiée dans MyCJ en cas d'erreur ou de réponse réseau ambiguë. Ne pas considérer une commande comme payée, expédiée ou livrée tant que son statut fournisseur n'a pas été vérifié.

## Marchés et devise

Le paiement Checkout est configuré en CHF. La boutique accepte les destinations activées dans la liste internationale du projet uniquement si CJ retourne une méthode de transport estimée à 10 jours maximum pour l'article et l'adresse concernés. La Suisse, la France, les États-Unis, le Canada et le Royaume-Uni sont inclus dans le parcours lorsqu'une telle méthode est disponible. Les prix en CHF et la compatibilité du transporteur doivent être vérifiés pour chaque panier; les taxes, droits de douane et éventuels frais à réception dépendent du pays de destination. Vérifier les obligations locales avant le lancement commercial.

## Vérifications avant lancement

- [ ] Vérifier que les variables Stripe et CJ de Production sont configurées et valides sans afficher leurs valeurs dans les logs.
- [ ] Vérifier le domaine canonique `SITE_URL` et les redirections de paiement.
- [ ] Vérifier que l'endpoint Stripe de production écoute `checkout.session.completed` et `checkout.session.async_payment_succeeded`.
- [ ] Exécuter le flux CJ en sandbox (sans débit réel ni expédition) avec un kit et confirmer l'état fournisseur.
- [ ] Tester Stripe en mode test et vérifier le webhook ainsi que les pages de succès/annulation.
- [ ] Vérifier dans CJ les trois variantes et les coûts livrés vers la Suisse et la France.
- [ ] Vérifier un solde CJ suffisant avant d'activer `CJ_AUTO_PAY` et l'ouverture des ventes.
- [ ] Vérifier les CGV, mentions légales, retours, garantie, identité juridique du vendeur et informations fiscales avec les données réelles de l'entreprise.
- [ ] Vérifier le site sur mobile, les liens, les images, les pages produits, le sitemap et les métadonnées SEO.

## Déploiement

Le projet est relié à GitHub et Vercel. Les commits fusionnés sur `main` déclenchent le déploiement selon la configuration Vercel du projet.
