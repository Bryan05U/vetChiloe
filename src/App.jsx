import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ListaPacientes from './components/ListaPacientes';
import FormularioPaciente from './components/FormularioPaciente';
import './App.css';

function App() {
  const [pestanaActiva, setPestanaActiva] = useState('home');

  // Cambiamos a setPacientes para poder añadir nuevos
  const [pacientes, setPacientes] = useState([
    { id: 1, nombre: 'Charkicito', especie: 'Perro (Mestizo)', numero_atencion: '2026-A1', foto: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop' },
    { id: 2, nombre: 'Mercedes', especie: 'Gato (Siamés)', numero_atencion: '2026-B2', foto: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop' },
    { id: 3, nombre: 'Hannita', especie: 'Gato (Atigrado)', numero_atencion: '2026-C3', foto: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&auto=format&fit=crop' },
    { id: 4, nombre: 'Thor', especie: 'Perro (Pastor Alemán)', numero_atencion: '2026-D4', foto: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&auto=format&fit=crop' },
    { id: 5, nombre: 'Coco', especie: 'Conejo', numero_atencion: '2026-E5', foto: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&auto=format&fit=crop' },
    { id: 6, nombre: 'Max', especie: 'Perro (Golden)', numero_atencion: '2026-F6', foto: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&auto=format&fit=crop' },
    { id: 7, nombre: 'Rocky', especie: 'Perro (Bulldog)', numero_atencion: '2026-G7', foto: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&auto=format&fit=crop' },
    { id: 8, nombre: 'Nala', especie: 'Gato (Angora)', numero_atencion: '2026-H8', foto: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=400&auto=format&fit=crop' },
    { id: 9, nombre: 'Toby', especie: 'Perro (Beagle)', numero_atencion: '2026-I9', foto: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400&auto=format&fit=crop' },
    { id: 10, nombre: 'Pelusa', especie: 'Conejo', numero_atencion: '2026-J10', foto: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&auto=format&fit=crop' },
    { id: 11, nombre: 'Bella', especie: 'Gato', numero_atencion: '2026-K11', foto: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=400&auto=format&fit=crop' },
    { id: 12, nombre: 'Zeus', especie: 'Perro (Husky)', numero_atencion: '2026-L12', foto: 'https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=400&auto=format&fit=crop' },
    { id: 13, nombre: 'Milo', especie: 'Perro', numero_atencion: '2026-M13', foto: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&auto=format&fit=crop' }
  ]);

  // Función para agregar la nueva mascota al inicio del arreglo
  const agregarPaciente = (nuevoPaciente) => {
    setPacientes([nuevoPaciente, ...pacientes]);
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
            pacientes={pacientes} 
            irAPacientes={() => setPestanaActiva('pacientes')} 
          />
        )}

        {pestanaActiva === 'pacientes' && (
          <ListaPacientes pacientes={pacientes} />
        )}

        {/* Pestaña de Registro */}
        {pestanaActiva === 'registro' && (
          <FormularioPaciente 
            agregarPaciente={agregarPaciente}
            irAPacientes={() => setPestanaActiva('pacientes')}
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