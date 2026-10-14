import React, { useState } from 'react';
import TarjetaPaciente from './TarjetaPaciente';
import './Home.css';

function Home({ 
  pacientes = [], 
  hospitalizados = [], 
  setPestanaActiva, 
  setPacienteSeleccionadoHistorial 
}) {
  const [pacienteCarnetModal, setPacienteCarnetModal] = useState(null);

  const agendaHoy = pacientes.slice(0, 4).map((paciente, index) => {
    const horarios = ["09:00 horas", "10:30 horas", "12:00 horas", "15:00 horas"];
    const motivos = [
      "Control post-cirugía",
      "Vacunación anual",
      "Revisión de peso y dieta",
      "Chequeo general"
    ];

    return {
      rawPaciente: paciente,
      id: paciente.id,
      hora: horarios[index] || `${9 + index}:00 horas`,
      paciente: paciente.nombre,
      especie: paciente.especie || 'Mascota',
      motivo: motivos[index % motivos.length]
    };
  });

  const handleIrAHistorial = (paciente) => {
    // 1. Guardamos el paciente seleccionado para la ficha del historial
    if (setPacienteSeleccionadoHistorial) {
      setPacienteSeleccionadoHistorial(paciente);
    }
    // 2. Cambiamos la vista a la pestaña 'historial'
    if (setPestanaActiva) {
      setPestanaActiva('historial');
    }
  };

  return (
    <div className="home-dashboard">
      
      {/* TABLA 1: AGENDA DE HOY */}
      <section className="bloque-dashboard">
        <div className="cabecera-bloque">
          <h2>Agenda de Hoy</h2>
          <span className="badge-fecha">{agendaHoy.length} Consultas</span>
        </div>

        <div className="tabla-responsive">
          <table className="tabla-dashboard">
            <thead>
              <tr>
                <th>HORARIO</th>
                <th>PACIENTE</th>
                <th>ESPECIE</th>
                <th>MOTIVO DE CONSULTA</th>
                <th>HISTORIAL CLÍNICO</th>
                <th>ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {agendaHoy.length > 0 ? (
                agendaHoy.map((cita) => (
                  <tr key={cita.id}>
                    <td className="col-destacada"><strong>{cita.hora}</strong></td>
                    <td className="nombre-paciente">{cita.paciente}</td>
                    <td><span className="especie-tag">{cita.especie}</span></td>
                    <td>{cita.motivo}</td>
                    <td>
                      <button 
                        className="btn-historial"
                        onClick={() => handleIrAHistorial(cita.rawPaciente)}
                      >
                        Historial Clínico
                      </button>
                    </td>
                    <td>
                      <button 
                        className="btn-carnet"
                        onClick={() => setPacienteCarnetModal(cita.rawPaciente)}
                      >
                        Carnet
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', color: '#6e5d65' }}>
                    No hay pacientes agendados para hoy.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* TABLA 2: PACIENTES HOSPITALIZADOS */}
      <section className="bloque-dashboard">
        <div className="cabecera-bloque">
          <h2>Pacientes Hospitalizados</h2>
          <span className="badge-total">{hospitalizados.length} Pacientes</span>
        </div>

        <div className="tabla-responsive">
          <table className="tabla-dashboard">
            <thead>
              <tr>
                <th>PACIENTE</th>
                <th>ESPECIE</th>
                <th>TUTOR / CONTACTO</th>
                <th>ESTADO</th>
                <th>ÚLTIMA REVISIÓN</th>
                <th>CUIDADOS ESPECIALES</th>
              </tr>
            </thead>
            <tbody>
              {hospitalizados.length > 0 ? (
                hospitalizados.map((hosp) => (
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
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', color: '#6e5d65' }}>
                    No hay pacientes actualmente en hospitalización.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* MODAL CARNET DE IDENTIFICACIÓN VETERINARIA */}
      {pacienteCarnetModal && (
        <div className="modal-overlay" onClick={() => setPacienteCarnetModal(null)}>
          <div className="modal-carnet-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-carnet-header">
              <h3>Carnet de Identificación Veterinaria</h3>
              <button
                className="btn-close-modal"
                onClick={() => setPacienteCarnetModal(null)}
              >
                ✕
              </button>
            </div>
            <div className="modal-carnet-body">
              <TarjetaPaciente paciente={pacienteCarnetModal} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;