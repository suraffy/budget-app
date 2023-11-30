const CashflowItem = ({ item }) => {
  return (
    <li className="flex justify-around">
      <span>{item.reason}</span> <span>{item.amount}</span>{" "}
    </li>
  );
};

export default CashflowItem;
