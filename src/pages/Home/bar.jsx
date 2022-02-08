import React, { Component } from 'react';

import * as echarts from 'echarts';
import { BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

export default class Bar extends Component {
  getOptions = () => {
    return {
      xAxis: {
        type: "category",
        data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
      },
      yAxis: {
        type: "value"
      },
      series: [{
        data: [38, 52, 61, 145, 48, 38, 28, 38, 68, 38, 58, 38],
        type: 'bar',
      }
      ]
    }
  }
  componentDidMount() {
    const myChart = echarts.init(document.getElementById("bar"));
    myChart.setOption(this.getOptions());
  }
  render() {
    return (
      <div id="bar" style={{width: 700, height: 300}}></div>
    )
  }
}
