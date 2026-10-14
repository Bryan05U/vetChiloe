// src/services/pacienteService.js
const API_URL = 'http://localhost:3001/api/pacientes'; // <--- Cambiado a 3001

export const obtenerPacientes = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Error al obtener pacientes');
  return await res.json();
};

export const registrarPaciente = async (paciente) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paciente),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || 'Error al registrar paciente');
  }

  return await res.json();
};