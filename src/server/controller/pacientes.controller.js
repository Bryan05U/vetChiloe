import { getDataPacientes, insertData } from "../service/server/pacientes.service";


export async function getPacientes(req, res) {
    
    try {
        const pacientes = await getDataPacientes(req); 
        res.status(200).json(pacientes)
    }
    catch (err) {
        res.status(500).json({error: err.message})
    }
}
export async function postPaciente (req, res) {
    try {
        const nuevoPaciente = await insertData(req.body);
        res.status(200).json(nuevoPaciente)
    }
    catch (err) {
        res.status(500).json({error: err.message})
    }

}

