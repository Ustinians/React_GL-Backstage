import React, { Component } from 'react';
import {Card, Button, Table, message, Modal, Form, Input, Tree} from "antd";
import {reqRoles,reqAddRole,reqUpdateRole} from "../../api/index";
// import { formateDate } from "../../utils/dateUtils";
import memoryUtils from "../../utils/memoryUtils";

export default class Role extends Component {
  state = {
    loading: false,
    roles: [], // 角色列表
    role: {}, // 被选中的角色
    showStatus: 0, // 控制创建角色框的显示与隐藏
    treeData: [{
      title: "平台权限",
      key: "all",
      children: memoryUtils.menu
    }],
    checkedKeys: [], // 被选中的菜单项
  }
  addf = React.createRef();
  // 点击某一行时的回调函数
  onRow = (role) => {
    return {
      // 配置事件监听函数
      onClick: event => {
        // console.log(role,event);
        this.setState({
          role // 设置被选中的行
        });

      }
    }
  }
  // 显示添加角色弹窗
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }
  // 显示设置角色权限的弹窗
  showSetRole = () => {
    const {role} = this.state;
    this.setState({
      showStatus: 2,
      checkedKeys: role.menus
    })
  }
  // 点击取消事件
  handleAddCancel = () => {
    this.setState({
      showStatus: 0
    })
    this.addf.current.resetFields();
  }
  handleSetCancel = () => {
    this.setState({
      showStatus: 0
    })
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
  // 获取角色列表的函数
  getRoles = async () => {
    this.setState({
      loading: true
    })
    const result = await reqRoles();
    this.setState({
      loading: false
    })
    if(result.status === 0){
      // message.success("获取角色列表成功");
      const roles = result.data;
      this.setState({
        roles
      });
    }
    else{
      message.error("获取角色列表失败");
    }
  }
  // 添加角色时间
  addRole = async () => {
    const name = this.addf.current.getFieldValue("name"); // 获取到name属性
    // console.log(name);
    const result = await reqAddRole(name);
    if(result.status === 0){
      message.success("添加角色成功!");
      this.setState({
        showStatus: 0
      })
      this.addf.current.resetFields();
      this.getRoles();
    }
    else(
      message.error("添加角色失败!")
    )
  }
  // 设置角色权限
  setRole = async () => {
    const {role,checkedKeys} = this.state;
    role.menus = checkedKeys;
    // 更新角色权限
    const result = await reqUpdateRole(role);
    console.log(result);
    if(result.status === 0){
      message.success("更新角色权限成功!");
    }
    else{
      message.error("更新角色权限失败!");
    }
  }
  // 表单提交失败的回调
  onFinishFailed = (errorInfo) => {
    message.error('Failed:', errorInfo);
  };

  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
    this.setState({
      checkedKeys
    })
  };

  UNSAFE_componentWillMount(){
    this.initColumns();
  }
  componentDidMount(){
    this.getRoles();
  }
  render() {
    const {roles,loading,role,showStatus,treeData,checkedKeys} = this.state;
    const title = (<span>
      <Button type="primary" onClick={this.showAdd}>创建角色</Button>
      &nbsp; &nbsp; 
      <Button type="primary" onClick={this.showSetRole} disabled={!role._id}>设置角色权限</Button>
    </span>);
    return <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          loading={loading} // 添加加载动画
          onRow={this.onRow} // 点击某一行时的回调函数
          dataSource={roles}
          columns={this.columns}
          rowSelection={{type:"radio",selectedRowKeys:[role._id]}}
          pagination={{ defaultPageSize: 5, showQuickJumper: true }} // 设置默认每页的列数
        ></Table>
        {/* 添加角色 */}
        <Modal 
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
        </Modal>
        {/* 设置角色权限 */}
        <Modal 
          title="设置角色分类" 
          visible={showStatus === 2} 
          onOk={this.setRole} 
          onCancel={this.handleSetCancel}
        >
          <Form
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item label="角色名称">
              <Input disabled value={role.name}></Input>
            </Form.Item>
            <Form.Item>
              <Tree
                checkable
                defaultExpandAll
                checkedKeys={checkedKeys}
                onSelect={this.onSelect}
                onCheck={this.onCheck}
                treeData={treeData}
              />
            </Form.Item>
          </Form>
        </Modal>
    </Card>;
  }
}
