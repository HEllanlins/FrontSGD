import React, { useState, useMemo, useCallback } from 'react';

// Constantes e funções auxiliares movidas para fora do componente
// para evitar recriação a cada renderização.
const DAYS_OF_WEEK = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

const Agenda = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const goToPreviousMonth = useCallback(() => {
    setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }, []);

  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const days = [];
    // Adiciona células vazias para os dias antes do início do mês
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="border p-2"></div>);
    }

    // Adiciona os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <button
          key={day}
          type="button"
          className="border p-2 text-center hover:bg-blue-100 focus:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          aria-label={`Dia ${day} de ${MONTH_NAMES[month]}`}
        >
          {day}
        </button>
      );
    }

    return days;
  }, [year, month]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToPreviousMonth}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          aria-label="Mês anterior"
          type="button"
        >
          Anterior
        </button>
        <h2 className="text-2xl font-bold" aria-live="polite">
          {MONTH_NAMES[month]} {year}
        </h2>
        <button
          onClick={goToNextMonth}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          aria-label="Próximo mês"
          type="button"
        >
          Próximo
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className="font-bold text-center" aria-hidden="true">
            {day}
          </div>
        ))}
        {calendarDays}
      </div>
    </div>
  );
};

export default Agenda;
