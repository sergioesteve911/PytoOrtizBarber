// pages/Inicio.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Inicio() {
  const navigate = useNavigate();
  const [telefono, setTelefono] = useState(localStorage.getItem("telefono") || "");
  const [nombre, setNombre] = useState(localStorage.getItem("nombre") || "Invitado");
  const [tieneReservas, setTieneReservas] = useState(false);

  useEffect(() => {
    if (telefono) {
      const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
      // Detectar si hay reservas para este teléfono
      const reservasUsuario = reservas.filter(r => r.telefono === telefono);
      setTieneReservas(reservasUsuario.length > 0);
    }
  }, [telefono]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black via-[#120000] to-[#250000] px-6">
      <div className="w-full max-w-sm bg-[#0a0a0a]/90 backdrop-blur-lg border border-[#ff000020] rounded-2xl p-6 shadow-[0_0_20px_#ff000030] text-center">
        <h1 className="text-red-500 font-['Anton'] text-3xl mb-4">¡Hola, {nombre}!</h1>
        <p className="text-white mb-6">
          Bienvenido de nuevo. ¿Qué deseas hacer?
        </p>

        <div className="flex gap-3 flex-col">
          <button
            className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition"
            onClick={() => navigate("/calendario")}
          >
            Realizar nueva cita
          </button>

          {tieneReservas && (
            <button
              className="w-full bg-[#0a0a0a]/80 text-red-500 border border-red-500 py-2 rounded-lg hover:bg-[#ff000011] transition"
              onClick={() => navigate("/resumen")}
            >
              Gestionar citas
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
