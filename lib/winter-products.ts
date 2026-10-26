export type WinterProduct = {
  slug: string;
  name: string;
  eyebrow: string;
  short: string;
  description: string;
  image: string;
  alt: string;
  highlights: string[];
  category: string;
  availability: "planned" | "existing";
  href?: string;
};

export const WINTER_PRODUCTS: WinterProduct[] = [
  {
    slug: "couverture-chauffante",
    name: "Couverture chauffante électrique",
    eyebrow: "LA PIÈCE MAÎTRESSE",
    short: "La chaleur réconfortante pour les soirées fraîches.",
    description: "Une couverture douce pensée pour les moments de détente à la maison. Le modèle final sera sélectionné après vérification du fournisseur, de la conformité et des caractéristiques réelles.",
    image: "https://oss-cf.cjdropshipping.com/product/2024/11/08/07/a276c8c6-f97b-41dc-b536-2d154723dc57_trans.jpeg",
    alt: "Couverture chauffante grise — photo fournisseur CJ Dropshipping",
    highlights: ["Confort à la maison", "Version européenne à confirmer", "Conformité électrique à vérifier avant vente"],
    category: "Confort maison",
    availability: "planned",
  },
  {
    slug: "pyjama-plaid",
    name: "Pyjama-plaid géant",
    eyebrow: "COCOONING",
    short: "Un grand sweat-plaid pour se blottir au chaud.",
    description: "Un vêtement ample et doux pour les journées détente, les soirées cinéma et les matins froids. Les tailles, matières et coloris seront confirmés lors de la sélection fournisseur.",
    image: "https://oss-cf.cjdropshipping.com/product/2023/11/28/10/2f1b5416-a877-476f-89fa-bc5e0f337fe7.jpg",
    alt: "Sweat-plaid à capuche — photo fournisseur CJ Dropshipping",
    highlights: ["Modèle non chauffant", "Confort à la maison", "Taille unique selon la fiche fournisseur"],
    category: "Vêtements cocooning",
    availability: "planned",
  },
  {
    slug: "bottes-plaid",
    name: "Chaussons fourrés d’hiver",
    eyebrow: "PIEDS AU CHAUD",
    short: "Des chaussons moelleux pour garder les pieds au chaud à la maison.",
    description: "Chaussons d’intérieur fourrés du fournisseur CJ Dropshipping. Les tailles, coloris et délais de livraison doivent être confirmés avant mise en vente.",
    image: "https://oss.cjdropshipping.com/product/2024/09/19/08/3ab0ae46-564b-4eca-b6a0-096cbbd211f8.jpg",
    alt: "Chaussons fourrés fantaisie — photo fournisseur CJ Dropshipping",
    highlights: ["Usage intérieur", "Semelle antidérapante annoncée par le fournisseur", "Tailles et stock à confirmer"],
    category: "Confort des pieds",
    availability: "planned",
  },
  {
    slug: "gants-chauffants",
    name: "Gants chauffants",
    eyebrow: "CHALEUR EN MOUVEMENT",
    short: "Un accessoire pour les déplacements par temps froid.",
    description: "Les gants chauffants figurent déjà dans les kits actuels SWELTR. Consulte leurs caractéristiques exactes et les éléments inclus sur la fiche du kit avant de commander.",
    image: "https://cf.cjdropshipping.com/20180920/2155711379153.jpg",
    alt: "Gants chauffants",
    highlights: ["Présents dans les kits actuels", "Caractéristiques à vérifier selon le modèle", "Découvrir les kits SWELTR"],
    category: "Accessoires chauffants",
    availability: "existing",
    href: "/boutique",
  },
  {
    slug: "echarpe-chauffante",
    name: "Écharpe chauffante",
    eyebrow: "CONFORT AU QUOTIDIEN",
    short: "Un accessoire chauffant pour protéger le cou du froid.",
    description: "L’écharpe chauffante USB est proposée dans les kits SWELTR existants. Vérifie les caractéristiques, les modalités d’alimentation et d’entretien sur la fiche du kit.",
    image: "https://cf.cjdropshipping.com/quick/product/72a24559-48af-49ce-b41c-0d3ceb7c9614.jpg",
    alt: "Écharpe chauffante USB",
    highlights: ["Présente dans les kits actuels", "Alimentation USB selon le modèle", "Découvrir les kits SWELTR"],
    category: "Accessoires chauffants",
    availability: "existing",
    href: "/boutique",
  },
  {
    slug: "chauffe-mains",
    name: "Chauffe-mains rechargeable",
    eyebrow: "PETIT FORMAT, GRAND CONFORT",
    short: "Une source de chaleur de poche pour les sorties hivernales.",
    description: "Nous recherchons un modèle rechargeable fiable, avec des informations claires sur la batterie, la température, les protections intégrées et la conformité avant de le proposer à la vente.",
    image: "https://oss-cf.cjdropshipping.com/product/2024/11/14/05/9f17171d-4a1d-455a-a3cb-0c0285e72440.jpeg",
    alt: "Chauffe-mains rechargeable — photo fournisseur CJ Dropshipping",
    highlights: ["Recharge USB-C selon le modèle", "Deux coloris indiqués par le fournisseur", "Batterie et conformité à vérifier avant vente"],
    category: "Accessoires hiver",
    availability: "planned",
  },
  {
    slug: "sous-vetements-thermiques",
    name: "Ensemble thermique",
    eyebrow: "UNE COUCHE DE CHALEUR",
    short: "Un haut et un legging pour mieux affronter le froid.",
    description: "Un ensemble thermique sans alimentation électrique, envisagé pour les déplacements, les activités extérieures et les sports d’hiver. La composition textile et les tailles seront confirmées avant la mise en vente.",
    image: "https://cf.cjdropshipping.com/quick/product/10202ba5-1cd6-4d5b-b118-2f59eb78726e.jpg",
    alt: "Ensemble de sous-vêtements thermiques — photo fournisseur CJ Dropshipping",
    highlights: ["Ensemble haut et pantalon", "Tailles M à XXL indiquées", "Composition et guide des tailles à vérifier"],
    category: "Vêtements thermiques",
    availability: "planned",
  },
  {
    slug: "radiateur-ceramique",
    name: "Radiateur soufflant céramique",
    eyebrow: "CHAUFFAGE D’APPOINT",
    short: "Un candidat à la collection, sous réserve de contrôles stricts.",
    description: "Ce produit ne sera pas commercialisé tant que le modèle précis, les essais de sécurité, les protections contre la surchauffe et le basculement, les documents de conformité et les conditions de livraison ne seront pas vérifiés.",
    image: "https://oss-cf.cjdropshipping.com/product/2024/10/14/06/aaffd60b-300c-46b3-b792-2f7ab9258ea0.jpg",
    alt: "Radiateur soufflant effet flamme — photo fournisseur CJ Dropshipping",
    highlights: ["Non disponible à la vente pour le moment", "Compatibilité électrique et conformité UE à vérifier", "Aucune vente avant validation des documents de sécurité"],
    category: "Chauffage d’appoint",
    availability: "planned",
  },
];

export function getWinterProduct(slug: string) {
  return WINTER_PRODUCTS.find((product) => product.slug === slug);
}
