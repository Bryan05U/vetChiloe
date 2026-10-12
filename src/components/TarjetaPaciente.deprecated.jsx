// Un componente en React es una función que retorna JSX
// `props` (propiedades) es un objeto que contiene los datos del componentes

function TarjetaPaciente(props) {
  const { paciente } = props;  // aquí extraemos la información del paciente desde las props
  return (
    <div className="tarjeta">
      <h3>{paciente.nombre}</h3>
      <p><strong>Número Paciente:</strong> {paciente.numero_atencion}</p>
      
      {/* Botón visual para futura interactividad */}
      <button className="btn-detalle">Ver Ficha Clínica</button>
    </div>
  );
}
export default TarjetaPaciente;
