// Booking constants. Swap WHATSAPP_NUMBER for the real one (international format, no +).
export const WHATSAPP_NUMBER = "5492617084435";
export const PHONE_DISPLAY = "0261 708-4435";
export const INSTAGRAM_URL = "https://www.instagram.com/roma_barberclub/";
export const FACEBOOK_URL = "https://www.facebook.com/people/Romabarberclub/61566218284076/";
export const ADDRESS = "Las Heras, Mendoza (Sta. Rosa, manzana G, casa 35)";

export type ServiceKey = "corte" | "barba" | "cejas" | "combo";

export const SERVICES: Array<{
  key: ServiceKey;
  name: string;
  description: string;
  priceLabel: string;
}> = [
  {
    key: "corte",
    name: "Corte de pelo",
    description: "Corte a medida con máquina y tijera. Lavado y peinado incluido.",
    priceLabel: "desde $8.000",
  },
  {
    key: "barba",
    name: "Perfilado de barba",
    description: "Diseño, perfilado y toalla caliente para un acabado prolijo.",
    priceLabel: "desde $6.000",
  },
  {
    key: "cejas",
    name: "Cejas",
    description: "Perfilado de cejas para redondear el look.",
    priceLabel: "desde $3.000",
  },
  {
    key: "combo",
    name: "Combo Corte + Barba",
    description: "El combo completo. Corte, barba y detalles finales.",
    priceLabel: "desde $12.000",
  },
];

export function buildWhatsAppUrl(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
