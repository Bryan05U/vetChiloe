import { useState, useEffect } from "react";
import GradientBorderButton from "../components/ui/GradientButton";
import FormularioPaciente from "../components/FormularioPaciente";
import Modal from "../components/ui/Modal";
import TablaPacientes from "../components/tablaPacientes";

export default function Pacientes() {
    const [isOpen, setIsOpen] = useState(false);
    const [pacientes, setPacientes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [errorCarga, setErrorCarga] = useState("");

    useEffect(() => {
        let activo = true;

        async function cargarPacientes() {
            try {
                const respuesta = await fetch("/api/pacientes");
                if (!respuesta.ok) {
                    throw new Error(`No se pudieron cargar los pacientes (${respuesta.status})`);
                }

                const datos = await respuesta.json();
                if (!Array.isArray(datos)) {
                    throw new Error("La respuesta del servidor no contiene una lista de pacientes");
                }

                if (activo) setPacientes(datos);
            } catch (error) {
                if (activo) setErrorCarga(error.message);
            } finally {
                if (activo) setCargando(false);
            }
        }

        cargarPacientes();
        return () => {
            activo = false;
        };
    }, []);

    async function agregarPaciente(nuevoPaciente) {
        const respuesta = await fetch("/api/pacientes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoPaciente),
        });
        const pacienteCreado = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(pacienteCreado.error || `No se pudo registrar el paciente (${respuesta.status})`);
        }

        setPacientes((listaActual) => [...listaActual, pacienteCreado]);
        setIsOpen(false);
    }

    return (
        <main className="flex flex-col h-full max-h-screen items-center p-6 gap-6">
            {cargando && <p className="text-white">Cargando pacientes...</p>}
            {errorCarga && <p role="alert" className="text-red-400">{errorCarga}</p>}
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