import { useState } from "react";

const imagenesPorEspecie = {
    perro: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5K9bMLje8lyz6Kpk97MzwOZrh5PAlLXkZoj4-Q8DWKg&s=10",
    gato: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_tGFXnJruodcIwFf8xFENi3SiQjodb1F1M-w-gk180w&s=10",
};

const labelClass = "flex flex-col gap-1.5 text-sm text-[#CFCFCF] tracking-wide";
const inputClass =
    "w-full rounded-[10px] border border-[#4A4A4A] bg-[#1E1E1E] px-3 py-2.5 text-white placeholder:text-[#8A8A8A] outline-none transition-colors duration-200 focus:border-white hover:border-[#8A8A8A]";

const formatearEdad = ({ anos, meses }) => {
    const partes = [];
    const cantidadAnos = Number(anos);
    const cantidadMeses = Number(meses);

    if (cantidadAnos > 0) {
        partes.push(`${cantidadAnos} ${cantidadAnos === 1 ? "año" : "años"}`);
    }
    if (cantidadMeses > 0) {
        partes.push(`${cantidadMeses} ${cantidadMeses === 1 ? "mes" : "meses"}`);
    }

    return partes.join(" y ") || "0 meses";
};

const FormularioPaciente = ({ onSubmit, indexActual }) => {
    const [num, setNum] = useState(indexActual);

    const [paciente, setPaciente] = useState({
        nombre: "",
        especie: "",
        numero_atencion: num,
        edad: { anos: "", meses: "" },
        raza: "",
        imagen: "",
        diagnostico: "",
    });

    const handleChange = (event) => {
        const { name, value, type } = event.target;
        if (type === "number" && value !== "" && Number(value) < 0) {
            return;
        }

        // Si el campo pertenece a la edad (anos o meses), actualizamos el objeto anidado
        if (name === "anos" || name === "meses") {
            setPaciente((pacienteActual) => ({
                ...pacienteActual,
                edad: {
                    ...pacienteActual.edad,
                    [name]: value,
                },
            }));
        } else {
            // Para los demás campos normales
            setPaciente((pacienteActual) => ({
                ...pacienteActual,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const especie = paciente.especie.trim().toLowerCase();
        onSubmit({
            ...paciente,
            numero_atencion: num,
            edad: formatearEdad(paciente.edad),
            imagen: imagenesPorEspecie[especie] ?? paciente.imagen,
        });
        const siguienteNum = num + 1;
        setNum(siguienteNum);

        setPaciente({
            nombre: "",
            especie: "",
            numero_atencion: siguienteNum,
            edad: { anos: "", meses: "" },
            raza: "",
            diagnostico: "",
            imagen: ""
        });
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

                {/* Nombre del paciente */}
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
                        pattern=".*\S.*"
                        title="Este campo no puede estar vacío"
                    />
                </label>

                {/* Especie */}
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

                {/* Raza */}
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
                        pattern=".*\S.*"
                        title="Este campo no puede estar vacío"
                    />
                </label>

                {/* Edad (con pseudo-sección) */}
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
                                min="0"
                                max="35"
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
                                min="0"
                                max="12"
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                </div>

                {/* Diagnóstico */}
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
                        pattern=".*\S.*"
                        title="Este campo no puede estar vacío"
                    />
                </label>
            </fieldset>

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