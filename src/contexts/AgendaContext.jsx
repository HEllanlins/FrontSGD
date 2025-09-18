import React, { createContext, useState, useEffect } from 'react';
import { fetchAppointmentsMock } from '../services/appointments';

export const AgendaContext = createContext();

export function AgendaProvider({ children }) {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); // '', 'Pendente', 'Em Andamento', 'Concluído', 'Cancelado'

  useEffect(() => {
    // Troque para fetch real quando integrar backend
    fetchAppointmentsMock().then(setAppointments);
  }, []);

  const value = {
    appointments,
    setAppointments,
    selectedDate,
    setSelectedDate,
    query,
    setQuery,
    statusFilter,
    setStatusFilter,
  };

  return <AgendaContext.Provider value={value}>{children}</AgendaContext.Provider>;
}
