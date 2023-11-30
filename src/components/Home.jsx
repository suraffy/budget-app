import { useState } from "react";

import Navbar from "./common/Navbar";
import Budget from "./Budget";
import Form from "./common/Form";

const Home = () => {
  const currency = "$";

  const [availableBudget, setAvailableBudget] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

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
    <div className="">
      <Navbar />

      <div className="container">
        <Budget
          currency={currency}
          availableBudget={availableBudget}
          totalIncome={totalIncome}
          totalExpense={totalExpense}
        />

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
          <Form onSubmit={handleSubmit} />

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
    </div>
  );
};

export default Home;
