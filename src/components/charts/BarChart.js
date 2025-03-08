import Chart from "react-apexcharts";

const chartConfig = {
  type: "bar",
  height: 500,
  series: [
    {
      name: "قوة",
      data: [44, 30, 25, 20, 10, 15, 10, 5, 5, 10, 6],
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
    colors: ["#020617"],
    plotOptions: {
      bar: {
        columnWidth: "40%",
        borderRadius: 2,
      },
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
        "تصنت",
        "تحديد",
        "قيادة",
        "شئون ادارية",
        "امن",
        "حملة",
        "عمليات",
        "تأمين فني",
        "إشارة",
        "تنظيم وإدارة",
        "تدريب",
      ],
    },
    yaxis: {
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
  },
};

export default function BarChart({ title, x, y, name }) {
  const data = {
    ...chartConfig,
    series: [
      {
        name: name,
        data: y,
      },
    ],
    options: {
      ...chartConfig.options,
      xaxis: {
        ...chartConfig.options.xaxis,
        categories: x,
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
