import React from 'react';

function TarjetaPaciente({ paciente }) {
  return (
    <div className="tarjeta-contenedor-fijo">
      <div className="tarjeta-inner">
        
        {/* PARTE FRONTAL: Foto Completa */}
        <div className="tarjeta-front">
          <img 
            src={paciente.foto} 
            alt={`Foto de ${paciente.nombre}`} 
            className="foto-completa" 
          />
        </div>

        {/* PARTE TRASERA: Datos del Paciente */}
        <div className="tarjeta-back">
          <h3>{paciente.nombre}</h3>
          {paciente.especie && <p><strong>Especie:</strong> {paciente.especie}</p>}
          <p><strong>N° Atención:</strong> {paciente.numero_atencion}</p>
          
          <button className="btn-detalle">Ver Ficha Clínica</button>
        </div>

      </div>
    </div>
  );
}

export default TarjetaPaciente;