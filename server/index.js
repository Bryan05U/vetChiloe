import express from 'express';
import cors from 'cors';
import pacientesRoutes from './routes/pacientes.routes.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Endpoints de N-Capas
app.use('/api/pacientes', pacientesRoutes);

app.get('/', (req, res) => {
  res.send('AegisVet API - Servidor N-Capas Activo');
});

app.listen(PORT, () => {
  console.log(`Backend de AegisVet corriendo en http://localhost:${PORT}`);
});
