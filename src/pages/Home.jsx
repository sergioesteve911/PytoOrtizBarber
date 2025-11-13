import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleChangeTelefono = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length <= 9) setTelefono(val);
  };

  const handleEntrarInvitado = () => {
  if (nombre.trim() && telefono.length === 9) {
    // Guardar nombre y teléfono para uso posterior
    localStorage.setItem("nombre", nombre.trim());
    localStorage.setItem("telefono", "+34" + telefono);
    
    navigate("/verificacion");
  } else {
    alert("Introduce nombre y número válido");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#120000] to-[#250000] flex flex-col justify-center items-center px-6">
      <div className="w-full max-w-sm bg-[#0a0a0a]/90 backdrop-blur-lg shadow-[0_0_20px_#ff000030] rounded-2xl p-6 text-center border border-[#ff000020]">
        <h1 className="text-5xl uppercase tracking-wide mb-3 font-['Anton'] animate-neon" style={{ color: "#000", WebkitTextStroke: "1.5px #ff0000" }}>
          Ortiz Barber
        </h1>
        <p className="text-gray-400 text-sm mb-6 uppercase tracking-wide">
          Reserva tu estilo, sin espera
        </p>

        <input
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, ""))}
          className="w-full bg-transparent border border-[#ff000055] text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500"
        />
        <div className="flex items-center border border-[#ff000055] rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-red-500 mt-2">
          <span className="text-gray-400 select-none mr-2">+34</span>
          <input
            type="tel"
            placeholder="Número de teléfono"
            value={telefono}
            onChange={handleChangeTelefono}
            className="flex-1 bg-transparent text-white outline-none placeholder-gray-500"
            inputMode="numeric"
            pattern="[0-9]*"
          />
        </div>

        <button
          type="button"
          onClick={handleEntrarInvitado}
          className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition shadow-[0_0_10px_#ff000066] mt-4"
        >
          Entrar como invitado
        </button>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-[#ff000044]"></div>
          <span className="mx-3 text-gray-500 text-sm">o</span>
          <div className="flex-1 h-px bg-[#ff000044]"></div>
        </div>

        <div className="flex justify-between gap-3">
          <Link to="/register" className="flex-1 bg-[#ff0000] text-white font-semibold py-2 rounded-lg hover:bg-[#cc0000] transition text-center">
            Registrarse
          </Link>
          <Link to="/login" className="flex-1 border border-[#ff0000] text-[#ff0000] font-semibold py-2 rounded-lg hover:bg-[#ff000011] transition text-center">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
