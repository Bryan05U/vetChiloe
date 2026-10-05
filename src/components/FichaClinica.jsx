import { useState } from 'react';

// FichaClinica muestra UNA mascota en una tarjeta giratoria.
// Props:
//   paciente -> objeto con los datos de la mascota
//   onVolver -> función que se ejecuta al presionar "Volver a la lista"
function FichaClinica({ paciente, onVolver }) {
  // Estado local: false = se ve el anverso, true = se ve el reverso
  const [volteada, setVolteada] = useState(false);

  const alternarTarjeta = () => setVolteada((estadoActual) => !estadoActual);

  return (
    <section className="ficha-clinica">
      <h2>Ficha Clínica: {paciente.nombre}</h2>
      <button className="btn-volver" onClick={onVolver}>← Volver a la lista</button>
      <p className="ficha-ayuda">
        {volteada ? 'Haz clic en la tarjeta para volver a los datos generales' : 'Haz clic en la tarjeta para ver los datos clínicos'}
      </p>

      <div className={`ficha-flip ${volteada ? 'ficha-flip-volteada' : ''}`}>
        {/* ANVERSO: foto y datos generales */}
        <div className="ficha-cara" onClick={alternarTarjeta} role="button" tabIndex={0}
             onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && alternarTarjeta()}>
          <div className="ficha-foto">
            {paciente.foto ? (
              <img src={paciente.foto} alt={`Foto de ${paciente.nombre}`} />
            ) : (
              <span aria-hidden="true">{paciente.emoji}</span>
            )}
          </div>
          <h3>{paciente.nombre}</h3>
          <span className="ficha-etiqueta">{paciente.especie}</span>
          <ul className="ficha-datos">
            <li><strong>Raza:</strong> {paciente.raza}</li>
            <li><strong>Edad:</strong> {paciente.edad}</li>
            <li><strong>Peso:</strong> {paciente.peso}</li>
            <li><strong>Dueño/a:</strong> {paciente.duenio}</li>
            <li><strong>RUT dueño/a:</strong> {paciente.rutDuenio || 'No registrado'}</li>
            <li><strong>N° atención:</strong> {paciente.numero_atencion}</li>
          </ul>
        </div>

        {/* REVERSO: historial y diagnóstico */}
        <div className="ficha-cara ficha-reverso" onClick={alternarTarjeta} role="button" tabIndex={0}
             onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && alternarTarjeta()}>
          <h3>Historial médico</h3>
          <p className="ficha-diagnostico"><strong>Diagnóstico:</strong> {paciente.diagnostico}</p>
          <p className="ficha-subtitulo">Historial</p>
          <ul className="ficha-historial">
            {paciente.historial.map((registro) => (
              <li key={registro.fecha}>
                <span className="ficha-fecha">{registro.fecha}</span> {registro.detalle}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default FichaClinica;
