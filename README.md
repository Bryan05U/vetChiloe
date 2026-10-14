# Sistema de Información: Veterinaria Chiloé 

Una aplicación web moderna y responsiva diseñada para gestionar y realizar el seguimiento de los datos de pacientes en clínicas veterinarias. Este proyecto sirve como base educativa para construir interfaces web escalables utilizando el ecosistema moderno de JavaScript, utilizando React.

Este proyecto se enmarca dentro de la asignatura de Tecnologías Web y Móviles de 6to Semestre en Ingeniería Civil en Informática, de la Universidad de Los Lagos.

## 🚀 Stack Tecnológico

* **Frontend:** React + Vite
* **Estilos:** CSS (App.css)
* **Servidor local:** API Express + Vite
* **Persistencia actual:** `src/data/pacientes.json`
* **Base de datos futura:** PostgreSQL

## Arquitectura de tres capas

* **Presentación:** `src/App.jsx` y `src/components/` muestran la interfaz y recogen las acciones del usuario.
* **Rutas y controladores:** `server/routes/pacientes.routes.js` declara los endpoints Express y `server/controllers/pacientes.controller.js` procesa las peticiones HTTP.
* **Lógica de negocio:** `server/business/pacienteService.js` valida los datos, la especie, el RUT, los duplicados y calcula la edad.
* **Acceso a datos:** `server/data/pacienteRepository.js` lee y escribe los pacientes en `src/data/pacientes.json`.

La interfaz se comunica con la API mediante `src/data/pacienteApi.js`. Ejecuta `npm run dev` para iniciar la aplicación y la API local. Los pacientes registrados se guardan en el archivo JSON y permanecen al reiniciar el servidor. Las imágenes subidas se almacenan como data URL dentro de ese JSON. El repositorio podrá reemplazarse en el futuro por PostgreSQL sin acoplar la interfaz a la base de datos.

### Probar la API con Thunder Client

Con `npm run dev` ejecutándose, envía solicitudes a `http://localhost:3001`:

* `GET /api/pacientes`: listar pacientes.
* `GET /api/pacientes/1`: obtener por ID; devuelve `404` si no existe y `400` si el ID no es válido.
* `POST /api/pacientes`: crear un paciente. Selecciona **Body → JSON** y envía los campos `nombre`, `especie`, `raza`, `diagnostico`, `edad`, `peso`, `modoEdad`, `fecha_nacimiento`, `dueño`, `rut`, `telefono` y `foto`. Para una edad manual usa `"modoEdad": "manual"` y un valor numérico en `edad`; para fecha de nacimiento usa `"modoEdad": "fecha"` y una fecha `YYYY-MM-DD`. La imagen debe enviarse como data URL. La API responde `201` al crear, `422` ante datos inválidos y `409` si el RUT ya existe.

Para previsualizar una compilación de producción, ejecuta primero `npm run build` y luego `npm run preview`.

## ⚙️ Requisitos Previos

* [Node.js](https://nodejs.org/) (incluye npm) instalado en tu computadora local.

## 🛠️ Instalación y Configuración

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Vikktor93/vetChiloe