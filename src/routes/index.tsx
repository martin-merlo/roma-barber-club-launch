import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
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
  Volume2,
  VolumeX,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { BookingForm } from "@/components/BookingForm";
import { useReveal } from "@/hooks/useReveal";
import {
  ADDRESS,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  SCHEDULE_LINES,
  WHATSAPP_NUMBER,
  buildWhatsAppUrl,
} from "@/lib/booking";

import heroImg from "@/assets/hero-barber.jpg";
import logoSvg from "@/assets/LogoSVG.svg";
import nosotrosVideo from "@/assets/video.mp4";
import corte1 from "@/assets/Corte1.png";
import corte2 from "@/assets/Corte2.png";
import corte3 from "@/assets/Corte3.png";
import corte4 from "@/assets/Corte4.png";
import peluquero1 from "@/assets/Peluquero1.png";
import peluquero2 from "@/assets/Peluquero2.png";

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
          openingHours: [
            "Tu-Th 10:00-14:00",
            "Tu-Th 17:00-21:00",
            "Fr-Sa 10:00-21:00",
          ],
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

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToBooking = useCallback(() => {
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
        <Reservar />
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
          ? "border-border bg-white/85 backdrop-blur"
          : "border-transparent bg-white/60 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2 sm:gap-3">
          <img
            src={logoSvg}
            alt="Roma Barber Club"
            className="h-11 w-auto sm:h-14"
          />
          <span className="wordmark text-sm sm:text-base">
            Roma <span className="text-primary">Barber</span> Club
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
    <section id="top" className="relative isolate overflow-hidden bg-ink text-white">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Barbero de Roma Barber Club haciendo un corte"
          width={1600}
          height={1808}
          className="h-full w-full object-cover object-center opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/20" />
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
              <a href="#galeria">Ver galería</a>
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
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink text-white">
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(100); // 0–100

  // Mantiene el elemento <video> sincronizado con el estado.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
    v.volume = volume / 100;
  }, [muted, volume]);

  function toggleMute() {
    const next = !muted;
    setMuted(next);
    if (!next) {
      if (volume === 0) setVolume(50);
      void videoRef.current?.play().catch(() => {});
    }
  }

  function handleVolume(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(e.target.value);
    setVolume(val);
    setMuted(val === 0);
    if (val > 0) void videoRef.current?.play().catch(() => {});
  }

  return (
    <section id="nosotros" className="section-pad bg-white">
      <div ref={ref} className="reveal mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10 lg:px-8">
        <div className="lg:max-w-[500px]">
          <SectionHeader eyebrow="Nosotros" title="Barbería moderna en Las Heras." align="left" />
          <div className="mt-6 space-y-4 text-base text-muted-foreground sm:text-lg">
            <p>
              En Roma Barber Club combinamos técnica, estilo y buena onda. Un espacio pensado para que te sientas cómodo mientras te ponemos a punto.
            </p>
            <p>
              Trabajamos con productos que cuidan tu piel y tu pelo. Cada corte se piensa para vos: forma, textura y detalle, sin apuro.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-6">
            <Stat number="5.0" label="en Google" />
            <Stat number="66+" label="reseñas" />
            <Stat number="21h" label="abrimos hasta" />
          </div>
        </div>

        <div className="flex justify-center lg:justify-start">
          <div className="relative aspect-[9/16] w-full max-w-[300px] overflow-hidden rounded-2xl bg-ink sm:max-w-[340px] lg:-translate-x-12">
            <video
              ref={videoRef}
              src={nosotrosVideo}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="Interior de Roma Barber Club"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="group absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-2 text-white backdrop-blur transition-colors hover:bg-black/70 focus-within:bg-black/70">
              <input
                type="range"
                min={0}
                max={100}
                value={muted ? 0 : volume}
                onChange={handleVolume}
                aria-label="Volumen"
                className="h-1 w-0 cursor-pointer opacity-0 accent-[#c9a24b] transition-all duration-200 group-hover:w-20 group-hover:opacity-100 group-focus-within:w-20 group-focus-within:opacity-100"
              />
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Activar sonido" : "Silenciar"}
                className="inline-flex h-6 w-6 shrink-0 items-center justify-center"
              >
                {muted || volume === 0 ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-bold tracking-tight">{number}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

/* ---------------- Galería ---------------- */

const GALLERY = [
  { src: corte1, alt: "Corte realizado en Roma Barber Club" },
  { src: corte2, alt: "Corte realizado en Roma Barber Club" },
  { src: peluquero1, alt: "Peluquero de Roma Barber Club trabajando" },
  { src: corte3, alt: "Corte realizado en Roma Barber Club" },
  { src: peluquero2, alt: "Peluquero de Roma Barber Club trabajando" },
  { src: corte4, alt: "Corte realizado en Roma Barber Club" },
];

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
          {GALLERY.map((photo, i) => (
            <div
              key={i}
              className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-white/5"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="absolute inset-0 bg-primary/10" />
              </div>
            </div>
          ))}
        </div>
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
          Listo para tu próximo corte?
        </h3>
        <Button
          onClick={onReservar}
          size="lg"
          className="h-12 bg-white px-6 text-base text-primary hover:bg-white/90"
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
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ink text-white">
                <MapPin className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Dirección</div>
                <div className="mt-0.5 text-base font-semibold">{ADDRESS}</div>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ink text-white">
                <Clock className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Horarios</div>
                <div className="mt-0.5 space-y-0.5 text-base font-semibold">
                  {SCHEDULE_LINES.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ink text-white">
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

function Reservar() {
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
          <BookingForm />
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
                src={logoSvg}
                alt="Roma Barber Club"
                className="h-10 w-auto sm:h-12"
              />
              <div className="wordmark text-base text-white">
                Roma <span className="text-primary">Barber</span> Club
              </div>
            </div>
            <p className="mt-3 max-w-sm text-sm">
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
              {SCHEDULE_LINES.map((line) => (
                <li key={line}>{line}</li>
              ))}
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
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white transition-colors hover:border-primary hover:bg-primary hover:text-white"
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
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition-transform hover:scale-105"
      data-whatsapp={WHATSAPP_NUMBER}
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

/* ---------------- Shared bits ---------------- */

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
            invert ? "text-primary" : "text-primary"
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
