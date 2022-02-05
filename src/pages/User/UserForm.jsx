import React, { PureComponent } from 'react'
import { Form, Select, Input } from 'antd'
import PropTypes from 'prop-types'
const Option = Select.Option
// 添加/修改用戶的组件
export default class UserForm extends PureComponent {
    form = React.createRef();
    static propTypes = {
        // 用来传递Form对象的函数
        setForm: PropTypes.func.isRequired,
        roles: PropTypes.array.isRequired,
        user: PropTypes.object,
    }
    UNSAFE_componentWillMount() {
        this.props.setForm(this.form)
    }
    render() {
        // console.log(this.form);
        const formItemLayout = {
            labelCol: { span: 4 }, // 左侧label的宽度
            wrapperCol: { span: 18 } // 指定右侧包裹的宽度
        };
        const { roles, user } = this.props
        // const user = this.props.user || {}
        console.log(user);
        return (
            <Form
                {...formItemLayout}
                ref={this.form}
            >
                <Form.Item
                    name="username"
                    label="用戶名"
                    // 初始值
                    initialValue={user.username}
                    rules={[
                        { required: true, message: '用戶名不能为空!' }
                    ]}
                >
                    <Input placeholder="请输入用戶名称"></Input>
                </Form.Item>
                {
                    user._id ? null : (
                        <Form.Item
                            name="password"
                            label="密码"
                            // 初始值
                            initialValue={user.password}
                            rules={[
                                { required: true, message: '密码不能为空!' }
                            ]}
                        >
                            <Input type='password' placeholder="请输入密码"></Input>
                        </Form.Item>
                    )
                }

                <Form.Item
                    name="phone"
                    label="手机号"
                    // 初始值
                    initialValue={user.phone}
                >
                    <Input placeholder="请输入手机号"></Input>
                </Form.Item>
                <Form.Item
                    name="email"
                    label="邮箱"
                    // 初始值
                    initialValue={user.email}
                >
                    <Input placeholder="请输入邮箱"></Input>
                </Form.Item>
                <Form.Item
                    name="role_id"
                    label="角色"
                    // 初始值
                    initialValue={user.role_id}
                >
                    <Select>
                        {
                            roles.map(role => (
                                <Option key={role._id} value={role._id}>
                                    {role.name}
                                </Option>
                            ))
                        }
                    </Select>
                </Form.Item>
            </Form>
        )
    }
}
