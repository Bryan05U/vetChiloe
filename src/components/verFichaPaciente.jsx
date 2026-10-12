import { useState } from "react";
import FichaClinica from "./FichaClinica";
import Modal from "./ui/Modal";

const VerFicha = ({ paciente }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="text-sm font-medium text-white underline hover:text-[#CFCFCF]"
            >
                Ver Carnet
            </button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                className="m-auto border-0 bg-transparent p-0 backdrop:bg-black/60"
            >
                <FichaClinica paciente={paciente} />
            </Modal>
        </>
    );
};

export default VerFicha;