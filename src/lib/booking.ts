// Booking constants. Swap WHATSAPP_NUMBER for the real one (international format, no +).
export const WHATSAPP_NUMBER = "5492617084435";
export const PHONE_DISPLAY = "0261 708-4435";
export const INSTAGRAM_URL = "https://www.instagram.com/roma_barberclub/";
export const FACEBOOK_URL = "https://www.facebook.com/people/Romabarberclub/61566218284076/";
export const ADDRESS = "Las Heras, Mendoza (Sta. Rosa, manzana G, casa 35)";

export function buildWhatsAppUrl(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/* ---------------- Horarios del local ---------------- */

// Bloques de atención por día de la semana (getDay(): 0=Dom, 1=Lun ... 6=Sáb).
// Cada bloque es [horaInicio, horaFin] en horas (24h), inclusive en intervalos de 30 min.
// Día sin bloques = cerrado.
const SCHEDULE: Record<number, Array<[number, number]>> = {
  0: [], // Domingo: cerrado
  1: [], // Lunes: cerrado
  2: [[10, 14], [17, 21]], // Martes
  3: [[10, 14], [17, 21]], // Miércoles
  4: [[10, 14], [17, 21]], // Jueves
  5: [[10, 21]], // Viernes
  6: [[10, 21]], // Sábado
};

// Texto de horarios para mostrar en la página.
export const SCHEDULE_LINES = [
  "Martes a jueves: 10:00–14:00 y 17:00–21:00",
  "Viernes y sábado: 10:00–21:00",
  "Domingo y lunes: cerrado",
];

// Parsea "YYYY-MM-DD" a día de la semana local (evita corrimientos por UTC).
export function getDayOfWeek(dateStr: string): number | null {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d).getDay();
}

// true si el local está cerrado ese día (domingo o lunes).
export function isClosedDay(dateStr: string): boolean {
  const day = getDayOfWeek(dateStr);
  if (day === null) return false;
  return (SCHEDULE[day] ?? []).length === 0;
}

// Genera los horarios disponibles (cada 30 min) según el día elegido.
export function getTimeSlots(dateStr: string): string[] {
  const day = getDayOfWeek(dateStr);
  if (day === null) return [];
  const blocks = SCHEDULE[day] ?? [];
  const out: string[] = [];
  for (const [start, end] of blocks) {
    for (let mins = start * 60; mins <= end * 60; mins += 30) {
      const h = String(Math.floor(mins / 60)).padStart(2, "0");
      const mm = String(mins % 60).padStart(2, "0");
      out.push(`${h}:${mm}`);
    }
  }
  return out;
}
