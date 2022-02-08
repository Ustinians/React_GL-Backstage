import React from "react"

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

export default class Line extends React.Component {
    getOptions = () => {
        // const {sales,stores} = this.state;
        return {
            xAxis: {
                type: "category",
                data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            },
            yAxis: {
                type: "value"
            },
            series: [{
                data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
                type: 'line',
                name: "a"
            },
            {
                data: [3.9,4.2,5.7,8.5,11.9,15.2,17.0,16.6,14.2,10.3,6.6,4.8],
                type: "line",
                name: "b"
            },
            {
                data: [5.9,1.9,3.9,5.5,8.9,10.0,12.9,15.9,20.7,25.9,30.9,35.9],
                type: "line",
                name: "c"
            }
            ]
        }
    }
    componentDidMount(){
        const myChart = echarts.init(document.getElementById("line"));
        myChart.setOption(this.getOptions());
    }
    render() {
        return (
            <div id="line" style={{ float: 'right', width: 750, height: 300 }}></div>
        )
    }
}
