// 商品管理的首页
import React, { Component } from 'react';
import { Card, Button, Select, Input, Table, message } from "antd";
import { PlusOutlined } from '@ant-design/icons';

import { reqProducts } from "../../api/index";

export default class ProductHome extends Component {
    state = {
        products: [],
        total: "",
        list: "",
        loading: false,
        searchName:"", // 搜索内容
        searchType:"productName", // 搜索类型 默认按照商品名称搜索 productName / productDesc
    }
    // 初始化Table的列的数组
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
                width: 100,
                render: (price) => "￥" + price
            },
            {
                title: "状态",
                dataIndex: "status",
                width: 100,
                render: (status) => {
                    return (
                        <div>
                            <Button type='primary'>下架</Button>
                            <span>在售</span>
                        </div>
                    )
                }
            },
            {
                title: "操作",
                width: 100,
                render: (product) => {
                    return (
                        <span>
                            <a href='jacascript:;'>详情</a>
                            <br />
                            <a href='jacascript:;'>修改</a>
                        </span>
                    )
                }
            }
        ];
    }
    // 获取指定页码的列表数据显示
    getProducts = async (pageNum) => {
        this.setState({
            loading: true
        })
        const result = await reqProducts(pageNum, 3);
        this.setState({
            loading: false
        })
        if (result.status === 0) {
            // 请求成功
            const { total, list } = result.data;
            this.setState({
                total,
                products: list
            })
        }
        else {
            message.error()
        }
    }
    UNSAFE_componentWillMount() {
        this.initColumns();
    }
    componentDidMount() {
        this.getProducts(1);
    }
    render() {
        const { products, total, loading,searchType,searchName } = this.state;
        const title = (<div className='product-title'>
            <Select 
                value={searchType} 
                style={{ width: 150 }}
                onChange={value => this.setState({searchType:value})}
            >
                <Select.Option value="productName">按名称搜索</Select.Option>
                <Select.Option value="productDesc">按描述搜索</Select.Option>
            </Select>
            <Input 
                placeholder='关键字' 
                style={{ width: 150, margin: "0 10px" }}
                value={searchName}
                onChange={value => this.setState({searchType:value})}
            ></Input>
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
                    loading={loading}
                    // loading={loading} // 添加加载动画
                    dataSource={products}
                    columns={this.columns}
                    pagination={{
                        total,
                        defaultPageSize: 3,
                        showQuickJumper: true,
                        onChange: (pageNum) => { this.getProducts(pageNum) }
                    }} // 设置默认每页的列数
                ></Table>
            </Card>
        </div>;
    }
}
