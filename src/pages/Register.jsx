import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const [errorNombre, setErrorNombre] = useState("");
  const [errorTelefono, setErrorTelefono] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmar, setErrorConfirmar] = useState("");

  const handleChangeTelefono = (e) => {
    const val = e.target.value.replace(/\D/g, "");
    if (val.length <= 9) setTelefono(val);
  };

  const handleChangeNombre = (e) => {
    const val = e.target.value;
    if (/^[a-zA-ZÀ-ÿ\s]*$/.test(val)) setNombre(val);
  };

  const handleSubmit = () => {
    let valido = true;

    if (nombre.trim() === "") {
      setErrorNombre("Introduce tu nombre");
      valido = false;
    } else {
      setErrorNombre("");
    }

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

    if (password !== confirmar) {
      setErrorConfirmar("Las contraseñas no coinciden");
      valido = false;
    } else {
      setErrorConfirmar("");
    }

    if (valido) {
      localStorage.setItem("telefono", "+34" + telefono);
      navigate("/verificacion");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#120000] to-[#250000] flex flex-col justify-center items-center px-6">
      <div className="w-full max-w-sm bg-[#0a0a0a]/90 backdrop-blur-lg shadow-[0_0_20px_#ff000030] rounded-2xl p-6 text-center border border-[#ff000020]">
        
        <h1 className="text-3xl uppercase font-['Anton'] text-[#ff0000] mb-6">
          Registrarse
        </h1>

        <div className="space-y-4">
          {/* Nombre */}
          <input
            type="text"
            placeholder="Tu nombre"
            value={nombre}
            onChange={handleChangeNombre}
            className={`w-full bg-transparent border ${
              errorNombre ? "border-red-600" : "border-[#ff000055]"
            } text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500`}
          />
          {errorNombre && <p className="text-red-500 text-sm mt-1 text-left">{errorNombre}</p>}

          {/* Teléfono */}
          <div className={`flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 ${
              errorTelefono ? "border-red-600 ring-red-500" : "border-[#ff000055] focus-within:ring-red-500"
            }`}>
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
          {errorTelefono && <p className="text-red-500 text-sm mt-1 text-left">{errorTelefono}</p>}

          {/* Contraseña */}
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

          {/* Confirmar contraseña */}
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            className={`w-full bg-transparent border ${
              errorConfirmar ? "border-red-600" : "border-[#ff000055]"
            } text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-500`}
          />
          {errorConfirmar && <p className="text-red-500 text-sm mt-1 text-left">{errorConfirmar}</p>}

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition shadow-[0_0_10px_#ff000066]"
          >
            Crear cuenta
          </button>

          <p className="text-gray-400 text-sm mt-4">
            ¿Ya tienes cuenta? <Link to="/login" className="text-red-500 hover:underline">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
