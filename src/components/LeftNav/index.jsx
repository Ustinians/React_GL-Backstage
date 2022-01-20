// 左边导航的组件
import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import "./index.css"

import { Menu } from 'antd';
// import {
//   HomeOutlined,
//   ShoppingOutlined,
//   UnorderedListOutlined,
//   ShoppingCartOutlined,
//   UserOutlined,
//   SmileOutlined,
//   AreaChartOutlined,
//   BarChartOutlined,
//   LineChartOutlined,
//   PieChartOutlined
// } from '@ant-design/icons';

// 引入需要的图片
import logo from "../../assets/images/logo.png";

import memoryUtils from "../../utils/memoryUtils";

const { SubMenu } = Menu;

class LeftNav extends Component {
  // 展示菜单列表
  showMenuList = (menu) => {
    return menu.map(item => {
      // 如果没有子菜单项
      if(!item.child){
        return (
          <Menu.Item key={item.path} icon={item.icon}>
            <Link to={item.path}>{item.title}</Link>
          </Menu.Item>
        );
      }
      else{
        return (
          <SubMenu key={item.id} icon={item.icon} title={item.title}>
            {this.showMenuList(item.child)}
          </SubMenu>
        );
      }
    })
  }
  render() {
    // 获取当前路径
    const {pathname} = this.props.location;
    return <div className='left-nav'>
      <Link to="/home">
        <header className='left-nav-header'>
          <img src={logo} alt='logo'></img>
          <h1>谷粒后台</h1>
        </header>
        <div style={{ width: 200 }}>
          <Menu
            defaultSelectedKeys={pathname}
            // defaultOpenKeys={"002"}
            mode="inline"
            theme="dark"
            inlineCollapsed={false}
          >
            {
              this.showMenuList(memoryUtils.menu)
            }
          </Menu>
        </div>
      </Link>

    </div>;
  }
}

export default withRouter(LeftNav);