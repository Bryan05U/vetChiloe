const pacientesEnMemoria = [
  {
    id: 1,
    nombre: 'Atenea',
    numero_atencion: '2026-A1',
    especie: 'Felino',
    raza: 'Común Europeo / Mestizo',
    edad: '2 años y 4 meses',
    edadAnios: 2,
    edadMeses: 4,
    peso: '3.8 kg',
    nombreDueno: 'Vicente Garín',
    rutDueno: '21.345.678-9',
    foto: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop',
    motivo: 'Control de vacunas y ecografía preventiva.'
  },
  {
    id: 2,
    nombre: 'Afrodita',
    numero_atencion: '2026-A2',
    especie: 'Felino',
    raza: 'Siamés',
    edad: '1 año y 8 meses',
    edadAnios: 1,
    edadMeses: 8,
    peso: '3.2 kg',
    nombreDueno: 'Vicente Garín',
    rutDueno: '21.345.678-9',
    foto: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500&auto=format&fit=crop',
    motivo: 'Limpieza bucal y desparasitación periódica.'
  },
  {
    id: 3,
    nombre: 'Goliath',
    numero_atencion: '2026-A3',
    especie: 'Canino',
    raza: 'Quiltro / Mestizo',
    edad: '4 años',
    edadAnios: 4,
    edadMeses: 0,
    peso: '32 kg',
    nombreDueno: 'Vicente Garín',
    rutDueno: '21.345.678-9',
    foto: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop',
    motivo: 'Revisión traumatológica y refuerzo óseo.'
  }
];

export const pacienteRepository = {
  obtenerTodos: async () => {
    return [...pacientesEnMemoria];
  },

  contarTotal: async () => {
    return pacientesEnMemoria.length;
  },

  insertar: async (paciente) => {
    const nuevo = { ...paciente, id: Date.now() };
    pacientesEnMemoria.unshift(nuevo);
    return nuevo;
  }
};
