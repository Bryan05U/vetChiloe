import { useState } from 'react';

import TarjetaPaciente from './components/TarjetaPaciente';
import FormularioPaciente from './components/FormularioPaciente';

function App() {

  const [pacientes, setPacientes] = useState([
    {
      id: 1,
      nombre: 'Charkicito',
      numero_atencion: '2026-A1'
    },
    {
      id: 2,
      nombre: 'Mercedes',
      numero_atencion: '2026-B2'
    },
    {
      id: 3,
      nombre: 'Hannita',
      numero_atencion: '2026-C3'
    }
  ]);

  // Función para agregar un nuevo paciente
  const agregarPaciente = (nuevoPaciente) => {
    setPacientes([
      ...pacientes,
      {
        ...nuevoPaciente,
        id: Date.now(),
        numero_atencion: `2026-${pacientes.length + 1}`
      }
    ]);
  };

  return (

    <div className="contenedor-principal">

      <header className="cabecera">
        <h1>Sistema de Información - Veterinaria Chiloé</h1>
        <p>Plataforma de control y seguimiento de pacientes</p>
      </header>

      <main>

        <FormularioPaciente
          agregarPaciente={agregarPaciente}
        />

        <h2>Lista de Pacientes Registrados</h2>

        <div className="cuadricula-tarjetas">

          {pacientes.map((pacienteIterado) => (

            <TarjetaPaciente
              key={pacienteIterado.id}
              paciente={pacienteIterado}
            />

          ))}

        </div>

      </main>

    </div>
  );
}

export default App;