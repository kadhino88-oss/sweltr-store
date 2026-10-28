# SWELTR — Continuité de travail (source de vérité)
Dernière mise à jour : 2026-10-28

## Objectif obligatoire
Finaliser le sourcing des SEPT produits existants. Ne pas ajouter de produits. Pour chaque variante vendable, vérifier le SKU/VID, couleur/taille, stock réel, prix, livraison vers Suisse (CH) et France (FR), délai, photo exacte, coût rendu et marge. Ne pas dire « validé » sans preuve réelle.

## Projet
- Dépôt : https://github.com/kadhino88-oss/sweltr-store
- Branche de travail connue : `sweltr-catalogue-7-products`
- Catalogue : `lib/winter-products.ts`
- Client API CJ : `lib/cj.ts`
- Route admin : `app/api/admin/find-vid/route.ts`
- Aperçu connu : https://sweltr-store-r7a15ce7z-bk-entreprise.vercel.app
- URL de production connue auparavant : https://sweltr-store-hb5yd65u8-bk-entreprise.vercel.app
- Une vérification HTTP récente a reçu 200 sur cette dernière URL, mais ses métadonnées canoniques indiquaient une autre URL de déploiement. Il faut inspecter le déploiement réellement lié à la production avant de conclure que le site actuel est à jour.
- Ne pas modifier le site tant que les fiches fournisseur/photos des variantes ne sont pas suffisamment vérifiées, sauf correction explicitement nécessaire et sûre.

## Les 7 articles — ne pas en ajouter
1. `plaid-velours-bulle` — Couverture velours à bulles.
2. `pyjama-plaid` — Pyjama-plaid géant. La propriété `image` est actuellement vide ; trouver la fiche fournisseur et la photo de la variante exacte.
3. `bottes-plaid` — Chaussons fourrés d’hiver.
4. `gants-chauffants` — Gants chauffants. Photos actuelles anciennes ; retrouver la référence exacte correspondante.
5. `echarpe-chauffante` — Écharpe chauffante USB. SKU exact et variante actuelle à confirmer.
6. `chauffe-mains` — Chauffe-mains rechargeable.
7. `sous-vetements-thermiques` — Ensemble haut+pantalon. Exigence utilisateur : noir, épais, chaud, idéalement doublé polaire. Les modèles légers ou non noirs ne conviennent pas.

## Pistes publiques déjà repérées (aucune n’est une validation de stock/livraison)
- Ensemble thermique : « Self-heating Dralon Thermal Underwear Set », produit public CJ `1693561949407158272`, SKU précédemment relevé `CJYD182753201AZ`, prix public annoncé 7,35 $, poids annoncé 670 g. Vérifier de nouveau l’identité du SKU, la variante noire, la doublure réelle, stock, tailles, fret CH/FR.
- Couverture velours à bulles : prix public annoncé variable selon variante (1,34–14,18 $). Choisir une dimension/variante précise et calculer le fret.
- Écharpe chauffante USB : piste publique annoncée à environ 9,98 $ sur une variante ; variante noire, stock et correspondance avec l’article existant à confirmer.
- Chauffe-mains : piste publique annoncée 3,01–5,80 $, batterie 1 200 mAh et USB-C annoncés ; conformité, stock et livraison non confirmés.
- Chaussons : alternative publique repérée à environ 3,80 $, poids annoncé 410–450 g ; ne remplacer le modèle actuel qu’après vérification.
- Pyjama-plaid : une piste de sweat à capuche polaire a été trouvée mais pas encore de correspondance suffisamment sûre avec un vrai plaid géant.
- Gants chauffants : pistes publiques repérées, aucune correspondance exacte authentifiée avec les photos de l’actuel catalogue.

Les prix et spécifications publics sont indicatifs et peuvent varier selon la variante. Ne pas les présenter comme des tarifs garantis ou des stocks confirmés.

## API CJ — ce que le code montre
- `lib/cj.ts` lit `CJ_API_KEY` et appelle l’API officielle CJ pour obtenir un access token.
- `app/api/admin/find-vid/route.ts` exige l’en-tête `x-admin-secret` correspondant à `ADMIN_SECRET`, puis interroge `/product/myProduct/query?keyword=...`. Cette route ne recherche que dans « My Products », pas dans tout le catalogue public.
- Ne jamais exposer ni demander à l’utilisateur de coller des secrets dans le chat ou les logs.
- Le paiement CJ est protégé par `CJ_PAYMENT_FLOW_VALIDATED === "true"`. Ne pas activer ni déclencher de paiement réel. Pas de commandes réelles pour tester.
- À faire : utiliser les outils Vercel autorisés pour inspecter les variables présentes sans en révéler les valeurs et les logs si possible ; vérifier si l’API CJ s’authentifie. Ne pas supposer qu’elle fonctionne tant qu’un appel réel ne le confirme.

## Procédure de travail
1. Inspecter la branche et le déploiement Vercel de production actuels.
2. Vérifier accès authentifié CJ de manière sûre ; si l’accès échoue, noter le code d’erreur sans exposer les secrets.
3. Pour chaque produit, chercher fiche publique puis rechercher/associer la référence au compte CJ seulement si l’action est sûre et autorisée, sans paiement.
4. Vérifier variantes/VID, stock et fret par pays (CH et FR) pour la variante précise.
5. Pour les articles électriques/chauffants, vérifier la documentation de sécurité/conformité requise avant de commercialiser.
6. Calculer coût rendu = prix produit + livraison + frais/charges pertinents ; proposer le prix et la marge seulement après réception des coûts.
7. Mettre à jour le catalogue avec les références/photos uniquement une fois validées, puis contrôler build et déploiement.

## Résultat attendu
Un tableau final de sept lignes : produit, fiche exacte, SKU/VID, variante, prix fournisseur, stock vérifié, fret CH, fret FR, délais, coût rendu, prix de vente proposé, marge, source/preuve, statut (validé / incomplet / bloqué).

## Reprise dans un nouveau chat
Copier-coller :
« Reprends SWELTR en lisant le fichier docs/SWELTR_CONTINUITY.md sur le dépôt. Garde exactement les sept produits. Continue les vérifications réelles CJ (SKU/VID, stock, frais de port CH/FR) et contrôle le déploiement. Ne me redemande pas les informations déjà documentées. Ne prétends pas qu’une vérification est faite sans preuve. »
