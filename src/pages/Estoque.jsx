import React from 'react';
import Nav from "../components/Navbar";
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import ProductTable from '../components/ProductTable';

const Estoque = () => {
  return (
    <>
      <Nav />
      <div className="p-6 bg-white min-h-screen">
        <h1 className="text-2xl font-bold text-blue-800 mb-6">Gerenciamento de Estoque</h1>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <SearchBar />
          <div className="flex gap-2">
            <FilterDropdown label="Categorias" />
            <FilterDropdown label="Status" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              + Adicionar Produto
            </button>
          </div>
        </div>
        <ProductTable />
      </div>
    </>
  );
};

export default Estoque;