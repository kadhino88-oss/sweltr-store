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

// Photos produit officielles CJ Dropshipping (une par article sourcé)
export const PRODUCT_IMAGES = {
  neckFan:
    "https://oss-cf.cjdropshipping.com/product/2024/04/29/02/b2768d80-0a18-4293-b578-8eb167e790c4_trans.jpeg",
  miniTurbo:
    "https://oss-cf.cjdropshipping.com/product/2024/01/23/08/c001fe12-35fa-4661-a4c3-3d98964d5124.jpg",
  towel: "https://cf.cjdropshipping.com/bd5a2eec-3fe2-42ea-b08f-3c3e6ce4a737.jpg",
};

// Galerie complète du ventilateur de cou (plusieurs angles, via productImageSet CJ)
export const NECK_FAN_GALLERY = [
  "https://oss-cf.cjdropshipping.com/product/2024/04/29/02/b2768d80-0a18-4293-b578-8eb167e790c4_trans.jpeg",
  "https://oss-cf.cjdropshipping.com/product/2024/04/29/02/c112dfaf-f4a4-4e37-b256-7fc00a112070_trans.jpeg",
  "https://oss-cf.cjdropshipping.com/product/2024/04/29/02/d160686e-8da0-4e3b-a51c-8e28ddb519aa_trans.jpeg",
  "https://oss-cf.cjdropshipping.com/product/2024/04/29/02/c3dd99bf-bdf7-4696-b8e2-afeda301240c_trans.jpeg",
  "https://oss-cf.cjdropshipping.com/product/2024/04/29/02/a3a9b031-8f9d-4a29-afe7-28b00a80c3c8_trans.jpeg",
  "https://oss-cf.cjdropshipping.com/product/2024/04/29/02/87d27502-cfbd-4fff-b8ba-5b12de2d0b64_trans.jpeg",
];

// Galerie complète du mini turbo (via productImageSet CJ)
export const MINI_TURBO_GALLERY = [
  "https://oss-cf.cjdropshipping.com/product/2024/01/23/08/c001fe12-35fa-4661-a4c3-3d98964d5124.jpg",
  "https://oss-cf.cjdropshipping.com/product/2024/01/23/08/697ccbd2-3bdf-4949-b68d-637040bf8158_trans.jpeg",
  "https://oss-cf.cjdropshipping.com/product/2024/01/23/08/79bafb39-2994-4479-90f0-efd12ca4f601.jpg",
  "https://oss-cf.cjdropshipping.com/product/2024/01/23/08/cdd7504e-38e8-4aa6-b1d2-4178ef5eb946_trans.jpeg",
  "https://oss-cf.cjdropshipping.com/product/2024/01/23/08/748741d1-e5d2-4a5b-b7aa-72c0c834da92.jpg",
];

// Galerie complète de la serviette rafraîchissante (via productImageSet CJ)
export const TOWEL_GALLERY = [
  "https://cf.cjdropshipping.com/bd5a2eec-3fe2-42ea-b08f-3c3e6ce4a737.jpg",
  "https://cf.cjdropshipping.com/72a9ad11-f639-43ae-aa9f-4ae49ef46cfe.jpg",
  "https://cf.cjdropshipping.com/2e6a13c1-28e5-4976-9293-a7e9cc37e2ab.jpg",
  "https://cf.cjdropshipping.com/90e4d32f-70a1-4f26-991d-4eddb284edfd.jpg",
  "https://cf.cjdropshipping.com/437b10e6-cd18-47b7-b9b1-83d95dded06e.jpg",
];

