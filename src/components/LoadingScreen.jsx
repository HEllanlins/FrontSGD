import PropTypes from 'prop-types';

export default function LoadingScreen({ texto = 'Carregando...' }) {
  return (
    <div className="fixed inset-0 bg-blue-600 z-[1000] flex items-center justify-center">
      <span className="text-white text-2xl font-bold drop-shadow-lg">{texto}</span>
    </div>
  );
}

LoadingScreen.propTypes = {
  texto: PropTypes.string
};
