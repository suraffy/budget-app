const Button = ({ label, color, currentCashflow, onBtnClick }) => {
  const active =
    currentCashflow.toLowerCase() === label.toLowerCase()
      ? `text-white bg-${color}-600 border-transparent hover:bg-${color}-700 ring-2 ring-offset-2 ring-${color}-600`
      : `bg-transparent hover:bg-slate-100`;

  const btnStyles =
    currentCashflow.toLowerCase() === label.toLowerCase()
      ? currentCashflow === "income"
        ? { "--tw-ring-color": "rgb(37 99 235)" }
        : { "--tw-ring-color": "rgb(220 38 38)" }
      : { "--tw-ring-color": "transparent" };

  return (
    <button
      onClick={onBtnClick}
      className={` ${active} border-2 py-1 px-5 outline-none font-semibold rounded transition-color`}
      style={btnStyles}
    >
      {label}
    </button>
  );
};

export default Button;
