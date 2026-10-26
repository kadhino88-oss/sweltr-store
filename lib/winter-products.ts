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
    name: "Couverture chauffante",
    eyebrow: "LA PIÈCE MAÎTRESSE",
    short: "La chaleur réconfortante pour les soirées fraîches.",
    description: "Une couverture douce pensée pour les moments de détente à la maison. Le modèle final sera sélectionné après vérification du fournisseur, de la conformité et des caractéristiques réelles.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
    alt: "Salon chaleureux avec plaid sur un canapé",
    highlights: ["Confort à la maison", "Sélection qualité en cours", "Priorité de la collection SWELTR"],
    category: "Confort maison",
    availability: "planned",
  },
  {
    slug: "pyjama-plaid",
    name: "Pyjama-plaid géant",
    eyebrow: "COCOONING",
    short: "Un grand sweat-plaid pour se blottir au chaud.",
    description: "Un vêtement ample et doux pour les journées détente, les soirées cinéma et les matins froids. Les tailles, matières et coloris seront confirmés lors de la sélection fournisseur.",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1400&q=85",
    alt: "Vêtements doux et confortables pour la saison froide",
    highlights: ["Modèle non chauffant", "Confort à la maison", "Tailles et coloris à confirmer"],
    category: "Vêtements cocooning",
    availability: "planned",
  },
  {
    slug: "bottes-plaid",
    name: "Bottes en plaid fourrées",
    eyebrow: "PIEDS AU CHAUD",
    short: "Des bottes d’intérieur douces pour les journées froides.",
    description: "Une paire de bottes d’intérieur fourrées, choisie pour le confort et la douceur. La matière, la grille de tailles et la semelle seront contrôlées avant toute mise en vente.",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1400&q=85",
    alt: "Chaussures et bottes pour la saison froide",
    highlights: ["Usage intérieur à confirmer", "Doublure douce recherchée", "Guide des tailles prévu"],
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
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1400&q=85",
    alt: "Ambiance de plein air en hiver",
    highlights: ["Compact et transportable", "Batterie et protections à vérifier", "Sélection fournisseur en cours"],
    category: "Accessoires hiver",
    availability: "planned",
  },
  {
    slug: "sous-vetements-thermiques",
    name: "Ensemble thermique",
    eyebrow: "UNE COUCHE DE CHALEUR",
    short: "Un haut et un legging pour mieux affronter le froid.",
    description: "Un ensemble thermique sans alimentation électrique, envisagé pour les déplacements, les activités extérieures et les sports d’hiver. La composition textile et les tailles seront confirmées avant la mise en vente.",
    image: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=1400&q=85",
    alt: "Vêtements pour les activités de plein air",
    highlights: ["Sans batterie ni alimentation électrique", "Composition textile à vérifier", "Tailles homme et femme à étudier"],
    category: "Vêtements thermiques",
    availability: "planned",
  },
  {
    slug: "radiateur-ceramique",
    name: "Radiateur soufflant céramique",
    eyebrow: "CHAUFFAGE D’APPOINT",
    short: "Un candidat à la collection, sous réserve de contrôles stricts.",
    description: "Ce produit ne sera pas commercialisé tant que le modèle précis, les essais de sécurité, les protections contre la surchauffe et le basculement, les documents de conformité et les conditions de livraison ne seront pas vérifiés.",
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=85",
    alt: "Intérieur chaleureux en hiver",
    highlights: ["Non disponible à la vente pour le moment", "Sécurité et conformité à vérifier", "Aucune promesse de performance avant validation"],
    category: "Chauffage d’appoint",
    availability: "planned",
  },
];

export function getWinterProduct(slug: string) {
  return WINTER_PRODUCTS.find((product) => product.slug === slug);
}
