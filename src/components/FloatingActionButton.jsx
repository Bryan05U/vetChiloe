// src/components/FloatingActionButton.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './FloatingActionButton.css';

function FloatingActionButton({ isOpen, onOpen, onClose, children }) {
  return (
    <>
      {/* Botón flotante (+) abajo a la derecha */}
      <button 
        type="button"
        className="fab-button"
        onClick={onOpen}
        title="Nuevo Paciente"
        aria-label="Agregar nuevo paciente"
      >
        +
      </button>

      {/* Usamos un Portal de React para mandar la ventana modal directo a la raíz del HTML */}
      {isOpen && ReactDOM.createPortal(
        <div className="fab-modal-overlay" onClick={onClose}>
          <div className="fab-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="fab-btn-close" onClick={onClose} title="Cerrar">
              ✕
            </button>
            {children}
          </div>
        </div>,
        document.body // Se renderiza fuera del app-container para no verse afectado por el scroll o las secciones
      )}
    </>
  );
}

export default FloatingActionButton;