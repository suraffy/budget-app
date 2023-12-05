import React, { useState, useEffect } from "react";

import Navbar from "./common/Navbar";
import Budget from "./Budget";
import Button from "./common/Button";
import Form from "./common/Form";
import CashflowTable from "./CashflowTable";

import PieChart from "./common/PieChart";
import { incomeItemsList, expenseItemsList } from "../services/cashflowData";

import IncomeSVG from "./common/IncomeSVG";
import ExpenseSVG from "./common/ExpenseSVG";

const Home = () => {
  const currency = "$";
  const inputReasonRef = React.createRef();

  const [availableBudget, setAvailableBudget] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const [incomeItems, setIncomeItems] = useState([]);
  const [expenseItems, setExpenseItems] = useState([]);

  const [currentCashflow, setCurrentCashflow] = useState("income");
  const [username, setUsername] = useState("Try it");
  const [errors, setErrors] = useState({});

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showTryItModal, setShowTryItModal] = useState(false);

  const chartData = {};

  let initialIncomeItems = [];
  let initialExpenseItems = [];

  // Set Chart Data
  const getChartData = () => {
    const cashflowItem =
      currentCashflow === "income"
        ? incomeItems || initialIncomeItems
        : expenseItems || initialExpenseItems;

    chartData.labels = cashflowItem.map((item) => item.reason);
    chartData.datasets = [
      {
        label: "Amount",
        data: cashflowItem.map((item) => item.amount),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Example colors for each segment
        borderWidth: 5,
      },
    ];
  };

  getChartData();

  useEffect(() => {
    const incomeItemsStr = localStorage.getItem("incomeItemsStr");
    const expenseItemsStr = localStorage.getItem("expenseItemsStr");

    if (incomeItemsStr && incomeItems.length > 0) {
      const incomeItemsObj = JSON.parse(incomeItemsStr);
      initialIncomeItems = incomeItemsObj;
    } else {
      initialIncomeItems = incomeItemsList;
    }

    if (expenseItemsStr && expenseItems.length > 0) {
      const expenseItemsObj = JSON.parse(expenseItemsStr);
      initialExpenseItems = expenseItemsObj;
    } else {
      initialExpenseItems = expenseItemsList;
    }

    // SetState
    setIncomeItems(initialIncomeItems);
    setExpenseItems(initialExpenseItems);
  }, []);

  useEffect(() => {
    initialIncomeItems = incomeItems || initialIncomeItems;
    initialExpenseItems = expenseItems || initialExpenseItems;

    // InitialTotalIncome
    const initialTotalIncome = initialIncomeItems.reduce(
      (acc, item) => acc + item.amount,
      0
    );

    const initialTotalExpense = initialExpenseItems.reduce(
      (acc, item) => acc + item.amount,
      0
    );

    const initialAvailableBudget = initialTotalIncome - initialTotalExpense;

    setTotalIncome(initialTotalIncome);
    setTotalExpense(initialTotalExpense);
    setAvailableBudget(initialAvailableBudget);
  }, [incomeItems, expenseItems]);

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleShowTryItModal = () => setShowTryItModal(true);
  const handleCloseTryItModal = () => setShowTryItModal(false);

  const handleTryIt = (username) => {
    console.log("Try it");
    setUsername(username);

    initialIncomeItems = [];
    initialExpenseItems = [];

    setIncomeItems([]);
    setExpenseItems([]);
    setCurrentCashflow("income");

    handleCloseTryItModal();
  };

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
    inputReasonRef.current.focus();

    getChartData();
  };

  const handleDeleteItem = (item) => {
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

    getChartData();
    handleCloseDeleteModal();
  };

  return (
    <section id="dashboard" className="mb-32">
      <Navbar
        username={username}
        showModal={showTryItModal}
        onShowModal={handleShowTryItModal}
        onCloseModal={handleCloseTryItModal}
        onTryIt={handleTryIt}
      />

      <div className="container">
        <Budget
          currency={currency}
          availableBudget={availableBudget}
          totalIncome={totalIncome}
          totalExpense={totalExpense}
        />

        <div className="flex flex-wrap justify-center gap-5">
          <Button
            label="Income"
            color="blue"
            currentCashflow={currentCashflow}
            onBtnClick={() => setCurrentCashflow("income")}
          />
          <Button
            label="Expense"
            color="red"
            currentCashflow={currentCashflow}
            onBtnClick={() => setCurrentCashflow("expense")}
          />
        </div>
        <div className="flex flex-wrap-reverse justify-center md:justify-between">
          <div className="md:w-3/5">
            <h4 className="flex items-center gap-4 font-semibold text-3xl capitalize ml-5 sm:ml-16 mt-6 mb-4">
              <span>{currentCashflow}</span>{" "}
              {currentCashflow === "income" ? (
                <IncomeSVG className="text-red" />
              ) : (
                <ExpenseSVG />
              )}
            </h4>

            <Form
              errors={errors}
              inputReasonRef={inputReasonRef}
              onSubmit={handleSubmit}
            />

            {currentCashflow === "income" ? (
              <CashflowTable
                items={incomeItems}
                currency={currency}
                showModal={showDeleteModal}
                onShowModal={handleShowDeleteModal}
                onCloseModal={handleCloseDeleteModal}
                onDelete={handleDeleteItem}
              />
            ) : (
              <CashflowTable
                items={expenseItems}
                currency={currency}
                showModal={showDeleteModal}
                onShowModal={handleShowDeleteModal}
                onCloseModal={handleCloseDeleteModal}
                onDelete={handleDeleteItem}
              />
            )}
          </div>

          <div className="md:w-2/5">
            <div className="mt-10 md:max-lg:mt-20 lg:ml-16 ">
              {<PieChart data={chartData} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
