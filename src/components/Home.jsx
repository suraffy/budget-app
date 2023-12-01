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

  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const reasonEl = e.target.reason;
    const amountEl = e.target.amount;

    const reason = reasonEl.value;
    const amountStr = amountEl.value;

    const amount = parseFloat(amountStr);

    if (!reason && !amount) {
      setErrors({
        reason: "Reason cannot be empty!",
        amount: "Amount cannot be empty!",
      });

      return;
    }

    if (!reason) {
      setErrors({ reason: "Reason cannot be empty!" });
      return;
    }

    if (!amount) {
      setErrors({ amount: "Amount cannot be empty!" });
      return;
    }

    if (amount < 0) {
      setErrors({ amount: "Amount cannot be less than zero!" });
      return;
    }

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

    setErrors({});
    reasonEl.value = "";
    amountEl.value = "";
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

          <h4 className="font-semibold text-3xl capitalize ml-5 sm:ml-16 mt-6 mb-4">
            {currentCashflow}
          </h4>

          <Form errors={errors} onSubmit={handleSubmit} />

          {currentCashflow === "income" ? (
            <CashflowTable
              items={incomeItems}
              currency={currency}
              onDelete={handleDeleteItem}
            />
          ) : (
            <CashflowTable
              items={expenseItems}
              currency={currency}
              onDelete={handleDeleteItem}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
