import { incomeItemsList, expenseItemsList } from "../services/cashflowData";

const Trends = () => {
  return (
    <div className="mb-32">
      <h2 className="text-4xl font-semibold text-center">
        Annual Cashflow Trends
      </h2>

      <div className="my-10 text-center">
        <p className="text-lg">There is no enought data is available!</p>
      </div>
    </div>
  );
};

export default Trends;
