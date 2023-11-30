import CashflowItem from "./CashflowItem";

const CashflowTable = ({ items, onDelete }) => {
  return (
    <div className="">
      <div className="flex justify-between">
        <h4 className="text-lg font-bold">Reason</h4>
        <h4 className="text-lg font-bold">Value</h4>
        <h4></h4>
      </div>

      <ul>
        {items.map((item, index) => (
          <CashflowItem key={index} item={item} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
};

export default CashflowTable;
