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

function FormularioPaciente({ onAgregarPaciente, pacienteInicial, onGuardarCambios, onCancelar }) {
  const [datos, setDatos] = useState(() => pacienteInicial ? {
    nombre: pacienteInicial.nombre,
    especie: pacienteInicial.especie,
    raza: pacienteInicial.raza,
    edad: String(pacienteInicial.edad).replace(/\s*años?$/, ''),
    peso: String(pacienteInicial.peso).replace(/\s*kg$/, ''),
    duenio: pacienteInicial.duenio,
    rutDuenio: pacienteInicial.rutDuenio || '',
    diagnostico: pacienteInicial.diagnostico,
  } : formularioInicial);

  const actualizarCampo = (evento) => {
    const { name, value } = evento.target;
    const valorCampo = name === 'rutDuenio' ? value.replace(/[^0-9.-]/g, '') : value;
    setDatos((datosActuales) => ({ ...datosActuales, [name]: valorCampo }));
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    if (pacienteInicial) {
      onGuardarCambios(datos);
      return;
    }
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
          required={!pacienteInicial}
        />
      </label>
      <label className="campo-diagnostico">
        Diagnóstico
        <textarea name="diagnostico" value={datos.diagnostico} onChange={actualizarCampo} required rows="3" />
      </label>
      <div className="acciones-formulario">
        <button className="btn-registrar" type="submit">
          {pacienteInicial ? 'Guardar cambios' : 'Registrar paciente'}
        </button>
        {onCancelar && (
          <button className="btn-cancelar" type="button" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default FormularioPaciente;