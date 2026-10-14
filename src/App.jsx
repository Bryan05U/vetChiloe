import { useEffect, useState } from 'react';
import './App.css';
import TablaPacientes from './components/TablaPacientes';
import TarjetaPaciente from './components/TarjetaPaciente';
import FormularioPaciente from './components/FormularioPaciente';
import imgFelipe from './assets/pets/Charkicito.webp';
import imgMaxi from './assets/pets/Mercedes.webp';
import imgHannita from './assets/pets/Hannita.webp';

const PACIENTES_INICIALES = [
  {
    id: 1,
    nombre: 'Felipe',
    especie: 'Felino',
    peso: 4.5,
    dueno: '11111111-1',
    telefono: '+56912345678',
    numero_atencion: '2026-A1',
    edad: 5,
    diagnostico: 'Otitis externa (oído derecho)',
    ultima_visita: '2026-01-15',
    imagen: imgFelipe,
  },
  {
    id: 2,
    nombre: 'Maxi',
    especie: 'Felino',
    peso: 3.2,
    dueno: '22222222-2',
    telefono: '+56987654321',
    numero_atencion: '2026-B2',
    edad: 8,
    diagnostico: 'Insuficiencia renal crónica - en control',
    ultima_visita: '2026-02-20',
    imagen: imgMaxi,
  },
  {
    id: 3,
    nombre: 'Hannita',
    especie: 'Canino',
    peso: 12.0,
    dueno: '33333333-3',
    telefono: '+56922334455',
    numero_atencion: '2026-C3',
    edad: 3,
    diagnostico: 'Dermatitis alérgica estacional',
    ultima_visita: '2026-03-10',
    imagen: imgHannita,
  },
];

function App() {
  const [pacientes, setPacientes] = useState(PACIENTES_INICIALES);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [pacienteCarnet, setPacienteCarnet] = useState(null);

  const agregarPacientes = (datosPaciente) => {
    setPacientes((previos) => [...previos, { ...datosPaciente, id: Date.now() }]);
  };

  const cerrarFormulario = () => setMostrarFormulario(false);
  const cerrarCarnet = () => setPacienteCarnet(null);

  // Manejador exigido por TablaPacientes: recibe el paciente de la fila y
  // abre su carnet reutilizando la FlipCard de la sección anterior.
  const onVerFicha = (paciente) => setPacienteCarnet(paciente);

  const hayModalAbierto = mostrarFormulario || pacienteCarnet !== null;

  // Cierre controlado con la tecla Escape y bloqueo del scroll de fondo.
  useEffect(() => {
    if (!hayModalAbierto) return undefined;

    const manejarTecla = (evento) => {
      if (evento.key === 'Escape') {
        cerrarFormulario();
        cerrarCarnet();
      }
    };

    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', manejarTecla);

    return () => {
      document.removeEventListener('keydown', manejarTecla);
      document.body.style.overflow = overflowPrevio;
    };
  }, [hayModalAbierto]);

  return (
    <div className="contenedor-principal">
      <header className="cabecera">
        <h1>Sistema de Información - Veterinaria Chiloé</h1>
        <p>Plataforma de control y seguimiento de pacientes</p>
      </header>

      <main>
        <h2>Lista de Pacientes Registrados</h2>

        <TablaPacientes pacientes={pacientes} onVerFicha={onVerFicha} />
      </main>

      <button
        type="button"
        className="boton-flotante"
        onClick={() => setMostrarFormulario(true)}
        aria-haspopup="dialog"
        aria-expanded={mostrarFormulario}
        aria-controls="modal-formulario"
      >
        <span aria-hidden="true">+</span>
        Nuevo Paciente
      </button>

      {mostrarFormulario && (
        <div
          className="modal-fondo"
          onClick={cerrarFormulario}
          role="presentation"
        >
          <div
            className="modal-contenido"
            id="modal-formulario"
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-modal"
            onClick={(evento) => evento.stopPropagation()}
          >
            <button
              type="button"
              className="modal-cerrar"
              onClick={cerrarFormulario}
              aria-label="Cerrar formulario"
            >
              <span aria-hidden="true">×</span>
            </button>

            <FormularioPaciente
              onAgregarPacientes={agregarPacientes}
              onCerrar={cerrarFormulario}
            />
          </div>
        </div>
      )}

      {pacienteCarnet && (
        <div
          className="modal-fondo"
          onClick={cerrarCarnet}
          role="presentation"
        >
          <div
            className="modal-contenido modal-contenido--carnet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-carnet"
            onClick={(evento) => evento.stopPropagation()}
          >
            <button
              type="button"
              className="modal-cerrar"
              onClick={cerrarCarnet}
              aria-label="Cerrar carnet"
            >
              <span aria-hidden="true">×</span>
            </button>

            <h2 id="titulo-carnet">Carnet de {pacienteCarnet.nombre}</h2>

            {/* key fuerza el remontaje para que el carnet abra en el reverso. */}
            <div className="carnet-visual" key={pacienteCarnet.id}>
              <TarjetaPaciente paciente={pacienteCarnet} mostrarReverso />
            </div>

            <p className="carnet-ayuda">
              Haz clic sobre el carnet para girarlo y ver la fotografía.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
