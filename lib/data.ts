export type Tier = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  compare: number;
  items: string[];
  best?: boolean;
  // À remplir une fois les vid récupérés via /api/admin/find-vid.
  // Un kit peut contenir plusieurs produits CJ (ex: le Trio = 3 vid différents).
  cjItems?: { vid: string; quantity: number }[];
  // Vraies photos produit récupérées depuis les fiches CJ (galerie complète, page produit)
  images: string[];
  // Une seule vignette par article, pour les petites cartes de la page d'accueil
  cardImages: string[];
  description: string;
  specs: { label: string; value: string }[];
};

// Photos produit officielles CJ Dropshipping (une par article sourcé) — gamme hiver, sourcée le 03/09/2026
export const PRODUCT_IMAGES = {
  heatedGloves: "https://cf.cjdropshipping.com/20180920/2155711379153.jpg",
  heatedScarf: "https://cf.cjdropshipping.com/quick/product/72a24559-48af-49ce-b41c-0d3ceb7c9614.jpg",
  thermalSocks: "https://cf.cjdropshipping.com/00978b38-af86-4a0e-8569-e9f40a644f72.jpg",
};

// Galerie complète des gants chauffants (via productImageSet CJ)
export const HEATED_GLOVES_GALLERY = [
  "https://cf.cjdropshipping.com/20180920/28896142656039.jpg",
  "https://cf.cjdropshipping.com/20180920/188040013818.jpg",
  "https://cf.cjdropshipping.com/20180920/2155711379153.jpg",
];

// Galerie complète de l'écharpe chauffante (via productImageSet CJ)
export const HEATED_SCARF_GALLERY = [
  "https://cf.cjdropshipping.com/quick/product/72a24559-48af-49ce-b41c-0d3ceb7c9614.jpg",
  "https://cf.cjdropshipping.com/quick/product/b0cfd092-bb3d-4cbb-8057-b6c84adfff2e.jpg",
  "https://cf.cjdropshipping.com/quick/product/da4bdaad-0ebc-4bee-ab3e-a951afe847d7.jpg",
  "https://cf.cjdropshipping.com/quick/product/ed3b69ac-e870-4b82-8fe2-406f45894e00.jpg",
  "https://cf.cjdropshipping.com/quick/product/8b28030b-d38f-4db3-ac4e-f81174e83a3c.jpg",
  "https://oss-cf.cjdropshipping.com/product/2024/12/12/06/d2ed1c7d-9d9b-41e5-847d-001e7b0b186b.jpg",
];

// Galerie complète des chaussettes thermiques (via productImageSet CJ)
export const THERMAL_SOCKS_GALLERY = [
  "https://cf.cjdropshipping.com/528d7e19-3a89-40fd-a47c-fc3137747bee.jpg",
  "https://cf.cjdropshipping.com/bd43baeb-209b-4279-9c3c-56e605366c25.jpg",
  "https://cf.cjdropshipping.com/c0692fef-0c89-4659-986e-06a268ff2df1.jpg",
  "https://cf.cjdropshipping.com/284c047b-9da8-4a3c-b900-db5a8d290d6a.jpg",
  "https://cf.cjdropshipping.com/00978b38-af86-4a0e-8569-e9f40a644f72.jpg",
];

