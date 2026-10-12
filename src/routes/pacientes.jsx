import { useState, useEffect } from "react";
import GradientBorderButton from "../components/ui/GradientButton";
import FormularioPaciente from "../components/FormularioPaciente";
import Modal from "../components/ui/Modal";
import pacientesIniciales from "../data/pacientes.json"; // Tu JSON inicial
import TablaPacientes from "../components/tablaPacientes";

export default function Pacientes() {
    const [isOpen, setIsOpen] = useState(false);

    // 1. Cargamos los datos: si hay algo en localStorage lo usa, si no, carga tu archivo json inicial
    const [pacientes, setPacientes] = useState(() => {
        const guardados = localStorage.getItem("pacientes_vet");
        return guardados ? JSON.parse(guardados) : pacientesIniciales;
    });

    useEffect(() => {
        localStorage.setItem("pacientes_vet", JSON.stringify(pacientes))
    }, [pacientes]);

    function agregarPaciente(nuevoPaciente) {
        setIsOpen(false);
        setPacientes((listaActual) => [
            ...listaActual,
            { 
                ...nuevoPaciente, 
                id: crypto.randomUUID(),
                numero_atencion: listaActual.length + 1 
            },
        ]);
    }

    return (
        <main className="flex flex-col h-full max-h-screen items-center p-6 gap-6">
            <TablaPacientes pacientes={pacientes} />

        <div id="container-button" className="fixed bottom-6 right-6 z-10"> 
            <GradientBorderButton
                onPress={() => setIsOpen(true)}
                type="action"
                buttonText="Ingresar Pacientes"
            />
        </div>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                className="m-auto border-0 bg-transparent p-0 backdrop:bg-black/60"
            >
                <FormularioPaciente
                    onSubmit={agregarPaciente}
                />
            </Modal>
        </main>
    );
}