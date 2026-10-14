# Mini Proyecto vetChiloé - Arquitectura N-Capas

Este proyecto aplica un modelo de arquitectura N-Capas separando las responsabilidades entre la capa de presentación (React + Vite) y la capa del servidor API REST (Node.js + Express).

## 🛠️ Arquitectura de Capas

```mermaid
graph TD
    subgraph Frontend_React [Capa de Presentación - Navegador]
        A[Navbar.jsx / FloatingActionButton.jsx]
        B[ListaPacientes.jsx / FormularioPaciente.jsx]
        C[pacienteService.js]
    end

    subgraph Backend_Express [Servidor Node.js - Puerto 3001]
        D[pacientes.routes.js - Rutas]
        E[pacientes.controller.js - Controladores]
        F[pacientes.service.js - Lógica de Negocio]
        G[pacientes.repository.js - Repositorio de Datos]
    end

    A --> B
    B -->|Solicita acción| C
    C -->|HTTP GET / POST| D
    D --> E
    E --> F
    F -->|Valida especie y genera N° atención| G
```

## 🚀 Ejecución del Proyecto

1. **Iniciar el Backend (Puerto 3001):**
   ```bash
   cd server
   npm install
   npm run dev
   ```

2. **Iniciar el Frontend (Puerto 5173):**
   ```bash
   npm run dev
   ```