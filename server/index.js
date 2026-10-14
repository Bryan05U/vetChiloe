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
  console.error(error);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PUERTO, () => {
  console.log(`API vetChiloe escuchando en http://localhost:${PUERTO}/api/pacientes`);
});
