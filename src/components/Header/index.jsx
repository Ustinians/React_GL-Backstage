import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import "./index.css"
import { message, Modal } from "antd"
import { ExclamationCircleOutlined } from '@ant-design/icons';
import LinkButton from "../../components/LinkButton"

import memoryUtils from "../../utils/memoryUtils";
import { formateDate } from "../../utils/dateUtils";
import storageUtils from "../../utils/storageUtils.js"

class Header extends Component {
  state = {
    address: "",
    weather: "",
    nowTime: formateDate(Date.now())
  }

  // 获取当前路径对应的标题
  getNowTitle = () => {
    let title;
    const {pathname} = this.props.location;
    // 遍历找到对应的标题
    memoryUtils.menu.forEach(item => {
      if(item.path && item.path === pathname){
        title = item.title;
      }
      if(item.child){
        // 如果该菜单项下面有子菜单项,遍历子菜单项
        // 查找有没有对应的菜单项
        const cItem = item.child.find(cItem => pathname.indexOf(cItem.path) === 0);
        if(cItem){
          title = cItem.title;
        }
      }
    })
    return title;
  }

  // 退出登陆功能
  isExit = () => {
    const _this = this;
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: "确定要退出吗ψ(._. )>",
      onOk() {
        console.log("用户退出了系统o(〃＾▽＾〃)o");
        message.success("退出登录成功o(〃＾▽＾〃)o")
        // 将内存中的user变为空
        memoryUtils.user = {};
        // 清除local中的数据
        storageUtils.removeUser();
        // 跳转到登陆界面
        _this.props.history.replace("/login");
      },
      onCancel() {
        const {username} = memoryUtils.user;
        console.log(username,'取消了退出行为§(*￣▽￣*)§');
      },
    });
  }
  

  async UNSAFE_componentWillMount() {
    let _this = this;
    await window.AMap.plugin('AMap.Weather', () => {
      //创建天气查询实例
      var weather = new window.AMap.Weather();
      //执行实时天气信息查询
      weather.getLive('成都市', function (err, data) {
        console.log(err, data);
        if (!err) {
          // 在render挂载之前获取到实时天气
          _this.setState({ weather: data.weather, address: data.province + "省" + data.city })
        }
        else {
          message.error('获取天气信息失败')
        }
      });
    });
  }
  // 设置当前时间并打开计时器
  componentDidMount(){
    this.timer = setInterval(()=>{
        this.setState({nowTime:formateDate(Date.now())})
    },1000)
  }
  // 在项目关闭之前关闭计时器
  componentWillUnmount(){
      clearInterval(this.timer);
  }
  render() {
    const { address, weather, nowTime } = this.state;
    // 获取当前的用户名
    const {username} = memoryUtils.user;
    return <div className='header'>
      <div className="header-top">
        <span>欢迎, {username}</span>
        <LinkButton onClick={this.isExit}>退出</LinkButton>
      </div>
      <div className="header-bottom">
        <div className='header-bottom-left'>{this.getNowTitle()}</div>
        <div className='header-bottom-right'>
          <span>{nowTime}</span>
          <span>{address}</span>
          <span>{weather}</span>
        </div>
      </div>
    </div>;
  }
}

export default withRouter(Header);