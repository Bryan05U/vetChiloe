import { useState, useRef } from "react";
import ReactCardFlipModule from "react-card-flip";
import { motion } from "motion/react";

const ReactCardFlip = ReactCardFlipModule.default;

const round = (value, precision = 2) => parseFloat(value.toFixed(precision));
const distance = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);

/* Ícono de huella (Figma: icon/paw) */
function PawIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <ellipse cx="5" cy="16.5" rx="4" ry="5.5" />
      <ellipse cx="12.5" cy="8" rx="4" ry="6" />
      <ellipse cx="21" cy="8" rx="4" ry="6" />
      <ellipse cx="28" cy="16.5" rx="4" ry="5.5" />
      <ellipse cx="16" cy="22.5" rx="9" ry="7.5" />
    </svg>
  );
}

/* Ícono de giro (Figma: círculo con flecha) */
function FlipIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="white" />
      <path
        d="M10 7.5l4.5 4.5-4.5 4.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Tarjeta de dato del reverso (Especie / Edad / Raza) */
function Dato({ label, value }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-1 rounded-xl border border-stone-200 bg-white p-3">
      <span className="text-xs font-semibold tracking-wider text-slate-500">
        {label}
      </span>
      <span className="wrap-break-words text-lg font-bold leading-tight text-slate-800">
        {value}
      </span>
    </div>
  );
}

function FichaClinica({ paciente }) {
  const [rotations, setRotations] = useState({ x: 0, y: 0, z: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const isAnimatingRef = useRef(false);

  const animate = (event) => {
    if (isFlipped) return;
    isAnimatingRef.current = true;

    const rect = event.currentTarget.getBoundingClientRect();

    const absolute = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    const percent = {
      x: round((100 / rect.width) * absolute.x),
      y: round((100 / rect.height) * absolute.y),
    };

    const center = {
      x: percent.x - 50,
      y: percent.y - 50,
    };

    setRotations({
      x: round(((center.x > 50 ? 1 : -1) * center.x) / 12),
      y: round(center.y / 16),
      z: round(distance(percent.x, percent.y, 50, 50) / 20),
    });

    setGlare({
      x: percent.x,
      y: percent.y,
      opacity: 0.25,
    });
  };

  const stopAnimating = () => {
    isAnimatingRef.current = false;

    setTimeout(() => {
      if (isAnimatingRef.current) return;
      setRotations({ x: 0, y: 0, z: 2 });
      setGlare({ x: 50, y: 50, opacity: 0 });
    }, 100);
  };

  const flipToBack = () => {
    isAnimatingRef.current = false;
    setRotations({ x: 0, y: 0, z: 2 });
    setGlare({ x: 50, y: 50, opacity: 0 });
    setIsFlipped(true);
  };

  return (
    <div className="m-16">
      <ReactCardFlip flipDirection="horizontal" isFlipped={isFlipped}>
        {/* ================= ANVERSO ================= */}
        <motion.div
          onMouseMove={animate}
          onMouseLeave={stopAnimating}
          onClick={flipToBack}
          animate={{
            rotateY: rotations.x,
            rotateX: rotations.y,
            transformPerspective: rotations.z * 100,
          }}
          style={{
            backgroundImage: `url(${paciente.imagen})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transformStyle: "preserve-3d",
            transformOrigin: "center",
            perspective: "600px",
            backfaceVisibility: "hidden",
          }}
          className="relative flex h-96 w-96 cursor-pointer flex-col justify-end overflow-hidden rounded-2xl border border-stone-200 bg-slate-200 p-6 shadow-xl"
        >
          {/* Degradado inferior para legibilidad */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-slate-900/95 via-slate-900/75 to-transparent" />

          {/* Glare overlay (paralaje) */}
          <motion.div
            style={{
              zIndex: 2,
              mixBlendMode: "overlay",
              transform: "translateZ(1px)",
              transformStyle: "preserve-3d",
            }}
            className="pointer-events-none absolute inset-0 rounded-2xl"
            animate={{
              background: `radial-gradient(
                farthest-corner circle at ${glare.x}% ${glare.y}%,
                rgba(255, 255, 255, 0.7) 10%,
                rgba(255, 255, 255, 0.5) 24%,
                rgba(0, 0, 0, 0.8) 82%
              )`,
              opacity: glare.opacity,
            }}
          />

          {/* Contenido */}
          <div className="relative z-10 flex flex-col gap-3 text-white">
            <span className="w-fit rounded-full border border-white/40 bg-white/15 px-3 py-1 text-xs font-semibold tracking-widest">
              ATENCIÓN N° {paciente.numero_atencion}
            </span>
            <h3 className="wrap-break-words text-4xl font-bold leading-none tracking-tight">
              {paciente.nombre}
            </h3>
          </div>

          <div className="relative z-10 mt-6 flex items-center gap-2 self-end rounded-full border border-white/40 bg-white/15 py-1.5 pl-3 pr-2 text-xs font-semibold text-white">
            Girar la ficha clínica
            <FlipIcon className="h-5 w-5 text-slate-800" />
          </div>
        </motion.div>

        {/* ================= REVERSO ================= */}
        <div
          onClick={() => setIsFlipped(false)}
          className="flex h-96 w-96 cursor-pointer flex-col gap-5 rounded-2xl border border-stone-200 bg-stone-50 p-7 shadow-xl"
        >
          {/* Encabezado */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                <PawIcon className="h-4 w-4" />
              </div>
              <span className="text-xs font-bold tracking-wider text-teal-700">
                FICHA CLÍNICA
              </span>
            </div>
            <span className="rounded-full bg-teal-600 px-3 py-1 text-xs font-semibold tracking-wide text-white">
              ATENCIÓN N° {paciente.numero_atencion}
            </span>
          </div>

          {/* Nombre */}
          <div className="flex flex-col gap-1 border-b border-stone-200 pb-5">
            <span className="text-xs font-semibold tracking-widest text-slate-500">
              NOMBRE
            </span>
            <h3 className="wrap-break-words text-4xl font-bold leading-none tracking-tight text-slate-800">
              {paciente.nombre}
            </h3>
          </div>

          {/* Datos */}
          <div className="flex gap-3">
            <Dato label="ESPECIE" value={paciente.especie} />
            <Dato label="EDAD" value={paciente.edad?.trim()} />
            <Dato label="RAZA" value={paciente.raza} />
          </div>

          {/* Diagnóstico */}
          <div className="flex min-h-0 flex-1 gap-3 rounded-2xl bg-teal-50 p-4">
            <div className="w-1 shrink-0 rounded-full bg-teal-600" />
            <div className="flex min-w-0 flex-1 flex-col gap-2 overflow-y-auto">
              <span className="text-xs font-bold tracking-widest text-teal-700">
                DIAGNÓSTICO
              </span>
              <p className="text-lg font-semibold leading-snug text-slate-800">
                {paciente.diagnostico}
              </p>
            </div>
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default FichaClinica;