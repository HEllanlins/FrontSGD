import React, { useContext } from 'react';
import { AgendaContext } from '../contexts/AgendaContext';

export default function SearchBarAgend() {
  const { query, setQuery, selectedDate, setSelectedDate, statusFilter, setStatusFilter } = useContext(AgendaContext);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value ? new Date(e.target.value) : null);
  };

  return (
    <div className="search-row">
      <div className="search-left">
        <input
          className="search-input"
          placeholder="Buscar por cliente, funcionário, serviço, horário ou status..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      <div className="search-right">
        <input
          className="date-input"
          type="date"
          value={selectedDate ? selectedDate.toISOString().slice(0,10) : ''}
          onChange={handleDateChange}
        />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="status-select">
          <option value="">Todos</option>
          <option value="Pendente">Pendente</option>
          <option value="Em Andamento">Em Andamento</option>
          <option value="Concluído">Concluído</option>
          <option value="Cancelado">Cancelado</option>
        </select>
      </div>
    </div>
  );
}
