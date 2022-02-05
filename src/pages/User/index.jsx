import React, { Component } from 'react'
import {
    Card,
    Button,
    Table,
    Modal,
    message
} from 'antd'
import UserForm from './UserForm'
import { reqUsers, reqDeleteUser, reqAddOrUpdateUser } from '../../api/index'
import { formateDate } from '../../utils/dateUtils'
import LinkButton from '../../components/LinkButton'
/**
 * 用户管理路由
 */
export default class User extends Component {
    state = {
        users: [],
        roles: [],
        isShow: false,// 是否显示输入框
    }
    initColumns = () => {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'username'
            },
            {
                title: '邮箱',
                dataIndex: 'email'
            },
            {
                title: '电话',
                dataIndex: 'phone'
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                render: formateDate
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                render: (role_id) => this.state.roles.find(role => role._id === role_id).name
                // render:(role_id) => this.roleNames[role_id]
            },
            {
                title: '操作',
                render: (user) => {
                    return (
                        <div>
                            <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
                            <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
                        </div>
                    )
                }
            }

        ]
    }
    // 删除指定用户tay
    deleteUser = (user) => {
        Modal.confirm({
            title: `确认删除${user.name}吗?`,
            onOk: async () => {
                const result = await reqDeleteUser(user._id)
                if (result.status === 0) {
                    message.success("删除用户成功")
                    this.getUsers()
                }
            }
        })
    }
    // 显示修改页面
    showUpdate = (user) => {
        this.user = user //保存
        this.setState({
            isShow:true
        })
    }
    // 显示添加页面
    showAdd = () => {
        this.user = null
        this.setState({ isShow: true })
    }
    addOrUpdateUser = async () => {
        this.setState({ isShow: false })
        console.log(this.form);
        // 1. 收集输入数据
        const user = this.form.current.getFieldsValue()
        console.log(this.form.current.getFieldsValue());
        this.form.current.resetFields()
        // 如果是更新,需要指定id
        if(this.user){
            user._id = this.user._id
        }
        // 2. 提交添加请求
        const result = await reqAddOrUpdateUser(user)
        // 3. 更新列表显示
        // console.log(result);
        if(result.status === 0){
            message.success(`${this.user?'修改':'添加'}用户成功`)
            const users = [...this.state.users,result.data.data]
            this.setState({users})
            this.getUsers();
        }
        else{
            message.error(`${this.user?'修改':'添加'}用户失败`)
        }
    }
    /**
     * 根据role的数组,生成包含所有角色名的对象(属性名用角色id值)
     */
    initRoleNames = () => {
        const { roles } = this.state
        const roleNames = roles.reduce((pre, role) => {
            pre[role._id] = role.name
            return pre
        }, {})
        // console.log(roleNames);
        this.roleNames = roleNames
    }
    getUsers = async () => {
        const result = await reqUsers()
        // console.log(result);
        if (result.status === 0) {
            const { users, roles } = result.data
            this.initRoleNames(roles)
            this.setState({ users, roles })
        }
    }
    UNSAFE_componentWillMount() {
        this.getUsers()
        this.initColumns()
    }
    render() {
        const title = (
            <Button onClick={this.showAdd} type='primary'>
                创建用户
            </Button>
        )
        const { users, isShow, roles } = this.state;
        const user = this.user || {}
        return (
            <Card title={title}>
                <Table
                    rowKey="_id"
                    bordered
                    // 获取列表数组并存储到数据源中,展示
                    // 如何刚好解析得到categorys的name值的?
                    // 为什么通过render无法将数据传递给columns?
                    dataSource={users}
                    columns={this.columns}
                    // 每一页5个数据
                    pagination={{ defaultPageSize: 5, showQuickJumper: true }}
                />
                <Modal distoryOnClose={true} title={user._id ? "修改用户" : "添加用户"} visible={isShow} onOk={this.addOrUpdateUser} onCancel={() => {
                        this.setState({ isShow: false })
                        this.form.current.resetFields()
                        }}>
                    <UserForm
                        setForm={(form) => this.form = form}
                        roles={roles}
                        user={user}
                    />
                    {/* <div>添加/修改用户</div> */}
                </Modal>
            </Card>
        )
    }
}
// distoryOnClose={true} 