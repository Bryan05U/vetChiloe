import { useState } from 'react';
import TarjetaPaciente from './components/TarjetaPaciente';
import FichaClinica from './components/FichaClinica';
import FormularioPaciente from './components/FormularioPaciente';
import './App.css';

function App() {
  const [pacientes, setPacientes] = useState([
    {
      id: 1,
      nombre: 'Charkicito',
      especie: 'Perro',
      raza: 'Mestizo',
      edad: '4 años',
      peso: '12 kg',
      duenio: 'Camila Soto',
      numero_atencion: '2026-A1',
      emoji: '🐶',
      diagnostico: 'Dermatitis leve',
      historial: [{ fecha: '2026-09-20', detalle: 'Control y tratamiento tópico.' }],
    },
    {
      id: 2,
      nombre: 'Mercedes',
      especie: 'Gato',
      raza: 'Doméstico',
      edad: '2 años',
      peso: '4 kg',
      duenio: 'Diego Pérez',
      numero_atencion: '2026-B2',
      emoji: '🐱',
      diagnostico: 'Vacunación al día',
      historial: [{ fecha: '2026-09-18', detalle: 'Se aplica vacuna triple felina.' }],
    },
    {
      id: 3,
      nombre: 'Hannita',
      especie: 'Perro',
      raza: 'Border Collie',
      edad: '6 años',
      peso: '18 kg',
      duenio: 'Francisco Kroff',
      numero_atencion: '2026-C3',
      emoji: '🐕',
      diagnostico: 'Control preventivo',
      historial: [{ fecha: '2026-09-15', detalle: 'Examen general sin hallazgos.' }],
    },
  ]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [vistaActual, setVistaActual] = useState('fichas');

  const agregarPaciente = (datos) => {
    const edad = Number(datos.edad);
    const peso = Number(datos.peso);
    if (!Number.isFinite(edad) || edad < 0 || !Number.isFinite(peso) || peso < 0) return;

    const nuevoPaciente = {
      ...datos,
      id: Date.now(),
      edad: `${edad} años`,
      peso: `${peso} kg`,
      numero_atencion: `2026-N${pacientes.length + 1}`,
      emoji: datos.especie === 'Gato' ? '🐱' : datos.especie === 'Perro' ? '🐶' : '🐾',
      historial: [{ fecha: new Date().toISOString().slice(0, 10), detalle: 'Paciente registrado.' }],
    };
    setPacientes((pacientesActuales) => [...pacientesActuales, nuevoPaciente]);
    setVistaActual('fichas');
  };

  const actualizarPaciente = (datos) => {
    if (!pacienteSeleccionado) return;

    const edad = Number(datos.edad);
    const peso = Number(datos.peso);
    if (!Number.isFinite(edad) || edad < 0 || !Number.isFinite(peso) || peso < 0) return;

    const pacienteActualizado = {
      ...pacienteSeleccionado,
      ...datos,
      edad: `${edad} años`,
      peso: `${peso} kg`,
      emoji: datos.especie === 'Gato' ? '🐱' : datos.especie === 'Perro' ? '🐶' : '🐾',
    };
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