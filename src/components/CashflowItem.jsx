const CashflowItem = ({ item, onDelete }) => {
  return (
    <li className="flex justify-around my-2 py-1 bg-slate-100">
      <span>{item.reason}</span> <span>{item.amount}</span>{" "}
      <button
        onClick={() => onDelete(item)}
        className="bg-red-600 text-white py-1 px-4 rounded"
      >
        Delete
      </button>
    </li>
  );
};

export default CashflowItem;
