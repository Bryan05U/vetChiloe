import React from 'react';

function Navbar({ pestanaActiva, setPestanaActiva }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h2>VetChiloé</h2>
      </div>
      <div className="navbar-links">
        <button 
          className={`nav-btn ${pestanaActiva === 'home' ? 'activo' : ''}`}
          onClick={() => setPestanaActiva('home')}
        >
          Inicio
        </button>
        <button 
          className={`nav-btn ${pestanaActiva === 'pacientes' ? 'activo' : ''}`}
          onClick={() => setPestanaActiva('pacientes')}
        >
          Pacientes
        </button>
        <button 
          className={`nav-btn ${pestanaActiva === 'hospitalizacion' ? 'activo' : ''}`}
          onClick={() => setPestanaActiva('hospitalizacion')}
        >
          Hospitalización
        </button>
        <button 
          className={`nav-btn ${pestanaActiva === 'historial' ? 'activo' : ''}`}
          onClick={() => setPestanaActiva('historial')}
        >
          Historial Clínico
        </button>
        <button 
          className={`nav-btn ${pestanaActiva === 'registro' ? 'activo' : ''}`}
          onClick={() => setPestanaActiva('registro')}
        >
          + Nuevo Paciente
        </button>
      </div>
    </nav>
  );
}

export default Navbar;