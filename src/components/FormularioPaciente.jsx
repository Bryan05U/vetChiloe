import React, { useState } from 'react';

function FormularioPaciente({ agregarPaciente, volverALista }) {
  // Estados para los datos de la mascota
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('');
  const [raza, setRaza] = useState('');
  const [numeroAtencion, setNumeroAtencion] = useState('');
  const [nombreDueno, setNombreDueno] = useState('');
  const [telefono, setTelefono] = useState('');
  const [antecedentes, setAntecedentes] = useState('');
  const [foto, setFoto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !numeroAtencion.trim()) {
      alert('Por favor ingresa al menos el nombre y el número de atención.');
      return;
    }

    const nuevoPaciente = {
      id: Date.now(),
      nombre: nombre.trim(),
      especie: especie.trim() || 'Mascota',
      raza: raza.trim() || 'Mestizo',
      numero_atencion: numeroAtencion.trim(),
      nombre_dueno: nombreDueno.trim() || 'No registrado',
      telefono: telefono.trim() || 'Sin contacto',
      antecedentes: antecedentes.trim() || 'Sin observaciones previas.',
      foto: foto.trim() || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop'
    };

    agregarPaciente(nuevoPaciente);
    volverALista(); // Redirige automáticamente al catálogo de pacientes
  };

  return (
    <div className="seccion-formulario-pantalla">
      <div className="cabecera-form">
        <h2>Ingreso de Nuevo Paciente 🩺</h2>
        <p>Registra la información clínica básica y de contacto del tutor de la mascota.</p>
      </div>

      <form onSubmit={handleSubmit} className="form-completo">
        <div className="bloque-form">
          <h3>Datos de la Mascota</h3>
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
              <label htmlFor="especie">Especie</label>
              <input 
                type="text" 
                id="especie"
                placeholder="Ej: Perro, Gato, Conejo" 
                value={especie} 
                onChange={(e) => setEspecie(e.target.value)} 
              />
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
          </div>
        </div>

        <div className="bloque-form">
          <h3>Datos del Tutor / Dueño</h3>
          <div className="grid-2-col">
            <div className="campo">
              <label htmlFor="dueno">Nombre del Tutor</label>
              <input 
                type="text" 
                id="dueno"
                placeholder="Ej: Carla Vargas" 
                value={nombreDueno} 
                onChange={(e) => setNombreDueno(e.target.value)} 
              />
            </div>

            <div className="campo">
              <label htmlFor="telefono">Teléfono Contacto</label>
              <input 
                type="tel" 
                id="telefono"
                placeholder="Ej: +56 9 1234 5678" 
                value={telefono} 
                onChange={(e) => setTelefono(e.target.value)} 
              />
            </div>
          </div>
        </div>

        <div className="bloque-form">
          <h3>Historial Clínico Inicial</h3>
          <div className="campo">
            <label htmlFor="antecedentes">Antecedentes Médicos / Observaciones</label>
            <textarea 
              id="antecedentes"
              rows="3"
              placeholder="Vacunas al día, alergias conocidas, motivo de consulta..."
              value={antecedentes}
              onChange={(e) => setAntecedentes(e.target.value)}
            />
          </div>

          <div className="campo">
            <label htmlFor="foto">URL Fotografía (Opcional)</label>
            <input 
              type="url" 
              id="foto"
              placeholder="https://..." 
              value={foto} 
              onChange={(e) => setFoto(e.target.value)} 
            />
          </div>
        </div>

        <div className="acciones-form">
          <button type="button" className="btn-cancelar" onClick={volverALista}>
            Cancelar
          </button>
          <button type="submit" className="btn-guardar-paciente">
            Guardar Ficha Clínica
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioPaciente;