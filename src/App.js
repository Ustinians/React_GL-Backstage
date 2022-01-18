import React, { Component } from 'react'
// 引入路由相关
import {Route,Switch} from "react-router-dom"
// 引入需要的路由组件
import Login from "./pages/Login"
import Admin from "./pages/Admin"
// 引入样式文件App.css
import "./App.css"

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Switch>
          {/* Switch表示每一个时间点只去匹配其中一个路由 */}
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Admin}></Route>        
        </Switch>
      </div>
    )
  }
}
