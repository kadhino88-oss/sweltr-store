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
  /** Prix public SWELTR en CHF. */
  retailPrice?: number;
  /** Variantes client confirmées. */
  variants?: string[];
  href?: string;
};

export const WINTER_PRODUCTS: WinterProduct[] = [
  {
    slug: "plaid-velours-bulle",
    name: "Couverture velours à bulles",
    eyebrow: "DOUCEUR HIVERNALE",
    short: "Le plaisir d’une pause cocooning, avec une texture à bulles qui donne envie de s’installer et de ralentir.",
    description: "Cette couverture à bulles en fausse fourrure façon lapin présente une texture moelleuse et une finition épaisse sur les deux faces. Elle accompagne les soirées sur le canapé ou ajoute une couche confortable au lit. Son relief apporte du caractère au coin détente et invite à s’installer pour lire ou se reposer. Plusieurs formats et coloris sont prévus pour la collection SWELTR.",
    image: "/images/catalog/product-21132f894bf8.jpg",
    alt: "Couverture douce à relief de bulles posée dans un intérieur chaleureux",
    highlights: ["Texture douce façon fausse fourrure", "Finition épaisse sur les deux faces", "Prix SWELTR : 49,99 CHF"],
    category: "Confort maison",
    availability: "planned",
    retailPrice: 49.99,
    variants: ["Plusieurs coloris et dimensions sont prévus pour la collection SWELTR."],
  },
  {
    slug: "pyjama-plaid",
    name: "Pyjama-plaid géant",
    eyebrow: "COCOONING",
    short: "Enfile une grande couche douillette pour lire, regarder un film ou savourer un moment tranquille à la maison.",
    description: "Ce sweat-plaid à capuche en velours double face offre une coupe ample pour les moments de détente à la maison. La taille unique présentée mesure environ 156 cm de tour de poitrine et 100 cm de longueur. Porte-le par-dessus une tenue légère pour lire, regarder un film ou profiter d’une soirée cocooning. Sa grande poche complète ce vêtement pensé pour les pauses confortables.",
    image: "/images/catalog/product-a34ccfde403d.jpg",
    alt: "Sweat-plaid ample à capuche avec grande poche pour les soirées à la maison",
    highlights: ["Velours double face et coupe ample", "Taille unique : environ 156 cm de tour de poitrine et 100 cm de longueur", "Prix SWELTR : 44,99 CHF"],
    category: "Vêtements cocooning",
    availability: "planned",
    retailPrice: 44.99,
    variants: ["Coloris vert armée, taille unique", "Mesures indicatives : environ 156 cm de tour de poitrine et 100 cm de longueur", "Composition principale : 80 % polyester"],
  },
  {
    slug: "bottes-plaid",
    name: "Chaussons fourrés d’hiver",
    eyebrow: "PIEDS AU CHAUD",
    short: "Un petit rituel de confort à la maison : des chaussons fourrés fantaisie pour accompagner les journées fraîches.",
    description: "Ces chaussons fourrés apportent une note ludique aux instants passés à la maison et complètent naturellement une tenue cocooning. Le visuel de la référence sélectionnée montre une finition douce et fantaisie. Le prix public SWELTR est fixé ; les pointures, coloris et détails de la variante livrée seront contrôlés avant toute commande.",
    image: "/images/catalog/product-28eb87691538.jpg",
    alt: "Chaussons d’hiver fourrés fantaisie pour la maison",
    highlights: ["Une touche fantaisie pour le confort à la maison", "Pensés pour les moments détente en intérieur", "Prix public SWELTR : 29,99 CHF · pointures bientôt confirmées"],
    category: "Confort des pieds",
    availability: "planned",
    retailPrice: 29.99,
  },
  {
    slug: "gants-chauffants",
    name: "Gants chauffants",
    eyebrow: "CHALEUR EN MOUVEMENT",
    short: "Une paire de gants chauffants proposée seule ou dans les kits d’hiver SWELTR.",
    description: "Cette paire de gants chauffants est disponible seule à 36,99 CHF, ainsi que dans le Solo Chaleur Mains, le Duo Chaleur Totale et le Kit Grand Froid. Suis les consignes de la notice fournie pour l’alimentation, l’utilisation et l’entretien du modèle.",
    image: "/images/catalog/product-038fa3284733.jpg",
    images: [
      "/images/catalog/product-038fa3284733.jpg",
      "/images/catalog/product-c5e22899ade2.jpg",
      "/images/catalog/product-fb0b401e07d0.jpg",
    ],
    alt: "Gants chauffants",
    highlights: ["Disponible seul ou dans les trois kits d’hiver", "Prix à l’unité : 36,99 CHF", "Notice du modèle à consulter avant usage"],
    category: "Accessoires chauffants",
    availability: "existing",
    retailPrice: 36.99,
    href: "/boutique",
  },
  {
    slug: "echarpe-chauffante",
    name: "Écharpe chauffante",
    eyebrow: "CONFORT AU QUOTIDIEN",
    short: "Une écharpe chauffante USB disponible seule ou dans deux kits d’hiver.",
    description: "Cette écharpe chauffante USB complète une tenue d’hiver et s’emporte facilement lors des trajets ou des sorties. Elle est proposée seule à 16,00 CHF ou dans le Duo Chaleur Totale et le Kit Grand Froid. Pour connaître l’alimentation, les réglages et l’entretien du modèle, suis les indications de sa notice.",
    image: "/images/catalog/product-8a5d97402aa6.jpg",
    images: [
      "/images/catalog/product-8a5d97402aa6.jpg",
      "/images/catalog/product-9a661085539e.jpg",
      "/images/catalog/product-209fb4e6eadb.jpg",
      "/images/catalog/product-9636159893f8.jpg",
    ],
    alt: "Écharpe chauffante USB",
    highlights: ["Disponible à l’unité ou dans deux kits d’hiver", "Prix à l’unité : 16,00 CHF", "Notice du modèle à consulter avant usage"],
    category: "Accessoires chauffants",
    availability: "existing",
    retailPrice: 16.00,
    href: "/boutique",
  },
  {
    slug: "chaussettes-thermiques",
    name: "Chaussettes thermiques",
    eyebrow: "PIEDS AU CHAUD",
    short: "Des chaussettes thermiques proposées seules ou dans le Kit Grand Froid.",
    description: "Ces chaussettes thermiques ajoutent une couche de confort à une tenue d’hiver et se portent à la maison ou dans des chaussures adaptées. Elles sont proposées seules à 10,00 CHF et figurent aussi dans le Kit Grand Froid. Consulte l’étiquette du modèle livré pour les consignes d’entretien.",
    image: "/images/catalog/product-01829a433b99.jpg",
    images: [
      "/images/catalog/product-b939c723d765.jpg",
      "/images/catalog/product-6658f6545325.jpg",
      "/images/catalog/product-990070a85694.jpg",
      "/images/catalog/product-01829a433b99.jpg",
    ],
    alt: "Chaussettes thermiques incluses dans le Kit Grand Froid SWELTR",
    highlights: ["Disponibles seules ou dans le Kit Grand Froid", "Prix à l’unité : 10,00 CHF", "Consignes d’entretien sur l’étiquette"],
    category: "Accessoires thermiques",
    availability: "existing",
    retailPrice: 10.00,
    href: "/boutique#trio",
  },
  {
    slug: "chauffe-mains",
    name: "Chauffe-mains",
    eyebrow: "PISTE POUR LA COLLECTION HIVER",
    short: "Une sélection d’accessoires d’hiver réunie dans nos kits, avec contenu et prix affichés avant le choix.",
    description: "Le chauffe-mains est une nouveauté envisagée pour la collection hiver. Son modèle, son fonctionnement, ses consignes de sécurité et ses variantes restent à confirmer ; aucune promesse de chaleur ou d’autonomie n’est avancée. Découvre les kits et accessoires déjà proposés dans la boutique SWELTR.",
    image: "/images/catalog/product-f9d03d973d76.jpg",
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
    description: "Cet ensemble deux pièces réunit un haut à col rond et un pantalon assorti dans une matière douce pensée pour les journées froides. La coupe rouge présentée se porte à la maison ou sous une tenue d’extérieur. Avant de choisir, compare les mesures du guide des tailles avec un vêtement que tu portes déjà pour trouver l’ajustement qui te convient.",
    image: "/images/catalog/product-f7892b0a40b2.jpg",
    images: [
      "/images/catalog/product-f7892b0a40b2.jpg",
      "/images/catalog/product-ed13478eaba7.jpg",
      "/images/catalog/product-f5354257d2f5.jpg",
      "/images/catalog/product-9a18dd04844b.jpg",
      "/images/catalog/product-4ff2bc53931d.jpg",
      "/images/catalog/product-70874939116e.jpg",
      "/images/catalog/product-c8d0e8709ce7.jpg",
      "/images/catalog/product-7212126e7499.jpg",
    ],
    alt: "Ensemble thermique rouge composé d’un haut à manches longues et d’un pantalon assorti",
    highlights: ["Ensemble haut pullover et pantalon assorti", "Coupe confortable pour les journées froides", "Prix SWELTR : 39,99 CHF"],
    category: "Vêtements thermiques",
    availability: "planned",
    retailPrice: 39.99,
    variants: ["Coloris présenté : rouge", "Consulte les mesures du guide des tailles avant de choisir."],
  },
];

export function getWinterProduct(slug: string) {
  return WINTER_PRODUCTS.find((product) => product.slug === slug);
}
