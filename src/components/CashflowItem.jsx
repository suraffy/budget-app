const CashflowItem = ({ item, onDelete }) => {
  return (
    <li className="flex justify-between my-2 py-1 bg-slate-100">
      <span className="">{item.reason}</span>{" "}
      <span className="">{item.amount}</span>
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
