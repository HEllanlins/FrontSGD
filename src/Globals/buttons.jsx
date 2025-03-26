// src/components/Button.jsx
export default function Button({ children, onClick, className = "" }) {
    return (
      <button
        className={`px-4 py-2 rounded-lg font-semibold transition duration-200 ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  