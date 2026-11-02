export type WinterProduct = {
  slug: string;
  name: string;
  eyebrow: string;
  short: string;
  description: string;
  image: string;
  images?: string[];
  alt: string;
  highlights: string[];
  category: string;
  availability: "planned" | "existing";
  /** Prix public SWELTR en CHF, communiqué ou fixé à partir du coût fournisseur. */
  retailPrice?: number;
  /** Variantes confirmées dans la fiche CJ consultée. */
  variants?: string[];
  /** État fournisseur observé, avec date, sans synchronisation temps réel. */
  supplierStock?: string;
  href?: string;
};

export const WINTER_PRODUCTS: WinterProduct[] = [
  {
    slug: "plaid-velours-bulle",
    name: "Couverture velours à bulles",
    eyebrow: "DOUCEUR HIVERNALE",
    short: "Le plaisir d’une pause cocooning, avec une texture à bulles qui donne envie de s’installer et de ralentir.",
    description: "La couverture velours à bulles est pensée pour les soirées canapé, la lecture et les moments de repos à la maison. Son relief moelleux apporte une présence douce et chaleureuse au coin détente. Le visuel correspond à la référence CJ sélectionnée ; dimensions, coloris et composition de la variante vendue seront confirmés avant l’ouverture des commandes.",
    image: "https://cf.cjdropshipping.com/17026848/1735911896785227776.jpg",
    alt: "Couverture velours à bulles — fiche fournisseur CJ Dropshipping",
    highlights: ["Un essentiel cocooning pour les soirées à la maison", "Texture à bulles visible sur le modèle sélectionné", "Prix public SWELTR : 49,99 CHF · vente bientôt ouverte"],
    category: "Confort maison",
    availability: "planned",
    retailPrice: 49.99,
  },
  {
    slug: "pyjama-plaid",
    name: "Pyjama-plaid géant",
    eyebrow: "COCOONING",
    short: "Enfile une grande couche douillette pour lire, regarder un film ou savourer un moment tranquille à la maison.",
    description: "Le pyjama-plaid géant mise sur une silhouette ample et enveloppante, idéale pour les moments cocooning à la maison. Il apporte une couche de confort facile à enfiler lorsque l’on veut se détendre sans composer une tenue compliquée. Le prix public SWELTR est fixé ; les tailles, la composition textile, les coloris et la variante exacte seront vérifiés sur la fiche CJ avant l’ouverture des commandes.",
    image: "https://oss-cf.cjdropshipping.com/product/2023/11/28/10/2f1b5416-a877-476f-89fa-bc5e0f337fe7.jpg",
    alt: "Sweat-plaid à capuche — photo fournisseur CJ Dropshipping",
    highlights: ["Une coupe ample pour les moments détente", "Facile à enfiler pour le cocooning à la maison", "Prix public SWELTR : 44,99 CHF · tailles bientôt confirmées"],
    category: "Vêtements cocooning",
    availability: "planned",
    retailPrice: 44.99,
  },
  {
    slug: "bottes-plaid",
    name: "Chaussons fourrés d’hiver",
    eyebrow: "PIEDS AU CHAUD",
    short: "Un petit rituel de confort à la maison : des chaussons fourrés fantaisie pour accompagner les journées fraîches.",
    description: "Ces chaussons fourrés apportent une note ludique aux instants passés à la maison et complètent naturellement une tenue cocooning. Le visuel de la référence sélectionnée montre une finition douce et fantaisie. Le prix public SWELTR est fixé ; les pointures, coloris et détails de la variante livrée seront contrôlés avant toute commande.",
    image: "https://oss.cjdropshipping.com/product/2024/09/19/08/3ab0ae46-564b-4eca-b6a0-096cbbd211f8.jpg",
    alt: "Chaussons fourrés fantaisie — photo fournisseur CJ Dropshipping",
    highlights: ["Une touche fantaisie pour le confort à la maison", "Pensés pour les moments détente en intérieur", "Prix public SWELTR : 29,99 CHF · pointures bientôt confirmées"],
    category: "Confort des pieds",
    availability: "planned",
    retailPrice: 29.99,
  },
  {
    slug: "gants-chauffants",
    name: "Gants chauffants",
    eyebrow: "CHALEUR EN MOUVEMENT",
    short: "Un article inclus dans les kits d’hiver SWELTR concernés.",
    description: "Les gants chauffants figurent dans le contenu des kits Solo, Duo et Kit Grand Froid. Consulte la fiche du kit choisi ; la notice fournie précise les consignes exactes du modèle.",
    image: "https://cf.cjdropshipping.com/20180920/2155711379153.jpg",
    images: [
      "https://cf.cjdropshipping.com/20180920/2155711379153.jpg",
      "https://cf.cjdropshipping.com/20180920/28896142656039.jpg",
      "https://cf.cjdropshipping.com/20180920/188040013818.jpg",
    ],
    alt: "Gants chauffants",
    highlights: ["Inclus dans les trois kits d’hiver", "Le prix indiqué correspond au kit complet", "Notice du modèle à consulter avant usage"],
    category: "Accessoires chauffants",
    availability: "existing",
    href: "/boutique",
  },
  {
    slug: "echarpe-chauffante",
    name: "Écharpe chauffante",
    eyebrow: "CONFORT AU QUOTIDIEN",
    short: "Un article inclus dans les kits Duo et Kit Grand Froid.",
    description: "L’écharpe chauffante USB figure dans le contenu des kits Duo et Kit Grand Froid. Consulte la fiche du kit choisi ; la notice fournie précise les consignes exactes du modèle.",
    image: "https://cf.cjdropshipping.com/quick/product/72a24559-48af-49ce-b41c-0d3ceb7c9614.jpg",
    images: [
      "https://cf.cjdropshipping.com/quick/product/72a24559-48af-49ce-b41c-0d3ceb7c9614.jpg",
      "https://cf.cjdropshipping.com/quick/product/b0cfd092-bb3d-4cbb-8057-b6c84adfff2e.jpg",
      "https://cf.cjdropshipping.com/quick/product/da4bdaad-0ebc-4bee-ab3e-a951afe847d7.jpg",
      "https://cf.cjdropshipping.com/quick/product/ed3b69ac-e870-4b82-8fe2-406f45894e00.jpg",
    ],
    alt: "Écharpe chauffante USB",
    highlights: ["Incluse dans le Duo et le Kit Grand Froid", "Le prix indiqué correspond au kit complet", "Notice du modèle à consulter avant usage"],
    category: "Accessoires chauffants",
    availability: "existing",
    href: "/boutique",
  },
  {
    slug: "chaussettes-thermiques",
    name: "Chaussettes thermiques",
    eyebrow: "PIEDS AU CHAUD",
    short: "Un article inclus dans le Kit Grand Froid.",
    description: "Les chaussettes thermiques figurent dans le Kit Grand Froid. Le tarif affiché correspond au kit complet ; aucun prix unitaire séparé n’est confirmé.",
    image: "https://cf.cjdropshipping.com/00978b38-af86-4a0e-8569-e9f40a644f72.jpg",
    images: [
      "https://cf.cjdropshipping.com/528d7e19-3a89-40fd-a47c-fc3137747bee.jpg",
      "https://cf.cjdropshipping.com/bd43baeb-209b-4279-9c3c-56e605366c25.jpg",
      "https://cf.cjdropshipping.com/c0692fef-0c89-4659-986e-06a268ff2df1.jpg",
      "https://cf.cjdropshipping.com/00978b38-af86-4a0e-8569-e9f40a644f72.jpg",
    ],
    alt: "Chaussettes thermiques incluses dans le Kit Grand Froid SWELTR",
    highlights: ["Incluses dans le Kit Grand Froid", "Le prix indiqué correspond au kit complet", "Consignes d’entretien sur l’étiquette fournie"],
    category: "Accessoires thermiques",
    availability: "existing",
    href: "/boutique#trio",
  },
  {
    slug: "chauffe-mains",
    name: "Chauffe-mains",
    eyebrow: "PISTE POUR LA COLLECTION HIVER",
    short: "Une sélection d’accessoires d’hiver réunie dans nos kits, avec contenu et prix affichés avant le choix.",
    description: "Le chauffe-mains apparaît parmi les références envisagées pour la collection hiver. La fiche fournisseur, le fonctionnement, les consignes de sécurité et la variante ne sont pas encore vérifiés ; aucune promesse de chaleur ou autonomie n’est donc avancée. Consulte les kits actuellement proposés pour découvrir les produits dont le contenu est confirmé.",
    image: "https://oss-cf.cjdropshipping.com/product/2024/11/14/05/9f17171d-4a1d-455a-a3cb-0c0285e72440.jpeg",
    alt: "Référence de chauffe-mains envisagée pour la collection hiver, modèle à confirmer",
    highlights: ["Bientôt disponible · prix à confirmer", "Modèle et variantes à confirmer", "Aucune commande ouverte pour le moment"],
    category: "Accessoires hiver",
    availability: "planned",
  },
  {
    slug: "sous-vetements-thermiques",
    name: "Ensemble thermique en peluche",
    eyebrow: "UNE COUCHE DE CHALEUR",
    short: "Un haut à manches longues et un pantalon assorti pour composer une tenue cocooning les jours froids.",
    description: "La fiche fournisseur CJ décrit un ensemble deux pièces composé d’un haut pullover à col rond et d’un pantalon à taille intermédiaire. Le tissu annoncé est en polyester à 100 %. Le modèle enregistré est rouge, coupe femme. CJ précise que ses tailles asiatiques taillent plus petit que les tailles européennes et conseille de vérifier le tableau avant le choix.",
    image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/2042/2380523575462.jpg",
    images: [
      "https://cc-west-usa.oss-accelerate.aliyuncs.com/2042/2380523575462.jpg",
      "https://cc-west-usa.oss-accelerate.aliyuncs.com/2042/839569554813.jpg",
      "https://cc-west-usa.oss-accelerate.aliyuncs.com/2042/7611432973773.jpg",
      "https://cc-west-usa.oss-accelerate.aliyuncs.com/2042/15163317572484.jpg",
      "https://cc-west-usa.oss-accelerate.aliyuncs.com/2042/2075896965584.jpg",
      "https://cc-west-usa.oss-accelerate.aliyuncs.com/2042/1213570991083.jpg",
      "https://cc-west-usa.oss-accelerate.aliyuncs.com/2042/2943572117001.jpg",
      "https://cc-west-usa.oss-accelerate.aliyuncs.com/2042/5609032418762.jpg",
    ],
    alt: "Visuel de référence fournisseur pour un ensemble thermique, modèle final à confirmer",
    highlights: ["Ensemble haut pullover + pantalon", "Polyester annoncé à 100 % par le fournisseur", "Prix public SWELTR : 39,99 CHF · variantes fournisseur relevées"],
    category: "Vêtements thermiques",
    availability: "planned",
    retailPrice: 39.99,
    variants: ["Couleur enregistrée : rouge (modèle femme)", "Tailles CJ : L, XL, XXL, 3XL, L/XL et XL/L"],
    supplierStock: "Relevé CJ du 02.11.2026 : 840’000 unités indiquées sur la référence. La variante rouge 3XL sélectionnée affichait 20’000 unités. Quantités fournisseur non synchronisées en temps réel avec la boutique.",
  },
];

export function getWinterProduct(slug: string) {
  return WINTER_PRODUCTS.find((product) => product.slug === slug);
}
