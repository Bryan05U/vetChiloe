import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pacientesRouter from './routes/pacientes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API de VetChiloé funcionando'
  });
});

app.use('/api/pacientes', pacientesRouter);

app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});