import React, { Component } from 'react'
// 引入需要的Antd组件
import {Button} from "antd"
export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Button type='primary'>Primary Button</Button>
      </div>
    )
  }
}
