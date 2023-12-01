const Button = ({ label, color, currentCashflow, onBtnClick }) => {
  const active =
    currentCashflow.toLowerCase() === label.toLowerCase()
      ? `text-white bg-${color}-600 border-transparent hover:bg-${color}-700 ring-2 ring-offset-2 ring-${color}-600`
      : `text-${color}-600 bg-transparent border-${color}-600 hover:bg-${color}-200`;

  return (
    <button
      onClick={onBtnClick}
      className={` ${active} border-2 py-1 px-5 outline-none font-semibold rounded transition-colors`}
    >
      {label}
    </button>
  );
};

export default Button;
