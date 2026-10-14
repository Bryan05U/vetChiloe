const repositorio = require('../repositories/pacientes.repository');

// especies que atiende la veterinaria
const ESPECIES_PERMITIDAS = ['perro', 'gato', 'pingüino', 'conejo', 'ave'];

function listarPacientes() {
  return repositorio.obtenerTodos();
}

// busca el numero mas alto que existe y le suma uno
function generarNumeroAtencion() {
  const usados = repositorio.obtenerTodos().map(
    (paciente) => Number(paciente.numero_atencion.split('-D')[1])
  );
  const siguiente = Math.max(0, ...usados) + 1;
  return `${new Date().getFullYear()}-D${siguiente}`;
}

function crearPaciente(datos) {
  const especie = (datos.especie || '').toLowerCase();

  // si la especie no esta permitida se corta aqui con error 400
  if (!ESPECIES_PERMITIDAS.includes(especie)) {
    const error = new Error('Esa especie no la atiende la veterinaria.');
    error.status = 400;
    throw error;
  }

  const hoy = new Date().toLocaleDateString('es-CL');

  const nuevoPaciente = {
    ...datos,
    id: Date.now(),
    numero_atencion: generarNumeroAtencion(),
    alta: false,
    historial: [
      { fecha: hoy, motivo: 'Ingreso', detalle: 'Registrado en la clínica.' }
    ]
  };

  return repositorio.guardar(nuevoPaciente);
}

module.exports = { listarPacientes, crearPaciente };