// server/app.js
import express from 'express';
import cors from 'cors';
import pacientesRoutes from './src/routes/pacientes.routes.js';

const app = express();
const PORT = 3001; // <--- Cambiado a 3001

app.use(cors());
app.use(express.json());

app.use('/api/pacientes', pacientesRoutes);

app.listen(PORT, () => {
  console.log(`Backend de VetChiloé corriendo en http://localhost:${PORT}`);
});