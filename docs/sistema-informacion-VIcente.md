# AegisVet - Sistema de Fichas Clínicas Veterinarias

Plataforma web para la gestión de pacientes y emisión de carnets de salud animal desarrollada para la asignatura Tecnologías Web y Móviles (Ingeniería Civil en Informática, Universidad de Los Lagos).

- Estudiante: Vicente Martin Garin Pereda
- Rama de Trabajo: estudiante/vicente-garin
- Fecha de Entrega: 14 de Octubre de 2026

---

## 1. Contexto General
Desarrollo de una solución web para la administración clínica veterinaria en Chiloé. El sistema implementa una arquitectura desacoplada en N-Capas, separando por completo la interfaz visual del usuario (React + Vite) del servidor y lógica de negocio (Node.js + Express).

---

## 2. Mapa de Funcionamiento (Arquitectura en N-Capas)

La comunicación entre el cliente y el servidor sigue un flujo ordenado y de bajo acoplamiento:

![Diagrama de Arquitectura de N-Capas](arquitectura-capas.png)

### Explicación del flujo de capas:
1. Frontend (Puerto 5173): La interfaz gráfica solicita consultar o registrar pacientes mediante el servicio pacienteService.js, enviando solicitudes HTTP por internet.
2. Rutas (routes/): El servidor recibe la petición en la URL correspondiente (/api/pacientes) y la deriva al controlador.
3. Controlador (controllers/): Recibe la solicitud, extrae los datos y coordina la respuesta enviando los códigos de estado HTTP (200, 201 o 400).
4. Servicio (services/): Aplica las reglas del negocio: valida que el nombre no esté vacío, comprueba que la especie sea permitida (Felino, Canino, Ave o Exótico) y genera automáticamente el correlativo de atención (ej: 2026-A4).
5. Repositorio (repositories/): Gestiona directamente el almacenamiento en memoria para leer o insertar los registros de pacientes.

---

## 3. Estructura de Carpetas del Proyecto

vetChiloe/
├── docs/                               # Documentación y bitácoras personales
│   ├── arquitectura-capas.png          # Imagen del diagrama de N-Capas
│   └── sistema-informacion-Vicente.md  # Bitácora técnica y registro de entregas
├── public/                             # Recursos estáticos web
├── src/                                # CAPA DE PRESENTACIÓN (Frontend)
│   ├── components/                     # Componentes visuales (Tabla, Modal, Card, Formulario)
│   ├── data/                           # Mocks iniciales de pacientes (Parte A)
│   ├── services/                       # Conexión asíncrona hacia el backend (fetch)
│   ├── App.jsx                         # Componente principal y gestión de estado
│   └── main.jsx                        # Punto de entrada de React
├── server/                             # SERVIDOR Y LÓGICA DE NEGOCIO (Backend)
│   ├── controllers/                    # Manejo de peticiones y códigos de respuesta
│   ├── repositories/                   # Acceso y persistencia sobre los datos
│   ├── routes/                         # Definición de endpoints REST
│   ├── services/                       # Validaciones de negocio y creación de correlativos
│   ├── index.js                        # Archivo principal de Express y middlewares
│   └── package.json                    # Dependencias del servidor (express, cors)
├── package.json                        # Dependencias de frontend (React, Vite, XLSX)
└── README.md                           # Información base del repositorio

---

## 4. Endpoints del Servidor (API REST)

| Método | Endpoint | Descripción | Código Éxito | Códigos Error |
| :--- | :--- | :--- | :--- | :--- |
| GET | /api/pacientes | Retorna el listado completo de mascotas registradas | 200 OK | 500 Internal Server Error |
| POST | /api/pacientes | Registra una nueva mascota y genera su código de atención | 201 Created | 400 Bad Request |

---

## 5. Historial de Avances Realizados

### 5.1. Fichas Clínicas Interactivas (FlipCard) - Septiembre 2026
- Tarjetas con efecto 3D que giran al hacer clic.
- Vista frontal con foto, nombre, código y especie; reverso con diagnóstico médico y datos del tutor.

### 5.2. Rediseño UX con Tabla Responsiva y Modal Flotante - Octubre 2026
- Organización de pacientes en una tabla clara con badges por especie.
- Botón flotante (FAB) para abrir el formulario sin recargar la página.
- Exportación automática del historial médico a planillas Excel (.xlsx).

### 5.3. Implementación de Arquitectura N-Capas - 14-10-2026
- Frontend desacoplado (Parte A): Creación de src/services/pacienteService.js para consumir datos mediante llamadas asíncronas con useEffect.
- Backend modular (Parte B): Servidor independiente en Express.js con división formal en 4 capas (routes, controllers, services, repositories).
- Verificación en Thunder Client: Comprobación de los 3 casos requeridos en la evaluación:
  - GET /api/pacientes -> Respuesta 200 OK con la lista de pacientes.
  - POST /api/pacientes -> Respuesta 201 Created con el paciente guardado y su correlativo.
  - POST /api/pacientes (con especie inválida o sin datos) -> Respuesta 400 Bad Request.

---

## 6. Instrucciones para Ejecutar el Proyecto

Para correr la aplicación se deben mantener dos terminales abiertas simultáneamente en VS Code:

### 1. Iniciar el Servidor Backend (Puerto 3000)
cd server
node index.js

Salida esperada: Backend de AegisVet corriendo en http://localhost:3000

### 2. Iniciar el Frontend (Puerto 5173)
npm run dev

Salida esperada: Local: http://localhost:5173/