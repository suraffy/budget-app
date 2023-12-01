import CashflowItem from "./CashflowItem";

const CashflowTable = ({ items, currency, onDelete }) => {
  return (
    <div className="my-8 p-4 pb-6 shadow-lg border border-slate-300 rounded-lg">
      <div className="flex justify-between flex-wrap mb-2">
        <h4 className="w-1/3 text-lg font-bold">Reason</h4>
        <h4 className="w-1/3 text-lg font-bold">Amount</h4>
        <span className="w-1/4"></span>
      </div>

      <ul>
        {items.map((item, index) => (
          <CashflowItem
            key={index}
            item={item}
            currency={currency}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default CashflowTable;
