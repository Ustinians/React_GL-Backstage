import React, { Component } from 'react';
import {Card, Button, Table, message, Modal, Form, Input} from "antd";

import {reqUsers} from "../../api/index";

export default class UserRole extends Component {
  state = {
    loading: false,
    users: []
  }
  // 初始化Table所有列的数组
  initColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username', // 指定数据对应的属性名
        key: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '注册时间',
        dataIndex: "create_time",
        key: "create_time",
      },
      {
        title: "所属角色",
        dataIndex: "role_id",
        key: "role_id"
      },
      {
        title: "操作",
        key: "action",
        render: () => {
          return (
            <div>
              <a href='javascrip;'>修改</a>
              <a href='javascrip;'>操作</a>
            </div>
          )
        }
      }
    ];
  }
  // 获取用户列表
  getUsers = async () => {
    const result = await reqUsers();
    if(result.status === 0){
      this.setState({
        users: result.data.users
      })
    } 
  }
  // 表单提交失败的回调
  onFinishFailed = (errorInfo) => {
    message.error('Failed:', errorInfo);
  };

  UNSAFE_componentWillMount(){
    this.initColumns();
  }
  componentDidMount(){
    this.getUsers();
  }
  render() {
    const {users} = this.state;
    const title = (<span>
      <Button type="primary" onClick={this.showAdd}>创建用户</Button>
    </span>);
    return <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          // loading={loading} // 添加加载动画
          // onRow={this.onRow} // 点击某一行时的回调函数
          dataSource={users}
          columns={this.columns}
          pagination={{ defaultPageSize: 5, showQuickJumper: true }} // 设置默认每页的列数
        ></Table>
        {/* 添加角色 */}
        {/* <Modal 
          title="添加分类" 
          visible={showStatus === 1} 
          onOk={this.addRole} 
          onCancel={this.handleAddCancel}
        >
          <Form 
            ref={this.addf}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item name="name">
              <Input placeholder='请输入角色名称'></Input>
            </Form.Item>
        </Form>
        </Modal> */}
    </Card>;
  }
}
