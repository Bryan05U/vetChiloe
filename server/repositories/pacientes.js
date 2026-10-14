const pacientes = [
  {
    id: 1,
    nombre: 'Felipe',
    especie: 'Felino',
    peso: 4.5,
    dueno: '11111111-1',
    telefono: '+56912345678',
    numero_atencion: '2026-001',
    edad: 5,
    diagnostico: 'Otitis externa (oído derecho)',
    ultima_visita: '2026-01-15',
    imagen: '/pets/Charkicito.webp',
  },
  {
    id: 2,
    nombre: 'Maxi',
    especie: 'Felino',
    peso: 3.2,
    dueno: '22222222-2',
    telefono: '+56987654321',
    numero_atencion: '2026-002',
    edad: 8,
    diagnostico: 'Insuficiencia renal crónica - en control',
    ultima_visita: '2026-02-20',
    imagen: '/pets/Mercedes.webp',
  },
  {
    id: 3,
    nombre: 'Hannita',
    especie: 'Canino',
    peso: 12.0,
    dueno: '33333333-3',
    telefono: '+56922334455',
    numero_atencion: '2026-003',
    edad: 3,
    diagnostico: 'Dermatitis alérgica estacional',
    ultima_visita: '2026-03-10',
    imagen: '/pets/Hannita.webp',
  },
];

export function listar() {
  return pacientes.map((paciente) => ({ ...paciente }));
}

export function crear(paciente) {
  const id = pacientes.reduce((mayor, actual) => Math.max(mayor, actual.id), 0) + 1;
  const registrado = { ...paciente, id };

  pacientes.push(registrado);

  return { ...registrado };
}
