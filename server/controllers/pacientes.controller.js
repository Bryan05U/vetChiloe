import { listarPacientes, obtenerPacientePorId, registrarPaciente } from '../business/pacienteService.js'

export const obtenerPacientes = async (req, res) => {
  const pacientes = await listarPacientes();
  res.json({ pacientes });
};

export const obtenerPaciente = async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({ message: 'El ID del paciente debe ser un número entero positivo.' });
    return;
  }

  const paciente = await obtenerPacientePorId(id);
  if (!paciente) {
    res.status(404).json({ message: 'No se encontró un paciente con ese ID.' });
    return;
  }

  res.json({ paciente });
};

export const crearPaciente = async (req, res) => {
  const datosPaciente = req.body;
  const resultado = await registrarPaciente(datosPaciente);
  if (!resultado.ok) {
    res.status(resultado.status).json(resultado);
    return;
  }

  res.status(201).json(resultado);
};
