import React from 'react';
import StatusBadgeAgend from '../StatusBadgeAgend';

export default function AppointmentTable({ appointments }) {
  return (
    <div className="table-card">
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Horário</th>
            <th>Cliente</th>
            <th>Funcionário</th>
            <th>Serviço</th>
            <th>Observação</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 && (
            <tr>
              <td colSpan="6" className="no-data">Nenhum agendamento encontrado</td>
            </tr>
          )}
          {appointments.map(a => (
            <tr key={a.id}>
              <td className="time-cell"> {a.time} </td>
              <td>{a.client}</td>
              <td>{a.employee}</td>
              <td>{a.service}</td>
              <td>{a.note}</td>
              <td><StatusBadgeAgend status={a.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
