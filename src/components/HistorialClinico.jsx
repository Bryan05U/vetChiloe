import React, { useState } from 'react';

function HistorialClinico({ pacientes, historiales = [], agregarHistorial }) {
  const [pacienteSeleccionadoId, setPacienteSeleccionadoId] = useState(pacientes[0]?.id || '');
  const [tipoConsulta, setTipoConsulta] = useState('Consulta General');
  const [peso, setPeso] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [tratamiento, setTratamiento] = useState('');

  const pacienteActual = pacientes.find(p => p.id === Number(pacienteSeleccionadoId));

  const historialesPaciente = historiales.filter(
    h => h.pacienteId === Number(pacienteSeleccionadoId)
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pacienteActual) return;

    const nuevaAtencion = {
      id: Date.now(),
      pacienteId: pacienteActual.id,
      pacienteNombre: pacienteActual.nombre,
      tipoConsulta,
      peso: peso ? `${peso} kg` : 'No registrado',
      diagnostico: diagnostico.trim() || 'Sin observaciones.',
      tratamiento: tratamiento.trim() || 'Sin indicaciones.',
      fecha: new Date().toLocaleDateString('es-CL')
    };

    agregarHistorial(nuevaAtencion);
    setDiagnostico('');
    setTratamiento('');
    setPeso('');
    alert(`Historial actualizado para ${pacienteActual.nombre}.`);
  };

  return (
    <div className="historial-contenedor-seccion">
      <div className="bloque-dashboard">
        <h2>Búsqueda y Gestión de Historial Clínico</h2>
        <p className="subtitulo-form">Selecciona una mascota para revisar su historial o agregar un nuevo registro médico.</p>

        <div className="selector-paciente-box">
          <label htmlFor="selectorMascota">Mascota Consultada:</label>
          <select 
            id="selectorMascota"
            value={pacienteSeleccionadoId}
            onChange={(e) => setPacienteSeleccionadoId(e.target.value)}
          >
            {pacientes.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre} ({p.especie}) — Ficha: {p.numero_atencion}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid-historial-layout">
        <div className="bloque-dashboard">
          <h3>Historial de {pacienteActual?.nombre || 'Paciente'}</h3>
          
          {historialesPaciente.length > 0 ? (
            <div className="lista-atenciones">
              {historialesPaciente.map((atencion) => (
                <div key={atencion.id} className="tarjeta-atencion">
                  <div className="atencion-header">
                    <strong>{atencion.tipoConsulta}</strong>
                    <span className="fecha-tag">{atencion.fecha}</span>
                  </div>
                  <p><strong>Peso:</strong> {atencion.peso}</p>
                  <p><strong>Observaciones:</strong> {atencion.diagnostico}</p>
                  <p><strong>Tratamiento:</strong> {atencion.tratamiento}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="texto-vacio">No hay registros de historial aún para este paciente.</p>
          )}
        </div>

        <div className="bloque-dashboard">
          <h3>+ Añadir Nuevo Registro Médico</h3>
          <form onSubmit={handleSubmit} className="form-completo">
            <div className="campo">
              <label>Tipo de Atención</label>
              <select value={tipoConsulta} onChange={(e) => setTipoConsulta(e.target.value)}>
                <option value="Consulta General">Consulta General</option>
                <option value="Vacunación / Desparasitación">Vacunación / Desparasitación</option>
                <option value="Control de Peso / Nutrición">Control de Peso / Nutrición</option>
                <option value="Control Post-Cirugía">Control Post-Cirugía</option>
                <option value="Urgencia">Urgencia</option>
              </select>
            </div>

            <div className="campo">
              <label>Peso Actual (kg)</label>
              <input 
                type="number" 
                step="0.1" 
                placeholder="Ej: 12.5" 
                value={peso} 
                onChange={(e) => setPeso(e.target.value)} 
              />
            </div>

            <div className="campo">
              <label>Anamnesis / Observaciones *</label>
              <textarea 
                rows="3" 
                placeholder="Escribe el motivo de la visita o revisión física..." 
                value={diagnostico} 
                onChange={(e) => setDiagnostico(e.target.value)} 
                required 
              />
            </div>

            <div className="campo">
              <label>Tratamiento / Indicaciones</label>
              <textarea 
                rows="2" 
                placeholder="Indicaciones médicas, dosis o próxima vacuna..." 
                value={tratamiento} 
                onChange={(e) => setTratamiento(e.target.value)} 
              />
            </div>

            <button type="submit" className="btn-guardar-paciente">
              Actualizar Historial
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HistorialClinico;