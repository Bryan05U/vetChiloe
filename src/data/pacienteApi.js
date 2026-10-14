const leerRespuesta = async respuesta => {
  const resultado = await respuesta.json();
  if (!respuesta.ok && respuesta.status !== 422 && respuesta.status !== 409) {
    throw new Error(resultado.message || 'No se pudo completar la operación de pacientes.');
  }
  return resultado;
};

export const obtenerPacientes = async () => {
  const respuesta = await fetch('/api/pacientes');
  const resultado = await leerRespuesta(respuesta);
  return resultado.pacientes;
};

export const obtenerPacientePorId = async id => {
  const respuesta = await fetch(`/api/pacientes/${encodeURIComponent(id)}`);
  const resultado = await leerRespuesta(respuesta);
  return resultado.paciente;
};

export const guardarPaciente = async datosFormulario => {
  const respuesta = await fetch('/api/pacientes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datosFormulario)
  });
  return leerRespuesta(respuesta);
};
