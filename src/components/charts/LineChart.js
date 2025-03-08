import React from "react";
import Chart from "react-apexcharts";

const chartConfig = {
  type: "line",
  height: 500,
  series: [
    {
      name: "ضغط",
      data: [70, 71, 72, 70, 73, 75, 70, 71, 75, 72, 73, 74],
    },
  ],
  options: {
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
    colors: ["#020617", "#ff4500", "#7fffd4", "blueviolet"],
    stroke: {
      lineCap: "round",
      curve: "smooth",
    },
    markers: {
      size: 0,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        rotateAlways: true,
        style: {
          colors: "#616161",
          fontSize: "15px",
          fontFamily: "inherit",
          fontWeight: "bold",
        },
      },
      categories: [
        "يناير",
        "فبراير",
        "مارس",
        "أبريل",
        "مايو",
        "يونيو",
        "يوليو",
        "أغسطس",
        "سبتمبر",
        "أكتوبر",
        "نوفمبر",
        "ديسمبر",
      ],
    },
    yaxis: {
      min: 10,
      max: 100,
      labels: {
        style: {
          colors: "#616161",
          fontSize: "15px",
          fontFamily: "inherit",
          fontWeight: "bold",
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#dddddd",
      strokeDashArray: 5,
      xaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 5,
        right: 20,
      },
    },
    fill: {
      opacity: 0.8,
    },
    tooltip: {
      theme: "dark",
    },
    legend: {
      fontSize: "30px",
    },
  },
};
function LineChart({ title, x, series, min, max }) {
  const data = {
    ...chartConfig,
    series: series,
    options: {
      ...chartConfig.options,
      xaxis: {
        ...chartConfig.options.xaxis,
        categories: x,
      },
      yaxis: {
        ...chartConfig.options.yaxis,
        min: min,
        max: max,
      },
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

export default LineChart;
