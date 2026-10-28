import './TablaPacientes.css';

function TablaPacientes({ pacientes, onVerFicha, hayBusqueda = false }) {
  // Si no hay pacientes, se muestra un mensaje amigable
  
  if (pacientes.length === 0) {
    return (
      <div className="tabla-vacia" role="status">
        <p>
          {hayBusqueda
            ? 'No se encontraron pacientes'
            : 'No hay pacientes registrados en el sistema.'}
        </p>
      </div>
    );
  }


  return (
    <div className="contenedor-tabla-responsiva">
      <table className="tabla-vet">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>N° Atención</th>
            <th>Especie</th>
            <th>Edad</th>
            <th>Diagnóstico</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.id}>
              <td className="celda-destacada">{paciente.nombre}</td>
              <td>{paciente.numero_atencion}</td>
              <td>
                <span className={`badge-especie ${paciente.especie.toLowerCase()}`}>
                  {paciente.especie}
                </span>
              </td>
              <td>{paciente.edad}</td>
              <td className="celda-diagnostico">{paciente.diagnostico}</td>
              <td>
                <button 
                  className="btn-carnet"
                  onClick={() => onVerFicha(paciente)}
                  title="Ver Carnet Clínico"
                >
                  Ver Carnet
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaPacientes;