import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import {
  Scissors,
  Sparkles,
  Smile,
  Leaf,
  Star,
  MapPin,
  Clock,
  Phone,
  Instagram,
  Facebook,
  Menu,
  X,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { BookingForm } from "@/components/BookingForm";
import { useReveal } from "@/hooks/useReveal";
import {
  ADDRESS,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  WHATSAPP_NUMBER,
  buildWhatsAppUrl,
  type ServiceKey,
} from "@/lib/booking";

// Placeholder logo — swap src/assets/logo.svg with the real Roma Barber Club logo file.
import logoSrc from "@/assets/logo.svg";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HairSalon",
          name: "Roma Barber Club",
          image: "",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Sta. Rosa, manzana G, casa 35",
            addressLocality: "Las Heras",
            addressRegion: "Mendoza",
            addressCountry: "AR",
          },
          telephone: "+54 261 708-4435",
          priceRange: "$$",
          openingHours: "Mo-Sa 10:00-21:00",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5.0",
            reviewCount: "66",
          },
          sameAs: [
            "https://www.instagram.com/roma_barberclub/",
            "https://www.facebook.com/people/Romabarberclub/61566218284076/",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

const NAV = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#galeria", label: "Galería" },
  { href: "#resenas", label: "Reseñas" },
  { href: "#ubicacion", label: "Ubicación" },
  { href: "#reservar", label: "Reservar" },
];

const TESTIMONIALS = [
  {
    name: "Silvia del Carmen Vega Oropel",
    text: "Excelente atención, amables y divertidos.",
  },
  {
    name: "Lautaro Torres",
    text: "Lo recomiendo, Roma Barber Club te corta bien, son profesionales, buenos servicios, te atienden de 10 y son buena onda. Muy buen lugar y atención. Recomiendan el cuidado de tu piel y tu cabello. ❤️🏅",
  },
  {
    name: "Lucas García",
    text: "¡Excelente atención! ¡Impecable servicio!",
  },
  {
    name: "Facundo Cherlo",
    text: "Cortan muy bien, la atención excelente, te dejan re fachero y los pibes re buena onda. Muy recomendable.",
  },
  {
    name: "Renzo Sánchez",
    text: "Excelente atención, cortes muy facheros, lugar cómodo y muy buena onda de parte del peluquero.",
  },
];

const VALUE_PROPS = [
  { icon: Scissors, title: "Cortes profesionales", text: "Técnica prolija y estilo actual." },
  { icon: Sparkles, title: "Atención de primera", text: "Puntualidad, prolijidad y detalle." },
  { icon: Smile, title: "Buena onda siempre", text: "Un ambiente cómodo para disfrutar." },
  { icon: Leaf, title: "Cuidado de piel y cabello", text: "Productos y consejos para vos." },
];

