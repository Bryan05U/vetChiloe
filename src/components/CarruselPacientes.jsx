import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import TarjetaPaciente from './TarjetaPaciente';

function CarruselPacientes({ pacientes }) {
  const [indiceActual, setIndiceActual] = useState(0);

  const siguiente = () => {
    setIndiceActual((prev) => (prev + 1) % pacientes.length);
  };

  const anterior = () => {
    setIndiceActual((prev) => (prev - 1 + pacientes.length) % pacientes.length);
  };

  if (!pacientes || pacientes.length === 0) return null;

  return (
    <div className="carrusel-contenedor">
      <div className="carrusel-area">
        <button className="btn-carrusel" onClick={anterior}>&lt;</button>
        
        <div className="tarjeta-wrapper">
          <AnimatePresence mode="wait">
            <TarjetaPaciente 
              key={pacientes[indiceActual].id} 
              paciente={pacientes[indiceActual]} 
            />
          </AnimatePresence>
        </div>

        <button className="btn-carrusel" onClick={siguiente}>&gt;</button>
      </div>

      {/* Indicadores de puntos (Dots) */}
      <div className="puntos-navegacion">
        {pacientes.map((_, index) => (
          <span 
            key={index} 
            className={`punto ${index === indiceActual ? 'activo' : ''}`}
            onClick={() => setIndiceActual(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default CarruselPacientes;