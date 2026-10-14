import { spawn } from 'node:child_process'

const procesos = [
  spawn(process.execPath, ['server/apiServer.js'], { stdio: 'inherit' }),
  spawn(process.execPath, ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1'], { stdio: 'inherit' })
];

let cerrando = false;

const cerrar = codigo => {
  if (cerrando) return;
  cerrando = true;
  for (const proceso of procesos) {
    if (proceso.exitCode === null) proceso.kill();
  }
  process.exitCode = codigo;
};

for (const proceso of procesos) {
  proceso.on('error', error => {
    console.error('No se pudo iniciar uno de los servidores de desarrollo.', error);
    cerrar(1);
  });
  proceso.on('exit', codigo => {
    if (!cerrando && codigo !== 0) cerrar(codigo || 1);
  });
}

process.on('SIGINT', () => cerrar(0));
process.on('SIGTERM', () => cerrar(0));
