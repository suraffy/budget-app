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

    const reason = e.target.reason.value;
    const value = parseFloat(e.target.value.value);

    setTotalIncome((prev) => prev + value);
    setAvailableBudget((prev) => prev + value);
    setIncomeItems((prev) => [...prev, { reason, value }]);
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
            <li key={index}>{item.value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
