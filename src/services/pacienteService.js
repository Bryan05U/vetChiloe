import { PACIENTES_INICIALES } from '../data/pacientesMock';

let memoriaPacientes = [...PACIENTES_INICIALES];

export const pacienteService = {
  obtenerPacientes: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...memoriaPacientes]);
      }, 100);
    });
  },

  registrarPaciente: async (nuevoPaciente) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        memoriaPacientes = [nuevoPaciente, ...memoriaPacientes];
        resolve(nuevoPaciente);
      }, 100);
    });
  }
};
