// pages/Resumen.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Resumen() {
  const navigate = useNavigate();
  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
  const ultimaReserva = reservas[reservas.length - 1];

  const formasPago = [
    { nombre: "Efectivo", extra: 0 },
    { nombre: "Bizum", extra: 1 }
  ];

  // Inicializar selectedPayment con lo guardado o vacío
  const [selectedPayment, setSelectedPayment] = useState(ultimaReserva?.pago || "");

  if (!ultimaReserva) return <p className="text-white">No hay reservas.</p>;

  const diasSemana = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  const fecha = new Date(ultimaReserva.año, ultimaReserva.mes-1, ultimaReserva.dia);

  // Calcular total con extra según la forma de pago
  const totalConPago = ultimaReserva.total + (formasPago.find(fp => fp.nombre === selectedPayment)?.extra || 0);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black via-[#120000] to-[#250000] px-6">
      <div className="w-full max-w-sm bg-[#0a0a0a]/90 backdrop-blur-lg border border-[#ff000020] rounded-2xl p-6 shadow-[0_0_20px_#ff000030] text-center">
        <h1 className="text-red-500 font-['Anton'] text-2xl mb-4">Resumen de tu reserva</h1>

        <p className="text-white mb-2">
          Fecha: {diasSemana[fecha.getDay()]}, {ultimaReserva.dia} de {meses[fecha.getMonth()]} de {ultimaReserva.año}
        </p>
        <p className="text-white mb-2">Hora: {ultimaReserva.hora}</p>
        <p className="text-white mb-2">Servicio: {ultimaReserva.servicio} ({ultimaReserva.total}€)</p>

        {/* Selección de forma de pago */}
        <fieldset className="mb-4 mt-4 text-left">
          <legend className="text-white font-semibold mb-2">Forma de pago:</legend>
          <div className="flex flex-col gap-2">
            {formasPago.map((f,i)=>(
              <label key={i} className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg border ${
                selectedPayment === f.nombre ? "border-red-600 bg-[#ff000022]" : "border-[#ff000055] hover:bg-[#ff000011]"
              }`}>
                <input
                  type="radio"
                  name="pago"
                  checked={selectedPayment === f.nombre}
                  onChange={() => {
                    setSelectedPayment(f.nombre);
                    // Guardar temporalmente en la última reserva incluyendo extra
                    const reservasActualizadas = [...reservas];
                    reservasActualizadas[reservasActualizadas.length - 1] = {
                      ...ultimaReserva,
                      pago: f.nombre,
                      totalConPago: ultimaReserva.total + f.extra
                    };
                    localStorage.setItem("reservas", JSON.stringify(reservasActualizadas));
                  }}
                  className="accent-red-600"
                />
                <span className="text-white flex-1">{f.nombre}</span>
                {f.extra > 0 && <span className="text-red-500 font-semibold">+{f.extra}€</span>}
              </label>
            ))}
          </div>
        </fieldset>

        <p className="text-white font-semibold mb-4">Total: {totalConPago}€</p>

        {/* Botones Confirmar y Modificar */}
        <div className="flex gap-3">
          <button
            className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedPayment}
            onClick={() => navigate("/gracias")}
          >
            Confirmar
          </button>
          <button
            className="flex-1 bg-[#0a0a0a]/80 text-red-500 border border-red-500 py-2 rounded-lg hover:bg-[#ff000011] transition"
            onClick={() => navigate("/calendario")}
          >
            Modificar
          </button>
        </div>
      </div>
    </div>
  );
}
