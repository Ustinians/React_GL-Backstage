import React, { Component } from 'react';
import {Card, Button, Table, message, Modal, Form, Input, Select} from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';

import {reqUsers,reqDeleteUser} from "../../api/index";
import {formateDate} from "../../utils/dateUtils";

export default class UserRole extends Component {
  state = {
    loading: false,
    users: [],
    roles: [], // 角色列表
    showStatus: 0, // 是否展示修改用户弹窗
    roleNames: {}, // 角色名称列表
  }
  user = React.createRef();
  // 展示创建用户的弹窗
  showAddOrUpdate= () => {
    this.setState({
      showStatus: 1
    })
  }
  // 初始化Table所有列的数组
  initColumns = () => {
    // const _this = this;
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
        render: create_time => formateDate(create_time)
      },
      {
        title: "所属角色",
        dataIndex: "role_id",
        key: "role_id",
        render: (role_id) => this.state.roles.find(role => role._id === role_id).name // 找到_id值与当前role_id值
      },
      {
        title: "操作",
        key: "action",
        render: (user) => {
          return (
            <div>
              <a href='javascrip:' onClick={this.showAddOrUpdate}>修改</a> &nbsp;  &nbsp;
              <a href='javascrip:' onClick={() => this.deleteUser(user)}>删除</a>
            </div>
          )
        }
      }
    ];
  }
  // 初始化角色名称列表
  initRoleNames = (roles) => {
    const roleNames = roles.reduce((pre,role) => {
      pre[role._id] = role.name;
      return pre;
    },{});
    this.setState({
      roleNames
    })
  }
  // 获取用户列表
  getUsers = async () => {
    const result = await reqUsers();
    if(result.status === 0){
      this.setState({
        users: result.data.users,
        roles: result.data.roles
      })
      this.initRoleNames(result.data.roles);
    } 
    else{
      message.error("获取用户列表失败!");
    }
  }
  // 删除用户
  deleteUser = (user) => {
    const _this = this;
    Modal.confirm({
      title: `确定要删除${user.username}吗?`,
      icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',
      async onOk() {
        // console.log('OK');
        const result = await reqDeleteUser(user._id);
        if(result.status === 0){
          message.success("删除成功!");
          _this.getUsers();
        }
        else{
          message.error("删除失败!");
        }
      },
      onCancel() {
        console.log('用户取消了删除操作');
      },
    });
  }
  // 表单提交失败的回调
  onFinishFailed = (errorInfo) => {
    message.error('Failed:', errorInfo);
  };
  // 添加用户/修改用户
  addOrUpdateUser = () => {
    console.log("添加/修改用户成功");
  }
  handleCancel = () => {
    this.setState({
      showStatus: 0
    })
  }
  // 选择器函数
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  UNSAFE_componentWillMount(){
    this.initColumns();
  }
  componentDidMount(){
    this.getUsers();
  }
  render() {
    const {users,showStatus,roleNames} = this.state;
    const title = (<Button type="primary" onClick={this.showAddOrUpdate}>创建用户</Button>);
    const formItemLayout = {
      labelCol: {span:5},
      wrapperCol: {span:15}
    }
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
        {/* 修改用户 */}
        <Modal 
          title="修改用户" 
          visible={showStatus === 1} 
          onOk={this.addOrUpdateUser} 
          onCancel={this.handleCancel}
        >
          <Form 
            {...formItemLayout}
            ref={this.user}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item name="name" label="用户名">
              <Input placeholder='请输入用户名'></Input>
            </Form.Item>
            <Form.Item name="password" label="密码">
              <Input placeholder='请输入密码'></Input>
            </Form.Item>
            <Form.Item name="phone" label="手机号">
              <Input placeholder='请输入手机号'></Input>
            </Form.Item>
            <Form.Item name="email" label="邮箱">
              <Input placeholder='请输入邮箱号'></Input>
            </Form.Item>
            <Form.Item name="role_id" label="角色">
              <Select onChange={this.handleChange}>
                <Select.Option value="1">A</Select.Option>
                <Select.Option value="2">B</Select.Option>
                <Select.Option value="3">C</Select.Option>
              </Select>
            </Form.Item>
        </Form>
        </Modal>
    </Card>;
  }
}
