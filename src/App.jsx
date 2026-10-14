import { useEffect, useState } from 'react';
import TarjetaPaciente from './components/TarjetaPaciente';
import FichaClinica from './components/FichaClinica';
import FormularioPaciente from './components/FormularioPaciente';
import { actualizarPaciente as guardarPaciente, obtenerPacientes, registrarPaciente } from './services/pacienteService';
import './App.css';

function App() {
  const [pacientes, setPacientes] = useState([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [vistaActual, setVistaActual] = useState('fichas');

  useEffect(() => {
    let activo = true;
    obtenerPacientes().then((resultado) => {
      if (activo) setPacientes(resultado);
    });

    return () => {
      activo = false;
    };
  }, []);

  const agregarPaciente = async (datos) => {
    const nuevoPaciente = await registrarPaciente(datos);
    if (!nuevoPaciente) return;

    setPacientes((pacientesActuales) => [...pacientesActuales, nuevoPaciente]);
    setVistaActual('fichas');
  };

  const actualizarPaciente = async (datos) => {
    if (!pacienteSeleccionado) return;

    const pacienteActualizado = await guardarPaciente(pacienteSeleccionado.id, datos);
    if (!pacienteActualizado) return;

    setPacientes((pacientesActuales) => pacientesActuales.map((paciente) => (
      paciente.id === pacienteActualizado.id ? pacienteActualizado : paciente
    )));
    setPacienteSeleccionado(pacienteActualizado);
  };

  return (
    <div className="contenedor-principal">
      <header className="cabecera">
        <div className="identidad-clinica">
          <span className="marca-clinica" aria-hidden="true">V</span>
          <div>
            <p className="nombre-clinica">VetChiloé</p>
            <p className="subtitulo-clinica">Gestión clínica veterinaria</p>
          </div>
        </div>
        <div className="estado-clinica"><span /> Atención de pacientes</div>
      </header>

      <nav className="navegacion-vistas" aria-label="Secciones de pacientes">
        <button
          className={vistaActual === 'registro' ? 'boton-vista activa' : 'boton-vista'}
          type="button"
          aria-pressed={vistaActual === 'registro'}
          onClick={() => {
            setPacienteSeleccionado(null);
            setVistaActual('registro');
          }}
        >
          Registrar paciente
        </button>
        <button
          className={vistaActual === 'fichas' ? 'boton-vista activa' : 'boton-vista'}
          type="button"
          aria-pressed={vistaActual === 'fichas'}
          onClick={() => {
            setPacienteSeleccionado(null);
            setVistaActual('fichas');
          }}
        >
          Fichas clínicas <span className="contador-pacientes">{pacientes.length}</span>
        </button>
      </nav>

      <main>
        {pacienteSeleccionado ? (
          <FichaClinica
            paciente={pacienteSeleccionado}
            onVolver={() => setPacienteSeleccionado(null)}
            onGuardarCambios={actualizarPaciente}
          />
        ) : vistaActual === 'registro' ? (
          <section className="seccion-vista">
            <div className="encabezado-vista">
              <p className="ceja-vista">NUEVO REGISTRO</p>
              <h1>Ingreso de paciente</h1>
              <p>Completa los datos del paciente y su responsable.</p>
            </div>
            <FormularioPaciente onAgregarPaciente={agregarPaciente} />
          </section>
        ) : (
          <section className="seccion-vista">
            <div className="encabezado-vista encabezado-lista">
              <div>
                <p className="ceja-vista">DIRECTORIO CLÍNICO</p>
                <h1>Fichas de pacientes</h1>
                <p>Pacientes registrados en la clínica.</p>
              </div>
              <button className="accion-primaria" type="button" onClick={() => setVistaActual('registro')}>
                Registrar paciente
              </button>
            </div>
            <div className="cuadricula-tarjetas">
              {pacientes.map((pacienteIterado) => (
                <TarjetaPaciente
                  key={pacienteIterado.id}
                  paciente={pacienteIterado}
                  onVerFicha={setPacienteSeleccionado}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;