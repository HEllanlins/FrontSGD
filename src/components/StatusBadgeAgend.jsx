import React from 'react';
import { COLORS } from '../Globals/colors';

export default function StatusBadgeAgend({ status }) {
  let className = 'badge badge-default';
  if (status === 'Pendente') className = 'badge badge-warning';
  if (status === 'Em Andamento') className = 'badge badge-info';
  if (status === 'Concluído') className = 'badge badge-success';
  if (status === 'Cancelado') className = 'badge badge-danger';

  return <span className={className}>{status}</span>;
}
