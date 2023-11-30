const CashflowTable = ({ items }) => {
  return (
    <div className="flex justify-around">
      <ul>
        <h4 className="text-lg font-bold">Reason</h4>
        {items.map((item, index) => (
          <li key={index}>{item.reason}</li>
        ))}
      </ul>

      <ul>
        <h4 className="text-lg font-bold">Value</h4>
        {items.map((item, index) => (
          <li key={index}>{item.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default CashflowTable;
