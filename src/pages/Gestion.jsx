import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Gestion() {
  const navigate = useNavigate();
  const telefono = localStorage.getItem("telefono") || "";
  const [misReservas, setMisReservas] = useState([]);

  // Cargar reservas del teléfono
  useEffect(() => {
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    const filtradas = reservas.filter(r => r.telefono === telefono);
    setMisReservas(filtradas);
  }, [telefono]);

  const eliminarReserva = (reserva) => {
    const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    const nuevasReservas = reservas.filter(r =>
      !(
        r.dia === reserva.dia &&
        r.mes === reserva.mes &&
        r.año === reserva.año &&
        r.hora === reserva.hora &&
        r.servicio === reserva.servicio &&
        r.telefono === reserva.telefono
      )
    );
    localStorage.setItem("reservas", JSON.stringify(nuevasReservas));
    setMisReservas(nuevasReservas.filter(r => r.telefono === telefono));
  };

  const modificarReserva = (reserva) => {
    localStorage.setItem("reservaModificar", JSON.stringify(reserva));
    navigate("/calendario");
  };

  if (!misReservas.length) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black via-[#120000] to-[#250000] px-6">
        <h1 className="text-red-500 font-['Anton'] text-3xl mb-4">Mis citas</h1>
        <p className="text-white mb-4">No tienes citas registradas con este número.</p>
        <button
          className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
          onClick={() => navigate("/calendario")}
        >
          Realizar nueva cita
        </button>
      </div>
    );
  }

  const diasSemana = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
  const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-black via-[#120000] to-[#250000] px-6 py-6">
      <h1 className="text-red-500 font-['Anton'] text-3xl mb-6">Mis citas</h1>

      <div className="w-full max-w-md flex flex-col gap-6">
        {misReservas.map((reserva, idx) => {
          const fecha = new Date(reserva.año, reserva.mes - 1, reserva.dia);

          return (
            <div key={idx} className="bg-[#0a0a0a]/90 backdrop-blur-lg border border-[#ff000020] rounded-2xl p-4 shadow-[0_0_20px_#ff000030] flex flex-col gap-2">
              <p className="text-white font-semibold text-lg">Servicio: {reserva.servicio} ({reserva.total}€)</p>
              <p className="text-white text-sm">Fecha: {diasSemana[fecha.getDay()]}, {reserva.dia} de {meses[fecha.getMonth()]} de {reserva.año}</p>
              <p className="text-white text-sm">Hora: {reserva.hora}</p>
              <p className="text-white text-sm">
                Pago: {reserva.pago || "No seleccionado"}{reserva.pago === "Bizum" ? " (+1€)" : ""}
              </p>
              {reserva.pago === "Bizum" && (
                <p className="text-white text-sm">Número Bizum: 639 25 58 24</p>
              )}

              <div className="flex gap-3 mt-3">
                <button
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                  onClick={() => modificarReserva(reserva)}
                >
                  Modificar
                </button>
                <button
                  className="flex-1 bg-[#0a0a0a]/80 text-red-500 border border-red-500 py-2 rounded-lg hover:bg-[#ff000011] transition"
                  onClick={() => eliminarReserva(reserva)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
          onClick={() => navigate("/calendario")}
        >
          Realizar nueva cita
        </button>
      </div>
    </div>
  );
}
