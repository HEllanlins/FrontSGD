import React, { useContext } from 'react';
import SearchBar from '../components/SearchBarAgend';
import AppointmentTable from '../components/AppointmentTable';
import useFilteredAppointments from '../hooks/useFilteredAppointments';
import { AgendaContext } from '../contexts/AgendaContext';

export default function Agenda() {
  const filtered = useFilteredAppointments();
  const { selectedDate } = useContext(AgendaContext);

  const headerDate = selectedDate ? new Date(selectedDate).toLocaleDateString() : (new Date()).toLocaleDateString();

  return (
    <div className="page-container">
      <header className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Agenda do Dia</h1>
          <p className="hero-sub">Gerencie seus compromissos de forma profissional</p>
        </div>
      </header>

      <main className="page-main">
        <div className="controls-card">
          <SearchBar />
        </div>

        <section className="table-section">
          <div className="table-header">
            <h2>Agendamentos — {headerDate}</h2>
          </div>
          <AppointmentTable appointments={filtered} />
        </section>
      </main>
    </div>
  );
}
