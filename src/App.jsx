import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { TablaPacientes } from './components/TablaPacientes';
import { PacienteCard } from './components/PacienteCard';
import { FormularioPaciente } from './components/FormularioPaciente';
import './App.css';

function LogoAegis() {
  return (
    <svg width="34" height="34" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="aegisGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#114173" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>
      <path
        d="M50 8 L82 22 C82 58 50 88 50 88 C50 88 18 58 18 22 Z"
        fill="url(#aegisGrad)"
      />
      <path
        d="M44 32 H56 V44 H68 V56 H56 V68 H44 V56 H32 V44 H44 Z"
        fill="#ffffff"
      />
    </svg>
  );
}

const PACIENTES_INICIALES = [
  {
    id: 1,
    nombre: 'Atenea',
    numero_atencion: '2026-A1',
    especie: 'Felino',
    raza: 'Común Europeo / Mestizo',
    edad: '2 años y 4 meses',
    edadAnios: 2,
    edadMeses: 4,
    peso: '3.8 kg',
    nombreDueno: 'Vicente Garín',
    rutDueno: '21.345.678-9',
    foto: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop',
    motivo: 'Control de vacunas y ecografía preventiva.'
  },
  {
    id: 2,
    nombre: 'Afrodita',
    numero_atencion: '2026-A2',
    especie: 'Felino',
    raza: 'Siamés',
    edad: '1 año y 8 meses',
    edadAnios: 1,
    edadMeses: 8,
    peso: '3.2 kg',
    nombreDueno: 'Vicente Garín',
    rutDueno: '21.345.678-9',
    foto: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=500&auto=format&fit=crop',
    motivo: 'Limpieza bucal y desparasitación periódica.'
  },
  {
    id: 3,
    nombre: 'Goliath',
    numero_atencion: '2026-A3',
    especie: 'Canino',
    raza: 'Quiltro / Mestizo',
    edad: '4 años',
    edadAnios: 4,
    edadMeses: 0,
    peso: '32 kg',
    nombreDueno: 'Vicente Garín',
    rutDueno: '21.345.678-9',
    foto: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop',
    motivo: 'Revisión traumatológica y refuerzo óseo.'
  }
];

