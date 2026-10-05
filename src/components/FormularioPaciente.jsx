import { useState } from 'react';

const formularioInicial = {
  nombre: '',
  especie: 'Perro',
  raza: '',
  edad: '',
  peso: '',
  duenio: '',
  rutDuenio: '',
  diagnostico: '',
};

function FormularioPaciente({ onAgregarPaciente }) {
  const [datos, setDatos] = useState(formularioInicial);

  const actualizarCampo = (evento) => {
    const { name, value } = evento.target;
    const valorCampo = name === 'rutDuenio' ? value.replace(/[^0-9.-]/g, '') : value;
    setDatos((datosActuales) => ({ ...datosActuales, [name]: valorCampo }));
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
        Raza
        <input name="raza" value={datos.raza} onChange={actualizarCampo} required />
      </label>
      <label>
        Edad
        <input name="edad" type="number" min="0" value={datos.edad} onChange={actualizarCampo} required />
      </label>
      <label>
        Peso (kg)
        <input name="peso" type="number" min="0" step="0.1" value={datos.peso} onChange={actualizarCampo} required />
      </label>
      <label>
        Nombre del dueño/a
        <input name="duenio" value={datos.duenio} onChange={actualizarCampo} required />
      </label>
      <label>
        RUT del dueño/a
        <input
          name="rutDuenio"
          value={datos.rutDuenio}
          onChange={actualizarCampo}
          placeholder="12.345.678-9"
          pattern="[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9]"
          maxLength="12"
          title="Ingresa el RUT en formato 12.345.678-9, usando solo números, puntos y guion."
          autoComplete="off"
          required
        />
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