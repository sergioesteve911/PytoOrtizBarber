import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Verificacion() {
  const navigate = useNavigate();
  const telefono = localStorage.getItem("telefono");
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const [contador, setContador] = useState(60);
  const [reenviando, setReenviando] = useState(false);

  const codigoCorrecto = "11111";

  useEffect(() => {
    if (contador > 0) {
      const timer = setTimeout(() => setContador(contador - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [contador]);

  const handleSubmit = () => {
    if (codigo === codigoCorrecto) {
      navigate("/calendario");
    } else {
      setError("Código incorrecto");
      setCodigo("");
      setTimeout(() => setError(""), 2000);
    }
  };

  const handleReenviar = () => {
    setReenviando(true);
    setError("Enviando nuevo código...");
    setTimeout(() => {
      setContador(60);
      setReenviando(false);
      setError("Nuevo código enviado correctamente ✅");
      setTimeout(() => setError(""), 2500);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black via-[#120000] to-[#250000] px-6">
      <div className="w-full max-w-sm bg-[#0a0a0a]/90 backdrop-blur-lg border border-[#ff000020] rounded-2xl p-6 shadow-[0_0_20px_#ff000030] text-center">
        <h2 className="text-3xl font-['Anton'] mb-6 text-[#ff0000] uppercase">
          Código de verificación
        </h2>
        <p className="text-gray-400 text-sm mb-4">
          Se ha enviado un código a {telefono}
        </p>
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ""))}
          placeholder="•••••"
          maxLength={5}
          inputMode="numeric"
          pattern="[0-9]*"
          className="w-full text-center text-3xl tracking-[0.3em] font-semibold bg-transparent border border-[#ff000055] rounded-lg py-3 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 text-white mb-2"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button
          className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition shadow-[0_0_10px_#ff000066]"
          onClick={handleSubmit}
        >
          Verificar
        </button>

        {/* Botón de reenviar código */}
        <div className="mt-4">
          <button
            onClick={handleReenviar}
            disabled={contador > 0 || reenviando}
            className={`text-sm font-semibold transition-all duration-300 ${
              contador > 0 || reenviando
                ? "text-gray-500 cursor-not-allowed"
                : "text-red-500 hover:text-red-600"
            }`}
          >
            {reenviando
              ? "Reenviando..."
              : contador > 0
              ? `Reenviar código (${contador}s)`
              : "Reenviar código"}
          </button>
        </div>
      </div>
    </div>
  );
}
