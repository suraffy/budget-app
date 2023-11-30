import { useState } from "react";
import Navbar from "./common/Navbar";

const Home = () => {
  const currency = "$";

  const [availableBudget, setAvailableBudget] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const [incomeItems, setIncomeItems] = useState([]);
  const [expenseItems, setItems] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const el = e.target;
    const reason = el.reason.value;
    const amount = parseFloat(el.value.value);

    const now = new Date();
    const date = now.getDate();
    const month = now.getMonth() + 1; // month starts with 0
    const year = now.getFullYear();

    setTotalIncome((prev) => prev + amount);
    setAvailableBudget((prev) => prev + amount);
    setIncomeItems((prev) => [
      ...prev,
      {
        year,
        month,
        date,
        reason,
        amount,
      },
    ]);
  };

  return (
    <div className="container">
      <Navbar />

      <div className="flex flex-col items-center p-4">
        <div className="font-medium">
          <h4>Total Income: {currency + totalIncome}</h4>
          <h4>Expenses: {currency + expenses}</h4>
        </div>
        <h2 className="font-semibold text-2xl">
          Available Budget: {currency + availableBudget}
        </h2>
      </div>

      {/* <div className="flex justify-center gap-5">
        <button
          onClick={() => {
            setCashFlow("income");
            setCashFlowItems("incomeItems");
          }}
          className="text-white bg-blue-600 py-2 px-4 rounded transition-colors hover:bg-blue-700 focus:ring-2 ring-offset-2 ring-blue-600"
        >
          Income
        </button>
        <button
          onClick={() => {
            setCashFlow("expense");
            setCashFlowItems("expenseItems");
          }}
          className="text-white bg-red-600 py-2 px-4 rounded transition-colors hover:bg-red-700 focus:ring-2 ring-offset-2 ring-red-600"
        >
          Expense
        </button>
      </div> */}

      <div className="">
        <h4>Income</h4>
        <form onSubmit={handleSubmit} className="">
          <input type="text" name="reason" placeholder="reason" />
          <input type="number" name="value" placeholder="value" min={0} />
          <button type="submit">Add</button>
        </form>

        <div className="flex justify-around">
          <ul>
            <h4 className="text-lg font-bold">Reason</h4>
            {incomeItems.map((item, index) => (
              <li key={index}>{item.reason}</li>
            ))}
          </ul>

          <ul>
            <h4 className="text-lg font-bold">Value</h4>
            {incomeItems.map((item, index) => (
              <li key={index}>{item.amount}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
