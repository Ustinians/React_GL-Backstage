import React, { Component } from 'react';
import {List,Card} from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';

import {reqCategory} from "../../api/index";

export default class ProductDetail extends Component {
  state = {
    cName1: "",
    cName2: "",
  }

  async componentDidMount(){
    const {pCategoryId,categoryId} = this.props.location.state.product;
    // reqCategory
    if(pCategoryId === "0"){
      const result = await reqCategory(categoryId);
      const cName1 = result.data.name;
      this.setState({
        cName1
      })
    }
    else{
      // 一次性发送多个请求,只有都成功了,才正常处理
      const results = await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)]);
      const cName1 = results[0].data.name;
      const cName2 = results[1].data.name;
      this.setState({
        cName1,
        cName2
      })
    }
  }
  
  render() {
    // 读取携带过来的state数据
    const {product} = this.props.location.state;
    const {cName1,cName2} = this.state;
    // const BASE_IMG_URL = "http://localhost:5000/upload"
    const title = (
      <span>
        <a 
          href='_blank'
          onClick={() => this.props.history.goBack()}  
        ><ArrowLeftOutlined style={{color:"#1890ff",marginRight:10}} /></a>
        <span>商品详情</span>
      </span>
    )
    return <Card title={title} className='product-detail'>
      <List>
        <List.Item>
          <span className='left'>商品名称:</span>
          <span>{product.name}</span>
        </List.Item>
        <List.Item>
          <span className='left'>商品描述:</span>
          <span>{product.desc}</span>
        </List.Item>
        <List.Item>
          <span className='left'>商品价格:</span>
          <span>{product.price}元</span>
        </List.Item>
        <List.Item>
          <span className='left'>所属分类:</span>
          {
            cName2 ? (<span>{cName1} --&gt; {cName2}</span>) : (<span>{cName1}</span>)
          }
        </List.Item>
        <List.Item>
          <span className='left'>商品图片:</span>
          {
            product.imgs.length === 0 ? (<span>暂无图片</span>) : (<span>
            {
              product.imgs.map(item => (<img 
                alt={item} 
                key={item} 
                src={`http://localhost:5000/upload/${item}`}
                style={{height:80}}  
              ></img>))
            }
          </span>)
          }
        </List.Item>
        <List.Item>
          <span className='left'>商品详情:</span>
          {/* dangerouslySetInnerHTML: 渲染html元素 */}
          {
            product.detail ? (<span dangerouslySetInnerHTML={{__html: product.detail}}></span>) : (<span>暂无详情</span>)
          }
        </List.Item>
      </List>
    </Card>;
  }
}
