import React, { Component } from 'react';
import { Card, Table, Button, message, Modal } from "antd";
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import "./index.css";

import { reqCategorys } from "../../api/index";

export default class Category extends Component {
  state = {
    loading: false, // 是否展示加载动画
    categorys: [],
    parentId: "0", // 当前需要显示的分类列表的parentId
    parentName: "", // 当前需要显示的分类列表的parentName
    subCategorys: [], //子分类列表
  }
  // 初始化Table所有列的数组
  initColumns = () => {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name', // 指定数据对应的属性名
        key: 'name',
      },
      {
        title: '操作',
        width: 300,
        key: 'action',
        // 返回需要显示的界面标签
        //- category 获取当前行的数据
        render: (category) => {
          const _this = this;
          return (
            <div className='category-action'>
              <a href='javascrip:'>修改分类</a>
              {/* 如何向事件回调函数传递参数:先定义一个匿名函数,在函数调用处理的函数并传入数据 */}
              {
                _this.state.parentId === '0' ? <a href='javascrip:' onClick={() => {this.showSubCategorys(category)}}>查看子分类</a> : null
              }
            </div>
          )
        }
      }
    ];
  }
  // 异步获取一级/二级分类列表显示
  getCategorys = async (parentId) => {
    // 在获取数据之前加载动画
    this.setState({
      loading: true
    })
    const result = await reqCategorys(parentId);
    // console.log(result);
    // 在请求结束后,隐藏loading动画
    this.setState({
      loading: false
    })
    if (result.status === 0) {
      // 取出分类数组(可能是一级的 也可能是二级的)
      const categorys = result.data;
      // 请求成功
      if(this.state.parentId === "0"){
        // 更新一级分类状态
        this.setState({
          categorys
        })
      }
      else{
        this.setState({
          subCategorys: categorys
        })
      }
    }
    else {
      message.error("请求数据失败!");
    }
  }
  // 显示指定一级分类对象的二级列表
  showSubCategorys = (category) => {
    // 更新状态
    // state的更新是异步进行的
    this.setState({
      // setState()不能立即获取最新的状态:因为setState()是异步更新状态的
      parentId: category._id,
      parentName: category.name
    },() => {
      // 获取二级分类列表
      this.getCategorys(this.state.parentId);
    })
    
  }
  // 返回一级标题
  goFirstCategory = () => {
    this.setState({
      parentId: "0",
      parentName: "",
      subCategorys: [],
    },() => {
      this.getCategorys(this.state.parentId);
    })
  }
  UNSAFE_componentWillMount() {
    this.initColumns();
  }
  componentDidMount() {
    this.getCategorys();
  }
  render() {
    const { loading, categorys, subCategorys, parentId, parentName } = this.state;
    // card的左侧标题
    const title = parentId === "0" ? "一级分类标题" : (
      <div className='category-title'>
        <a href='jacascrip:' onClick={this.goFirstCategory}>一级分类列表</a>
        <ArrowRightOutlined />
        <span>{parentName}</span>
      </div>
    );
    // card的右侧
    const extra = (
      <Button type="primary">
        <PlusOutlined />
        添加
      </Button>
    )
    return <div>
      <Card title={title} extra={extra} style={{ width: "100%" }}>
        <Table
          bordered
          rowKey="_id"
          loading={loading} // 添加加载动画
          dataSource={parentId === "0" ? categorys : subCategorys}
          columns={this.columns}
          pagination={{ defaultPageSize: 5, showQuickJumper: true }} // 设置默认每页的列数
        ></Table>
      </Card>
    </div>;
  }
}
