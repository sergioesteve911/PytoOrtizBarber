import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Simulación de citas ocupadas
const citasOcupadasSimuladas = {
  2: ["09:00","09:40","10:20","11:00"],
  3: ["09:00","09:40","10:20","11:00","11:40","12:20","16:00","16:40","17:20","18:00","18:40","19:20","20:00","20:40"],
};

const servicios = [
  { nombre: "Corte", precio: 8 },
  { nombre: "Corte + Barba", precio: 10 }
];

export default function Calendario() {
  const navigate = useNavigate();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);
  const [availableHours, setAvailableHours] = useState([]);
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [reservas, setReservas] = useState(JSON.parse(localStorage.getItem("reservas")) || []);
  const servicioRef = useRef(null);

  const nombre = localStorage.getItem("nombre") || "";
  const telefono = localStorage.getItem("telefono") || "";

  // 🟡 Ver si se viene desde "Modificar"
  const reservaModificar = JSON.parse(localStorage.getItem("reservaModificar"));
  const [modoModificar] = useState(!!reservaModificar);

  useEffect(() => {
    if (reservaModificar) {
      localStorage.removeItem("reservaModificar"); // limpiar
    }
  }, []);

  const monthNames = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  const diasSemana = ["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"];

  const generarHoras = (diaSemana) => {
    const horas = [];
    const ranges = diaSemana === 6 ? [[9 * 60, 14 * 60]] : [[9 * 60, 14 * 60], [16 * 60, 21 * 60]];
    const step = 40;

    for (const [startMin, endMin] of ranges) {
      for (let m = startMin; m < endMin; m += step) {
        const hh = String(Math.floor(m / 60)).padStart(2, "0");
        const mm = String(m % 60).padStart(2, "0");
        horas.push(`${hh}:${mm}`);
      }
    }
    return horas;
  };

  const diasMes = new Date(currentYear, currentMonth + 1, 0).getDate();
  const primerDiaSemanaMes = new Date(currentYear, currentMonth, 1).getDay();
  const padding = primerDiaSemanaMes === 0 ? 6 : primerDiaSemanaMes - 1;

  const handleSelectDay = (dia) => {
    const fechaDia = new Date(currentYear, currentMonth, dia);
    const diaSemana = fechaDia.getDay();
    if (diaSemana === 0 || diaSemana === 1) return;

    if (navigator.vibrate) navigator.vibrate(50);
    const todasHoras = generarHoras(diaSemana);
    const ocupadas = citasOcupadasSimuladas[dia] || [];

    const ahora = new Date();
    const libres = todasHoras.filter((h) => {
      if (ocupadas.includes(h)) return false;
      if (fechaDia.toDateString() === today.toDateString()) {
        const [hora, min] = h.split(":").map(Number);
        return hora > ahora.getHours() || (hora === ahora.getHours() && min > ahora.getMinutes());
      }
      return true;
    });

    if (libres.length === 0) return;
    setSelectedDay(dia);
    setAvailableHours(libres);
    setSelectedHour("");
    setSelectedService("");
  };

  const handlePrevMonth = () => {
    if (currentYear === today.getFullYear() && currentMonth <= today.getMonth()) return;
    if (currentMonth === 0) setCurrentMonth(11), setCurrentYear(currentYear - 1);
    else setCurrentMonth(currentMonth - 1);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) setCurrentMonth(0), setCurrentYear(currentYear + 1);
    else setCurrentMonth(currentMonth + 1);
  };

  useEffect(() => {
    if (selectedHour && servicioRef.current) {
      const rect = servicioRef.current.getBoundingClientRect();
      window.scrollTo({ top: rect.top + window.scrollY - 200, behavior: "smooth" });
    }
  }, [selectedHour]);

  const handleReservar = () => {
    const servicioSeleccionado = servicios.find((s) => s.nombre === selectedService);
    const nuevaReserva = {
      dia: selectedDay,
      mes: currentMonth + 1,
      año: currentYear,
      hora: selectedHour,
      servicio: servicioSeleccionado.nombre,
      total: servicioSeleccionado.precio,
      pago: "",
      nombre,
      telefono,
    };

    let nuevasReservas = [...reservas];

    if (modoModificar && reservaModificar) {
      nuevasReservas = nuevasReservas.filter(
        (r) =>
          !(
            r.dia === reservaModificar.dia &&
            r.mes === reservaModificar.mes &&
            r.año === reservaModificar.año &&
            r.hora === reservaModificar.hora &&
            r.servicio === reservaModificar.servicio &&
            r.telefono === reservaModificar.telefono
          )
      );
      localStorage.setItem("modificada", "true");
    } else {
      localStorage.removeItem("modificada");
    }

    nuevasReservas.push(nuevaReserva);
    localStorage.setItem("reservas", JSON.stringify(nuevasReservas));
    setReservas(nuevasReservas);
    navigate("/resumen");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-[#120000] to-[#250000] px-6">
      <h1 className="text-3xl font-['Anton'] text-[#ff0000] mb-6 uppercase">
        {modoModificar ? "Modificar cita" : "Calendario de citas"}
      </h1>

      {/* Selector de mes */}
      <div className="flex items-center gap-4 mb-4 text-white">
        <button onClick={handlePrevMonth} className="px-3 py-1 bg-[#0a0a0a]/80 rounded-lg hover:bg-[#ff000011]">
          {"<"}
        </button>
        <span className="font-semibold">{monthNames[currentMonth]} {currentYear}</span>
        <button onClick={handleNextMonth} className="px-3 py-1 bg-[#0a0a0a]/80 rounded-lg hover:bg-[#ff000011]">
          {">"}
        </button>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 w-full max-w-md text-center mb-2 text-gray-400">
        {diasSemana.map((d, i) => (
          <div key={i} className="font-semibold">{d}</div>
        ))}
      </div>

      {/* Calendario */}
      <div className="grid grid-cols-7 gap-2 mb-6 w-full max-w-md text-center">
        {Array.from({ length: padding }).map((_, i) => (
          <div key={`pad-${i}`} />
        ))}
        {Array.from({ length: diasMes }, (_, i) => i + 1).map((dia) => {
          const fechaDia = new Date(currentYear, currentMonth, dia);
          const diaSemana = fechaDia.getDay();
          const todasHoras = generarHoras(diaSemana);
          const ocupadas = citasOcupadasSimuladas[dia] || [];
          let libres = todasHoras.filter((h) => !ocupadas.includes(h));

          if (fechaDia.toDateString() === today.toDateString()) {
            const ahora = new Date();
            libres = libres.filter((h) => {
              const [hora, min] = h.split(":").map(Number);
              return hora > ahora.getHours() || (hora === ahora.getHours() && min > ahora.getMinutes());
            });
          }

          const bloqueado =
            diaSemana === 0 || diaSemana === 1 || (fechaDia < today && dia !== today.getDate()) || libres.length === 0;
          const tooltip = diaSemana === 0 || diaSemana === 1 ? "Cerrado" : libres.length === 0 ? "Completo" : "Disponible";

          return (
            <div
              key={dia}
              onClick={() => !bloqueado && handleSelectDay(dia)}
              className={`py-3 rounded-lg cursor-pointer font-semibold text-white ${
                bloqueado
                  ? "bg-[#ff000033] text-[#ff0000]"
                  : selectedDay === dia
                  ? "bg-[#ff0000] text-black"
                  : "bg-[#0a0a0a]/80 hover:bg-[#ff000011] border border-[#ff000055]"
              }`}
              title={tooltip}
            >
              {bloqueado ? "X" : dia}
            </div>
          );
        })}
      </div>

      {selectedDay && (
        <div className="w-full max-w-sm bg-[#0a0a0a]/90 border border-[#ff000020] rounded-2xl p-4 shadow mt-4">
          <h2 className="text-red-500 font-['Anton'] text-xl mb-3">
            Horarios para {selectedDay}/{currentMonth + 1}/{currentYear}
          </h2>

          <label className="block mb-3">
            <span className="text-white font-semibold mb-1 block">Hora:</span>
            <select
              value={selectedHour}
              onChange={(e) => setSelectedHour(e.target.value)}
              className="w-full bg-transparent border border-[#ff000055] rounded-lg py-2 px-3 text-white"
            >
              <option value="" disabled>Selecciona una hora</option>
              {availableHours.map((h, i) => (
                <option key={i} value={h}>{h}</option>
              ))}
            </select>
          </label>

          <div ref={servicioRef} className={`overflow-hidden transition-all ${selectedHour ? "max-h-[600px] mt-4" : "max-h-0"}`}>
            <fieldset className="mb-4">
              <legend className="text-white font-semibold mb-2">Servicio:</legend>
              <div className="flex flex-col gap-2">
                {servicios.map((s, i) => (
                  <label
                    key={i}
                    className={`flex justify-between items-center gap-2 cursor-pointer p-3 rounded-lg border ${
                      selectedService === s.nombre ? "border-red-600 bg-[#ff000022]" : "border-[#ff000055] hover:bg-[#ff000011]"
                    }`}
                  >
                    <div className="flex-1 text-white font-medium">{s.nombre}</div>
                    <div className="text-red-500 font-semibold">{s.precio}€</div>
                    <input
                      type="radio"
                      name="servicio"
                      checked={selectedService === s.nombre}
                      onChange={() => setSelectedService(s.nombre)}
                      className="accent-red-600"
                    />
                  </label>
                ))}
              </div>
            </fieldset>

            <button
              className={`w-full mt-4 bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700 transition ${
                !selectedService ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!selectedService}
              onClick={handleReservar}
            >
              {modoModificar ? "Confirmar modificación" : "Reservar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
