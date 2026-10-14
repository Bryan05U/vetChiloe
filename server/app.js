// server/app.js
import express from 'express';
import cors from 'cors';
import pacientesRoutes from './src/routes/pacientes.routes.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Monta la ruta principal de la API
app.use('/api/pacientes', pacientesRoutes);

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});