export const TIERS: Tier[] = [
  {
    id: "solo",
    name: "Solo Fraîcheur",
    tagline: "1x Ventilateur de cou",
    price: 24.9,
    compare: 39.9,
    items: ["1× Ventilateur de cou SWELTR"],
    cjItems: [{ vid: "1784774077022998528", quantity: 1 }],
    images: NECK_FAN_GALLERY,
    cardImages: [PRODUCT_IMAGES.neckFan],
    description:
      "Le ventilateur de cou SWELTR t'accompagne partout : trajet, bureau, sport, festival. Il se porte comme un casque léger autour du cou et souffle un air frais en continu sur ton visage et ta nuque, sans bouger, sans qu'on ait besoin de le tenir. Rechargeable en USB-C, il tient une journée entière sur une seule charge.",
    specs: [
      { label: "Autonomie", value: "Jusqu'à 16h en mode léger, 6h en turbo" },
      { label: "Recharge", value: "USB-C, complète en moins de 2h" },
      { label: "Niveaux de vitesse", value: "3 vitesses réglables" },
      { label: "Poids", value: "Environ 230g" },
      { label: "Bruit", value: "< 45dB en mode turbo" },
    ],
  },
  {
    id: "duo",
    name: "Duo Anti-Canicule",
    tagline: "Ventilateur de cou + Mini Turbo",
    price: 38.9,
    compare: 64.8,
    items: ["1× Ventilateur de cou SWELTR", "1× Mini Turbo portable"],
    best: true,
    cjItems: [
      { vid: "1784774077022998528", quantity: 1 }, // ventilateur de cou
      { vid: "1749714889599361024", quantity: 1 }, // mini turbo
    ],
    images: [...NECK_FAN_GALLERY.slice(0, 3), ...MINI_TURBO_GALLERY.slice(0, 3)],
    cardImages: [PRODUCT_IMAGES.neckFan, PRODUCT_IMAGES.miniTurbo],
    description:
      "Le duo complet pour ne plus jamais subir la chaleur : le ventilateur de cou pour un flux d'air continu en mains libres, et le Mini Turbo à sortir de la poche pour un coup de frais instantané et puissant où que tu sois. Les deux se rechargent en USB-C et se glissent facilement dans un sac.",
    specs: [
      { label: "Contenu", value: "1 ventilateur de cou + 1 mini turbo portable" },
      { label: "Autonomie ventilateur de cou", value: "Jusqu'à 16h" },
      { label: "Autonomie mini turbo", value: "Jusqu'à 10h" },
      { label: "Recharge", value: "USB-C pour les deux appareils" },
      { label: "Bruit", value: "< 45dB en mode turbo" },
    ],
  },
  {
    id: "trio",
    name: "Kit Fraîcheur Totale",
    tagline: "Ventilateur de cou + Mini Turbo + Serviette rafraîchissante",
    price: 49.9,
    compare: 84.7,
    items: [
      "1× Ventilateur de cou SWELTR",
      "1× Mini Turbo portable",
      "1× Serviette rafraîchissante",
    ],
    cjItems: [
      { vid: "1784774077022998528", quantity: 1 }, // ventilateur de cou
      { vid: "1749714889599361024", quantity: 1 }, // mini turbo
      { vid: "1428274664739835904", quantity: 1 }, // serviette rafraîchissante
    ],
    images: [
      ...NECK_FAN_GALLERY.slice(0, 2),
      ...MINI_TURBO_GALLERY.slice(0, 2),
      ...TOWEL_GALLERY.slice(0, 2),
    ],
    cardImages: [PRODUCT_IMAGES.neckFan, PRODUCT_IMAGES.miniTurbo, PRODUCT_IMAGES.towel],
    description:
      "Le kit complet pour ne plus jamais subir une seule journée de canicule : le ventilateur de cou pour un flux d'air continu, le Mini Turbo pour un coup de frais instantané, et la serviette rafraîchissante en microfibre pour un soulagement immédiat sur la peau après l'avoir humidifiée. Le trio parfait pour le trajet, le sport et les longues journées d'été.",
    specs: [
      { label: "Contenu", value: "1 ventilateur de cou + 1 mini turbo + 1 serviette rafraîchissante" },
      { label: "Autonomie ventilateur de cou", value: "Jusqu'à 16h" },
      { label: "Autonomie mini turbo", value: "Jusqu'à 10h" },
      { label: "Serviette", value: "Microfibre à séchage rapide, effet rafraîchissant immédiat une fois humidifiée" },
      { label: "Recharge", value: "USB-C pour les appareils électroniques" },
    ],
  },
];

export const FAQS = [
  {
    q: "Combien de temps dure la batterie ?",
    a: "Le ventilateur de cou tient jusqu'à 16h en mode léger et 6h en turbo. Le Mini Turbo tient jusqu'à 10h. Les deux se rechargent complètement en USB-C en moins de 2h.",
  },
  {
    q: "En combien de temps je suis livré ?",
    a: "Ta commande est expédiée sous 48h après paiement. Le délai de livraison est en moyenne de 7 à 15 jours ouvrés selon ta localisation.",
  },
  {
    q: "Est-ce que c'est vraiment silencieux ?",
    a: "Oui. Le moteur brushless reste sous les 45 décibels en mode turbo, à peine plus qu'un chuchotement à un mètre — tu peux le porter en réunion ou au bureau sans gêner personne.",
  },
  {
    q: "Et si ça ne me rafraîchit pas assez ?",
    a: "Tu as 30 jours pour l'essayer. Si tu ne sens pas la différence, on te rembourse intégralement, sans justification à donner.",
  },
];

export const REPORTS = [
  {
    name: "Léa, Lyon",
    temp: "38°C",
    quote:
      "Porté sur le quai du métro en pleine canicule, ça a littéralement sauvé mon trajet.",
    stars: 5,
  },
  {
    name: "Marcus, Bruxelles",
    temp: "36°C",
    quote:
      "Tient toute une journée de chantier en extérieur sur une seule charge, je ne m'y attendais pas.",
    stars: 5,
  },
  {
    name: "Amina, Douala",
    temp: "35°C",
    quote:
      "Assez silencieux pour le porter en appel, assez puissant pour vraiment sentir l'air.",
    stars: 5,
  },
];

export function heatCopy(t: number) {
  if (t < 26)
    return {
      label: "DOUX",
      desc: "Confortable pour l'instant, mais la météo annonce autre chose.",
      color: "#4FE3C1",
    };
  if (t < 32)
    return {
      label: "TIÈDE",
      desc: "C'est le moment où un ventilateur de cou commence à se justifier.",
      color: "#FFD23F",
    };
  if (t < 38)
    return {
      label: "CHAUD",
      desc: "Zone SWELTR par excellence. Ton trajet va devenir pénible sans lui.",
      color: "#FF7A3C",
    };
  return {
    label: "EXTRÊME",
    desc: "Alerte indice de chaleur. C'est exactement le jour où tu regretteras de ne pas avoir commandé plus tôt.",
    color: "#FF2E63",
  };
}
