import { readFile, rename, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const pacientesFile = process.env.VETCHILOE_PATIENTS_FILE
  ? resolve(process.env.VETCHILOE_PATIENTS_FILE)
  : fileURLToPath(new URL('../../src/data/pacientes.json', import.meta.url));

export const obtenerPacientes = async () => {
  const contenido = await readFile(pacientesFile, 'utf8');
  return JSON.parse(contenido);
};

export const obtenerPacientePorId = async id => {
  const pacientes = await obtenerPacientes();
  return pacientes.find(paciente => paciente.id === id) || null;
};

export const guardarPaciente = async paciente => {
  const pacientes = await obtenerPacientes();
  const pacientesActualizados = [...pacientes, paciente];
  const archivoTemporal = `${pacientesFile}.${process.pid}.tmp`;
  await writeFile(archivoTemporal, `${JSON.stringify(pacientesActualizados, null, 2)}\n`, 'utf8');
  await rename(archivoTemporal, pacientesFile);
  return paciente;
};
