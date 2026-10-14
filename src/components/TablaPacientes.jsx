import './TablaPacientes.css';

export function TablaPacientes({ pacientes, onVerFicha, onSolicitarEliminar }) {
  if (!pacientes || pacientes.length === 0) {
    return (
      <div className="tabla-vacia-box">
        <p>No hay pacientes registrados en AegisVet.</p>
      </div>
    );
  }

  return (
    <div className="tabla-responsiva-contenedor">
      <table className="tabla-pacientes">
        <thead>
          <tr>
            <th>NOMBRE</th>
            <th>N° ATENCIÓN</th>
            <th>ESPECIE</th>
            <th>EDAD</th>
            <th>DIAGNÓSTICO</th>
            <th style={{ textAlign: 'center' }}>ACCIÓN</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => {
            const esFelino = paciente.especie?.toLowerCase().includes('felino');

            return (
              <tr key={paciente.id}>
                {/* Nombre con foto avatar miniatura */}
                <td>
                  <div className="paciente-celda-nombre">
                    {paciente.foto && (
                      <img
                        src={paciente.foto}
                        alt={paciente.nombre}
                        className="avatar-miniatura"
                      />
                    )}
                    <div>
                      <span className="nombre-texto">{paciente.nombre}</span>
                      <span className="raza-texto">{paciente.raza || 'Mestizo'}</span>
                    </div>
                  </div>
                </td>

                {/* N° Atención */}
                <td className="celda-atencion">
                  <code>{paciente.numero_atencion}</code>
                </td>

                {/* Badge Condicional: Naranja para Felino, Azul para Canino */}
                <td>
                  <span className={`badge-especie ${esFelino ? 'badge-felino' : 'badge-canino'}`}>
                    {paciente.especie}
                  </span>
                </td>

                {/* Edad */}
                <td className="celda-edad">{paciente.edad}</td>

                {/* Diagnóstico */}
                <td className="celda-diagnostico" title={paciente.motivo}>
                  <p className="diagnostico-corte">{paciente.motivo || 'Control general'}</p>
                </td>

                {/* Acción: Botón Ver Carnet y botón rápido dar de alta */}
                <td className="celda-acciones">
                  <button
                    type="button"
                    className="btn-ver-carnet"
                    onClick={() => onVerFicha(paciente)}
                  >
                    Ver Carnet
                  </button>
                  <button
                    type="button"
                    className="btn-accion-baja"
                    onClick={() => onSolicitarEliminar(paciente)}
                    title="Dar de alta o retirar ficha"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
