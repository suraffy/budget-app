import { useState } from "react";
import Navbar from "./common/Navbar";

const Home = () => {
  const currency = "$";

  const [currentBudget, setCurrentBudget] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  return (
    <div className="container">
      <Navbar />

      <div className="flex flex-col items-center p-4">
        <div className="font-medium">
          <h4>Total Income: {currency + totalIncome}</h4>
          <h4>Expenses: {currency + expenses}</h4>
        </div>
        <h2 className="font-semibold text-2xl">
          Available Budget: {currency + currentBudget}
        </h2>
      </div>
    </div>
  );
};

export default Home;
