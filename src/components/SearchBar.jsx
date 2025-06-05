const SearchBar = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Buscar..."
    className="border px-4 py-2 rounded w-full md:w-64"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default SearchBar;
