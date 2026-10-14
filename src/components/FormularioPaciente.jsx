import { useState } from "react";

const labelClass = "flex flex-col gap-1.5 text-sm text-[#CFCFCF] tracking-wide";
const inputClass =
    "w-full rounded-[10px] border border-[#4A4A4A] bg-[#1E1E1E] px-3 py-2.5 text-white placeholder:text-[#8A8A8A] outline-none transition-colors duration-200 focus:border-white hover:border-[#8A8A8A]";

const estadoInicial = {
    nombre: "",
    especie: "",
    edad: { anos: "", meses: "" },
    raza: "",
    diagnostico: "",
};

const FormularioPaciente = ({ onSubmit }) => {
    const [paciente, setPaciente] = useState(estadoInicial);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "anos" || name === "meses") {
            setPaciente((actual) => ({
                ...actual,
                edad: { ...actual.edad, [name]: value },
            }));
        } else {
            setPaciente((actual) => ({ ...actual, [name]: value }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        try {
            await onSubmit(paciente);
            setPaciente(estadoInicial);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form
            className="flex flex-col w-80 gap-6 rounded-[14px] border border-[#4A4A4A] bg-[#0f0f0f] p-6 text-white shadow-2xl shadow-black/60"
            onSubmit={handleSubmit}
        >
            <fieldset className="m-0 flex flex-col gap-4 border-0 p-0">
                <legend className="mb-4 w-full border-b border-[#4A4A4A] pb-3 text-xl font-bold tracking-wide text-white">
                    Paciente
                </legend>

                <label className={labelClass}>
                    Nombre del paciente
                    <input
                        className={inputClass}
                        type="text"
                        name="nombre"
                        placeholder="Ej: Firulais"
                        value={paciente.nombre}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label className={labelClass}>
                    Especie
                    <select
                        className={`${inputClass} cursor-pointer`}
                        name="especie"
                        value={paciente.especie}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Selecciona una especie</option>
                        <option value="perro">perro</option>
                        <option value="gato">gato</option>
                    </select>
                </label>

                <label className={labelClass}>
                    Raza
                    <input
                        className={inputClass}
                        type="text"
                        name="raza"
                        placeholder="Ej: Mestizo"
                        value={paciente.raza}
                        onChange={handleChange}
                        required
                    />
                </label>

                <div className="flex flex-col gap-1.5">
                    <span className="text-sm text-[#CFCFCF] tracking-wide">Edad</span>
                    <div className="grid grid-cols-2 gap-3 rounded-[10px] border border-[#4A4A4A] bg-[#141414] p-3">
                        <label className="flex flex-col gap-1 text-xs text-[#8A8A8A]">
                            Años
                            <input
                                className={inputClass}
                                type="number"
                                name="anos"
                                placeholder="Ej: 3"
                                value={paciente.edad.anos}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label className="flex flex-col gap-1 text-xs text-[#8A8A8A]">
                            Meses
                            <input
                                className={inputClass}
                                type="number"
                                name="meses"
                                placeholder="Ej: 6"
                                value={paciente.edad.meses}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                </div>

                <label className={labelClass}>
                    Diagnóstico
                    <input
                        className={inputClass}
                        type="text"
                        name="diagnostico"
                        placeholder="Describe brevemente"
                        value={paciente.diagnostico}
                        onChange={handleChange}
                        required
                    />
                </label>
            </fieldset>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
                type="submit"
                className="cursor-pointer rounded-[10px] bg-white px-4 py-3 font-semibold tracking-wide text-[#0f0f0f] transition-colors duration-200 hover:bg-[#CFCFCF] active:bg-[#8A8A8A]"
            >
                Registrar paciente
            </button>
        </form>
    );
};

export default FormularioPaciente;