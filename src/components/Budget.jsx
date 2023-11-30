const Budget = ({ currency, availableBudget, totalIncome, expenses }) => {
  return (
    <div className="flex flex-col items-center p-4">
      <div className="font-medium">
        <h4>Total Income: {currency + totalIncome}</h4>
        <h4>Expenses: {currency + expenses}</h4>
      </div>
      <h2 className="font-semibold text-2xl">
        Available Budget: {currency + availableBudget}
      </h2>
    </div>
  );
};

export default Budget;
