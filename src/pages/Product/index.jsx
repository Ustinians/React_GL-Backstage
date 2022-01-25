// 商品管理的首页
import React, { Component } from 'react';
import {Switch,Route,Redirect} from "react-router-dom";

// 引入需要的路由组件
import ProductHome from "./Home";
import ProductDetail from './Detail';
import ProductAddUpdate from './AddUpdate';

export default class Product extends Component {
  render() {
    return <Switch>
      {/* 配置路由 */}
      <Route path="/product" exact component={ProductHome}></Route>
      <Route path="/product/addupdate" component={ProductAddUpdate}></Route>
      <Route path="/product/detail" component={ProductDetail}></Route>
      <Redirect to="/product"></Redirect>
    </Switch>;
  }
}
