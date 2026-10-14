import FlipCard from './FlipCard';
import './TarjetaPaciente.css';

const formatearFecha = (fechaISO) => {
  if (!fechaISO) return '—';
  const [anio, mes, dia] = fechaISO.split('-');
  if (!anio || !mes || !dia) return fechaISO;
  return `${dia}/${mes}/${anio}`;
};

function TarjetaPaciente({ paciente, mostrarReverso = false }) {

  const frente = paciente.imagen ? (
    <img
      src={paciente.imagen}
      alt={paciente.nombre}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  ) : (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '3rem',
      }}
      role="img"
      aria-label={`Paciente ${paciente.nombre} sin fotografía`}
    >
      🐾
    </div>
  );

  const reverso = (
    <div className="tarjeta">
      <h3>{paciente.nombre}</h3>
      <p><strong>Especie:</strong> {paciente.especie}</p>
      <p><strong>Peso:</strong> {paciente.peso} kg</p>
      <p><strong>Número Paciente:</strong> {paciente.numero_atencion}</p>
      <p><strong>Dueño:</strong> {paciente.dueno}</p>
      <p><strong>Teléfono:</strong> {paciente.telefono}</p>
      <p><strong>Edad:</strong> {paciente.edad}</p>
      <p><strong>Última visita:</strong> {formatearFecha(paciente.ultima_visita)}</p>
      <p><strong>Diagnóstico:</strong> {paciente.diagnostico ?? 'Sin registro'}</p>
    </div>
  );
  return (
    <FlipCard
      ariaLabel={`Paciente ${paciente.nombre}`}
      front={frente}
      back={reverso}
      defaultFlipped={mostrarReverso}
    />
  );
}
export default TarjetaPaciente;
