const express = require('express');
const cors = require('cors');
const rutasPacientes = require('./routes/pacientes.routes');

const app = express();
const PUERTO = process.env.PORT || 3000;

// permite que react le haga peticiones desde otro puerto
app.use(cors());
// lee el json que llega, con espacio extra por las fotos
app.use(express.json({ limit: '5mb' }));

// todas las rutas de pacientes empiezan con /api/pacientes
app.use('/api/pacientes', rutasPacientes);

app.listen(PUERTO, (error) => {
  // si el puerto esta ocupado u otro problema, lo muestra y no sigue
  if (error) {
    console.log('no se pudo encender el servidor: ' + error.message);
    return;
  }
  console.log(`servidor funcionando en http://localhost:${PUERTO}`);
});