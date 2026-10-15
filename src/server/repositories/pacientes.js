let pacientes = [
  {
    id: 1,
    nombre: 'Charkicito',
    numero_atencion: '2026-A1',
    especie: 'Canino',
    edad: 4,
    diagnostico: 'Control veterinario general',
    historial: 'Control preventivo',
    foto: ''
  },
  {
    id: 2,
    nombre: 'Mercedes',
    numero_atencion: '2026-B2',
    especie: 'Felino',
    edad: 3,
    diagnostico: 'Control de salud',
    historial: 'Evaluación general',
    foto: ''
  },
  {
    id: 3,
    nombre: 'Hannita',
    numero_atencion: '2026-C3',
    especie: 'Canino',
    edad: 5,
    diagnostico: 'Control preventivo',
    historial: 'Vacunación por revisar',
    foto: ''
  }
];

export function obtenerTodos() {
  return [...pacientes];
}

export function buscarPorId(id) {
  return pacientes.find((paciente) => paciente.id === id);
}

export function crear(paciente) {
  pacientes = [...pacientes, paciente];
  return paciente;
}

export function siguienteId() {
  return pacientes.length > 0
    ? Math.max(...pacientes.map((p) => p.id)) + 1
    : 1;
}