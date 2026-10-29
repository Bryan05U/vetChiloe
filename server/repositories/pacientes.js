import pool from '../config/db.js';

export const obtenerTodos = async () => {
  const resultado = await pool.query(
    'SELECT * FROM pacientes ORDER BY id'
  );
  return resultado.rows;
};

export const buscar = async (texto) => {
  const resultado = await pool.query(
    'SELECT * FROM buscar_pacientes($1)',
    [texto]
  );
  return resultado.rows;
};

export const crear = async (paciente) => {
  const {
    nombre,
    especie,
    edad,
    diagnostico,
    foto
  } = paciente;

  const resultado = await pool.query(
    `SELECT *
      FROM registrar_paciente($1, $2, $3, $4, $5)`,
    [
      nombre,
      especie,
      edad ?? null,
      diagnostico ?? null,
      foto ?? null
    ]
  );

  return resultado.rows[0].registrar_paciente;
};