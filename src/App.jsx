import { useState } from 'react';
import TablaPacientes from './components/TablaPacientes';
import BuscadorPaciente from './components/BuscadorPaciente';
import FichaClinica from './components/FichaClinica'; 
import FormularioPaciente from './components/FormularioPaciente'; 
import './App.css'; 

function App() {
  const [pacientes, setPacientes] = useState([
    { 
      id: 1, 
      nombre: 'Charkicito', 
      numero_atencion: '2026-A1',
      especie: 'Felino',
      edad: '8 años',
      diagnostico: 'Control sano y vacunas al día.',
      foto: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: 2, 
      nombre: 'Mercedes', 
      numero_atencion: '2026-B2',
      especie: 'Felino',
      edad: '8 años',
      diagnostico: 'Tratamiento por otitis leve.',
      foto: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: 3, 
      nombre: 'Hannita', 
      numero_atencion: '2026-C3',
      especie: 'Felino',
      edad: '3 años',
      diagnostico: 'Observación por alergia alimentaria.',
      foto: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=300&q=80'
    },
        { 
      id: 4, 
      nombre: 'Pelusa', 
      numero_atencion: '2026-D4',
      especie: 'Canino',
      edad: '12 años',
      diagnostico: 'Tratamiento por artritis.',
      foto: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=300&q=80'
    }
  ]);

  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [textoBusqueda, setTextoBusqueda] = useState('');

  const pacientesFiltrados = pacientes.filter((paciente) => {
    const busqueda = textoBusqueda.trim().toLocaleLowerCase('es');

    return (
      paciente.nombre.toLocaleLowerCase('es').includes(busqueda) ||
      paciente.especie.toLocaleLowerCase('es').includes(busqueda)
    );
  });

  const agregarNuevoPaciente = (nuevoPaciente) => {
    setPacientes([...pacientes, nuevoPaciente]);
    setMostrarFormulario(false);
  };

  // Vista de Ficha Clínica (Carnet)
  if (pacienteSeleccionado !== null) {
    return (
      <div className="contenedor-principal">
        <header className="cabecera">
          <h1>Carnet Clínico: {pacienteSeleccionado.nombre}</h1>
          <button onClick={() => setPacienteSeleccionado(null)} className="btn-volver">
            ← Volver a la lista
          </button>
        </header>
        <main>
          <FichaClinica paciente={pacienteSeleccionado} />
        </main>
      </div>
    );
  }

  // Vista Principal (Tabla de Pacientes)
  return (
    <div className="contenedor-principal">
      <header className="cabecera">
        <h1>Sistema de Información - Veterinaria Chiloé</h1>
        <p>Plataforma de control y seguimiento de pacientes</p>
      </header>
      
      <main>
        <h2>Pacientes Registrados</h2>

        <BuscadorPaciente
          textoBusqueda={textoBusqueda}
          onCambiarBusqueda={setTextoBusqueda}
        />

        <p className="contador-pacientes" aria-live="polite">
          {pacientesFiltrados.length} de {pacientes.length} pacientes
        </p>

        <TablaPacientes
          pacientes={pacientesFiltrados}
          onVerFicha={setPacienteSeleccionado}
          hayBusqueda={textoBusqueda.trim() !== ''}
        />
      </main>


      {/* Renderizado condicional del formulario modal */}
      {mostrarFormulario && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <button 
              className="btn-cerrar-modal" 
              onClick={() => setMostrarFormulario(false)}
            >
              ✖
            </button>
            <FormularioPaciente onAgregarPaciente={agregarNuevoPaciente} />
          </div>
        </div>
      )}

      {/* Botón flotante extendido */}
      <button 
        className="btn-flotante" 
        onClick={() => setMostrarFormulario(true)}
      >
        <span className="icono-mas">+</span> Agregar Nuevo Paciente
      </button>
    </div>
  );
}

export default App;