import './BuscadorPaciente.css';

function BuscadorPaciente({ textoBusqueda, onCambiarBusqueda }) {
  return (
    <div className="contenedor-buscador">
      <label htmlFor="buscar-paciente" className="etiqueta-buscador">
        Buscar paciente
      </label>

      <input
        id="buscar-paciente"
        type="search"
        className="input-buscador"
        placeholder="Buscar por nombre o especie..."
        value={textoBusqueda}
        onChange={(e) => onCambiarBusqueda(e.target.value)}
      />
    </div>
  );
}

export default BuscadorPaciente;