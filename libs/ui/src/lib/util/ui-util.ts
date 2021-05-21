import { getInstanceByDom, connect } from 'echarts';

export function connectCharts(list: string[]) {
  const chartElements = [];
  for (const chart of list) {
    const chartElement = document.getElementById(chart);
    if (chartElement) {
      chartElements.push(getInstanceByDom(chartElement));
    }
  }
  if (chartElements.length > 0) {
    connect(chartElements);
  }
}
