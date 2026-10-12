"use client"
import { useState , useEffect } from "react";

const formatoHora = () =>
  new Date().toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

export default function Clock() {
  const [time, setTime] = useState(formatoHora);

  useEffect(() => {
    const intervalo = setInterval(() => setTime(formatoHora()), 60000);

    return () => clearInterval(intervalo);
  }, []);

  return <span className="font-bold text-8xl h-full">{time}</span>;
}