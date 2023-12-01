const CashflowItem = ({ item, onDelete }) => {
  return (
    <li className="flex flex-wrap justify-between my-2 py-1 bg-slate-100">
      <span className="w-1/3">{item.reason}</span>{" "}
      <span className="w-1/3">{item.amount}</span>
      <button
        onClick={() => onDelete(item)}
        className="self-center bg-red-600 text-white py-1 px-4 rounded"
      >
        Delete
      </button>
    </li>
  );
};

export default CashflowItem;
