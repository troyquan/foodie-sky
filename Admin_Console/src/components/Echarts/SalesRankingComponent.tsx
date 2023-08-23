import EChart from "./index.tsx"; // 导入之前创建的 EChart 组件
interface TurnOverDataItem {
  nameList: string[];
  numberList: string[];
}
const SaleRankingComponent = ({ nameList, numberList }: TurnOverDataItem) => {
  const transformedData = nameList.map((name: string, index: number) => ({
    name: name,
    value: parseFloat(numberList[index]),
  }));
  console.log(transformedData);
  const chartOption = {
    title: {
      text: "TOP 10 Stats",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      data: ["orders", "all"],
    },
    // xAxis: {
    //   type: "category",
    //   data: nameList,
    // },
    // yAxis: {
    //   type: "value",
    //   data: numberList,
    // },
    // series: [
    //   {
    //     // data: orderTotal,
    //     data: numberList,
    //     type: "bar",
    //   },
    // ],

    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: transformedData,
        // [
        // { value: 1048, name: "Search Engine" },
        // { value: 735, name: "Direct" },
        // { value: 580, name: "Email" },
        // { value: 484, name: "Union Ads" },
        // { value: 300, name: "Video Ads" },
        // ]
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return <EChart option={chartOption} />;
};

export default SaleRankingComponent;
