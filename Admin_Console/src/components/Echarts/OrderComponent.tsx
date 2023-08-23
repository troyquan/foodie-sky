import EChart from "./index.tsx"; // 导入之前创建的 EChart 组件
interface TurnOverDataItem {
  date: string[];
  scales: string[];
  orders: string[];
  orderTotal: string[];
}
const OrderComponent = ({
  date,
  scales,
  orders,
  orderTotal,
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
    //     max: orders.length - 1,
    //   },
    // ],
    title: {
      text: "Orders Stats",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      data: ["valid orders", "all orders"],
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
        name: "all orders",
        data: orderTotal,
        type: "line",
        color: "#fbbf24",
      },
      {
        name: "valid orders",
        data: orders,
        type: "line",
        color: "#818cf8",
      },
    ],
  };

  return <EChart option={chartOption} />;
};

export default OrderComponent;