function App() {
  const [pacientes, setPacientes] = useState(() => {
    const guardados = localStorage.getItem('aegisvet_pacientes');
    if (guardados) {
      try {
        return JSON.parse(guardados);
      } catch (e) {
        return PACIENTES_INICIALES;
      }
    }
    return PACIENTES_INICIALES;
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [pacienteCarnet, setPacienteCarnet] = useState(null);
  const [pacienteAEliminar, setPacienteAEliminar] = useState(null);

  useEffect(() => {
    localStorage.setItem('aegisvet_pacientes', JSON.stringify(pacientes));
  }, [pacientes]);

  const totalFelinos = pacientes.filter(p => p.especie?.toLowerCase().includes('felino')).length;
  const totalCaninos = pacientes.filter(p => p.especie?.toLowerCase().includes('canino')).length;

  const handleAgregarPaciente = (nuevo) => {
    const correlativo = `2026-A${pacientes.length + 1}`;
    const pacienteConCorrelativo = {
      ...nuevo,
      numero_atencion: correlativo
    };

    setPacientes((prev) => [pacienteConCorrelativo, ...prev]);
    setMostrarFormulario(false);
  };

  const handleActualizarPaciente = (actualizado) => {
    setPacientes((prev) =>
      prev.map((p) => (p.id === actualizado.id ? actualizado : p))
    );
    if (pacienteCarnet && pacienteCarnet.id === actualizado.id) {
      setPacienteCarnet(actualizado);
    }
  };

  const confirmarEliminacion = () => {
    if (pacienteAEliminar) {
      setPacientes((prev) => prev.filter((p) => p.id !== pacienteAEliminar.id));
      if (pacienteCarnet && pacienteCarnet.id === pacienteAEliminar.id) {
        setPacienteCarnet(null);
      }
      setPacienteAEliminar(null);
    }
  };

  const handleExportarExcel = () => {
    if (pacientes.length === 0) {
      alert('No hay pacientes para exportar.');
      return;
    }

    const datosParaExcel = pacientes.map((p, index) => ({
      'N°': index + 1,
      'N° Atención': p.numero_atencion,
      'Nombre Mascota': p.nombre,
      'Especie': p.especie,
      'Raza': p.raza || 'Mestizo',
      'Edad': p.edad,
      'Peso': p.peso || 'No registrado',
      'Tutor / Dueño': p.nombreDueno || 'No informado',
      'RUT Tutor': p.rutDueno || 'No informado',
      'Diagnóstico / Motivo': p.motivo || 'Sin observaciones'
    }));

    const hoja = XLSX.utils.json_to_sheet(datosParaExcel);
    hoja['!cols'] = [
      { wch: 5 }, { wch: 14 }, { wch: 18 }, { wch: 12 }, { wch: 22 },
      { wch: 18 }, { wch: 12 }, { wch: 20 }, { wch: 15 }, { wch: 35 }
    ];

    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, 'Pacientes_AegisVet');
    XLSX.writeFile(libro, `AegisVet_Carnets_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="contenedor-principal">
      <header className="cabecera-aegis">
        <div className="cabecera-inner">
          <div className="marca-aegis">
            <LogoAegis />
            <div>
              <h1>Aegis<span>Vet.</span></h1>
              <p>Protección & Gestión Clínica</p>
            </div>
          </div>

          <div className="cabecera-controles">
            <div className="chips-resumen">
              <span className="chip-stat"><strong>{pacientes.length}</strong> Carnets</span>
              <span className="chip-stat"><strong>{totalFelinos}</strong> Felinos</span>
              <span className="chip-stat"><strong>{totalCaninos}</strong> Caninos</span>
            </div>

            <button
              type="button"
              className="btn-excel"
              onClick={handleExportarExcel}
            >
              📊 Exportar Excel
            </button>
          </div>
        </div>
      </header>

      <main className="seccion-central">
        <div className="seccion-header">
          <div>
            <h2>Carnets Clínicos</h2>
            <p>Historial médico y credencial sanitaria de cada mascota.</p>
          </div>
        </div>

        <TablaPacientes
          pacientes={pacientes}
          onVerFicha={(p) => setPacienteCarnet(p)}
          onSolicitarEliminar={(p) => setPacienteAEliminar(p)}
        />
      </main>

      {/* FAB Botón Flotante */}
      <button
        type="button"
        className="fab-registrar"
        onClick={() => setMostrarFormulario(true)}
        title="Registrar carnet clínico"
        aria-label="Registrar carnet clínico"
      >
        <span className="fab-icono">+</span>
      </button>

      {/* Modal Formulario */}
      {mostrarFormulario && (
        <div className="modal-backdrop" onClick={() => setMostrarFormulario(false)}>
          <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="btn-cerrar-sheet"
              onClick={() => setMostrarFormulario(false)}
            >
              ✕
            </button>
            <FormularioPaciente
              onAgregarPaciente={handleAgregarPaciente}
              onCancelar={() => setMostrarFormulario(false)}
            />
          </div>
        </div>
      )}

      {/* Modal Carnet Clínico */}
      {pacienteCarnet && (
        <div className="modal-backdrop" onClick={() => setPacienteCarnet(null)}>
          <div className="modal-carnet-container" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="btn-cerrar-carnet"
              onClick={() => setPacienteCarnet(null)}
            >
              ✕ Cerrar Carnet
            </button>
            <PacienteCard
              paciente={pacienteCarnet}
              onActualizarPaciente={handleActualizarPaciente}
              esModal={true}
            />
          </div>
        </div>
      )}

      {/* Modal Eliminar */}
      {pacienteAEliminar && (
        <div className="modal-backdrop" onClick={() => setPacienteAEliminar(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon-badge">🗑️</div>
            <h3>Eliminar Ficha Médica</h3>
            <p>
              ¿Confirmas eliminar permanentemente la ficha clínica de <strong>{pacienteAEliminar.nombre}</strong> ({pacienteAEliminar.numero_atencion})? Esta acción no se puede deshacer.
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="btn-modal-cancelar"
                onClick={() => setPacienteAEliminar(null)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn-modal-confirmar"
                onClick={confirmarEliminacion}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
