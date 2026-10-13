import { useEffect, useRef, useState } from 'react'
import './App.css'
import FlipCard from './components/FlipCard.jsx'
import pacientesIniciales from './data/pacientes.json'
import charkicitoImage from './assets/images/charkicito.jpg'
import mercedesImage from './assets/images/mercedes.jpg'
import hannitaImage from './assets/images/hannita.jpg'

const imagenesPacientes = {
  'charkicito.jpg': charkicitoImage,
  'mercedes.jpg': mercedesImage,
  'hannita.jpg': hannitaImage
};

const normalizarRut = rut => rut.replace(/[.\s-]/g, '').toUpperCase();

const rutValido = rut => {
  const rutNormalizado = normalizarRut(rut);
  const coincidencia = rutNormalizado.match(/^(\d{1,8})([\dK])$/);
  if (!coincidencia) return false;

  const [, cuerpo, digitoIngresado] = coincidencia;
  let suma = 0;
  let factor = 2;
  for (let indice = cuerpo.length - 1; indice >= 0; indice -= 1) {
    suma += Number(cuerpo[indice]) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }
  const resultado = 11 - (suma % 11);
  const digitoEsperado = resultado === 11 ? '0' : resultado === 10 ? 'K' : String(resultado);
  return digitoIngresado === digitoEsperado;
};

const mostrarErrorObligatorio = evento => {
  evento.currentTarget.setCustomValidity('Completa este campo.');
};

const limpiarError = evento => {
  evento.currentTarget.setCustomValidity('');
};

const calcularEdad = fecha => {
  const [anioNacimiento, mesNacimiento, diaNacimiento] = fecha.split('-').map(Number);
  const hoy = new Date();
  let anios = hoy.getFullYear() - anioNacimiento;
  let meses = hoy.getMonth() + 1 - mesNacimiento;

  if (hoy.getDate() < diaNacimiento) meses -= 1;
  if (meses < 0) {
    anios -= 1;
    meses += 12;
  }
  if (anios === 0) return meses === 0 ? 'Menos de 1 mes' : `${meses} ${meses === 1 ? 'mes' : 'meses'}`;
  return `${anios} ${anios === 1 ? 'año' : 'años'}`;
};

const formatearFecha = fecha => fecha.split('-').reverse().join('/');
const formatearEdad = edad => typeof edad === 'number'
  ? `${edad} ${edad === 1 ? 'año' : 'años'}`
  : edad;
const formatearPeso = peso => peso === null || peso === undefined || peso === ''
  ? 'No registrado'
  : `${peso} kg`;

const normalizarTexto = texto => texto
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('es');

const leerTemaGuardado = () => {
  try {
    return window.localStorage.getItem('vetchiloe-tema') === 'oscuro' ? 'oscuro' : 'claro';
  } catch (error) {
    console.error('No se pudo leer el tema guardado.', error);
    return 'claro';
  }
};

