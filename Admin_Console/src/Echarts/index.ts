import ReactEcharts from "echarts-for-react";

interface EChartProps {
  option: object; // ECharts 配置项
}

const EChart: React.FC<EChartProps> = ({ option }) => {
  return <ReactEcharts option={option} />;
};

export default EChart;
