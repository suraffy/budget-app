import CashflowItem from "./CashflowItem";

const CashflowTable = ({ items, currency, onDelete }) => {
  return (
    <div className="mt-8">
      <div className="flex justify-between flex-wrap">
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
