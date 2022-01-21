import React, { Component } from 'react';
import {Card,Table,Button} from "antd";
import { PlusOutlined } from '@ant-design/icons';

const dataSource = [
  {
    "parentId": "0",
    "_id": "614dbf6f75f5cc30981c67a9",
    "name": "电子设备",
    "__v": 0
  },
  {
    "parentId": "0",
    "_id": "614dbf7275f5cc30981c67aa",
    "name": "学习用品",
    "__v": 0
  },
  {
    "parentId": "0",
    "_id": "614dbf7375f5cc30981c67ab",
    "name": "日用品",
    "__v": 0
  },
  {
    "parentId": "0",
    "_id": "614dbfdb75f5cc30981c67ac",
    "name": "家用电器",
    "__v": 0
  },
  {
    "parentId": "0",
    "_id": "614dbfee75f5cc30981c67ad",
    "name": "婴儿用品",
    "__v": 0
  }
];

const columns = [
  {
    title: '分类名称',
    dataIndex: 'name', // 指定数据对应的属性名
    key: 'name',
  },
  {
    title: '操作',
    width: 300,
    key: 'action',
    // 返回需要显示的界面标签
    render: () => (
      <div>
        <a href='javascrip:'>添加</a>
        &nbsp;&nbsp;&nbsp;
        <a href='javascrip:'>修改</a>
      </div>
    )
  }
];

export default class Category extends Component {
  render() {
    // card的左侧标题
    const title = "一级分类标题";
    // card的右侧
    const extra = (
      <Button type="primary">
        <PlusOutlined />
        添加
      </Button>
    )
    return <div>
        <Card title={title} extra={extra} style={{ width: "100%" }}>
          <Table 
            bordered
            rowKey="_id"
            dataSource={dataSource} 
            columns={columns}
          ></Table>
        </Card>
    </div>;
  }
}
