import { useState } from 'react';

const formularioInicial = {
  nombre: '',
  especie: 'Perro',
  edad: '',
  diagnostico: '',
};

function FormularioPaciente({ onAgregarPaciente }) {
  const [datos, setDatos] = useState(formularioInicial);

  const actualizarCampo = (evento) => {
    const { name, value } = evento.target;
    setDatos((datosActuales) => ({ ...datosActuales, [name]: value }));
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    onAgregarPaciente(datos);
    setDatos(formularioInicial);
  };

  return (
    <form className="formulario-paciente" onSubmit={manejarEnvio}>
      <label>
        Nombre
        <input name="nombre" value={datos.nombre} onChange={actualizarCampo} required />
      </label>
      <label>
        Especie
        <select name="especie" value={datos.especie} onChange={actualizarCampo}>
          <option>Perro</option>
          <option>Gato</option>
          <option>Otro</option>
        </select>
      </label>
      <label>
        Edad
        <input name="edad" type="number" min="0" value={datos.edad} onChange={actualizarCampo} required />
      </label>
      <label className="campo-diagnostico">
        Diagnóstico
        <textarea name="diagnostico" value={datos.diagnostico} onChange={actualizarCampo} required rows="3" />
      </label>
      <button className="btn-registrar" type="submit">Registrar paciente</button>
    </form>
  );
}

export default FormularioPaciente;