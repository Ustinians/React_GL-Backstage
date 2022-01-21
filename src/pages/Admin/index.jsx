// 后台管理的路由组件
import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from "antd"
import "./index.css"

// 引入需要的路由组件
import Home from "../Home"; // 首页
import Category from "../Category"; // 品类管理
import Product from "../Product"; // 商品管理
import User from "../User"; // 用户管理
import Role from "../Role"; //角色管理
import Bar from "../Charts/bar"; // 柱状图
import Line from "../Charts/line"; // 折线图
import Pie from "../Charts/pie"; // 扇形图

// 引入需要的子组件
import LeftNav from "../../components/LeftNav";
import Header from "../../components/Header";

import memoryUtils from "../../utils/memoryUtils";

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
    render() {
        const user = memoryUtils.user;
        // 如果memoryUtils中没有存储user ==> 当前没有登陆
        if (!user || !user._id) {
            // 如果当前没有登陆,自动跳转到登陆界面
            this.props.history.replace("/login");
            // return <Redirect to="/login" />
        }
        return (
            <div className='admin'>
                <Layout style={{height:"100%"}}>
                    <Sider>
                        {/* 左边导航栏部分 */}
                        <LeftNav></LeftNav>
                    </Sider>
                    <Layout>
                        {/* 头部 */}
                        <Header></Header>
                        {/* 中间部分 */}
                        <Content style={{backgroundColor:"#fff",margin:"20px"}}>
                            <Switch>
                                <Route path="/home" component={Home}></Route>
                                <Route path="/category" component={Category}></Route>
                                <Route path="/product" component={Product}></Route>
                                <Route path="/user" component={User}></Route>
                                <Route path="/role" component={Role}></Route>
                                <Route path="/charts/bar" component={Bar}></Route>
                                <Route path="/charts/line" component={Line}></Route>
                                <Route path="/charts/pie" component={Pie}></Route>
                                <Redirect to="/home"></Redirect>
                            </Switch>
                        </Content>
                        <Footer style={{textAlign:"center",color:"#999"}}>
                            推荐使用谷歌浏览器,可以获得更佳的页面操作效果
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
