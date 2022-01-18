// 登陆的路由组件
import React, { Component } from 'react'
// 引入样式文件
import "./index.css"
// 引入需要的图片
import logo from "./images/logo.png"
// 需要的Antd组件
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default class Login extends Component {
    onFinish = (values) => {
        console.log('提交Ajax请求: ', values);
    };
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    render() {
        return (
            <div className='login'>
                {/* 头部 */}
                <header className='login-header'>
                    <img src={logo} alt="logo"></img>
                    <h1>React项目: 后台管理系统</h1>
                </header>
                {/* 中间部分 */}
                <section className='login-content'>
                    <h2>用户登陆</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item
                            name="username"
                            // 对表单进行限制
                            rules={[
                                { required: true, whitespace: true, message: '用户名不能为空!' },
                                { min: 4, message: "用户名不能少于4位!" },
                                { max: 12, message: "用户名不能超过12位!" },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: "用户名必须由英文,数字和下划线组成!" }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                // 声明式验证
                                { required: true, whitespace: true, message: '密码不能为空!' },
                                { min: 4, message: "密码不得少于4位!" },
                                { max: 12, message: "密码不得超过12位!" },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: "密码必须由英文,数字和下划线组成!" }
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登 &nbsp; &nbsp; &nbsp; 录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
