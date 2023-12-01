import { useState } from "react";

import Navbar from "./common/Navbar";
import Budget from "./Budget";
import Button from "./common/Button";
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
          cashflow: "income",
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
          cashflow: "expense",
          year,
          month,
          date,
          reason,
          amount,
        },
      ]);
    }
  };

  const handleDeleteItem = (item) => {
    console.log(item, "deleted");
    const amount = item.amount;

    if (item.cashflow === "income") {
      const incomeItemsUpdated = incomeItems.filter((exp) => exp !== item);

      setIncomeItems(incomeItemsUpdated);
      setTotalIncome((prev) => prev - amount);
      setAvailableBudget((prev) => prev - amount);
    }

    if (item.cashflow === "expense") {
      const expenseItemsUpdated = expenseItems.filter((exp) => exp !== item);

      setExpenseItems(expenseItemsUpdated);
      setTotalExpense((prev) => prev - amount);
      setAvailableBudget((prev) => prev + amount);
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
          <div className="flex flex-wrap justify-center gap-5">
            <Button
              label="Income"
              color="blue"
              onBtnClick={() => setCurrentCashflow("income")}
            />
            <Button
              label="Expense"
              color="red"
              onBtnClick={() => setCurrentCashflow("expense")}
            />
          </div>

          <h4>{currentCashflow}</h4>
          <Form onSubmit={handleSubmit} />

          {currentCashflow === "income" ? (
            <CashflowTable items={incomeItems} onDelete={handleDeleteItem} />
          ) : (
            <CashflowTable items={expenseItems} onDelete={handleDeleteItem} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
