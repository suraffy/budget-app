import DeleteConfirmationModal from "./common/DeleteComfirmationModal";

const CashflowItem = ({
  item,
  currency,
  showModal,
  onShowModal,
  onCloseModal,
  onDelete,
}) => {
  return (
    <li className="flex flex-wrap justify-between pt-2 px-2 border-b-2 border-slate-200 transition-colors hover:bg-slate-100">
      <span className="w-1/3 ">{item.reason}</span>{" "}
      <span className="w-1/3 ">{`${currency} ${item.amount}`}</span>
      <span className="w-1/4 flex justify-end">
        <button
          onClick={onShowModal}
          className="bg-red-600 text-white py-0.5 mb-1 px-4 rounded transition-colors hover:bg-red-700"
        >
          Delete
        </button>

        <DeleteConfirmationModal
          showModal={showModal}
          onCloseModal={onCloseModal}
          onDelete={() => onDelete(item)}
        />
      </span>
    </li>
  );
};

export default CashflowItem;
