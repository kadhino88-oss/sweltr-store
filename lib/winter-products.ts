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
  href?: string;
};

export const WINTER_PRODUCTS: WinterProduct[] = [
  {
    slug: "plaid-velours-bulle",
    name: "Couverture velours à bulles",
    eyebrow: "DOUCEUR HIVERNALE",
    short: "Une piste de produit pour les moments de détente à la maison.",
    description: "Cette référence est en sélection pour la collection hiver. Les caractéristiques de la variante finale, les dimensions, le prix, le stock et la livraison restent à confirmer.",
    image: "https://cf.cjdropshipping.com/17026848/1735911896785227776.jpg",
    alt: "Couverture velours à bulles — fiche fournisseur CJ Dropshipping",
    highlights: ["Collection hiver en préparation", "Prix à confirmer", "Modèle et disponibilité à confirmer"],
    category: "Confort maison",
    availability: "planned",
  },
  {
    slug: "pyjama-plaid",
    name: "Pyjama-plaid géant",
    eyebrow: "COCOONING",
    short: "Une idée de vêtement cocooning en cours de sélection.",
    description: "Cette référence est à l’étude pour la collection hiver. Le modèle, les tailles, la composition, le prix et la disponibilité doivent être confirmés avant toute mise en vente.",
    image: "https://oss-cf.cjdropshipping.com/product/2023/11/28/10/2f1b5416-a877-476f-89fa-bc5e0f337fe7.jpg",
    alt: "Sweat-plaid à capuche — photo fournisseur CJ Dropshipping",
    highlights: ["Collection hiver en préparation", "Prix à confirmer", "Tailles et composition à confirmer"],
    category: "Vêtements cocooning",
    availability: "planned",
  },
  {
    slug: "bottes-plaid",
    name: "Chaussons fourrés d’hiver",
    eyebrow: "PIEDS AU CHAUD",
    short: "Une piste de chaussons d’hiver pour la maison.",
    description: "Cette référence est en sélection pour la collection hiver. Les pointures, la matière, le prix, le stock et la livraison restent à confirmer.",
    image: "https://oss.cjdropshipping.com/product/2024/09/19/08/3ab0ae46-564b-4eca-b6a0-096cbbd211f8.jpg",
    alt: "Chaussons fourrés fantaisie — photo fournisseur CJ Dropshipping",
    highlights: ["Collection hiver en préparation", "Prix à confirmer", "Pointures et disponibilité à confirmer"],
    category: "Confort des pieds",
    availability: "planned",
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
    short: "Une idée d’accessoire d’hiver en cours de sélection.",
    description: "Cette piste reste en préparation. Le modèle, son mode de fonctionnement, ses caractéristiques, son prix, son stock et sa conformité doivent être confirmés avant toute mise en vente.",
    image: "https://oss-cf.cjdropshipping.com/product/2024/11/14/05/9f17171d-4a1d-455a-a3cb-0c0285e72440.jpeg",
    alt: "Référence de chauffe-mains envisagée pour la collection hiver, modèle à confirmer",
    highlights: ["Bientôt disponible · prix à confirmer", "Modèle et variantes à confirmer", "Aucune commande ouverte pour le moment"],
    category: "Accessoires hiver",
    availability: "planned",
  },
  {
    slug: "sous-vetements-thermiques",
    name: "Ensemble thermique",
    eyebrow: "UNE COUCHE DE CHALEUR",
    short: "Une piste d’ensemble thermique pour la collection hiver.",
    description: "Cette référence reste en préparation. Le modèle, les pièces incluses, la composition, les tailles, le prix, le stock et la livraison doivent être confirmés avant la publication d’une offre.",
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
    highlights: ["Bientôt disponible · prix à confirmer", "Modèle et composition à confirmer", "Tailles et disponibilité à confirmer"],
    category: "Vêtements thermiques",
    availability: "planned",
  },
];

export function getWinterProduct(slug: string) {
  return WINTER_PRODUCTS.find((product) => product.slug === slug);
}
