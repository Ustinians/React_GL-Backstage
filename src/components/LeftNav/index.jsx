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
  // 判断当前登录用户权限菜单中是否包含当前项
  hasAuth = (item) => {
    const key = item.key;
    const menus = memoryUtils.user.role.menus;
    const username = memoryUtils.user.username;
    // 1. 如果当前用户是admin(超级管理用户) --> 直接通过
    // 2. 如果当前item是公开的(isPublic为true) --> 通过√
    // 3. 如果当前用户有此item的权限
    if(username === "admin" || item.isPublic || menus.indexOf(key) !== -1){
      return true;
    }
    else if(item.children){
      // 4. 如果当前用户有此item的某个子item的权限
      return !!item.children.find(child => menus.indexOf(child.key) !== -1); // 强制返回为布尔值
    }
    return false;
  }
  // 展示菜单列表
  /**
   * 根据menu的数据数组生成对应的标签数组
   * 使用 map() + 递归
   */
  /*
  showMenuList = (menu) => {
    return menu.map(item => {
      // 如果没有子菜单项
      if(!item.children){
        return (
          <Menu.Item key={item.path} icon={item.icon}>
            <Link to={item.path}>{item.title}</Link>
          </Menu.Item>
        );
      }
      else{
        const path = this.props.location.pathname;
        // 当路由路径中包含该路径,展开该列表
        const cItem = item.children.find(cItem => path.indexOf(cItem.path) === 0);
        if(cItem){
          // 如果存在,说明当前item所对应的子列表需要打开
          this.openKey = item.key;
        }
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.showMenuList(item.children)}
          </SubMenu>
        );
      }
    })
  }
  */
  /**
   * 根据menu的数据数组生成对应的标签数组
   * 使用 reduce() + 递归
   */
  
  showMenuList = (menu) => {
    return menu.reduce((pre,item) => {
      // 向pre添加<Menu.Item>或者<SubMenu>
      if(this.hasAuth(item)){
        if(!item.children){
          pre.push((
            <Menu.Item key={item.path} icon={item.icon}>
              <Link to={item.path}>{item.title}</Link>
            </Menu.Item>
          ))
        }
        else{
          pre.push((
            <SubMenu key={item.id} icon={item.icon} title={item.title}>
              {this.showMenuList(item.children)}
            </SubMenu>
          ))
        }
      }
      return pre;
    },[])
  }
  
  UNSAFE_componentWillMount(){
    this.menuNodes = this.showMenuList(memoryUtils.menu);
  }
  render() {
    // 获取当前路径
    let {pathname} = this.props.location;
    if(pathname.indexOf("/products/product") === 0){
      // 当前请求的是商品或者其子路由
      pathname = "/products/product";
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