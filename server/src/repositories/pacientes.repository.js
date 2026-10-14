// por ahora los datos viven en memoria, despues aqui se conecta postgresql
let pacientes = [
  {
    id: 1,
    nombre: 'Michi',
    numero_atencion: '2026-D1',
    especie: 'Gato',
    raza: 'Siamés',
    edad: 3,
    peso: 4.2,
    foto: '/pacientes/default.jpg',
    diagnostico: 'Control general',
    antecedentes: '',
    dueno: { nombre: 'Camila Soto', telefono: '912345678', correo: 'camila@correo.cl' },
    alta: false,
    historial: [
      { fecha: '01-10-2026', motivo: 'Ingreso', detalle: 'Registrado en la clínica.' }
    ]
  },
  {
    id: 2,
    nombre: 'Toby',
    numero_atencion: '2026-D2',
    especie: 'Perro',
    raza: 'Labrador',
    edad: 5,
    peso: 28,
    foto: '/pacientes/default.jpg',
    diagnostico: 'Herida en una pata',
    antecedentes: 'Alergia a un antibiotico',
    dueno: { nombre: 'Matias Vera', telefono: '987654321', correo: 'Sin correo' },
    alta: false,
    historial: [
      { fecha: '03-10-2026', motivo: 'Ingreso', detalle: 'Registrado en la clínica.' }
    ]
  }
];

function obtenerTodos() {
  return pacientes;
}

function guardar(paciente) {
  pacientes.push(paciente);
  return paciente;
}

module.exports = { obtenerTodos, guardar };