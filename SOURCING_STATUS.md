# SWELTR — état du sourcing fournisseur
Mise à jour : 28 octobre 2026

## Objectif non négociable
Conserver exactement les sept produits de la collection hiver. Ne pas ajouter de catégories. Ne jamais déclarer un produit prêt à vendre sans référence exacte, variante, stock, frais/délai d'expédition et conformité vérifiés.

## État du dépôt et du site
- Dépôt : https://github.com/kadhino88-oss/sweltr-store
- Branche de référence actuelle : `main` (ne pas se baser sur l'ancienne branche `sweltr-catalogue-7-products` sans comparer les commits).
- Catalogue : `lib/winter-products.ts`
- Client API CJ : `lib/cj.ts`
- Route admin existante : `app/api/admin/find-vid/route.ts`
- Site de production indiqué dans le dépôt : https://sweltr-store-five.vercel.app
- Contrôle effectué le 28 octobre 2026 : la page d'accueil de production répond HTTP 200.
- Une tentative de lecture d'une route de déploiement protégée par Vercel a été refusée par l'authentification du déploiement. Aucun secret n'a été contourné.
- La route CJ existante exige `x-admin-secret` et ne cherche que dans `product/myProduct/query`. Sans accès autorisé au secret, le stock réel et les VID ne peuvent pas être interrogés à partir de cette route.

## Les sept produits à conserver
1. `plaid-velours-bulle` — couverture velours à bulles.
2. `pyjama-plaid` — pyjama-plaid géant.
3. `bottes-plaid` — chaussons fourrés.
4. `gants-chauffants` — gants chauffants.
5. `echarpe-chauffante` — écharpe chauffante USB.
6. `chauffe-mains` — chauffe-mains rechargeable.
7. `sous-vetements-thermiques` — ensemble haut + pantalon.

## Résultats vérifiables des recherches publiques

### Ensemble thermique noir et épais — NON VALIDÉ
- Fiche CJ publique : https://cjdropshipping.com/product/winter-dralon-quick-hot-thermal-underwear-set-p-1694170605223944192.html
- SKU affiché sur la variante publique par défaut : `CJYD182864101AZ`
- Prix affiché : 6,27 USD ; poids annoncé : 520–560 g.
- La description cite des variantes noires, mais la variante chargée par défaut est café. La page publique affiche « Inventory: -- » et exige une connexion pour calculer l'expédition.
- Conclusion : piste de recherche uniquement. Ne pas publier cette référence tant que la variante noire précise, le stock et le coût livré ne sont pas vérifiés.
- Autre piste publique : https://cjdropshipping.com/product/plush-thermal-underwear-set-winter-keep-werm-p-CEA1A402-F09E-415A-B3F5-076A0ECAB5B4.html — 6,48–12,94 USD affichés, 340–700 g, mais la variante sélectionnée est gris foncé et le stock reste non indiqué. Ne répond pas encore au critère noir confirmé.
- Le modèle slimfit à 220 g/m² est écarté : il ne répond pas au critère d'un ensemble très épais.

### Écharpe chauffante USB — piste publique, non validée
- Fiche repérée : https://cjdropshipping.com/product/usb-women-men-heating-scarf-temperature-scarf-3-gears-adjustable-usb-charging-heat-control-neck-warmer-for-cycling-camping-usb-heated-scarf---temperature-adjustable-heating-scarf-p-1707960135605702656.html
- Prix public précédemment observé autour de 9,98 USD pour une variante grise ; le noir, le stock et la correspondance avec le produit actuel de SWELTR doivent être confirmés.

### Autres articles
- Couverture, pyjama-plaid, chaussons, gants et chauffe-mains : des images et/ou pistes publiques figurent déjà dans `lib/winter-products.ts` et les échanges de recherche, mais aucun coût livré CH/FR ni stock réel n'a été authentifié dans cette session.
- Les photos du pyjama-plaid ont été remplies sur la branche `main` au moment du dernier contrôle, mais la référence fournisseur exacte et la variante doivent encore être validées.

## Ce que CJ confirme sur l'expédition
- La documentation CJ précise que les frais et délais varient selon destination, poids, dimensions, attributs et canal logistique. Le calculateur public peut demander une connexion et donne une estimation ; le coût réel peut varier.
- Tutoriel CJ sur le calcul des frais/délais : https://cjdropship.com/fr/comment-v%C3%A9rifier-les-d%C3%A9lais-et-les-frais-d%27exp%C3%A9dition-sur-cj/
- Documentation API officielle produits/variantes : https://developers.cjdropshipping.com/en/api/api2/api/product.html

## Prochaines actions, dans l'ordre
1. Obtenir un résultat authentifié depuis l'API CJ via la configuration sécurisée existante, sans afficher ni demander les secrets dans le chat.
2. Pour chaque produit : récupérer le product ID, les VID des variantes exactes, les couleurs/tailles, le stock et le prix fournisseur.
3. Calculer séparément l'expédition vers CH et FR avec le poids/dimensions et une méthode de transport disponible ; noter méthode, délai estimé et coût.
4. Pour l'ensemble thermique, ne garder que du noir confirmé et une vraie doublure chaude/polaire confirmée par fiche ou photos détaillées. Ne pas substituer un modèle fin.
5. Contrôler les exigences de conformité pour les produits électriques/chauffants et batteries avant vente.
6. Calculer le coût rendu, puis la marge après livraison, frais de paiement, taxes/douane et retours potentiels.
7. Ne modifier les fiches produits qu'après validation ; vérifier ensuite build et déploiement.
8. Ne pas activer le paiement automatique CJ. Le code protège les paiements derrière `CJ_PAYMENT_FLOW_VALIDATED`; ne pas modifier cette garde sans test complet.

## Statut synthétique
- Page de production : répond HTTP 200 lors du contrôle.
- Sept produits conservés.
- Stocks et expéditions : NON CONFIRMÉS.
- Ensemble thermique noir épais : NON VALIDÉ.
- Aucun achat ni paiement fournisseur effectué.
