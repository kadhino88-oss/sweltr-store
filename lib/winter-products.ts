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
    short: "Une couverture épaisse et moelleuse pour les soirées froides.",
    description: "Une couverture double face en velours à effet bulles, pensée pour les moments cocooning sur le canapé ou au lit. Les dimensions, coloris, matière exacte, stock et coût livré doivent être confirmés pour la variante retenue avant toute mise en vente.",
    image: "https://oss-cf.cjdropshipping.com/product/2024/10/17/02/c8589f5d-7f0f-440f-b53d-54f42d92b989.jpg",
    images: ["https://oss-cf.cjdropshipping.com/product/2024/10/17/02/c8589f5d-7f0f-440f-b53d-54f42d92b989.jpg"],
    alt: "Couverture velours à bulles — photo réelle du catalogue CJ Dropshipping",
    highlights: ["Modèle non électrique", "Confort cocooning pour l’hiver", "Dimensions et coût livré à confirmer avant vente"],
    category: "Confort maison",
    availability: "planned",
  },
  {
    slug: "pyjama-plaid",
    name: "Pyjama-plaid géant",
    eyebrow: "COCOONING",
    short: "Un grand sweat-plaid pour se blottir au chaud.",
    description: "Un vêtement ample et doux pour les journées détente, les soirées cinéma et les matins froids. Les tailles, matières et coloris seront confirmés lors de la sélection fournisseur.",
    image: "",
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
    image: "https://oss-cf.cjdropshipping.com/product/2024/11/11/05/79e21674-1383-4a21-a91d-41fe28be29a3.jpg",
    images: ["https://oss-cf.cjdropshipping.com/product/2024/11/11/05/79e21674-1383-4a21-a91d-41fe28be29a3.jpg"],
    alt: "Chaussons fourrés — photo réelle du catalogue CJ Dropshipping",
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
    images: [
      "https://cf.cjdropshipping.com/20180920/2155711379153.jpg",
      "https://cf.cjdropshipping.com/20180920/28896142656039.jpg",
      "https://cf.cjdropshipping.com/20180920/188040013818.jpg",
    ],
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
    images: [
      "https://cf.cjdropshipping.com/quick/product/72a24559-48af-49ce-b41c-0d3ceb7c9614.jpg",
      "https://cf.cjdropshipping.com/quick/product/b0cfd092-bb3d-4cbb-8057-b6c84adfff2e.jpg",
      "https://cf.cjdropshipping.com/quick/product/da4bdaad-0ebc-4bee-ab3e-a951afe847d7.jpg",
      "https://cf.cjdropshipping.com/quick/product/ed3b69ac-e870-4b82-8fe2-406f45894e00.jpg",
    ],
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
    images: ["https://oss-cf.cjdropshipping.com/product/2024/11/14/05/9f17171d-4a1d-455a-a3cb-0c0285e72440.jpeg"],
    alt: "Chauffe-mains rechargeable — photo réelle du catalogue CJ Dropshipping",
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
    image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/387e0719-1ecd-428d-9b7b-ed713235acca.jpg",
    images: ["https://cc-west-usa.oss-accelerate.aliyuncs.com/387e0719-1ecd-428d-9b7b-ed713235acca.jpg"],
    alt: "Ensemble thermique haut et pantalon — photo réelle du catalogue CJ Dropshipping",
    highlights: ["Ensemble haut et pantalon", "Tailles M à XXL indiquées", "Composition et guide des tailles à vérifier"],
    category: "Vêtements thermiques",
    availability: "planned",
  },

];

export function getWinterProduct(slug: string) {
  return WINTER_PRODUCTS.find((product) => product.slug === slug);
}
