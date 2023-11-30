const Button = ({ label, color, onBtnClick }) => {
  return (
    <button
      onClick={onBtnClick}
      className={`text-white bg-${color}-600 py-2 px-4 rounded transition-colors hover:bg-${color}-700 focus:ring-2 ring-offset-2 ring-${color}-600`}
    >
      {label}
    </button>
  );
};

export default Button;
