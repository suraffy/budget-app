import CashflowItem from "./CashflowItem";

const CashflowTable = ({ items }) => {
  return (
    <div className="">
      <div className="flex justify-around">
        <h4 className="text-lg font-bold">Reason</h4>
        <h4 className="text-lg font-bold">Value</h4>
      </div>

      <ul>
        {items.map((item, index) => (
          <CashflowItem key={index} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default CashflowTable;
