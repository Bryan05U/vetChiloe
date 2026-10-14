import * as repositoriesPaciente from '../../repositories/pacientes.repositories.js';

const IMAGENES_POR_ESPECIE = {
  perro: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5K9bMLje8lyz6Kpk97MzwOZrh5PAlLXkZoj4-Q8DWKg&s=10',
  gato: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_tGFXnJruodcIwFf8xFENi3SiQjodb1F1M-w-gk180w&s=10',
};
const CAMPOS = ['nombre', 'especie', 'raza', 'diagnostico'];
const MAX_ANOS = 35;
const MAX_MESES = 12;

const estaVacio = (v) => v === null || v === undefined || String(v).trim() === '';

function formatearEdad({ anos, meses }) {
  const partes = [];
  if (anos > 0) partes.push(`${anos} ${anos === 1 ? 'año' : 'años'}`);
  if (meses > 0) partes.push(`${meses} ${meses === 1 ? 'mes' : 'meses'}`);
  return partes.join(' y ') || '0 meses';
}

function validarEdad(edad) {
  if (!edad || estaVacio(edad.anos) || estaVacio(edad.meses)) {
    throw new Error('La edad (años y meses) es obligatoria');
  }
  const anos = Number(edad.anos);
  const meses = Number(edad.meses);

  if (!Number.isInteger(anos) || !Number.isInteger(meses) || anos < 0 || meses < 0) {
    throw new Error('La edad debe ser un número entero no negativo');
  }
  if (anos > MAX_ANOS) throw new Error(`Los años no pueden superar ${MAX_ANOS}`);
  if (meses > MAX_MESES) throw new Error(`Los meses no pueden superar ${MAX_MESES}`);

  return { anos, meses };
}

export async function getDataPacientes() {
  return repositoriesPaciente.getData();
}

export async function insertDataPacientes(datos) {
  for (const campo of CAMPOS) {
    if (estaVacio(datos?.[campo])) {
      throw new Error(`El campo "${campo}" es nulo o está vacío`);
    }
  }

  const especie = String(datos.especie).trim().toLowerCase();
  if (!(especie in IMAGENES_POR_ESPECIE)) {
    throw new Error(`Especie no válida: "${datos.especie}"`);
  }

  const edad = validarEdad(datos.edad);

  return repositoriesPaciente.insertData({
    nombre: datos.nombre.trim(),
    especie,
    raza: datos.raza.trim(),
    diagnostico: datos.diagnostico.trim(),
    edad: formatearEdad(edad),
    imagen: IMAGENES_POR_ESPECIE[especie],
  });
}