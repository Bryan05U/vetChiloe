import React, { useState } from 'react';

function FormularioPaciente({ agregarPaciente, volverALista }) {
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('Perro');
  const [raza, setRaza] = useState('');
  const [edadAproximada, setEdadAproximada] = useState('1 a 3 años');
  const [numeroAtencion, setNumeroAtencion] = useState('');
  const [nombreDueno, setNombreDueno] = useState('');
  const [telefono, setTelefono] = useState('');
  const [foto, setFoto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !numeroAtencion.trim() || !foto.trim()) {
      alert('Por favor completa todos los campos obligatorios (*), incluyendo la foto de la mascota.');
      return;
    }

    const nuevo = {
      id: Date.now(),
      nombre: nombre.trim(),
      especie,
      raza: raza.trim() || 'Mestizo',
      edad: edadAproximada,
      numero_atencion: numeroAtencion.trim(),
      nombre_dueno: nombreDueno.trim() || 'No registrado',
      telefono: telefono.trim() || 'Sin contacto',
      foto: foto.trim()
    };

    agregarPaciente(nuevo);
    volverALista();
  };

  return (
    <div className="seccion-formulario-pantalla">
      <div className="cabecera-form">
        <h2>Ingreso de Nuevo Paciente</h2>
        <p>Crea la ficha médica inicial para un animal que ingresa por primera vez.</p>
      </div>

      <form onSubmit={handleSubmit} className="form-completo">
        <div className="grid-2-col">
          <div className="campo">
            <label htmlFor="nombre">Nombre Mascota *</label>
            <input 
              type="text" 
              id="nombre"
              placeholder="Ej: Charkicito" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              required 
            />
          </div>

          <div className="campo">
            <label htmlFor="numeroAtencion">N° Ficha / Atención *</label>
            <input 
              type="text" 
              id="numeroAtencion"
              placeholder="Ej: 2026-X99" 
              value={numeroAtencion} 
              onChange={(e) => setNumeroAtencion(e.target.value)} 
              required 
            />
          </div>

          <div className="campo">
            <label htmlFor="especie">Especie *</label>
            <select 
              id="especie"
              value={especie} 
              onChange={(e) => setEspecie(e.target.value)}
            >
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Conejo">Conejo</option>
              <option value="Caballo">Caballo</option>
              <option value="Exótico">Exótico / Otro</option>
            </select>
          </div>

          <div className="campo">
            <label htmlFor="raza">Raza</label>
            <input 
              type="text" 
              id="raza"
              placeholder="Ej: Poodle, Siamés, Mestizo" 
              value={raza} 
              onChange={(e) => setRaza(e.target.value)} 
            />
          </div>

          <div className="campo">
            <label htmlFor="edad">Edad (Aproximada) *</label>
            <select 
              id="edad"
              value={edadAproximada} 
              onChange={(e) => setEdadAproximada(e.target.value)}
            >
              <option value="Cachorro / Menor a 6 meses">Cachorro / Menor a 6 meses</option>
              <option value="6 meses a 1 año">6 meses a 1 año</option>
              <option value="1 a 3 años">1 a 3 años</option>
              <option value="4 a 7 años">4 a 7 años</option>
              <option value="Senior (8+ años)">Senior (8+ años)</option>
              <option value="Desconocida">Desconocida</option>
            </select>
          </div>

          <div className="campo">
            <label htmlFor="foto">URL Fotografía * (Obligatorio)</label>
            <input 
              type="url" 
              id="foto"
              placeholder="https://ejemplo.com/foto.jpg" 
              value={foto} 
              onChange={(e) => setFoto(e.target.value)} 
              required
            />
          </div>
        </div>

        <div className="bloque-subform">
          <h4>Datos del Tutor</h4>
          <div className="grid-2-col">
            <div className="campo">
              <label htmlFor="dueno">Nombre del Tutor *</label>
              <input 
                type="text" 
                id="dueno"
                placeholder="Ej: Carla Vargas" 
                value={nombreDueno} 
                onChange={(e) => setNombreDueno(e.target.value)} 
                required
              />
            </div>

            <div className="campo">
              <label htmlFor="telefono">Teléfono Contacto *</label>
              <input 
                type="tel" 
                id="telefono"
                placeholder="Ej: +56 9 1234 5678" 
                value={telefono} 
                onChange={(e) => setTelefono(e.target.value)} 
                required
              />
            </div>
          </div>
        </div>

        <div className="acciones-form">
          <button type="button" className="btn-cancelar" onClick={volverALista}>Cancelar</button>
          <button type="submit" className="btn-guardar-paciente">Guardar Nuevo Paciente</button>
        </div>
      </form>
    </div>
  );
}

export default FormularioPaciente;