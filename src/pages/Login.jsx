import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [errorTelefono, setErrorTelefono] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleChangeTelefono = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length <= 9) setTelefono(val);
  };

  const handleSubmit = () => {
    let valido = true;

    if (telefono.length !== 9) {
      setErrorTelefono("Número no válido");
      valido = false;
    } else {
      setErrorTelefono("");
    }

    if (password.length < 8) {
      setErrorPassword("La contraseña debe tener al menos 8 caracteres");
      valido = false;
    } else {
      setErrorPassword("");
    }

    if (valido) {
      console.log("✅ Iniciando sesión con:", "+34" + telefono);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#120000] to-[#250000] flex flex-col justify-center items-center px-6">
      <div className="w-full max-w-sm bg-[#0a0a0a]/90 backdrop-blur-lg shadow-[0_0_20px_#ff000030] rounded-2xl p-6 text-center border border-[#ff000020]">
        
        <h1 className="text-3xl uppercase font-['Anton'] text-[#ff0000] mb-6">
          Iniciar sesión
        </h1>

        <div className="space-y-4">
          {/* Teléfono */}
          <div className="flex flex-col">
            <div
              className={`flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 ${
                errorTelefono ? "border-red-600 ring-red-500" : "border-[#ff000055] focus-within:ring-red-500"
              }`}
            >
              <span className="text-gray-400 select-none mr-2">+34</span>
              <input
                type="tel"
                placeholder="Número de teléfono"
                value={telefono}
                onChange={handleChangeTelefono}
                className="flex-1 bg-transparent text-white outline-none placeholder-gray-500"
              />
            </div>
            {errorTelefono && <p className="text-red-500 text-sm mt-1 text-left">{errorTelefono}</p>}
          </div>

          {/* Contraseña */}
          <div className="flex flex-col">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full bg-transparent border ${
                errorPassword ? "border-red-600" : "border-[#ff000055]"
              } text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500`}
            />
            {errorPassword && <p className="text-red-500 text-sm mt-1 text-left">{errorPassword}</p>}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition shadow-[0_0_10px_#ff000066]"
          >
            Entrar
          </button>

          <p className="text-gray-400 text-sm mt-4">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="text-red-500 hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
