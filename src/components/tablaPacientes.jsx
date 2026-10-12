import VerFicha from "./verFichaPaciente";
import { Badge } from "./ui/badge";

const TablaPacientes = ({ pacientes}) => {
    return (
        <div id="tabla" className=" flex flex-col items-center justify-center w-5/6 h-96 overflow-auto p-10 shadow-2xl bg-[#1E1E1E] rounded-2xl ">
                <table className="w-full border-collapse text-left text-white">
                    <thead>
                        <tr className="border-b border-[#4A4A4A] text-sm text-[#CFCFCF]">
                            <th className="px-4 py-3" scope="col">N.º atención</th>
                            <th className="px-4 py-3" scope="col">Paciente</th>
                            <th className="px-4 py-3" scope="col">Especie</th>
                            <th className="px-4 py-3" scope="col">Edad</th>
                            <th className="px-4 py-3" scope="col">Raza</th>
                            <th className="px-4 py-3" scope="col">Diagnostico</th>
                            <th className="px-4 py-3" scope="col">Carnet</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pacientes.map((paciente, index) => (
                            <tr
                                key={paciente.id ?? `${paciente.numero_atencion}-${index}`}
                                className="border-b border-[#4A4A4A]"
                            >
                                <td className="px-4 py-3">{paciente.numero_atencion}</td>
                                <td className="px-4 py-3">{paciente.nombre}</td>
                                <td className="px-4 py-3"><Badge variant={paciente.especie}>{paciente.especie}</Badge></td>
                                <td className="px-4 py-3">{paciente.edad}</td>
                                <td className="px-4 py-3">{paciente.raza}</td>
                                <td className="px-4 py-3">{paciente.diagnostico}</td>
                                <td className="px-4 py-3">
                                    <VerFicha paciente={paciente} />
                                </td>
                            </tr>
                            

                        ))}
                    </tbody>
                </table>
            </div>
    );
}

export default TablaPacientes;