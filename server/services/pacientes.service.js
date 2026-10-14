import { pacienteRepository } from '../repositories/pacientes.repository.js';

const ESPECIES_VALIDAS = ['Felino', 'Canino', 'Ave', 'Exótico'];

export const pacienteService = {
  listarPacientes: async () => {
    return await pacienteRepository.obtenerTodos();
  },

  registrar: async (datos) => {
    if (!datos.nombre || !datos.nombre.trim()) {
      throw new Error('El nombre de la mascota es obligatorio');
    }

    if (!ESPECIES_VALIDAS.includes(datos.especie)) {
      throw new Error('Especie no válida');
    }

    if (datos.edadAnios < 0 || datos.edadMeses < 0) {
      throw new Error('La edad no puede ser negativa');
    }

    const totalActual = await pacienteRepository.contarTotal();
    const numero_atencion = `2026-A${totalActual + 1}`;

    const pacienteParaGuardar = {
      ...datos,
      numero_atencion
    };

    return await pacienteRepository.insertar(pacienteParaGuardar);
  }
};
