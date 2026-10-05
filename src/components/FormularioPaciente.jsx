import { useState } from "react";

function FormularioPaciente({ agregarPaciente }) {
  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("");
  const [edad, setEdad] = useState("");
  const [diagnostico, setDiagnostico] = useState("");

  const manejarSubmit = (e) => {
    e.preventDefault();

    const nuevoPaciente = {
      nombre,
      especie,
      edad,
      diagnostico,
    };

    agregarPaciente(nuevoPaciente);

    // Limpiar formulario
    setNombre("");
    setEspecie("");
    setEdad("");
    setDiagnostico("");
  };

  return (
    <form onSubmit={manejarSubmit}>
      <h2>Registrar paciente</h2>

      <div>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Especie:</label>
        <input
          type="text"
          value={especie}
          onChange={(e) => setEspecie(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Edad:</label>
        <input
          type="number"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Diagnóstico:</label>
        <input
          type="text"
          value={diagnostico}
          onChange={(e) => setDiagnostico(e.target.value)}
          required
        />
      </div>

      <button type="submit">Registrar paciente</button>
    </form>
  );
}

export default FormularioPaciente;