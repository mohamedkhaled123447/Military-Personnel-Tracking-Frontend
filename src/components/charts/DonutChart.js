import { Label } from "@mui/icons-material";
import Chart from "react-apexcharts";
const chartConfig = {
  type: "donut",
  height: 500,
  series: [30, 40, 55],
  options: {
    labels: ["قيادة", "تحديد", "تصنت"],
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: true,
    },
    colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "30px",
    },
  },
};

export default function PieChart({ title, labels, colors, values }) {
  const data = {
    ...chartConfig,
    series: values,
    options: {
      ...chartConfig.options,
      labels: labels,
      colors: colors,
    },
  };
  return (
    <div className="d-flex justify-content-center">
      <div className="w-100">
        <h2 className="text-center">{title}</h2>
        <Chart {...data} />
      </div>
    </div>
  );
}
