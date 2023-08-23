import EChart from "./index.tsx"; // 导入之前创建的 EChart 组件
interface TurnOverDataItem {
  date: string[];
  scales: string[];
  newUser: string[];
  userTotal: string[];
}
const UserComponent = ({
  date,
  scales,
  userTotal,
  newUser,
}: TurnOverDataItem) => {
  const chartOption = {
    // visualMap: [
    //   {
    //     show: false,
    //     type: "continuous",
    //     seriesIndex: 0,
    //     min: 0,
    //     max: 400,
    //   },
    //   {
    //     show: false,
    //     type: "continuous",
    //     seriesIndex: 1,
    //     dimension: 0,
    //     min: 0,
    //     max: userTotal.length - 1,
    //   },
    // ],

    title: {
      text: "User Stats",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      data: ["user total", "user increment"],
    },
    xAxis: {
      type: "category",
      data: date,
    },
    yAxis: {
      type: "value",
      data: scales,
    },
    series: [
      {
        name: "user increment",
        data: newUser,
        type: "line",
        color: "#fb923c",
        // type: "bar",
        // type: "scatter",
      },
      {
        name: "user total",
        data: userTotal,
        type: "line",
        color: "#f87171",
        // type: "bar",
        // type: "scatter",
      },
    ],
  };

  return <EChart option={chartOption} />;
};

export default UserComponent;
