import React, { Component } from 'react';
import {Card, Button, Table} from "antd";

export default class Role extends Component {
  state = {
    roles: [
      {
        _id: "615460e56c953e4154864d9",
        name: "zjh",
        create_time: 1632919781008,
        auth_time: 1633066455837,
        auth_name: "admin"
      },
      {
        _id: "615460e56c95548645d9",
        name: "zjh",
        create_time: 1632919781008,
        auth_time: 1633066455837,
        auth_name: "admin"
      },
      {
        _id: "615460e56c953e41548645d9",
        name: "zjh",
        create_time: 1632919781008,
        auth_time: 1633066455837,
        auth_name: "admin"
      },
      {
        _id: "615460e8154864d9",
        name: "zjh",
        create_time: 1632919781008,
        auth_time: 1633066455837,
        auth_name: "admin"
      },
      {
        _id: "615460e56c98864d9",
        name: "zjh",
        create_time: 1632919781008,
        auth_time: 1633066455837,
        auth_name: "admin"
      },
      {
        _id: "615460e56c953e415489",
        name: "zjh",
        create_time: 1632919781008,
        auth_time: 1633066455837,
        auth_name: "admin"
      },
      {
        _id: "615460e564864d9",
        name: "zjh",
        create_time: 1632919781008,
        auth_time: 1633066455837,
        auth_name: "admin"
      },
      {
        _id: "615460e56c953e4164d9",
        name: "zjh",
        create_time: 1632919781008,
        auth_time: 1633066455837,
        auth_name: "admin"
      },
      {
        _id: "615460e5653e4154864d9",
        name: "zjh",
        create_time: 1632919781008,
        auth_time: 1633066455837,
        auth_name: "admin"
      },
    ], // 角色列表
  }
  // 初始化Table所有列的数组
  initColumns = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name', // 指定数据对应的属性名
        key: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        key: 'auth_time',
      },
      {
        title: '授权人',
        dataIndex: "auth_name",
        key: "auth_name",
      }
    ];
  }
  UNSAFE_componentWillMount(){
    this.initColumns();
  }
  render() {
    const {roles} = this.state;
    const title = (<span>
      <Button type="primary">创建角色</Button>
      &nbsp; &nbsp; 
      <Button type="primary" disabled>设置角色权限</Button>
    </span>);
    return <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          // loading={loading} // 添加加载动画
          onRow={this.onRow} // 点击某一行时的回调函数
          dataSource={roles}
          columns={this.columns}
          rowSelection={{type:"radio"}}
          pagination={{ defaultPageSize: 5, showQuickJumper: true }} // 设置默认每页的列数
        ></Table>
    </Card>;
  }
}