const GALLERY_SLOTS = [
  { file: "gallery-1.jpg", label: "Corte 01" },
  { file: "gallery-2.jpg", label: "Corte 02" },
  { file: "gallery-3.jpg", label: "Barba 01" },
  { file: "gallery-4.jpg", label: "Ambiente 01" },
  { file: "gallery-5.jpg", label: "Corte 03" },
  { file: "gallery-6.jpg", label: "Barba 02" },
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [preselect, setPreselect] = useState<ServiceKey | null>(null);

  const scrollToBooking = useCallback((service?: ServiceKey) => {
    if (service) setPreselect(service);
    setMenuOpen(false);
    const el = document.getElementById("reservar");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onReservar={() => scrollToBooking()}
      />

      <main>
        <Hero onReservar={() => scrollToBooking()} />
        <ValueProps />
        <Nosotros />
        <Galeria />
        <Resenas />
        <CtaStrip onReservar={() => scrollToBooking()} />
        <Ubicacion />
        <Reservar preselect={preselect} onConsumed={() => setPreselect(null)} />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

/* ---------------- Header ---------------- */

function Header({
  menuOpen,
  setMenuOpen,
  onReservar,
}: {
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  onReservar: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-colors ${
        scrolled
          ? "border-border bg-white/90 backdrop-blur"
          : "border-transparent bg-white/70 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <img
            src={logoSrc}
            alt="Roma Barber Club"
            className="h-12 w-12 rounded-md sm:h-14 sm:w-14"
          />
          <span className="wordmark hidden text-sm text-ink sm:inline">
            Roma Barber Club
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button onClick={onReservar} className="h-10 px-5">
            Reservá tu turno
          </Button>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md md:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-white md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-border py-4 text-base font-medium last:border-b-0"
              >
                {n.label}
              </a>
            ))}
            <Button onClick={onReservar} className="mt-4 h-12">
              Reservá tu turno
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */

function Hero({ onReservar }: { onReservar: () => void }) {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-ink text-white"
      data-photo-slot="hero-bg-barbershop.jpg"
    >
      {/* Placeholder for hero background — swap with real photo: hero-bg-barbershop.jpg */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1200px 600px at 20% 20%, rgba(255,215,0,0.18), transparent 60%), radial-gradient(900px 500px at 80% 80%, rgba(255,255,255,0.06), transparent 60%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0 1px, transparent 1px 14px)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
      </div>

      <div className="absolute right-4 top-4 z-10 rounded-md border border-white/10 bg-black/40 px-2 py-1 text-[10px] uppercase tracking-widest text-white/40 sm:right-6">
        hero-bg-barbershop.jpg
      </div>

      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium backdrop-blur">
            <span className="inline-flex items-center gap-1 text-primary">
              <Star className="h-3.5 w-3.5 fill-primary" />
              5.0
            </span>
            <span className="text-white/70">·</span>
            <span className="text-white/80">66 reseñas en Google</span>
          </div>

          <h1 className="mt-6 text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Tu mejor corte,
            <br />
            <span className="text-primary">siempre.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/75 sm:text-xl">
            Barbería en Las Heras, Mendoza. Cortes, barba y cuidado para que salgas fachero. Reservá tu turno en minutos.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button onClick={onReservar} size="lg" className="h-12 px-6 text-base">
              Reservá tu turno
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 border-white/20 bg-transparent px-6 text-base text-white hover:bg-white/10 hover:text-white"
            >
              <a href="#nosotros">Conocenos</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Value props ---------------- */

function ValueProps() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="section-pad bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_PROPS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex flex-col">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink text-primary">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Nosotros ---------------- */

function Nosotros() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="nosotros" className="section-pad bg-white">
      <div
        ref={ref}
        className="reveal mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8"
      >
        <div>
          <SectionHeader
            eyebrow="Nosotros"
            title="Una barbería moderna, para tu estilo."
            align="left"
          />
          <div className="mt-6 space-y-4 text-base text-muted-foreground sm:text-lg">
            <p>
              Roma Barber Club es una barbería pensada para los pibes de hoy. Cortes actuales, fades bien definidos, barba prolija y la onda que buscás. Un espacio relajado, con buena música y mejor atención, donde cada corte se hace a tu medida. Vení, relajate y salí con la mejor versión de tu estilo.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-6">
            <Stat number="5.0" label="en Google" />
            <Stat number="66+" label="reseñas" />
            <Stat number="21h" label="abrimos hasta" />
          </div>
        </div>

        <PhotoSlot
          filename="nosotros-interior.jpg"
          label="Interior de la barbería"
          className="aspect-[4/5] w-full"
        />
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="inline-flex min-w-[3.5rem] items-center justify-center rounded-lg bg-ink px-3 py-1.5 text-3xl font-bold tracking-tight text-primary">
        {number}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

/* ---------------- Galería ---------------- */

function Galeria() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="galeria" className="section-pad bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeader
            eyebrow="Galería"
            title="El trabajo habla."
            align="left"
            invert
          />
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-primary"
          >
            <Instagram className="h-4 w-4" />
            Seguinos en Instagram
          </a>
        </div>

        <div ref={ref} className="reveal mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {GALLERY_SLOTS.map((s) => (
            <PhotoSlot
              key={s.file}
              filename={s.file}
              label={s.label}
              variant="dark"
              className="aspect-square"
            />
          ))}
        </div>
        <p className="mt-4 text-xs text-white/40">
          Espacios listos para reemplazar por fotos reales.
        </p>
      </div>
    </section>
  );
}

/* ---------------- Reseñas ---------------- */

function Resenas() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="resenas" className="section-pad bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Reseñas"
          title="5.0 en Google · 66 reseñas"
          subtitle="Lo que dicen quienes ya se atendieron con nosotros."
        />

        <div
          ref={ref}
          className="reveal mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-2xl border border-border bg-white p-6"
            >
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground">
                “{t.text}”
              </blockquote>
              <figcaption className="mt-6 text-sm font-medium text-muted-foreground">
                — {t.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA strip ---------------- */

function CtaStrip({ onReservar }: { onReservar: () => void }) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-14 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">
          ¿Listo para tu próximo corte?
        </h3>
        <Button
          onClick={onReservar}
          size="lg"
          className="h-12 bg-ink px-6 text-base text-white hover:bg-ink/90"
        >
          Reservá tu turno
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}

