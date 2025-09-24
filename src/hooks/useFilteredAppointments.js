import { useContext, useMemo } from 'react';
import { AgendaContext } from '../contexts/AgendaContext';

export default function useFilteredAppointments() {
  const { appointments, selectedDate, query, statusFilter } = useContext(AgendaContext);

  const filtered = useMemo(() => {
    const selDay = selectedDate ? new Date(selectedDate).toISOString().slice(0,10) : null;
    return appointments.filter(a => {
      if (selDay && !a.datetime.startsWith(selDay)) return false;
      if (statusFilter && a.status !== statusFilter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        a.client.toLowerCase().includes(q) ||
        a.employee.toLowerCase().includes(q) ||
        a.service.toLowerCase().includes(q) ||
        a.time.includes(q) ||
        (a.status && a.status.toLowerCase().includes(q))
      );
    }).sort((x,y) => x.time.localeCompare(y.time));
  }, [appointments, selectedDate, query, statusFilter]);

  return filtered;
}
