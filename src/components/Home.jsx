import { useState } from "react";

import Navbar from "./common/Navbar";
import Budget from "./Budget";
import Form from "./common/Form";
import CashflowTable from "./CashflowTable";

const Home = () => {
  const currency = "$";

  const [availableBudget, setAvailableBudget] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const [incomeItems, setIncomeItems] = useState([]);
  const [expenseItems, setExpenseItems] = useState([]);

  const [currentCashflow, setCurrentCashflow] = useState("income");

  const handleSubmit = (e) => {
    e.preventDefault();

    const el = e.target;
    const reason = el.reason.value;
    const amount = parseFloat(el.value.value);

    const now = new Date();
    const date = now.getDate();
    const month = now.getMonth() + 1; // month starts with 0
    const year = now.getFullYear();

    if (currentCashflow === "income") {
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
    } else if (currentCashflow === "expense") {
      setTotalExpense((prev) => prev + amount);
      setAvailableBudget((prev) => prev - amount);
      setExpenseItems((prev) => [
        ...prev,
        {
          year,
          month,
          date,
          reason,
          amount,
        },
      ]);
    }
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

        <div className="">
          <div className="flex justify-center gap-5">
            <button
              onClick={() => setCurrentCashflow("income")}
              className="text-white bg-blue-600 py-2 px-4 rounded transition-colors hover:bg-blue-700 focus:ring-2 ring-offset-2 ring-blue-600"
            >
              Income
            </button>
            <button
              onClick={() => setCurrentCashflow("expense")}
              className="text-white bg-red-600 py-2 px-4 rounded transition-colors hover:bg-red-700 focus:ring-2 ring-offset-2 ring-red-600"
            >
              Expense
            </button>
          </div>

          <h4>{currentCashflow}</h4>
          <Form onSubmit={handleSubmit} />

          {currentCashflow === "income" ? (
            <CashflowTable items={incomeItems} />
          ) : (
            <CashflowTable items={expenseItems} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
