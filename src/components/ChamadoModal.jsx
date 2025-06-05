import React from "react";

export default function ChamadoModal({ isOpen, onClose, onSave, chamado }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-xl shadow-lg w-[500px]">
        <h2 className="text-xl font-bold mb-4">Editar Chamado</h2>
        {/* Campos do formulário aqui */}
        <button onClick={onClose}>Fechar</button>
        <button onClick={() => onSave(chamado)}>Salvar</button>
      </div>
    </div>
  );
}
