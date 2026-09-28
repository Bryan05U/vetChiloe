import React, { useState } from 'react';
import TarjetaPaciente from './TarjetaPaciente';

function ListaPacientes({ pacientes }) {
  const [paginaActual, setPaginaActual] = useState(1);
  const pacientesPorPagina = 12;

  const totalPaginas = Math.ceil(pacientes.length / pacientesPorPagina);
  const indiceUltimo = paginaActual * pacientesPorPagina;
  const indicePrimer = indiceUltimo - pacientesPorPagina;
  const pacientesPaginaActual = pacientes.slice(indicePrimer, indiceUltimo);

  const cambiarPagina = (numero) => {
    setPaginaActual(numero);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="seccion-pacientes">
      <header className="cabecera-seccion">
        <h2>Catálogo de Pacientes ({pacientes.length})</h2>
        <p>Pasa el mouse sobre la foto de cada paciente para ver sus datos clínicos.</p>
      </header>

      <div className="cuadricula-tarjetas">
        {pacientesPaginaActual.map((pacienteIterado) => (
          <TarjetaPaciente 
            key={pacienteIterado.id} 
            paciente={pacienteIterado} 
          />
        ))}
      </div>

      {totalPaginas > 1 && (
        <div className="paginacion-contenedor">
          <button 
            className="btn-paginacion" 
            onClick={() => cambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
          >
            &laquo; Anterior
          </button>

          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              className={`btn-paginacion ${num === paginaActual ? 'activo' : ''}`}
              onClick={() => cambiarPagina(num)}
            >
              {num}
            </button>
          ))}

          <button 
            className="btn-paginacion" 
            onClick={() => cambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
          >
            Siguiente &raquo;
          </button>
        </div>
      )}
    </div>
  );
}

export default ListaPacientes;