// Esta función muestra el estado del componente para almacenar
// la lista de pacientes de la veterinaria
function App() {
  const [pacientes, setPacientes] = useState(() => pacientesIniciales.map(paciente => ({
    ...paciente,
    foto: imagenesPacientes[paciente.foto]
  })));
  const [busqueda, setBusqueda] = useState('');
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [tema, setTema] = useState(leerTemaGuardado);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [pasoFormulario, setPasoFormulario] = useState(1);
  const [modoEdad, setModoEdad] = useState('manual');
  const [nombreArchivoImagen, setNombreArchivoImagen] = useState('');
  const botonCerrarFichaRef = useRef(null);
  const [formulario, setFormulario] = useState({
    nombre: '',
    especie: '',
    raza: '',
    edad: '',
    peso: '',
    fecha_nacimiento: '',
    dueño: '',
    rut: '',
    telefono: '',
    foto: ''
  });

  useEffect(() => {
    document.documentElement.dataset.theme = tema;
    try {
      window.localStorage.setItem('vetchiloe-tema', tema);
    } catch (error) {
      console.error('No se pudo guardar el tema seleccionado.', error);
    }
  }, [tema]);

  useEffect(() => {
    if (!pacienteSeleccionado) return undefined;

    const elementoAnterior = document.activeElement;
    botonCerrarFichaRef.current?.focus();
    const manejarTecla = evento => {
      if (evento.key === 'Escape') setPacienteSeleccionado(null);
    };
    document.addEventListener('keydown', manejarTecla);

    return () => {
      document.removeEventListener('keydown', manejarTecla);
      if (elementoAnterior instanceof HTMLElement && elementoAnterior.isConnected) {
        elementoAnterior.focus();
      }
    };
  }, [pacienteSeleccionado]);

  const pacientesFiltrados = pacientes.filter(paciente => {
    const datosPaciente = [
      paciente.nombre,
      paciente.especie,
      paciente.raza,
      paciente.dueño,
      paciente.numero_atencion
    ].filter(Boolean).join(' ');
    return normalizarTexto(datosPaciente).includes(normalizarTexto(busqueda.trim()));
  });

  const manejarCambio = evento => {
    const { name, value } = evento.target;
    setFormulario(actual => ({ ...actual, [name]: value }));
  };

  const manejarImagen = evento => {
    const archivo = evento.target.files[0];
    if (!archivo) return;

    setNombreArchivoImagen(archivo.name);
    const lector = new FileReader();
    lector.onload = () => {
      setFormulario(actual => ({ ...actual, foto: lector.result }));
    };
    lector.readAsDataURL(archivo);
  };

  const avanzarPaso = evento => {
    if (evento.currentTarget.form.reportValidity()) setPasoFormulario(2);
  };

  const agregarPaciente = evento => {
    evento.preventDefault();
    const rutInput = evento.currentTarget.elements.rut;
    const rutIngresado = normalizarRut(formulario.rut);
    const rutFormateado = `${rutIngresado.slice(0, -1)}-${rutIngresado.slice(-1)}`;

    if (!rutValido(formulario.rut)) {
      rutInput.setCustomValidity('Ingresa un RUT válido, por ejemplo 12.345.678-5.');
      rutInput.reportValidity();
      return;
    }

    const rutDuplicado = pacientes.some(paciente => paciente.rut && normalizarRut(paciente.rut) === rutIngresado);
    if (rutDuplicado) {
      rutInput.setCustomValidity('Ya existe un paciente registrado con el RUT de este dueño.');
      rutInput.reportValidity();
      return;
    }

    setPacientes(actuales => [
      ...actuales,
      {
        ...formulario,
        edad: modoEdad === 'fecha' ? calcularEdad(formulario.fecha_nacimiento) : Number(formulario.edad),
        peso: Number(formulario.peso),
        fecha_nacimiento: modoEdad === 'fecha' ? formulario.fecha_nacimiento : '',
        rut: rutFormateado,
        id: Date.now(),
        numero_atencion: `2026-A${actuales.length + 1}`
      }
    ]);
    setFormulario({ nombre: '', especie: '', raza: '', edad: '', peso: '', fecha_nacimiento: '', dueño: '', rut: '', telefono: '', foto: '' });
    setNombreArchivoImagen('');
    setModoEdad('manual');
    setPasoFormulario(1);
    setMostrarFormulario(false);
  };

  return (
    <div className="contenedor-principal">
      <header className="cabecera">
        <div className="cabecera-contenido">
          <div>
            <h1 className='TituloPagina'>Sistema de Información - VetChiloé</h1>
            <p>Plataforma de control y seguimiento de pacientes</p>
          </div>
          <button
            className="boton-tema"
            type="button"
            aria-label={`Cambiar a modo ${tema === 'claro' ? 'noche' : 'día'}`}
            aria-pressed={tema === 'oscuro'}
            onClick={() => setTema(actual => actual === 'claro' ? 'oscuro' : 'claro')}
          >
            {tema === 'claro' ? '☾ Modo noche' : '☀ Modo día'}
          </button>
        </div>
      </header>

      <main>
        <button className="boton-agregar" type="button" onClick={() => {
          setMostrarFormulario(actual => !actual);
          setPasoFormulario(1);
        }}>
          {mostrarFormulario ? 'Cerrar formulario' : 'Agregar paciente'}
        </button>

        {mostrarFormulario && (
          <form className="formulario-paciente" onSubmit={agregarPaciente}>
            <h2>{pasoFormulario === 1 ? 'Datos del paciente' : 'Datos del dueño del paciente'}</h2>
            <fieldset className="paso-formulario" hidden={pasoFormulario !== 1} disabled={pasoFormulario !== 1}>
              <div className="campos-formulario">
                <label>
                  Nombre del paciente
                  <input name="nombre" placeholder="Ej.: Luna" value={formulario.nombre} onChange={manejarCambio} onInput={limpiarError} onInvalid={mostrarErrorObligatorio} required />
                </label>
                <label>
                  Especie
                  <select name="especie" value={formulario.especie} onChange={manejarCambio} onInput={limpiarError} onInvalid={mostrarErrorObligatorio} required>
                    <option value="">Selecciona una especie</option>
                    <option value="Canino">Canino</option>
                    <option value="Felino">Felino</option>
                    <option value="Ave">Ave</option>
                    <option value="Roedor">Roedor</option>
                    <option value="Reptil">Reptil</option>
                    <option value="Pez">Pez</option>
                    <option value="Otro">Otro</option>
                  </select>
                </label>
                <label>
                  Raza
                  <input name="raza" placeholder="Ej.: Mestizo" value={formulario.raza} onChange={manejarCambio} onInput={limpiarError} onInvalid={mostrarErrorObligatorio} required />
                </label>
                <fieldset className="selector-edad">
                  <legend>Cómo ingresar la edad</legend>
                  <label>
                    <input type="radio" name="modoEdad" value="manual" checked={modoEdad === 'manual'} onChange={() => setModoEdad('manual')} />
                    Edad aproximada
                  </label>
                  <label>
                    <input type="radio" name="modoEdad" value="fecha" checked={modoEdad === 'fecha'} onChange={() => setModoEdad('fecha')} />
                    Fecha de nacimiento
                  </label>
                </fieldset>
                {modoEdad === 'manual' ? (
                  <label>
                    Edad del paciente
                    <span className="campo-con-unidad">
                      <input name="edad" type="number" min="0" step="1" placeholder="Ej.: 3" value={formulario.edad} onChange={manejarCambio} onInput={limpiarError} onInvalid={mostrarErrorObligatorio} required />
                      <span aria-hidden="true">años</span>
                    </span>
                  </label>
                ) : (
                  <label>
                    Fecha de nacimiento
                    <input name="fecha_nacimiento" type="date" max={new Date().toISOString().slice(0, 10)} value={formulario.fecha_nacimiento} onChange={manejarCambio} onInput={limpiarError} onInvalid={mostrarErrorObligatorio} required />
                  </label>
                )}
                <label>
                  Peso del paciente
                  <span className="campo-con-unidad">
                    <input name="peso" type="number" min="0" step="0.1" placeholder="Ej.: 4.5" value={formulario.peso} onChange={manejarCambio} onInput={limpiarError} onInvalid={mostrarErrorObligatorio} required />
                    <span aria-hidden="true">kg</span>
                  </span>
                </label>
                <label>
                  Imagen del paciente
                  <span className="selector-archivo">
                    <input className="selector-archivo-input" type="file" accept="image/*" aria-label="Seleccionar imagen del paciente" onChange={manejarImagen} onInput={limpiarError} onInvalid={mostrarErrorObligatorio} required />
                    <span className="selector-archivo-boton" aria-hidden="true">Seleccionar imagen</span>
                    <span className="selector-archivo-nombre" aria-live="polite">
                      {nombreArchivoImagen || 'Ningún archivo seleccionado'}
                    </span>
                  </span>
                </label>
              </div>
              <button className="boton-guardar" type="button" onClick={avanzarPaso}>Siguiente</button>
            </fieldset>
            <fieldset className="paso-formulario" hidden={pasoFormulario !== 2} disabled={pasoFormulario !== 2}>
              <div className="campos-formulario">
                <label>
                  Nombre del dueño
                  <input name="dueño" placeholder="Nombre y apellido" value={formulario.dueño} onChange={manejarCambio} onInput={limpiarError} onInvalid={mostrarErrorObligatorio} required />
                </label>
                <label>
                  RUT del dueño
                  <input name="rut" placeholder="Ej.: 12.345.678-5" value={formulario.rut} onChange={manejarCambio} onInput={limpiarError} onInvalid={mostrarErrorObligatorio} required />
                </label>
                <label>
                  Teléfono del dueño
                  <input name="telefono" type="tel" placeholder="Ej.: +56 9 1234 5678" value={formulario.telefono} onChange={manejarCambio} onInput={limpiarError} onInvalid={mostrarErrorObligatorio} required />
                </label>
              </div>
              <div className="acciones-formulario">
                <button className="boton-volver" type="button" onClick={() => setPasoFormulario(1)}>Atrás</button>
                <button className="boton-guardar" type="submit">Guardar paciente</button>
              </div>
            </fieldset>
          </form>
        )}

        <section className="seccion-pacientes" aria-labelledby="titulo-pacientes">
          <div className="encabezado-pacientes">
            <div>
              <h2 id="titulo-pacientes">Lista de Pacientes Registrados</h2>
              <p className="contador-pacientes">
                {pacientesFiltrados.length} de {pacientes.length} pacientes
              </p>
            </div>
            <label className="buscador-pacientes">
              <span className="texto-solo-lectores">Buscar pacientes</span>
              <span className="icono-busqueda" aria-hidden="true">⌕</span>
              <input
                type="search"
                value={busqueda}
                onChange={evento => setBusqueda(evento.target.value)}
                placeholder="Buscar por nombre, especie o dueño..."
              />
              {busqueda && (
                <button
                  className="limpiar-busqueda"
                  type="button"
                  aria-label="Limpiar búsqueda"
                  onClick={() => setBusqueda('')}
                >
                  ×
                </button>
              )}
            </label>
          </div>

          {pacientesFiltrados.length > 0 ? (
            <div className="tabla-pacientes-contenedor">
              <table className="tabla-pacientes">
                <thead>
                  <tr>
                    <th scope="col">Paciente</th>
                    <th scope="col">Especie</th>
                    <th scope="col">Raza</th>
                    <th scope="col">Edad</th>
                    <th scope="col">Peso</th>
                    <th scope="col">Dueño</th>
                    <th scope="col">N° atención</th>
                  </tr>
                </thead>
                <tbody>
                  {pacientesFiltrados.map(paciente => (
                    <tr
                      key={paciente.id}
                      tabIndex={0}
                      aria-label={`Abrir ficha de ${paciente.nombre}`}
                      onClick={() => setPacienteSeleccionado(paciente)}
                      onKeyDown={evento => {
                        if (evento.key === 'Enter' || evento.key === ' ') {
                          evento.preventDefault();
                          setPacienteSeleccionado(paciente);
                        }
                      }}
                    >
                      <th scope="row">{paciente.nombre}</th>
                      <td>{paciente.especie}</td>
                      <td>{paciente.raza}</td>
                      <td>{formatearEdad(paciente.edad)}</td>
                      <td>{formatearPeso(paciente.peso)}</td>
                      <td>{paciente.dueño}</td>
                      <td>{paciente.numero_atencion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="sin-pacientes" role="status">
              {pacientes.length === 0
                ? 'Aún no hay pacientes registrados.'
                : `No se encontraron pacientes para “${busqueda}”.`}
            </p>
          )}
        </section>

        {pacienteSeleccionado && (
          <div
            className="ficha-paciente-fondo"
            onClick={evento => {
              if (evento.target === evento.currentTarget) setPacienteSeleccionado(null);
            }}
          >
            <section
              className="ficha-paciente-dialogo"
              role="dialog"
              aria-modal="true"
              aria-labelledby="titulo-ficha-paciente"
            >
              <div className="ficha-paciente-encabezado">
                <h2 id="titulo-ficha-paciente">Ficha de {pacienteSeleccionado.nombre}</h2>
                <button
                  ref={botonCerrarFichaRef}
                  className="boton-cerrar-ficha"
                  type="button"
                  aria-label="Cerrar ficha del paciente"
                  onClick={() => setPacienteSeleccionado(null)}
                >
                  ×
                </button>
              </div>
              <FlipCard
                width={300}
                height={400}
                axis="y"
                flipOnClick={true}
                respectReducedMotion={false}
                background={tema === 'oscuro' ? '#17382c' : '#e4f2e9'}
                color={tema === 'oscuro' ? '#e5f5e9' : '#183b2b'}
                ariaLabel={`Tarjeta de ${pacienteSeleccionado.nombre}. Haz clic para ver sus datos.`}
                front={
                  <div className="frente-ficha-paciente">
                    <img src={pacienteSeleccionado.foto} alt={pacienteSeleccionado.nombre} />
                    <div className="nombre-frente-ficha">{pacienteSeleccionado.nombre}</div>
                  </div>
                }
                back={
                  <div className="reverso-ficha-paciente">
                    <h3>{pacienteSeleccionado.nombre}</h3>
                    <p>Especie: {pacienteSeleccionado.especie}</p>
                    <p>Raza: {pacienteSeleccionado.raza}</p>
                    <p>Edad: {formatearEdad(pacienteSeleccionado.edad)}</p>
                    <p>Peso: {formatearPeso(pacienteSeleccionado.peso)}</p>
                    {pacienteSeleccionado.fecha_nacimiento && <p>Fecha de nacimiento: {formatearFecha(pacienteSeleccionado.fecha_nacimiento)}</p>}
                    <p>Dueño: {pacienteSeleccionado.dueño}</p>
                    {pacienteSeleccionado.rut && <p>RUT: {pacienteSeleccionado.rut}</p>}
                    {pacienteSeleccionado.telefono && <p>Teléfono: {pacienteSeleccionado.telefono}</p>}
                    <p>N° Atención: {pacienteSeleccionado.numero_atencion}</p>
                  </div>
                }
              />
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;