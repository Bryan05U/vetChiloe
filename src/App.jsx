import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ListaPacientes from './components/ListaPacientes';
import FormularioPaciente from './components/FormularioPaciente';
import HistorialClinico from './components/HistorialClinico';
import Hospitalizacion from './components/Hospitalizacion';
import './App.css';

function App() {
  const [pestanaActiva, setPestanaActiva] = useState('home');

  const [pacientes, setPacientes] = useState([
    { id: 1, nombre: 'Charkicito', especie: 'Perro', numero_atencion: '2026-A1', foto: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop' },
    { id: 2, nombre: 'Mercedes', especie: 'Gato', numero_atencion: '2026-B2', foto: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop' },
    { id: 3, nombre: 'Hannita', especie: 'Gato', numero_atencion: '2026-C3', foto: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&auto=format&fit=crop' }
  ]);

  const [hospitalizados, setHospitalizados] = useState([
    {
      id: 1,
      paciente: "Hannita",
      especie: "Gato",
      tutor: "Dorys Pacheco",
      contacto: "+56 9 8765 4321",
      estado: "Mejorando",
      ultimaRevision: "Hace 19 min",
      cuidados: "Dieta blanda, suero fisiológico c/8h"
    }
  ]);

  const [historiales, setHistoriales] = useState([
    {
      id: 1,
      pacienteId: 1,
      pacienteNombre: 'Charkicito',
      tipoConsulta: 'Control de Peso / Nutrición',
      peso: '12 kg',
      diagnostico: 'Mascota sana pero con leve sobrepeso.',
      tratamiento: 'Dieta reducida en carbohidratos y caminata diaria.',
      fecha: '28/09/2026'
    }
  ]);

  const agregarPaciente = (nuevo) => {
    setPacientes([nuevo, ...pacientes]);
  };

  const agregarHospitalizado = (nuevoHosp) => {
    setHospitalizados([nuevoHosp, ...hospitalizados]);
  };

  const agregarHistorial = (nuevaAtencion) => {
    setHistoriales([nuevaAtencion, ...historiales]);
  };

  return (
    <div className="app-container">
      <Navbar 
        pestanaActiva={pestanaActiva} 
        setPestanaActiva={setPestanaActiva} 
      />

      <main className="main-content">
        {pestanaActiva === 'home' && (
          <Home 
            hospitalizados={hospitalizados}
            irAPacientes={() => setPestanaActiva('pacientes')} 
          />
        )}

        {pestanaActiva === 'pacientes' && (
          <ListaPacientes pacientes={pacientes} />
        )}

        {pestanaActiva === 'hospitalizacion' && (
          <Hospitalizacion 
            pacientes={pacientes}
            hospitalizados={hospitalizados}
            agregarHospitalizado={agregarHospitalizado}
          />
        )}

        {pestanaActiva === 'historial' && (
          <HistorialClinico 
            pacientes={pacientes}
            historiales={historiales}
            agregarHistorial={agregarHistorial}
          />
        )}

        {pestanaActiva === 'registro' && (
          <FormularioPaciente 
            agregarPaciente={agregarPaciente}
            volverALista={() => setPestanaActiva('home')}
          />
        )}
      </main>

      <footer className="footer">
        <p>© 2026 VetChiloé - Sistema de Información Veterinaria</p>
      </footer>
    </div>
  );
}

export default App;