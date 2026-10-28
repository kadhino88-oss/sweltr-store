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
    description: "Une couverture double face en velours à effet bulles, pensée pour les moments cocooning sur le canapé ou au lit. Le catalogue CJ indique un prix variable selon la variante. Les dimensions exactes, coloris disponibles, stock réel et coût livré vers la Suisse et la France restent à confirmer dans le compte fournisseur.",
    image: "https://oss-cf.cjdropshipping.com/product/2024/10/17/02/c8589f5d-7f0f-440f-b53d-54f42d92b989.jpg",
    images: ["https://oss-cf.cjdropshipping.com/product/2024/10/17/02/c8589f5d-7f0f-440f-b53d-54f42d92b989.jpg"],
    alt: "Couverture velours à bulles — photo réelle du catalogue CJ Dropshipping",
    highlights: ["Modèle non électrique", "Confort cocooning pour l’hiver", "Prix, dimensions, stock et livraison à confirmer"],
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
    description: "Chaussons d’intérieur en matière peluche avec semelle annoncée en PVC. La fiche CJ publique indique des coloris rose, kaki, blanc et gris, ainsi que des pointures par paires de tailles de 36–37 à 44–45. Stock et coût livré restent à vérifier dans le compte fournisseur.",
    image: "https://oss-cf.cjdropshipping.com/product/2024/11/11/05/79e21674-1383-4a21-a91d-41fe28be29a3.jpg",
    images: ["https://oss-cf.cjdropshipping.com/product/2024/11/11/05/79e21674-1383-4a21-a91d-41fe28be29a3.jpg"],
    alt: "Chaussons fourrés — photo réelle du catalogue CJ Dropshipping",
    highlights: ["Doublure peluche", "Semelle annoncée antidérapante", "Tailles 36–37 à 44–45 ; stock à confirmer"],
    category: "Confort des pieds",
    availability: "planned",
  },
  {
    slug: "gants-chauffants",
    name: "Gants chauffants USB noirs",
    eyebrow: "CHALEUR EN MOUVEMENT",
    short: "Une paire noire au style sobre, conçue pour les sorties par temps froid.",
    description: "Nouveau modèle fournisseur repéré sur CJdropshipping : gants noirs chauffants par USB, tissu annoncé en flanelle, technologie de chauffe au graphène, puissance annoncée de 15 W et autonomie annoncée de 2 à 3 heures. La fiche indique une alimentation 5 V et inclut une paire de gants avec câble USB. Le prix public repéré est de 11,28 $ et le poids annoncé de 500 g. Le stock réel, le coût de livraison vers la Suisse et la France, la taille exacte et les exigences de conformité restent à vérifier avant commercialisation.",
    image: "https://cf.cjdropshipping.com/quick/product/7b03a38d-908d-42db-8627-b14cb6f24e0f.jpg",
    images: [
      "https://cf.cjdropshipping.com/quick/product/7b03a38d-908d-42db-8627-b14cb6f24e0f.jpg",
      "https://oss-cf.cjdropshipping.com/product/2024/11/23/08/c1dd1e3a-1fa6-4ca1-b7ca-a15926125965_trans.jpeg",
      "https://oss-cf.cjdropshipping.com/product/2024/11/23/08/3974bc84-dd2e-4a19-bb1c-6f6b37929dbd_trans.jpeg"
    ],
    alt: "Gants chauffants USB noirs — images du catalogue CJdropshipping",
    highlights: [
      "Coloris noir",
      "Chauffe au graphène annoncée ; alimentation USB 5 V",
      "Autonomie annoncée de 2 à 3 heures",
      "SKU fournisseur CJ : CJYD222200301AZ ; stock et livraison à confirmer"
    ],
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
    description: "La fiche CJ publique du modèle repéré annonce une batterie de 1 200 mAh, une recharge USB-C, deux coloris (marron et blanc) et trois niveaux annoncés de 45 °C, 55 °C et 65 °C. La conformité, le stock réel et les frais de livraison doivent encore être vérifiés dans le compte fournisseur avant commercialisation.",
    image: "https://oss-cf.cjdropshipping.com/product/2024/11/14/05/9f17171d-4a1d-455a-a3cb-0c0285e72440.jpeg",
    images: ["https://oss-cf.cjdropshipping.com/product/2024/11/14/05/9f17171d-4a1d-455a-a3cb-0c0285e72440.jpeg"],
    alt: "Chauffe-mains rechargeable — photo réelle du catalogue CJ Dropshipping",
    highlights: ["Batterie annoncée : 1 200 mAh", "USB-C ; marron ou blanc selon la fiche publique", "Conformité, stock et livraison à vérifier"],
    category: "Accessoires hiver",
    availability: "planned",
  },
  {
    slug: "sous-vetements-thermiques",
    name: "Ensemble thermique",
    eyebrow: "UNE COUCHE DE CHALEUR",
    short: "Un haut et un legging pour mieux affronter le froid.",
    description: "La fiche CJ publique du modèle repéré indique un ensemble en polyester mélangé, avec tailles L, XL, 2XL, 3XL et 4XL et plusieurs coloris. Le guide des tailles doit être contrôlé pour le marché européen ; le stock réel et les frais de livraison restent à confirmer.",
    image: "https://cc-west-usa.oss-accelerate.aliyuncs.com/387e0719-1ecd-428d-9b7b-ed713235acca.jpg",
    images: ["https://cc-west-usa.oss-accelerate.aliyuncs.com/387e0719-1ecd-428d-9b7b-ed713235acca.jpg"],
    alt: "Ensemble thermique haut et pantalon — photo réelle du catalogue CJ Dropshipping",
    highlights: ["Ensemble haut et pantalon", "Tailles annoncées L à 4XL (tailles asiatiques)", "Guide européen, stock et livraison à confirmer"],
    category: "Vêtements thermiques",
    availability: "planned",
  },

];

export function getWinterProduct(slug: string) {
  return WINTER_PRODUCTS.find((product) => product.slug === slug);
}
