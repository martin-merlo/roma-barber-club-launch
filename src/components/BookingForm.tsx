import { useMemo, useState } from "react";
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
  buildWhatsAppUrl,
  getTimeSlots,
  isClosedDay,
} from "@/lib/booking";

type Errors = Partial<Record<"fecha" | "hora" | "nombre" | "telefono", string>>;

export function BookingForm() {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const closed = fecha ? isClosedDay(fecha) : false;
  const slots = useMemo(() => (fecha ? getTimeSlots(fecha) : []), [fecha]);

  function handleFechaChange(value: string) {
    setFecha(value);
    // Si cambia el día, limpiamos la hora si ya no es válida para ese día.
    const nextSlots = value ? getTimeSlots(value) : [];
    if (!nextSlots.includes(hora)) setHora("");
    setErrors((prev) => ({ ...prev, fecha: undefined, hora: undefined }));
  }

  function validate(): boolean {
    const e: Errors = {};
    if (!fecha) {
      e.fecha = "Elegí una fecha";
    } else if (isClosedDay(fecha)) {
      e.fecha = "Cerrado los domingos y lunes";
    }
    if (!fecha || isClosedDay(fecha)) {
      // No pedimos hora si el día está cerrado.
    } else if (!hora) {
      e.hora = "Elegí un horario";
    }
    if (!nombre.trim() || nombre.trim().length < 2) e.nombre = "Ingresá tu nombre";
    if (!telefono.trim() || telefono.replace(/\D/g, "").length < 6)
      e.telefono = "Ingresá un teléfono válido";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;

    const [y, m, d] = fecha.split("-");
    const fechaFmt = `${d}/${m}/${y}`;

    const msg =
      `¡Hola Roma Barber Club! Quiero reservar un turno para el ${fechaFmt} ` +
      `a las ${hora}. Mi nombre es ${nombre.trim()} y mi teléfono es ${telefono.trim()}. ` +
      `¿Me confirmás disponibilidad? ¡Gracias!`;

    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  function reset() {
    setSent(false);
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
        <div>
          <Label htmlFor="fecha" className="mb-2 block text-sm font-medium">
            Fecha
          </Label>
          <Input
            id="fecha"
            type="date"
            min={today}
            value={fecha}
            onChange={(e) => handleFechaChange(e.target.value)}
            className="h-12"
          />
          {errors.fecha && <p className="mt-1 text-sm text-primary">{errors.fecha}</p>}
        </div>

        <div>
          <Label htmlFor="hora" className="mb-2 block text-sm font-medium">
            Hora
          </Label>
          <Select
            value={hora}
            onValueChange={setHora}
            disabled={!fecha || closed}
          >
            <SelectTrigger id="hora" className="h-12 w-full">
              <SelectValue
                placeholder={
                  !fecha
                    ? "Elegí primero una fecha"
                    : closed
                      ? "Cerrado ese día"
                      : "Elegí un horario"
                }
              />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              {slots.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {closed ? (
            <p className="mt-1 text-sm text-primary">
              Cerrado los domingos y lunes. Elegí otro día.
            </p>
          ) : (
            errors.hora && <p className="mt-1 text-sm text-primary">{errors.hora}</p>
          )}
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
