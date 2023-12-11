import { useState, useEffect } from "react";

import Button from "./common/Button";
import BarChart from "./common/BarChart";

import {
  plannedIncomeList,
  plannedExpenseList,
} from "../services/plannedCashflowData";
import { incomeItemsList, expenseItemsList } from "../services/cashflowData";

const Insight = () => {
  const [currentCashflow, setCurrentCashflow] = useState("income");

  const chartData = {};

  const getChartData = () => {
    const plannedCashflowItem =
      currentCashflow === "income" ? plannedIncomeList : plannedExpenseList;
    const actualCashflowItem =
      currentCashflow === "income" ? incomeItemsList : expenseItemsList;

    chartData.labels = plannedCashflowItem.map((item) => item.reason);
    chartData.datasets = [
      {
        label: `${
          currentCashflow === "income" ? "Target Earning" : "Target Budget"
        }`,
        data: plannedCashflowItem.map((item) => item.amount),
      },
      {
        label: `${
          currentCashflow === "income" ? "Actual Earning" : "Actual Spending"
        }`,
        data: actualCashflowItem.map((item) => item.amount),
      },
    ];
  };

  getChartData();

  return (
    <section id="insights" className="container mb-56">
      <h2 className="text-4xl font-semibold text-center">
        Previous Month Insights
      </h2>

      <div className="my-10 flex flex-wrap gap-4 justify-center">
        <Button
          label="income"
          color="blue"
          currentCashflow={currentCashflow}
          onBtnClick={() => setCurrentCashflow("income")}
        />
        <Button
          label="expense"
          color="red"
          currentCashflow={currentCashflow}
          onBtnClick={() => setCurrentCashflow("expense")}
        />
      </div>

      <div className="lg:w-2/3">
        <BarChart data={chartData} />
      </div>
    </section>
  );
};

export default Insight;
