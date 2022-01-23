import React, { Component } from 'react';
import { Card, Button, Select, Input, Table } from "antd";
import { PlusOutlined } from '@ant-design/icons';

export default class Product extends Component {
  state = {
    product: [
      {
        name: "联想",
        desc: "iueaxnrygccstuexakmirismiryaxosyrie",
        price: "$999",
        state: "BiuBiu",
        action: "Action"
      },
      {
        name: "联想",
        desc: "iueaxnrygccstuexakmirismiryaxosyrie",
        price: "$999",
        state: "BiuBiu",
        action: "Action"
      },
      {
        name: "联想",
        desc: "iueaxnrygccstuexakmirismiryaxosyrie",
        price: "$999",
        state: "BiuBiu",
        action: "Action"
      },
      {
        name: "联想",
        desc: "iueaxnrygccstuexakmirismiryaxosyrie",
        price: "$999",
        state: "BiuBiu",
        action: "Action"
      },
      {
        name: "联想",
        desc: "iueaxnrygccstuexakmirismiryaxosyrie",
        price: "$999",
        state: "BiuBiu",
        action: "Action"
      },
      {
        name: "联想",
        desc: "iueaxnrygccstuexakmirismiryaxosyrie",
        price: "$999",
        state: "BiuBiu",
        action: "Action"
      },
    ]
  }
  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name', // 指定数据对应的属性名
        key: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc', // 指定数据对应的属性名
        key: 'desc'
      },
      {
        title: "价格",
        dataIndex: "price",
        key: "price"
      },
      {
        title: "状态",
        dataIndex: "state",
        key: "state"
      },
      {
        title: "操作",
        dataIndex: "action",
        key: "action"
      }
    ];
  }
  UNSAFE_componentWillMount(){
    this.initColumns();
  }
  render() {
    const title = (<div className='product-title'>
      <Select style={{width: 100,marginRight: 10}}>
        <Select.Option value="0">按名称搜索</Select.Option>
        <Select.Option value="1">搜索1</Select.Option>
        <Select.Option value="2">搜索2</Select.Option>
        <Select.Option value="3">搜索3</Select.Option>
      </Select>
      <Input placeholder='关键字' style={{width: 150, marginRight: 10}}></Input>
      <Button type="primary">搜索</Button>
    </div>)
    const extra = (
      <Button type="primary">
        <PlusOutlined />
        <span>添加商品</span>
      </Button>
    )
    return <div className='product'>
      <Card title={title} extra={extra} style={{ width: "100%" }}>
        <Table
          bordered
          rowKey="name"
          // loading={loading} // 添加加载动画
          dataSource={this.state.product}
          columns={this.columns}
          pagination={{ defaultPageSize: 5, showQuickJumper: true }} // 设置默认每页的列数
        ></Table>
      </Card>
    </div>;
  }
}
