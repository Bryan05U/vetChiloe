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
  };

  if (pacienteSeleccionado) {
    return (
      <FichaClinica
        paciente={pacienteSeleccionado}
        onVolver={() => setPacienteSeleccionado(null)}
      />
    );
  }

  return (
    <div className="contenedor-principal">
      <header className="cabecera">
        <h1>Sistema de Información - Veterinaria Chiloé</h1>
        <p>Plataforma de control y seguimiento de pacientes</p>
      </header>

      <main>
        <h2>Lista de Pacientes Registrados</h2>
        <FormularioPaciente onAgregarPaciente={agregarPaciente} />
        <div className="cuadricula-tarjetas">
          
          {pacientes.map((pacienteIterado) => (
            <TarjetaPaciente 
              key={pacienteIterado.id} 
              paciente={pacienteIterado} 
              onVerFicha={setPacienteSeleccionado}
            />
          ))}
          
        </div>
      </main>
    </div>
  );
}

export default App;