import { useEffect, useState } from "react";
import { Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SERVICES,
  buildWhatsAppUrl,
  type ServiceKey,
} from "@/lib/booking";

const TIME_SLOTS = (() => {
  const out: string[] = [];
  for (let h = 10; h <= 20; h++) {
    out.push(`${String(h).padStart(2, "0")}:00`);
    out.push(`${String(h).padStart(2, "0")}:30`);
  }
  out.push("21:00");
  return out;
})();

type Props = {
  preselectedService?: ServiceKey | null;
  onPreselectConsumed?: () => void;
};

type Errors = Partial<Record<"servicio" | "fecha" | "hora" | "nombre" | "telefono", string>>;

export function BookingForm({ preselectedService, onPreselectConsumed }: Props) {
  const [servicio, setServicio] = useState<ServiceKey | "">("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setServicio(preselectedService);
      onPreselectConsumed?.();
    }
  }, [preselectedService, onPreselectConsumed]);

  const today = new Date().toISOString().split("T")[0];

  function validate(): boolean {
    const e: Errors = {};
    if (!servicio) e.servicio = "Elegí un servicio";
    if (!fecha) e.fecha = "Elegí una fecha";
    if (!hora) e.hora = "Elegí un horario";
    if (!nombre.trim() || nombre.trim().length < 2) e.nombre = "Ingresá tu nombre";
    if (!telefono.trim() || telefono.replace(/\D/g, "").length < 6)
      e.telefono = "Ingresá un teléfono válido";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;

    const svc = SERVICES.find((s) => s.key === servicio);
    const [y, m, d] = fecha.split("-");
    const fechaFmt = `${d}/${m}/${y}`;

    const msg =
      `¡Hola Roma Barber Club! Quiero reservar un turno.\n\n` +
      `• Servicio: ${svc?.name ?? servicio}\n` +
      `• Fecha: ${fechaFmt}\n` +
      `• Hora: ${hora}\n` +
      `• Nombre: ${nombre.trim()}\n` +
      `• Teléfono: ${telefono.trim()}\n\n` +
      `¿Me confirmás disponibilidad? ¡Gracias!`;

    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  function reset() {
    setSent(false);
    setServicio("");
    setFecha("");
    setHora("");
    setNombre("");
    setTelefono("");
    setErrors({});
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-border bg-white p-8 sm:p-12 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="mt-6 text-2xl font-bold tracking-tight">¡Listo!</h3>
        <p className="mt-2 text-muted-foreground">
          Abrimos WhatsApp con tu pedido. Confirmá el turno con nosotros por ese chat.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={reset}
          className="mt-6"
        >
          Reservar otro turno
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-border bg-white p-6 sm:p-10 shadow-sm"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label htmlFor="servicio" className="mb-2 block text-sm font-medium">
            Servicio
          </Label>
          <Select
            value={servicio}
            onValueChange={(v) => setServicio(v as ServiceKey)}
          >
            <SelectTrigger id="servicio" className="h-12 w-full">
              <SelectValue placeholder="Elegí un servicio" />
            </SelectTrigger>
            <SelectContent>
              {SERVICES.map((s) => (
                <SelectItem key={s.key} value={s.key}>
                  {s.name} — {s.priceLabel}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.servicio && (
            <p className="mt-1 text-sm text-primary">{errors.servicio}</p>
          )}
        </div>

        <div>
          <Label htmlFor="fecha" className="mb-2 block text-sm font-medium">
            Fecha
          </Label>
          <Input
            id="fecha"
            type="date"
            min={today}
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="h-12"
          />
          {errors.fecha && <p className="mt-1 text-sm text-primary">{errors.fecha}</p>}
        </div>

        <div>
          <Label htmlFor="hora" className="mb-2 block text-sm font-medium">
            Hora
          </Label>
          <Select value={hora} onValueChange={setHora}>
            <SelectTrigger id="hora" className="h-12 w-full">
              <SelectValue placeholder="Elegí un horario" />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              {TIME_SLOTS.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.hora && <p className="mt-1 text-sm text-primary">{errors.hora}</p>}
        </div>

        <div>
          <Label htmlFor="nombre" className="mb-2 block text-sm font-medium">
            Nombre
          </Label>
          <Input
            id="nombre"
            type="text"
            autoComplete="name"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            maxLength={80}
            className="h-12"
          />
          {errors.nombre && <p className="mt-1 text-sm text-primary">{errors.nombre}</p>}
        </div>

        <div>
          <Label htmlFor="telefono" className="mb-2 block text-sm font-medium">
            Teléfono
          </Label>
          <Input
            id="telefono"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="Ej: 261 555 1234"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            maxLength={30}
            className="h-12"
          />
          {errors.telefono && (
            <p className="mt-1 text-sm text-primary">{errors.telefono}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="mt-8 h-14 w-full gap-2 text-base"
      >
        <MessageCircle className="h-5 w-5" />
        Reservar por WhatsApp
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Te llevamos a WhatsApp con tu pedido armado. Confirmamos en el chat.
      </p>
    </form>
  );
}
