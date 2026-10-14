let pacientesBD = [
  { 
    id: 1, 
    nombre: 'Charkicito', 
    especie: 'Canino', 
    numero_atencion: '2026-A1',
    foto: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop'
  },
  { 
    id: 2, 
    nombre: 'Mercedes', 
    especie: 'Felino', 
    numero_atencion: '2026-B2',
    foto: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop'
  }
];

export const obtenerTodos = async () => {
  return pacientesBD;
};

export const guardar = async (nuevoPaciente) => {
  pacientesBD.push(nuevoPaciente);
  return nuevoPaciente;
};