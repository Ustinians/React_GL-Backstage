import React, { Component } from 'react';
import "./index.css";

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

import {Button, Card} from "antd";

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
  state = {
    sales: [5,20,36,10,10,20], // 销量
    stores: [10,25,30,7,15,25], // 库存 
  }
  getOptions = () => {
    // const {sales,stores} = this.state;
    return {
      xAxis: {
        type: "category",
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
      },
      yAxis: {
        type: "value"
      },
      series: [{
          data: this.state.sales,
          type: 'bar',
          name: "销量"
        },
        {
          data: this.state.stores,
          type: 'bar',
          name: "库存"
        }
      ]
    }
  }
  initOptions = () => {
    const myChart = echarts.init(document.getElementById("bar"));
      myChart.setOption(this.getOptions());
  }
  // 更新库存
  updateOptions = () => {
    let {sales,stores} = this.state;
    const newSales = sales.map(sale => {
      if(sale >= 0){
        return sale + 1;
      }
      else{
        return sale;
      }
    });
    const newStores = stores.reduce((pre,store) => {
      if(store >= 0){
        pre.push(store-1);
      }
      else{
        pre.push(store);
      }
      return pre;
    },[]);
    this.setState({
      sales: [...newSales],
      stores: [...newStores]
    })
    this.initOptions();
    // const myChart = echarts.init(document.getElementById("bar"))
    // myChart.setOption(this.getOptions());
  }
  componentDidMount() {
    this.initOptions()
  }

  render() {
    const title = <Button type="primary" onClick={this.updateOptions}>更新</Button>
      return (
        <Card title={title}>
          <Card title="柱状图一" className='bar'>
            <div id="bar" style={{ width: 600, height: 400 }} className="card-bar"></div>
          </Card>
        </Card>
      );
  }
}
// testingcheats true