const FilterDropdown = ({ label }) => {
    return (
      <select className="border border-gray-300 rounded px-4 py-2 text-gray-700">
        <option>Todos {label.toLowerCase()}</option>
      </select>
    );
  };
  
  export default FilterDropdown;