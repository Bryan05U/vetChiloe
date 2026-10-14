const pacientes = [
  {
    id: 1,
    nombre: 'Charkicito',
    especie: 'Canino',
    raza: 'Mestizo',
    edad: 4,
    peso: 12,
    duenio: 'Camila Soto',
    numero_atencion: '2026-A1',
    emoji: '🐶',
    diagnostico: 'Dermatitis leve',
    historial: [{ fecha: '2026-09-20', detalle: 'Control y tratamiento tópico.' }],
  },
  {
    id: 2,
    nombre: 'Mercedes',
    especie: 'Felino',
    raza: 'Doméstico',
    edad: 2,
    peso: 4,
    duenio: 'Diego Pérez',
    numero_atencion: '2026-B2',
    emoji: '🐱',
    diagnostico: 'Vacunación al día',
    historial: [{ fecha: '2026-09-18', detalle: 'Se aplica vacuna triple felina.' }],
  },
  {
    id: 3,
    nombre: 'Hannita',
    especie: 'Canino',
    raza: 'Border Collie',
    edad: 6,
    peso: 18,
    duenio: 'Francisco Kroff',
    numero_atencion: '2026-C3',
    emoji: '🐶',
    diagnostico: 'Control preventivo',
    historial: [{ fecha: '2026-09-15', detalle: 'Examen general sin hallazgos.' }],
  },
];

let siguienteId = Math.max(...pacientes.map((paciente) => paciente.id)) + 1;

async function obtenerTodos() {
  return pacientes.map((paciente) => ({ ...paciente }));
}

async function obtenerPorId(id) {
  return pacientes.find((paciente) => paciente.id === Number(id)) || null;
}

async function contar() {
  return pacientes.length;
}

async function crear(datos) {
  const paciente = { ...datos, id: siguienteId };
  siguienteId += 1;
  pacientes.push(paciente);
  return paciente;
}

async function actualizar(id, datos) {
  const indice = pacientes.findIndex((paciente) => paciente.id === Number(id));
  if (indice === -1) return null;

  pacientes[indice] = { ...pacientes[indice], ...datos };
  return pacientes[indice];
}

module.exports = { obtenerTodos, obtenerPorId, contar, crear, actualizar };