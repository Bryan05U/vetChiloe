import Sidebar from "../components/ux/SideBar";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

export default function Layout() {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="flex h-screen w-full overflow-hidden font-sans bg-[#232A31]">
      <aside className="w-1/6 shrink-0">
        <Sidebar />
      </aside>

      <div className="flex flex-col flex-1 min-w-0 min-h-0 pt-8">
        <header className="flex flex-col shrink-0">
          <h1 className="text-3xl">
            Sistema de Información - Veterinaria Chiloé
          </h1>
          <p>Plataforma de control y seguimiento de pacientes</p>
        </header>

        <main className="relative flex-1 min-h-0 mt-12 overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={location.pathname}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="h-full w-full overflow-y-auto"
            >
              {outlet}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}