import PropTypes from "prop-types";

const CardInfo = ({ title, value, subtitle, icon, color }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col gap-1 border">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium">{title}</h4>
        {icon && <span className={`text-${color}-500`}>{icon}</span>}
      </div>
      <h2 className="text-2xl font-bold">{value}</h2>
      <span className="text-xs text-gray-500">{subtitle}</span>
    </div>
  );
};

CardInfo.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.element,
  color: PropTypes.string,
};

export default CardInfo;
