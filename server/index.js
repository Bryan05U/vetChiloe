import cors from 'cors';
import express from 'express';
import rutasPacientes from './routes/pacientes.js';

const PUERTO = 3000;
const app = express();

app.use(cors());

// El formulario envía la fotografía como data URL base64 de hasta 2 MB, que
// infla ~33%. El límite por defecto de express.json (100 kb) la rechazaría.
app.use(express.json({ limit: '4mb' }));

app.use('/api/pacientes', rutasPacientes);

app.use((req, res) => {
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
});

// eslint-disable-next-line no-unused-vars -- Express exige 4 parámetros para reconocer un error handler
app.use((error, req, res, next) => {
  // Un body malformado o un JSON con un primitivo suelto (null, 123, "x") lo
  // rechaza express.json con status 400 y expose. No es culpa del servidor.
  const status = error.status ?? error.statusCode ?? 500;

  if (status >= 500) console.error(error);

  res.status(status).json({
    error: status >= 500 ? 'Error interno del servidor' : error.message,
  });
});

app.listen(PUERTO, () => {
  console.log(`API vetChiloe escuchando en http://localhost:${PUERTO}/api/pacientes`);
});