/* ---------------- Ubicación ---------------- */

function Ubicacion() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="ubicacion" className="section-pad bg-surface-muted">
      <div ref={ref} className="reveal mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHeader
            eyebrow="Ubicación y horarios"
            title="Encontranos en Las Heras."
            align="left"
          />

          <ul className="mt-8 space-y-6">
            <li className="flex gap-4">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ink text-primary">
                <MapPin className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Dirección</div>
                <div className="mt-0.5 text-base font-semibold">{ADDRESS}</div>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ink text-primary">
                <Clock className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Horario</div>
                <div className="mt-0.5 text-base font-semibold">Abierto hasta las 21:00</div>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ink text-primary">
                <Phone className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Teléfono</div>
                <a
                  href={`tel:${PHONE_DISPLAY.replace(/\s|-/g, "")}`}
                  className="mt-0.5 block text-base font-semibold hover:text-primary"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
            </li>
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-border bg-white">
          <iframe
            title="Mapa de Roma Barber Club"
            src="https://www.google.com/maps?q=Las+Heras,+Mendoza,+Argentina&output=embed"
            className="h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Reservar ---------------- */

function Reservar({
  preselect,
  onConsumed,
}: {
  preselect: ServiceKey | null;
  onConsumed: () => void;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="reservar" className="section-pad bg-ink text-white">
      <div ref={ref} className="reveal mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Reservá"
          title="Reservá tu turno"
          subtitle="Elegí día y hora. Confirmamos por WhatsApp en el momento."
          invert
        />
        <div className="mt-10 text-foreground">
          <BookingForm
            preselectedService={preselect}
            onPreselectConsumed={onConsumed}
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img
                src={logoSrc}
                alt="Roma Barber Club"
                className="h-12 w-12 rounded-md"
              />
              <div className="wordmark text-base text-white">
                Roma <span className="text-primary">Barber</span> Club
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm">
              Barbería moderna en Las Heras, Mendoza. Cortes, barba y cuidado para vos.
            </p>
            <div className="mt-5 flex gap-3">
              <SocialLink href={INSTAGRAM_URL} label="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={FACEBOOK_URL} label="Facebook">
                <Facebook className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">Navegación</div>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-white">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">Contacto</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>{ADDRESS}</li>
              <li>
                <a href={`tel:${PHONE_DISPLAY.replace(/\s|-/g, "")}`} className="hover:text-white">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>Abierto hasta las 21:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/50">
          © {new Date().getFullYear()} Roma Barber Club. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white transition-colors hover:border-primary hover:bg-primary hover:text-ink"
    >
      {children}
    </a>
  );
}

/* ---------------- Floating WhatsApp ---------------- */

function FloatingWhatsApp() {
  const href = buildWhatsAppUrl(
    "¡Hola Roma Barber Club! Quiero consultar por un turno.",
  );
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-ink shadow-lg shadow-primary/30 transition-transform hover:scale-105"
      data-whatsapp={WHATSAPP_NUMBER}
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

/* ---------------- Shared bits ---------------- */

function PhotoSlot({
  filename,
  label,
  className = "",
  variant = "light",
}: {
  filename: string;
  label: string;
  className?: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  return (
    <div
      data-photo-slot={filename}
      className={`group relative overflow-hidden rounded-2xl border ${
        isDark ? "border-white/10 bg-white/5" : "border-border bg-surface-muted"
      } ${className}`}
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center">
        <span
          className={`text-[10px] uppercase tracking-[0.25em] ${
            isDark ? "text-white/40" : "text-muted-foreground"
          }`}
        >
          {label}
        </span>
        <span
          className={`text-[10px] font-mono ${
            isDark ? "text-white/25" : "text-muted-foreground/60"
          }`}
        >
          {filename}
        </span>
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="absolute inset-0 bg-primary/10" />
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  invert = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  invert?: boolean;
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignCls}`}>
      {eyebrow && (
        <div
          className={`text-xs font-semibold uppercase tracking-[0.2em] ${
            invert ? "text-primary" : "inline-block rounded-md bg-ink px-3 py-1 text-primary"
          }`}
        >
          {eyebrow}
        </div>
      )}
      <h2
        className={`mt-3 text-4xl font-bold tracking-tight sm:text-5xl ${
          invert ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg ${
            invert ? "text-white/70" : "text-muted-foreground"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
