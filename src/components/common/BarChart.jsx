import { Chartjs } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const BarChart = ({ data }) => {
  return <Bar data={data} />;
};

export default BarChart;
