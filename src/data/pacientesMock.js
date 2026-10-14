// datos de prueba mientras no hay base de datos
// solo se usan si el navegador no tiene pacientes guardados

const pacientesMock = [
  {
    id: 1,
    nombre: 'Poi',
    numero_atencion: '2026-D1',
    especie: 'Pingüino',
    raza: 'Humboldt',
    edad: 3,
    peso: 4.2,
    foto: '/pacientes/Humboldt.jpg',
    diagnostico: 'Control general',
    antecedentes: '',
    dueno: {
      nombre: 'Camila Soto',
      telefono: '912345678',
      correo: 'camila@correo.cl'
    },
    alta: false,
    historial: [
      { fecha: '01-10-2026', motivo: 'Ingreso', detalle: 'Registrado en la clínica.' }
    ]
  },
  {
    id: 2,
    nombre: 'Abeguin',
    numero_atencion: '2026-D2',
    especie: 'Pingüino',
    raza: 'Adelia',
    edad: 2,
    peso: 3.8,
    foto: '/pacientes/Adelia.jpg',
    diagnostico: 'Herida en una aleta',
    antecedentes: 'Alergia a un antibiotico',
    dueno: {
      nombre: 'Matias Vera',
      telefono: '987654321',
      correo: 'Sin correo'
    },
    alta: false,
    historial: [
      { fecha: '03-10-2026', motivo: 'Ingreso', detalle: 'Registrado en la clínica.' }
    ]
  },
  {
    id: 3,
    nombre: 'Raneguin',
    numero_atencion: '2026-D3',
    especie: 'Pingüino',
    raza: 'Barbijo',
    edad: 4,
    peso: 4.5,
    foto: '/pacientes/Barbijo.jpg',
    diagnostico: 'Falta de apetito',
    antecedentes: '',
    dueno: {
      nombre: 'Javiera Muñoz',
      telefono: '956781234',
      correo: 'javiera@correo.cl'
    },
    alta: false,
    historial: [
      { fecha: '05-10-2026', motivo: 'Ingreso', detalle: 'Registrado en la clínica.' }
    ]
  }
];

export default pacientesMock;