const Budget = ({ currency, availableBudget, totalIncome, totalExpense }) => {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-6 justify-center items-center p-4">
      <h2 className="font-semibold text-2xl">
        Available Budget: {`${currency} ${availableBudget}`}
      </h2>
      <div className="font-medium">
        <h4>Total Income: {`${currency} ${totalIncome}`}</h4>
        <h4>Expenses: {`${currency} ${totalExpense}`}</h4>
      </div>
    </div>
  );
};

export default Budget;
