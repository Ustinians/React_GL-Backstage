// 商品管理的首页
import React, { Component } from 'react';
import {Switch,Route,Redirect} from "react-router-dom";
import "./index.css"

// 引入需要的路由组件
import ProductHome from "./Home";
import ProductDetail from './Detail';
import ProductAddUpdate from './AddUpdate';

export default class Product extends Component {
  render() {
    return <Switch>
      {/* 配置路由 */}
      <Route path="/products/product" exact component={ProductHome}></Route>
      <Route path="/products/product/addupdate" component={ProductAddUpdate}></Route>
      <Route path="/products/product/detail" component={ProductDetail}></Route>
      <Redirect to="/products/product"></Redirect>
    </Switch>;
  }
}
