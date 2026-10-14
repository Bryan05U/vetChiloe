import { useState } from 'react';
import FlipCard from './FlipCard';
import './PacienteCard.css';

const RAZAS_POR_ESPECIE = {
  Canino: ['Quiltro / Mestizo', 'Pastor Alemán', 'Poodle', 'Golden Retriever', 'Beagle', 'Labrador', 'Bulldog', 'Otro'],
  Felino: ['Común Europeo / Mestizo', 'Siamés', 'Persa', 'Maine Coon', 'Bengala', 'Otro'],
  Ave: ['Canario', 'Periquito Australiano', 'Ninfa / Calopsita', 'Loro', 'Otro'],
  Exótico: ['Conejo', 'Cobaya / Cuy', 'Hurón', 'Hamster', 'Otro']
};

const FOTOS_FALLBACK = {
  Felino: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop',
  Canino: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop',
  Ave: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&auto=format&fit=crop',
  Exótico: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600&auto=format&fit=crop'
};

export function PacienteCard({ paciente, onActualizarPaciente, esModal = false }) {
  const [estaVolteada, setEstaVolteada] = useState(false);
  const [editando, setEditando] = useState(false);

  const [nombre, setNombre] = useState(paciente.nombre || '');
  const [especie, setEspecie] = useState(paciente.especie || 'Felino');
  const [raza, setRaza] = useState(paciente.raza || 'Común Europeo / Mestizo');
  const [nombreDueno, setNombreDueno] = useState(paciente.nombreDueno || '');
  const [rutDueno, setRutDueno] = useState(paciente.rutDueno || '');
  const [edadAnios, setEdadAnios] = useState(paciente.edadAnios ?? 0);
  const [edadMeses, setEdadMeses] = useState(paciente.edadMeses ?? 0);
  const [peso, setPeso] = useState(paciente.peso ? paciente.peso.replace(' kg', '') : '');
  const [motivo, setMotivo] = useState(paciente.motivo || '');
  const [foto, setFoto] = useState(paciente.foto || FOTOS_FALLBACK[paciente.especie] || FOTOS_FALLBACK.Felino);

  const formatearEdad = (a, m) => {
    const anios = parseInt(a, 10) || 0;
    const meses = parseInt(m, 10) || 0;
    if (anios === 0 && meses === 0) return 'Recién nacido';
    if (anios === 0) return `${meses} ${meses === 1 ? 'mes' : 'meses'}`;
    if (meses === 0) return `${anios} ${anios === 1 ? 'año' : 'años'}`;
    return `${anios} ${anios === 1 ? 'año' : 'años'} y ${meses} ${meses === 1 ? 'mes' : 'meses'}`;
  };

  const handleEspecieChange = (nuevaEspecie) => {
    setEspecie(nuevaEspecie);
    const razasDisponibles = RAZAS_POR_ESPECIE[nuevaEspecie] || ['Otro'];
    setRaza(razasDisponibles[0]);
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Por favor selecciona una foto de menos de 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const guardarCambios = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const pesoLimpio = peso.toString().trim();
    onActualizarPaciente({
      ...paciente,
      nombre: nombre.trim() || paciente.nombre,
      especie,
      raza,
      nombreDueno: nombreDueno.trim(),
      rutDueno: rutDueno.trim(),
      edad: formatearEdad(edadAnios, edadMeses),
      edadAnios: parseInt(edadAnios, 10) || 0,
      edadMeses: parseInt(edadMeses, 10) || 0,
      peso: pesoLimpio ? (pesoLimpio.includes('kg') ? pesoLimpio : `${pesoLimpio} kg`) : 'No registrado',
      motivo,
      foto
    });
    setEditando(false);
  };

  const fotoActual = foto || FOTOS_FALLBACK[especie] || FOTOS_FALLBACK.Felino;

  const contenidoFicha = (
    <div className="card-back-content modal-vista-plana">
      <div className="back-header-pro">
        <div className="back-header-top">
          <span className="chip-institucional">AegisVet • Ficha Clínica Oficial</span>
          <span className="chip-folio">{paciente.numero_atencion}</span>
        </div>

        {editando ? (
          <div className="edicion-cabecera-bloque">
            <input
              type="text"
              className="input-inline input-nombre-edicion"
              placeholder="Nombre Mascota"
              value={nombre}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setNombre(e.target.value)}
            />
            <div className="edicion-selects-row">
              <select
                className="select-inline"
                value={especie}
                onChange={(e) => handleEspecieChange(e.target.value)}
              >
                <option value="Felino">Felino</option>
                <option value="Canino">Canino</option>
                <option value="Ave">Ave</option>
                <option value="Exótico">Exótico</option>
              </select>
              <select
                className="select-inline"
                value={raza}
                onChange={(e) => setRaza(e.target.value)}
              >
                {(RAZAS_POR_ESPECIE[especie] || ['Otro']).map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <>
            <h3 className="titulo-paciente-carnet">{nombre}</h3>
            <p className="subtitulo-paciente-carnet">{especie} • {raza}</p>
          </>
        )}
      </div>

      <div className="ficha-detalles-pro">
        <div className="detalle-row">
          <span className="detalle-label">Tutor a Cargo</span>
          {editando ? (
            <input
              type="text"
              className="input-inline"
              placeholder="Nombre tutor"
              value={nombreDueno}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setNombreDueno(e.target.value)}
            />
          ) : (
            <span className="detalle-val">{nombreDueno || 'No registrado'}</span>
          )}
        </div>

        <div className="detalle-row">
          <span className="detalle-label">RUT Tutor</span>
          {editando ? (
            <input
              type="text"
              className="input-inline"
              placeholder="12.345.678-9"
              value={rutDueno}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setRutDueno(e.target.value)}
            />
          ) : (
            <span className="detalle-val">{rutDueno || 'No informado'}</span>
          )}
        </div>

        <div className="detalle-row">
          <span className="detalle-label">Edad Registrada</span>
          {editando ? (
            <div className="input-edades-inline-row">
              <input 
                type="number" 
                min="0"
                max="30"
                className="input-inline inline-number"
                value={edadAnios} 
                onFocus={(e) => e.target.select()}
                onChange={(e) => setEdadAnios(Math.max(0, parseInt(e.target.value, 10) || 0))}
              />
              <span className="label-inline">a</span>
              <input 
                type="number" 
                min="0"
                max="11"
                className="input-inline inline-number"
                value={edadMeses} 
                onFocus={(e) => e.target.select()}
                onChange={(e) => setEdadMeses(Math.min(11, Math.max(0, parseInt(e.target.value, 10) || 0)))}
              />
              <span className="label-inline">m</span>
            </div>
          ) : (
            <span className="detalle-val">{formatearEdad(edadAnios, edadMeses)}</span>
          )}
        </div>

        <div className="detalle-row">
          <span className="detalle-label">Peso Corporal</span>
          {editando ? (
            <div className="peso-input-wrapper">
              <input 
                type="number" 
                step="0.1"
                min="0"
                className="input-inline inline-number"
                placeholder="4.2"
                value={peso} 
                onFocus={(e) => e.target.select()}
                onChange={(e) => setPeso(e.target.value)}
              />
              <span className="label-inline">kg</span>
            </div>
          ) : (
            <span className="detalle-val">{peso ? `${peso} kg` : 'No registrado'}</span>
          )}
        </div>

        <div className="detalle-row-observacion">
          <span className="detalle-label">Motivo de Consulta / Diagnóstico</span>
          {editando ? (
            <textarea
              className="textarea-inline"
              rows="3"
              value={motivo}
              onFocus={(e) => e.target.select()}
              onChange={(e) => setMotivo(e.target.value)}
            />
          ) : (
            <p className="texto-motivo">{motivo || 'Control general sin observaciones.'}</p>
          )}
        </div>
      </div>

      <div className="back-actions-pro">
        {editando ? (
          <button 
            type="button" 
            className="btn-guardar-pro" 
            onClick={guardarCambios}
          >
            ✓ Guardar Cambios
          </button>
        ) : (
          <button 
            type="button" 
            className="btn-editar-pro" 
            onClick={() => setEditando(true)}
          >
            ✎ Modificar Todos los Datos
          </button>
        )}
      </div>
    </div>
  );

  if (esModal) {
    return (
      <div className="carnet-modal-pro">
        <div className="carnet-modal-cover">
          <img src={fotoActual} alt={nombre} />
          <div className="carnet-cover-gradient" />
          {editando && (
            <label className="btn-cambiar-foto-modal">
              📷 Cambiar Foto
              <input type="file" accept="image/*" onChange={handleFotoChange} style={{ display: 'none' }} />
            </label>
          )}
        </div>
        {contenidoFicha}
      </div>
    );
  }

  const frontContent = (
    <div className="card-front-content">
      <div className="card-image-wrapper">
        <img src={fotoActual} alt={nombre} className="card-avatar" />
        <div className="card-gradient-overlay" />
      </div>
      <div className="card-front-info">
        <h3 className="paciente-nombre">{nombre}</h3>
        <p className="paciente-numero">N° de Atención: <strong>{paciente.numero_atencion}</strong></p>
        <button 
          type="button"
          className="btn-ver-ficha"
          onClick={() => setEstaVolteada(true)}
        >
          Ver Ficha Clínica
        </button>
      </div>
    </div>
  );

  return (
    <div className="paciente-card-wrapper">
      <FlipCard
        front={frontContent}
        back={contenidoFicha}
        flipped={estaVolteada}
        flipOnClick={false}
        draggable={false}
        width={310}
        height={490}
        radius={22}
        background="#0c2d52"
        shadowColor="#071b32"
        shadowOpacity={0.35}
      />
    </div>
  );
}
