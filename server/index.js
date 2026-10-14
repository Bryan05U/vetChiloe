const express = require('express');
const cors = require('cors');
const pacientesRoutes = require('./routes/pacientes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/pacientes', pacientesRoutes);

app.listen(PORT, () => {
  console.log(`API VetChiloé disponible en http://localhost:${PORT}`);
});