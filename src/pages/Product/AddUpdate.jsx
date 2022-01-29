import React, { Component } from 'react';
import {
  Card, 
  Form, 
  Input, 
  Cascader, // 级联选择
  Button,
  message
} from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';
// 引入请求函数
import {reqCategorys, reqAddProduct, reqUpdateProduct} from "../../api/index";
// 引入照片墙组件
import PicturesWall from './PicturesWall';
// 引入富文本编辑器组件
import RichTextEditor from './RichTextEditor';

export default class ProductAddUpdate extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props){
    super(props);
    // 创建用来保存ref标识的标签对象的容器
    this.pw = React.createRef();
    this.editor = React.createRef();
  }
  state = {
    options: [],
  }
  
  onFinish = async (values) => {
    // 1. 收集数据,并封装成product对象
    const {name,desc,price,categoryIds} = values;
    const imgs = this.pw.current.getImgs();
    const detail = this.editor.current.getDetail();
    let pCategoryId,categoryId;
    if(categoryIds.length === 1){
      pCategoryId = "0";
      categoryId = categoryIds[0];
    }
    else{
      pCategoryId = categoryIds[0];
      categoryId = categoryIds[1];
    }
    const product = {name,desc,price,imgs,detail,pCategoryId,categoryId};
    let result;
    // 2. 调用接口请求函数去添加/更新
    // 如果是更新,需要添加_id
    if(this.isUpdate){
      product._id = this.product._id;
      result = await reqUpdateProduct(product);
    }
    else{
      result = await reqAddProduct(product);
    }
    // 3. 根据结果提示
    console.log(result);
    if(result.status === 0){
      message.success("更新数据成功");
    }
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  // 验证价格的自定义验证函数
  validatePrice = (rule,value,callback) => {
    if(value * 1 > 0){
      callback(); // 验证通过
    }
    else{
      callback("价格必须大于0!"); // 验证没通过
    }
  }
  
  initOptions = async (categorys) => {
    // 根据categorys生成options数组
    const options = categorys.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false // 不是叶子节点
    }))
    // 如果是一个二级分类商品的更新
    const {isUpdate,product} = this;
    const {pCategoryId} = product;
    if(isUpdate && pCategoryId !== "0"){
      // 异步获取对应的二级分类列表
      const subCategorys = await this.getCategorys(pCategoryId); // 获取pCategoryId的子分类列表
      
      // 生成二级下拉列表的options
      const childOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }));
      // 找到当前商品对应的一级option对象
      const targetOption = options.find(option => option.value === pCategoryId);
      // 关联到对应的一级option上
      targetOption.children = childOptions;
    }

    // 更新options状态
    this.setState({
      options
    })
  }

  // 异步获取一级/二级分类列表,并显示
  // async函数的返回值是一个新的Promise对象,Promise的结果和值由async的结果来决定
  getCategorys = async (parentId) => {
    const result = await reqCategorys(parentId);
    if(result.status === 0){
        const categorys = result.data;
        // 如果是一级分类列表
        if(parentId === "0"){
          this.initOptions(categorys);
        }
        else{
          // 二级列表 ==>  当前async函数返回的Promise就会成功且value值为categorys
          return categorys;
        }
    }
  }


  // 用于加载下一级列表的回调函数
  loadData = async selectedOptions => {
    // 得到选择的option对象
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    // 根据选中的分类,请求获取二级分类列表
    // [异步]获取二级分类列表
    const subCategorys = await this.getCategorys(targetOption.value);
    console.log(subCategorys);
    if(subCategorys && subCategorys.length > 0){
      // 有二级分类列表
      const cOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
      // 关联到当前options上
      targetOption.children = cOptions;
    
    }
    else{
      // 当前选中的分类没有二级分类
      targetOption.isLeaf = true;
    }
    // 模拟请求异步获取二级分类列表并更新
    this.setState({
      options: [...this.state.options]
    })
  };

  UNSAFE_componentWillMount(){
    // 取出携带过来的数据
    const product = this.props.location.state;
    // 保存是否更新的标识
    this.isUpdate = !!product;
    // 保存商品,如果没有,保存的就是{}
    this.product = product || {};
  }

  componentDidMount(){
    this.getCategorys("0");
  }

  render() {
    const {isUpdate,product} = this;
    const {pCategoryId,categoryId,imgs,detail} = product;
    // 用来接受级联分类ID的数组
    const categoryIds = [];
    if(isUpdate){
      if(pCategoryId === "0"){
        // 如果商品是一个一级分类
        categoryIds.push(categoryId);
      }
      else{
        // 如果商品是一个二级分类
        categoryIds.push(pCategoryId);
        categoryIds.push(categoryId);
      }
    }
    const {options} = this.state;
    const title = (<span>
        <a 
          href='_blank'
          onClick={() => this.props.history.goBack()}  
        ><ArrowLeftOutlined style={{color:"#1890ff",marginRight:10}} /></a>
        <span>{isUpdate ? "修改商品" : "添加商品"}</span>
      </span>);
    // console.log(this.options);
    const formItemLayout = {
      labelCol: {span: 2}, // 左边label的宽度
      wrapperCol: {span: 8} // 右边包裹的宽度
    }
    return <Card title={title}>
      <Form 
        {...formItemLayout}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
        {/* 商品名称 */}
        <Form.Item 
          name="name" 
          label="商品名称"
          initialValue={product.name}
          rules={[{ required: true, message: '必须输入商品名称!' }]}  
        >
          <Input placeholder='请输入商品名称'></Input>
        </Form.Item>
        {/* 商品描述 */}
        <Form.Item 
          name="desc" 
          label="商品描述"
          initialValue={product.desc}
          rules={[{ required: true, message: '必须输入商品描述!' }]}  
        >
          <Input.TextArea showCount placeholder='请输入商品描述' />
        </Form.Item>
        {/* 商品价格 */}
        <Form.Item 
          name="price" 
          label="商品价格"
          initialValue={product.price}
          rules={[
            { required: true, message: '必须输入商品价格' },
            {validator: this.validatePrice}
          ]}  
        >
          <Input placeholder='请输入商品价格' type="number" addonAfter="元"></Input>
        </Form.Item>
        {/* 商品分类 */}
        <Form.Item 
          name="categoryIds" 
          label="商品分类" 
          initialValue={categoryIds}
          rules={[{ required: true, message: '必须指定商品分类!' }]} 
        >
          <Cascader options={options} loadData={this.loadData} />
        </Form.Item>

        <Form.Item label="商品图片">
          <PicturesWall ref={this.pw} imgs={imgs} ></PicturesWall>
        </Form.Item>
        {/* 商品详情 */}
        <Form.Item 
          label="商品详情"
          labelCol={{span: 2}}
          wrapperCol={{span: 20}}  
          detail = {detail}
        >
          <RichTextEditor ref={this.editor}></RichTextEditor>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">提交</Button>
        </Form.Item>
      
      </Form>
    </Card>
  }
}