export const TIERS: Tier[] = [
  {
    id: "solo",
    name: "Solo Chaleur Mains",
    tagline: "1x Gants chauffants",
    price: 34.9,
    compare: 54.9,
    items: ["1× Gants chauffants SWELTR"],
    cjItems: [{ vid: "42BD9CA6-6D95-4B26-8F20-A52375663923", quantity: 1 }],
    images: HEATED_GLOVES_GALLERY,
    cardImages: [PRODUCT_IMAGES.heatedGloves],
    description:
      "Des gants chauffants rechargeables par USB pour protéger tes mains pendant les trajets et les activités par temps froid.",
    specs: [
      { label: "Autonomie", value: "Jusqu'à 4h de chaleur constante" },
      { label: "Recharge", value: "USB, complète en environ 2h" },
      { label: "Coloris", value: "Gris, kaki ou rouge" },
      { label: "Poids", value: "Environ 314g la paire" },
      { label: "Matière", value: "Tissu isolant, doublure chaude" },
    ],
  },
  {
    id: "duo",
    name: "Duo Chaleur Totale",
    tagline: "Gants chauffants + Écharpe chauffante",
    price: 49.9,
    compare: 79.9,
    items: ["1× Gants chauffants SWELTR", "1× Écharpe chauffante USB"],
    best: true,
    cjItems: [
      { vid: "42BD9CA6-6D95-4B26-8F20-A52375663923", quantity: 1 }, // gants chauffants
      { vid: "2410090540221610300", quantity: 1 }, // écharpe chauffante
    ],
    images: [...HEATED_GLOVES_GALLERY.slice(0, 3), ...HEATED_SCARF_GALLERY.slice(0, 3)],
    cardImages: [PRODUCT_IMAGES.heatedGloves, PRODUCT_IMAGES.heatedScarf],
    description:
      "Des gants chauffants et une écharpe USB à trois niveaux pour protéger les mains et le cou du froid.",
    specs: [
      { label: "Contenu", value: "1 gants chauffants + 1 écharpe chauffante" },
      { label: "Autonomie gants", value: "Jusqu'à 4h" },
      { label: "Paliers écharpe", value: "3 réglages : 42°C, 48°C, 55°C" },
      { label: "Recharge", value: "USB pour les deux accessoires" },
      { label: "Entretien écharpe", value: "Lavable, sans démontage" },
    ],
  },
  {
    id: "trio",
    name: "Kit Grand Froid",
    tagline: "Gants chauffants + Écharpe chauffante + Chaussettes thermiques",
    price: 59.9,
    compare: 99.9,
    items: [
      "1× Gants chauffants SWELTR",
      "1× Écharpe chauffante USB",
      "1× Chaussettes thermiques",
    ],
    cjItems: [
      { vid: "42BD9CA6-6D95-4B26-8F20-A52375663923", quantity: 1 }, // gants chauffants
      { vid: "2410090540221610300", quantity: 1 }, // écharpe chauffante
      { vid: "1573872746495488003", quantity: 1 }, // chaussettes thermiques
    ],
    images: [
      ...HEATED_GLOVES_GALLERY.slice(0, 2),
      ...HEATED_SCARF_GALLERY.slice(0, 2),
      ...THERMAL_SOCKS_GALLERY.slice(0, 2),
    ],
    cardImages: [PRODUCT_IMAGES.heatedGloves, PRODUCT_IMAGES.heatedScarf, PRODUCT_IMAGES.thermalSocks],
    description:
      "Le kit qui réunit gants chauffants, écharpe USB et chaussettes thermiques pour équiper plusieurs zones.",
    specs: [
      { label: "Contenu", value: "1 gants chauffants + 1 écharpe chauffante + 1 paire de chaussettes thermiques" },
      { label: "Autonomie gants", value: "Jusqu'à 4h" },
      { label: "Paliers écharpe", value: "3 réglages : 42°C, 48°C, 55°C" },
      { label: "Chaussettes", value: "Molleton épais, isolation thermique passive (sans batterie)" },
      { label: "Recharge", value: "USB pour gants et écharpe" },
    ],
  },
];

export const FAQS = [
  {
    q: "Combien de temps dure la chaleur ?",
    a: "Les gants chauffants tiennent jusqu'à 4h de chaleur constante par charge. L'écharpe chauffante tient environ 3 à 4h selon le palier choisi (42°C à 55°C). Les deux se rechargent en USB en environ 2h. Les chaussettes thermiques n'ont pas de batterie : elles isolent naturellement, sans limite d'autonomie.",
  },
  {
    q: "En combien de temps je suis livré ?",
    a: "Ta commande est expédiée sous 48h après paiement. Le délai de livraison est en moyenne de 7 à 15 jours ouvrés selon ta localisation.",
  },
  {
    q: "Est-ce que ça tient vraiment chaud ?",
    a: "Oui. Les gants et l'écharpe chauffent activement (jusqu'à 55°C pour l'écharpe, sur 3 paliers réglables) — tu sens la différence dès l'allumage, même par grand froid. Les chaussettes thermiques épaisses complètent avec une isolation passive.",
  },
  {
    q: "Et si ça ne me réchauffe pas assez ?",
    a: "Tu as 30 jours pour l'essayer. Si tu ne sens pas la différence, on te rembourse intégralement, sans justification à donner.",
  },
];

export const REPORTS = [
  {
    name: "Léa, Lyon",
    temp: "-4°C",
    quote:
      "Portés sur le quai du métro en plein pic de froid, les gants ont littéralement sauvé mon trajet.",
    stars: 5,
  },
  {
    name: "Marcus, Bruxelles",
    temp: "-8°C",
    quote:
      "Tient toute une journée de chantier en extérieur sur une seule charge, je ne m'y attendais pas.",
    stars: 5,
  },
  {
    name: "Amina, Genève",
    temp: "-2°C",
    quote:
      "L'écharpe chauffante est devenue mon réflexe dès que le thermomètre passe sous zéro.",
    stars: 5,
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
