import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ListaPacientes from './components/ListaPacientes';
import FormularioPaciente from './components/FormularioPaciente';
import HistorialClinico from './components/HistorialClinico';
import Hospitalizacion from './components/Hospitalizacion';
import FloatingActionButton from './components/FloatingActionButton';
import { obtenerPacientes, registrarPaciente } from './services/pacienteService';
import './App.css';

function App() {
  const [pestanaActiva, setPestanaActiva] = useState('home');
  const [pacienteSeleccionadoHistorial, setPacienteSeleccionadoHistorial] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pacientes, setPacientes] = useState([]);

  // 1. Carga inicial de pacientes desde el backend (Express en http://localhost:3001/api/pacientes)
  useEffect(() => {
    obtenerPacientes()
      .then((data) => setPacientes(data))
      .catch((err) => console.error("Error al cargar pacientes desde el backend:", err));
  }, []);

  // 2. Registrar paciente mediante POST
  const agregarPaciente = async (nuevo) => {
    try {
      const pacienteCreado = await registrarPaciente(nuevo);
      setPacientes((prev) => [pacienteCreado, ...prev]);
      setIsModalOpen(false); // Cierra el modal flotante automáticamente
    } catch (err) {
      alert(err.message || "Error al registrar el paciente");
    }
  };

  return (
    <div className="app-container">
      <Navbar pestanaActiva={pestanaActiva} setPestanaActiva={setPestanaActiva} />

      <main className="main-content">
        {pestanaActiva === 'home' && (
          <Home 
            pacientes={pacientes} 
            setPestanaActiva={setPestanaActiva}
            setPacienteSeleccionadoHistorial={setPacienteSeleccionadoHistorial}
          />
        )}
        
        {pestanaActiva === 'pacientes' && (
          <ListaPacientes 
            pacientes={pacientes} 
            setPestanaActiva={setPestanaActiva}
            setPacienteSeleccionadoHistorial={setPacienteSeleccionadoHistorial}
          />
        )}
        
        {pestanaActiva === 'hospitalizacion' && (
          <Hospitalizacion pacientes={pacientes} />
        )}
        
        {pestanaActiva === 'historial' && (
          <HistorialClinico 
            pacientes={pacientes} 
            pacienteSeleccionado={pacienteSeleccionadoHistorial}
            setPacienteSeleccionado={setPacienteSeleccionadoHistorial}
          />
        )}
      </main>

      {/* Botón Flotante y Modal de Registro */}
      <FloatingActionButton 
        isOpen={isModalOpen}
        onOpen={() => setIsModalOpen(true)}
        onClose={() => setIsModalOpen(false)}
      >
        <FormularioPaciente 
          agregarPaciente={agregarPaciente}
          volverALista={() => setIsModalOpen(false)}
        />
      </FloatingActionButton>

      <footer className="footer">
        <p>© 2026 VetChiloé - Sistema de Información Veterinaria</p>
      </footer>
    </div>
  );
}

export default App;