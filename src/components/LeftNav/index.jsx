// 左边导航的组件
import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import "./index.css"

import { Menu } from 'antd';

// 引入需要的图片
import logo from "../../assets/images/logo.png";

import memoryUtils from "../../utils/memoryUtils";

const { SubMenu } = Menu;

class LeftNav extends Component {
  // 展示菜单列表
  /**
   * 根据menu的数据数组生成对应的标签数组
   * 使用 map() + 递归
   */
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
        const path = this.props.location.pathname;
        // 当路由路径中包含该路径,展开该列表
        const cItem = item.child.find(cItem => path.indexOf(cItem.path) === 0);
        if(cItem){
          // 如果存在,说明当前item所对应的子列表需要打开
          this.openKey = item.id;
        }
        return (
          <SubMenu key={item.id} icon={item.icon} title={item.title}>
            {this.showMenuList(item.child)}
          </SubMenu>
        );
      }
    })
  }
  /**
   * 根据menu的数据数组生成对应的标签数组
   * 使用 reduce() + 递归
   */
  /*
  showMenuList = (menu) => {
    return menu.reduce((pre,item) => {
      // 向pre添加<Menu.Item>或者<SubMenu>
      if(!item.child){
        pre.push((
          <Menu.Item key={item.path} icon={item.icon}>
            <Link to={item.path}>{item.title}</Link>
          </Menu.Item>
        ))
      }
      else{
        pre.push((
          <SubMenu key={item.id} icon={item.icon} title={item.title}>
            {this.showMenuList(item.child)}
          </SubMenu>
        ))
      }
      return pre;
    },[])
  }
  */
  UNSAFE_componentWillMount(){
    this.menuNodes = this.showMenuList(memoryUtils.menu);
  }
  render() {
    // 获取当前路径
    let {pathname} = this.props.location;
    if(pathname.indexOf("/product") === 0){
      // 当前请求的是商品或者其子路由
      pathname = "/product";
    }
    return <div className='left-nav'>
      <Link to="/home">
        <header className='left-nav-header'>
          <img src={logo} alt='logo'></img>
          <h1>谷粒后台</h1>
        </header>
        <div style={{ width: 200 }}>
          <Menu
            selectedKeys={[pathname]}
            defaultOpenKeys={[this.openKey]}
            mode="inline"
            theme="dark"
            inlineCollapsed={false}
          >
            {
              this.menuNodes
            }
          </Menu>
        </div>
      </Link>

    </div>;
  }
}

export default withRouter(LeftNav);