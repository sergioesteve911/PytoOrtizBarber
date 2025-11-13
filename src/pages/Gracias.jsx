import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import anuelAgradecimiento from "../assets/anuelAgradecimiento.mp3";

export default function Gracias() {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
  const ultimaReserva = reservas[reservas.length - 1];
  const nombre = localStorage.getItem("nombre") || "Invitado";
  const modificada = localStorage.getItem("modificada") === "true";

  const diasSemana = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

  if (!ultimaReserva) return <p className="text-white">No hay reservas.</p>;

  const fecha = new Date(ultimaReserva.año, ultimaReserva.mes - 1, ultimaReserva.dia);
  const extraBizum = ultimaReserva.pago === "Bizum" ? 1 : 0;
  const totalFinal = ultimaReserva.total + extraBizum;

  useEffect(() => {
    if (audioRef.current) audioRef.current.play();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black via-[#120000] to-[#250000] px-6">
      <audio ref={audioRef} src={anuelAgradecimiento} autoPlay />
      <div className="w-full max-w-sm bg-[#0a0a0a]/90 border border-[#ff000020] rounded-2xl p-6 shadow text-center">
        <h1 className="text-red-500 font-['Anton'] text-3xl mb-4">
          {modificada ? "¡Reserva modificada!" : `¡Muchas gracias, ${nombre}!`}
        </h1>
        <p className="text-white mb-2">
          Te esperamos el {diasSemana[fecha.getDay()]}, {ultimaReserva.dia} de {meses[fecha.getMonth()]} de {ultimaReserva.año} a las {ultimaReserva.hora}
        </p>
        <p className="text-white mb-2">Servicio: {ultimaReserva.servicio} ({ultimaReserva.total}€)</p>
        <p className="text-white mb-2">Método de pago: {ultimaReserva.pago || "No seleccionado"} {extraBizum > 0 && `(+${extraBizum}€)`}</p>
        {ultimaReserva.pago === "Bizum" && (
          <p className="text-red-500 font-semibold mt-1">Número Bizum: 639 25 58 24</p>
        )}
        <p className="text-white font-semibold mt-2">Total a pagar: {totalFinal}€</p>
        <div className="flex gap-3 mt-6">
          <button className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700" onClick={() => navigate("/calendario")}>
            Realizar nueva cita
          </button>
          <button className="flex-1 bg-[#0a0a0a]/80 text-red-500 border border-red-500 py-2 rounded-lg hover:bg-[#ff000011]" onClick={() => navigate("/gestion")}>
            Gestionar citas
          </button>
        </div>
      </div>
    </div>
  );
}
