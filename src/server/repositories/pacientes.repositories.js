let pacientes = [
    {
        "nombre": "pegamento",
        "numero_atencion": 1,
        "especie": "perro",
        "edad": "12 años ",
        "raza": "mestizo",
        "diagnostico": "se cayo y se pego",
        "imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5K9bMLje8lyz6Kpk97MzwOZrh5PAlLXkZoj4-Q8DWKg&s=10"
    },
    
]


export async function getData(){
    return pacientes;
}

export async function insertData(paciente) {
  const siguiente = pacientes.reduce((max, p) => Math.max(max, p.numero_atencion), 0) + 1;
  const nuevo = { ...paciente, numero_atencion: siguiente };
  pacientes.push(nuevo);
  return nuevo;
}
