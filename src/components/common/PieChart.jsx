import { Chartjs } from "chart.js/auto";
import { Pie } from "react-chartjs-2";

const PieChart = ({ data }) => {
  const newData = { ...data };
  newData.datasets[0].backgroundColor = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#8C54FF",
    "#FF8543",
  ];
  newData.datasets[0].borderWidth = 4;

  return <Pie data={data} />;
};

export default PieChart;
