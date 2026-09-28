import React from 'react';

function Home({ hospitalizados = [] }) {
  const agendaHoy = [
    { id: 1, hora: "09:00 hrs", paciente: "Milo", especie: "Perro", motivo: "Control post-cirugía" },
    { id: 2, hora: "10:30 hrs", paciente: "Luna", especie: "Gato", motivo: "Vacunación quíntuple" },
    { id: 3, hora: "12:00 hrs", paciente: "Pelusa", especie: "Conejo", motivo: "Revisión dental" },
    { id: 4, hora: "15:00 hrs", paciente: "Thor", especie: "Perro", motivo: "Chequeo general" }
  ];

  return (
    <div className="home-dashboard">
      
      {/* TABLA 1: AGENDA DE HOY */}
      <section className="bloque-dashboard">
        <div className="cabecera-bloque">
          <h2>Agenda de Hoy</h2>
          <span className="badge-fecha">4 Consultas</span>
        </div>

        <div className="tabla-responsive">
          <table className="tabla-dashboard">
            <thead>
              <tr>
                <th>Horario</th>
                <th>Paciente</th>
                <th>Especie</th>
                <th>Motivo de Consulta</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {agendaHoy.map((cita) => (
                <tr key={cita.id}>
                  <td className="col-destacada"><strong>{cita.hora}</strong></td>
                  <td className="nombre-paciente">{cita.paciente}</td>
                  <td><span className="especie-tag">{cita.especie}</span></td>
                  <td>{cita.motivo}</td>
                  <td>
                    <button className="btn-historial">
                      Historial Clínico
                    </button>
                  </td>
                </tr>
              ))}
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

export default Home;