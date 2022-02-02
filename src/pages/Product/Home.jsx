// 商品管理的首页
import React, { Component } from 'react';
import { Card, Button, Select, Input, Table, message } from "antd";
import { PlusOutlined } from '@ant-design/icons';

import { reqProducts, reqSearchProducts, reqUpdateStatus } from "../../api/index";

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
        const _this = this;
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
                width: 100,
                render: (product) => {
                    const {status,_id} = product;
                    const newStatus = status === 1 ? 2 : 1;
                    return (
                        <div>
                            <Button 
                                type='primary' 
                                onClick={() => _this.updateStatus(_id,newStatus)}
                            >{status === 1 ? "下架" : "上架"}</Button>
                            <span>{status === 1 ? "在售" : "已下架"}</span>
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
                            <a 
                                href='jacascript:;' 
                                onClick={() => {this.props.history.push("/products/product/detail",{product})}} 
                            >详情</a>
                            <br />
                            <a href='jacascript:;' onClick={() => this.props.history.push("/products/product/addupdate",product)}>修改</a>
                        </span>
                    )
                }
            }
        ];
    }
    // 获取指定页码的列表数据显示
    getProducts = async (pageNum) => {
        this.pageNum = pageNum; // 保存pageNum, 让其他方法可以看到
        this.setState({
            loading: true // 显示loading
        })
        let result;
        const {searchName,searchType} = this.state;
        if(searchName){
            // 如果搜索框有内容,展示搜索后的内容
            result = await reqSearchProducts({pageNum,pageSize:3,searchName,searchType});
        }
        else{
            result = await reqProducts(pageNum, 3);
        }
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
    // 更新商品状态(上架/下架)
    updateStatus = async (id,status) => {
        const result = await reqUpdateStatus(id,status);
        // console.log(result);
        if(result.status === 0){
            message.success("更新商品状态成功");
            this.getProducts(this.pageNum); // 在更新状态之后,重新加载该页
        }
        else{
            message.error("更新商品状态失败");
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
                onChange={event => this.setState({searchName:event.target.value})}
            ></Input>
            <Button type="primary" onClick={() => {this.getProducts("1")}}>搜索</Button>
        </div>)
        const extra = (
            <Button type="primary" onClick={() => this.props.history.push("/product/addupdate")}>
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
