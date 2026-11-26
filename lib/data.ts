export type Tier = {
  id: string;
  /** Public, SEO-friendly URL slug. Keep id stable for carts and supplier orders. */
  slug: string;
  name: string;
  tagline: string;
  price: number;
  items: string[];
  images: string[];
  /** Product label for each corresponding image in the product gallery. */
  imageLabels: string[];
  // Une seule vignette par article, pour les petites cartes de la page d'accueil
  cardImages: string[];
  description: string;
};

// Visuels de la collection hiver SWELTR.
export const PRODUCT_IMAGES = {
  heatedGloves: "/images/catalog/product-038fa3284733.jpg",
  heatedScarf: "/images/catalog/product-8a5d97402aa6.jpg",
  thermalSocks: "/images/catalog/product-01829a433b99.jpg",
};

// Galerie des gants chauffants.
export const HEATED_GLOVES_GALLERY = [
  "/images/catalog/product-c5e22899ade2.jpg",
  "/images/catalog/product-fb0b401e07d0.jpg",
  "/images/catalog/product-038fa3284733.jpg",
];

// Galerie de l’écharpe chauffante.
export const HEATED_SCARF_GALLERY = [
  "/images/catalog/product-8a5d97402aa6.jpg",
  "/images/catalog/product-9a661085539e.jpg",
  "/images/catalog/product-209fb4e6eadb.jpg",
  "/images/catalog/product-9636159893f8.jpg",
  "/images/catalog/product-9b20be5c7876.jpg",
  "/images/catalog/product-45ce274ff496.jpg",
];

// Galerie des chaussettes thermiques.
export const THERMAL_SOCKS_GALLERY = [
  "/images/catalog/product-b939c723d765.jpg",
  "/images/catalog/product-6658f6545325.jpg",
  "/images/catalog/product-990070a85694.jpg",
  "/images/catalog/product-0819606a11a9.jpg",
  "/images/catalog/product-01829a433b99.jpg",
];

export const TIERS: Tier[] = [
  {
    id: "solo",
    slug: "solo-chaleur-mains",
    name: "Solo Chaleur Mains",
    tagline: "1x Gants chauffants",
    price: 36.99,
    items: ["1× Gants chauffants SWELTR"],
    images: HEATED_GLOVES_GALLERY,
    imageLabels: ["Gants chauffants", "Gants chauffants", "Gants chauffants"],
    cardImages: [PRODUCT_IMAGES.heatedGloves],
    description:
      "Tu veux équiper tes mains sans ajouter d’autres articles ? Le Solo réunit une paire de gants chauffants dans une offre simple à comparer. Les consignes et caractéristiques précises sont celles du modèle fourni.",
  },
  {
    id: "duo",
    slug: "duo-chaleur-totale",
    name: "Duo Chaleur Totale",
    tagline: "Gants chauffants + Écharpe chauffante",
    price: 52.99,
    items: ["1× Gants chauffants SWELTR", "1× Écharpe chauffante USB"],
    images: [...HEATED_GLOVES_GALLERY.slice(0, 3), ...HEATED_SCARF_GALLERY.slice(0, 3)],
    imageLabels: [
      "Gants chauffants", "Gants chauffants", "Gants chauffants",
      "Écharpe chauffante USB", "Écharpe chauffante USB", "Écharpe chauffante USB",
    ],
    cardImages: [PRODUCT_IMAGES.heatedGloves, PRODUCT_IMAGES.heatedScarf],
    description:
      "Choisis le Duo si tu souhaites réunir un accessoire pour les mains et un autre pour le cou. Le kit comprend les gants chauffants et une écharpe chauffante USB ; son tarif complet est affiché avant la commande.",
  },
  {
    id: "trio",
    slug: "kit-grand-froid",
    name: "Kit Grand Froid",
    tagline: "Gants chauffants + Écharpe chauffante + Chaussettes thermiques",
    price: 62.99,
    items: [
      "1× Gants chauffants SWELTR",
      "1× Écharpe chauffante USB",
      "1× Chaussettes thermiques",
    ],
    images: [
      ...HEATED_GLOVES_GALLERY.slice(0, 2),
      ...HEATED_SCARF_GALLERY.slice(0, 2),
      ...THERMAL_SOCKS_GALLERY.slice(0, 2),
    ],
    imageLabels: [
      "Gants chauffants", "Gants chauffants",
      "Écharpe chauffante USB", "Écharpe chauffante USB",
      "Chaussettes thermiques", "Chaussettes thermiques",
    ],
    cardImages: [PRODUCT_IMAGES.heatedGloves, PRODUCT_IMAGES.heatedScarf, PRODUCT_IMAGES.thermalSocks],
    description:
      "Pour une composition d’hiver plus complète, ce kit rassemble des gants chauffants, une écharpe chauffante USB et des chaussettes thermiques. Chaque article est listé pour savoir exactement ce qui est inclus.",
  },
];

export const FAQS = [
  {
    q: "Comment connaître les consignes d’utilisation ?",
    a: "Les consignes de fonctionnement, d’alimentation et d’entretien dépendent du modèle fourni. Consulte toujours la notice jointe à l’article ; nous ne publions que les caractéristiques confirmées.",
  },
  {
    q: "En combien de temps je suis livré ?",
    a: "Les délais varient selon la destination et le traitement logistique. Consulte la page Livraison et retours et les conditions présentées avant le paiement.",
  },
  {
    q: "Quel kit choisir ?",
    a: "Le Solo comprend les gants chauffants, le Duo ajoute l’écharpe chauffante USB, et le Kit Grand Froid réunit aussi des chaussettes thermiques. Compare le contenu indiqué et choisis selon les accessoires dont tu as besoin.",
  },
  {
    q: "Et si ça ne me réchauffe pas assez ?",
    a: "Les modalités de retour et les éventuelles garanties commerciales sont détaillées dans les conditions générales de vente. Consulte-les avant de commander ou contacte notre service client.",
  },
];

export function heatCopy(t: number) {
  if (t > 10)
    return {
      label: "DOUX",
      desc: "Confortable pour l'instant, mais la météo va vite changer.",
      color: "#4FE3C1",
    };
  if (t > 0)
    return {
      label: "FRAIS",
      desc: "C'est le moment où des gants chauffants commencent à se justifier.",
      color: "#FFD23F",
    };
  if (t > -8)
    return {
      label: "FROID",
      desc: "Zone SWELTR par excellence. Tes mains vont morfler sans eux.",
      color: "#FF7A3C",
    };
  return {
    label: "GLACIAL",
    desc: "Alerte grand froid. C'est exactement le jour où tu regretteras de ne pas avoir commandé plus tôt.",
    color: "#FF2E63",
  };
}
