import EChart from "./index.tsx"; // 导入之前创建的 EChart 组件
interface TurnOverDataItem {
  date: string[];
  scales: string[];
}
const TurnoverComponent = ({ date, scales }: TurnOverDataItem) => {
  const chartOption = {
    title: {
      text: "Turnover Stats",
    },
    tooltip: {
      trigger: "item",
    },

    xAxis: {
      type: "category",
      data: date,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "turnover",
        data: scales,
        type: "bar",
        color: "#FF5733",
      },
    ],
  };

  return <EChart option={chartOption} />;
};

export default TurnoverComponent;
