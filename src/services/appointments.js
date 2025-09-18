// Mock de serviços — adapte para sua API Node
export async function fetchAppointmentsMock() {
  // mock delay
  await new Promise(r => setTimeout(r, 200));
  const now = new Date();
  const iso = d => new Date(d).toISOString();
  return [
    { id: 1, time: '08:00', client: 'Maria Silva', employee: 'João Santos', service: 'Corte de cabelo feminino', note: 'Cliente prefere corte em camadas', status: 'Pendente', datetime: iso(`${now.toISOString().slice(0,10)}T08:00:00`) },
    { id: 2, time: '09:30', client: 'Pedro Oliveira', employee: 'Ana Costa', service: 'Barba e bigode', note: 'Primeira vez no salão', status: 'Em Andamento', datetime: iso(`${now.toISOString().slice(0,10)}T09:30:00`) },
    { id: 3, time: '10:15', client: 'Carla Mendes', employee: 'João Santos', service: 'Escova progressiva', note: 'Cabelo muito cacheado', status: 'Concluído', datetime: iso(`${now.toISOString().slice(0,10)}T10:15:00`) },
    { id: 4, time: '11:00', client: 'Roberto Lima', employee: 'Carlos Ferreira', service: 'Corte masculino', note: 'Corte social', status: 'Pendente', datetime: iso(`${now.toISOString().slice(0,10)}T11:00:00`) },
    { id: 5, time: '14:00', client: 'Fernanda Rocha', employee: 'Ana Costa', service: 'Coloração + corte', note: 'Quer loiro platinado', status: 'Pendente', datetime: iso(`${now.toISOString().slice(0,10)}T14:00:00`) },
    { id: 6, time: '15:30', client: 'Lucas Martins', employee: 'Carlos Ferreira', service: 'Corte + barba', note: 'Cliente regular', status: 'Em Andamento', datetime: iso(`${now.toISOString().slice(0,10)}T15:30:00`) },
  ];
}
