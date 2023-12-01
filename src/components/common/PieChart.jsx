import { Chartjs } from "chart.js/auto";
import { Pie } from "react-chartjs-2";

const PieChart = ({ data }) => {
  return <Pie data={data} />;
};

export default PieChart;
