import * as repo from '../repositories/pacientes.repository.js';

const ESPECIES_VALIDAS = ['Felino', 'Canino', 'Perro', 'Gato'];

export const registrarPaciente = async (datos) => {
  if (!datos.especie || !ESPECIES_VALIDAS.includes(datos.especie)) {
    throw new Error('Especie no válida. Debe ser Felino o Canino');
  }

  const numeroAtencion = `2026-${Math.floor(100 + Math.random() * 900)}`;
  
  const nuevo = {
    id: Date.now(),
    nombre: datos.nombre,
    especie: datos.especie,
    numero_atencion: numeroAtencion,
    foto: datos.foto || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop'
  };

  return await repo.guardar(nuevo);
};

export const listarPacientes = async () => {
  return await repo.obtenerTodos();
};