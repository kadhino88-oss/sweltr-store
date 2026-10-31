# SWELTR — boutique hiver (Suisse & France)

SWELTR est une boutique saisonnière de produits pour l'hiver, construite avec Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Stripe Checkout et l'API CJ Dropshipping.

## Catalogue actuel

Les prix de vente affichés sont en CHF :
- **Solo Chaleur Mains** — gants chauffants — CHF 36.99
- **Duo Chaleur Totale** — gants chauffants + écharpe chauffante USB — CHF 52.99
- **Kit Grand Froid** — gants chauffants + écharpe chauffante USB + chaussettes thermiques — CHF 62.99

Les prix de vente ne sont pas une confirmation de marge nette. Avant d'ouvrir les ventes, vérifier les prix fournisseur actuels, frais d'expédition, taxes/douane éventuelles, frais Stripe et coûts de retour pour la Suisse et la France.

## Développement local

Prérequis : Node.js compatible avec Next.js 14 et npm.

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
- `CJ_AUTO_PAY` — laisser `false` tant que le flux fournisseur n'a pas été validé manuellement.
- `THERMAL_PRODUCT_SALES_ENABLED` — laisser `false` tant que la variante exacte, le stock, l’expédition et le coût livré de l’ensemble thermique n’ont pas été confirmés pour CH et FR.
- `CJ_PAYMENT_FLOW_VALIDATED` — laisser absent ou `false`. Le paiement CJ reste bloqué par une garde de sécurité tant que le flux complet n'a pas été implémenté et testé de bout en bout.

Ne jamais committer de fichier `.env.local`, de clé Stripe, de clé CJ ou de secret administrateur.

## Disponibilité de l’ensemble thermique

La fiche « Ensemble thermique » reste consultable, mais les variantes et le paiement sont bloqués par défaut. Ne définir `THERMAL_PRODUCT_SALES_ENABLED=true` qu’après validation documentée de la couleur et de la taille exactes, du stock réel, du coût et délai d’expédition vers la Suisse et la France, de la marge après frais, et d’un parcours de commande test. La simple présence d’un VID dans la réponse API CJ ne prouve pas le stock ni la disponibilité logistique.

## Paiement et traitement des commandes

1. Le client choisit un kit et est redirigé vers Stripe Checkout.
2. Le paiement est confirmé côté serveur à partir de Stripe.
3. Le webhook `/api/webhooks/stripe` vérifie la signature et l'état payé avant de préparer la commande CJ.
4. **Ne pas activer `CJ_AUTO_PAY` ni `CJ_PAYMENT_FLOW_VALIDATED` pour l'instant.** Le code actuel ne doit pas être considéré comme une automatisation fournisseur validée de bout en bout. Le code bloque désormais le paiement CJ tant que `CJ_PAYMENT_FLOW_VALIDATED=true` n'a pas été défini après validation complète.
5. La documentation officielle CJ décrit un flux de synchronisation comprenant la création de commande, l'ajout au panier, la confirmation du panier, la génération de la commande parent / de l'identifiant de paiement, puis le paiement avec les identifiants retournés. Le code actuel ne démontre pas que toutes ces étapes sont effectuées correctement pour les kits SWELTR.
6. Avant toute automatisation réelle, implémenter et tester le flux CJ complet en environnement contrôlé, confirmer le statut et les identifiants retournés à chaque étape, puis vérifier les coûts livrés et la disponibilité de chaque variante pour CH et FR.

Le webhook Stripe peut être rejoué. Une commande fournisseur doit être vérifiée dans MyCJ en cas d'erreur ou de réponse réseau ambiguë. Ne pas considérer une commande comme payée, expédiée ou livrée tant que son statut fournisseur n'a pas été vérifié.

## Marchés et devise

Le paiement Checkout est configuré en CHF et la livraison est limitée à la Suisse (CH) et à la France (FR). Vérifier les obligations fiscales, douanières, d'information précontractuelle et de protection des consommateurs applicables dans les deux pays avant le lancement commercial.

## Vérifications avant lancement

- [ ] Vérifier que les variables Stripe et CJ de Production sont configurées et valides sans afficher leurs valeurs dans les logs.
- [ ] Vérifier le domaine canonique `SITE_URL` et les redirections de paiement.
- [ ] Effectuer un paiement de test Stripe et vérifier les pages de succès/annulation.
- [ ] Tester le webhook avec les événements Stripe de test.
- [ ] Vérifier dans CJ les trois variantes et les coûts livrés vers la Suisse et la France.
- [ ] Effectuer une commande test fournisseur sans activer le paiement automatique.
- [ ] Vérifier les CGV, mentions légales, retours, garantie, identité juridique du vendeur et informations fiscales avec les données réelles de l'entreprise.
- [ ] Vérifier le site sur mobile, les liens, les images, les pages produits, le sitemap et les métadonnées SEO.

## Déploiement

Le projet est relié à GitHub et Vercel. Les commits fusionnés sur `main` déclenchent le déploiement selon la configuration Vercel du projet.
