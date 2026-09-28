import React, { useState } from 'react';

function Hospitalizacion({ pacientes, hospitalizados = [], agregarHospitalizado }) {
  const [pacienteSeleccionadoId, setPacienteSeleccionadoId] = useState(pacientes[0]?.id || '');
  const [motivoHospitalizacion, setMotivoHospitalizacion] = useState('');
  const [estadoInicial, setEstadoInicial] = useState('En observación / Estable');
  const [cuidadosEspeciales, setCuidadosEspeciales] = useState('');

  const handleSubmitHospitalizacion = (e) => {
    e.preventDefault();
    const pacienteBase = pacientes.find(p => p.id === Number(pacienteSeleccionadoId));

    if (!pacienteBase) {
      alert('Debes seleccionar un paciente registrado.');
      return;
    }

    const ingresoHosp = {
      id: Date.now(),
      paciente: pacienteBase.nombre,
      especie: pacienteBase.especie || 'Mascota',
      tutor: pacienteBase.nombre_dueno || 'Tutor Registrado',
      contacto: pacienteBase.telefono || '+56 9 ...',
      estado: estadoInicial,
      ultimaRevision: 'Hace un momento',
      cuidados: cuidadosEspeciales.trim() || 'Monitoreo de rutina'
    };

    if (agregarHospitalizado) agregarHospitalizado(ingresoHosp);

    setMotivoHospitalizacion('');
    setCuidadosEspeciales('');
    alert(`Paciente ${pacienteBase.nombre} ingresado a hospitalización correctamente.`);
  };

  return (
    <div className="home-dashboard">
      
      {/* SECCIÓN SUPERIOR: FORMULARIO DE INGRESO */}
      <section className="bloque-dashboard">
        <div className="cabecera-bloque">
          <h2>Registro de Ingreso a Hospitalización</h2>
          <span className="badge-fecha">Ingreso Clínico</span>
        </div>

        <form onSubmit={handleSubmitHospitalizacion} className="form-completo">
          <div className="grid-2-col">
            <div className="campo">
              <label htmlFor="pacienteExistente">Seleccionar Paciente Registrado *</label>
              <select 
                id="pacienteExistente"
                value={pacienteSeleccionadoId} 
                onChange={(e) => setPacienteSeleccionadoId(e.target.value)}
              >
                {pacientes.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre} — {p.especie || 'Mascota'} (Ficha: {p.numero_atencion})
                  </option>
                ))}
              </select>
            </div>

            <div className="campo">
              <label htmlFor="motivoHosp">Motivo de Hospitalización *</label>
              <input 
                type="text" 
                id="motivoHosp"
                placeholder="Ej: Observación post-quirúrgica, deshidratación..." 
                value={motivoHospitalizacion} 
                onChange={(e) => setMotivoHospitalizacion(e.target.value)} 
                required 
              />
            </div>

            <div className="campo">
              <label htmlFor="estadoInicial">Estado Inicial</label>
              <select 
                id="estadoInicial"
                value={estadoInicial} 
                onChange={(e) => setEstadoInicial(e.target.value)}
              >
                <option value="En observación / Estable">En observación / Estable</option>
                <option value="Estable / En recuperación">Estable / En recuperación</option>
                <option value="Monitoreo Continuo">Monitoreo Continuo</option>
                <option value="Crítico">Crítico</option>
              </select>
            </div>

            <div className="campo">
              <label htmlFor="cuidados">Cuidados Especiales / Indicaciones</label>
              <input 
                type="text"
                id="cuidados"
                placeholder="Ej: Aislamiento, suero fisiológico c/8h, alergia a penicilina..."
                value={cuidadosEspeciales}
                onChange={(e) => setCuidadosEspeciales(e.target.value)}
              />
            </div>
          </div>

          <div className="acciones-form">
            <button type="submit" className="btn-guardar-paciente">
              Ingresar Paciente a Cama
            </button>
          </div>
        </form>
      </section>

      {/* SECCIÓN INFERIOR: TABLA MONITOREO */}
      <section className="bloque-dashboard">
        <div className="cabecera-bloque">
          <h2>Pacientes Actualmente Hospitalizados</h2>
          <span className="badge-total">{hospitalizados.length} Pacientes en cama</span>
        </div>

        <div className="tabla-responsive">
          <table className="tabla-dashboard">
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Especie</th>
                <th>Tutor / Contacto</th>
                <th>Estado</th>
                <th>Última Revisión</th>
                <th>Cuidados Especiales</th>
              </tr>
            </thead>
            <tbody>
              {hospitalizados.map((hosp) => (
                <tr key={hosp.id}>
                  <td className="nombre-paciente">{hosp.paciente}</td>
                  <td><span className="especie-tag">{hosp.especie}</span></td>
                  <td>
                    <div><strong>{hosp.tutor}</strong></div>
                    <small className="texto-contacto">{hosp.contacto}</small>
                  </td>
                  <td>
                    <span className="badge-estado">{hosp.estado}</span>
                  </td>
                  <td className="tiempo-texto">{hosp.ultimaRevision}</td>
                  <td className="cuidados-texto">{hosp.cuidados}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}

export default Hospitalizacion;