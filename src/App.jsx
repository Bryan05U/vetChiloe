
import { useEffect, useState } from 'react';
import TablaPacientes from './components/TablaPacientes';
import BuscadorPaciente from './components/BuscadorPaciente';
import FichaClinica from './components/FichaClinica';
import FormularioPaciente from './components/FormularioPaciente';
import './App.css';

const API_URL = 'http://localhost:3000/api/pacientes';

function App() {
  const [pacientes, setPacientes] = useState([]);
  const [pacientesFiltrados, setPacientesFiltrados] = useState([]);

  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Obtener todos los pacientes desde PostgreSQL
  useEffect(() => {
    const controller = new AbortController();

    const cargarPacientes = async () => {
      try {
        setError('');

        const respuesta = await fetch(API_URL, {
          signal: controller.signal
        });

        if (!respuesta.ok) {
          throw new Error('Error al obtener pacientes');
        }

        const datos = await respuesta.json();

        if (!controller.signal.aborted) {
          setPacientes(datos);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('No se pudo conectar con el servidor');
        }
      }
    };

    cargarPacientes();

    return () => controller.abort();
  }, []);

  // Buscar pacientes utilizando PostgreSQL
  useEffect(() => {
    const controller = new AbortController();

    const buscarPacientes = async () => {
      try {
        setCargando(true);
        setError('');

        const respuesta = await fetch(
          `${API_URL}/buscar?q=${encodeURIComponent(textoBusqueda.trim())}`,
          { signal: controller.signal }
        );

        if (!respuesta.ok) {
          throw new Error('Error al buscar pacientes');
        }

        const datos = await respuesta.json();

        if (!controller.signal.aborted) {
          setPacientesFiltrados(datos);
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('No se pudo realizar la búsqueda');
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    };

    buscarPacientes();

    return () => controller.abort();
  }, [textoBusqueda]);

  // Agregar paciente desde el formulario
  // La persistencia en PostgreSQL se implementará en el Paso 4.
  const agregarNuevoPaciente = (nuevoPaciente) => {
    setPacientes((anteriores) => [...anteriores, nuevoPaciente]);
    setPacientesFiltrados((anteriores) => [
      ...anteriores,
      nuevoPaciente
    ]);
    setMostrarFormulario(false);
  };

  // Vista de Ficha Clínica
  if (pacienteSeleccionado !== null) {
    return (
      <div className="contenedor-principal">
        <header className="cabecera">
          <h1>
            Carnet Clínico: {pacienteSeleccionado.nombre}
          </h1>

          <button
            onClick={() => setPacienteSeleccionado(null)}
            className="btn-volver"
          >
            ← Volver a la lista
          </button>
        </header>

        <main>
          <FichaClinica paciente={pacienteSeleccionado} />
        </main>
      </div>
    );
  }

  // Vista principal
  return (
    <div className="contenedor-principal">
      <header className="cabecera">
        <h1>
          Sistema de Información - Veterinaria Chiloé
        </h1>
        <p>
          Plataforma de control y seguimiento de pacientes
        </p>
      </header>

      <main>
        <h2>Pacientes Registrados</h2>

        <BuscadorPaciente
          textoBusqueda={textoBusqueda}
          onCambiarBusqueda={setTextoBusqueda}
        />

        {error && (
          <p role="alert" className="mensaje-error">
            {error}
          </p>
        )}

        {cargando ? (
          <p role="status">Cargando pacientes...</p>
        ) : !error ? (
          <>
            <p
              className="contador-pacientes"
              aria-live="polite"
            >
              {pacientesFiltrados.length} de{' '}
              {pacientes.length} pacientes
            </p>

            <TablaPacientes
              pacientes={pacientesFiltrados}
              onVerFicha={setPacienteSeleccionado}
              hayBusqueda={textoBusqueda.trim() !== ''}
            />
          </>
        ) : null}
      </main>

      {/* Formulario modal */}
      {mostrarFormulario && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <button
              className="btn-cerrar-modal"
              onClick={() => setMostrarFormulario(false)}
            >
              ✖
            </button>

            <FormularioPaciente
              onAgregarPaciente={agregarNuevoPaciente}
            />
          </div>
        </div>
      )}

      {/* Botón flotante */}
      <button
        className="btn-flotante"
        onClick={() => setMostrarFormulario(true)}
      >
        <span className="icono-mas">+</span>
        {' '}Agregar Nuevo Paciente
      </button>
    </div>
  );
}

export default App;
