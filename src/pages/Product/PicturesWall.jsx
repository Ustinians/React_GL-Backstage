// 用于图片上传的组件
import React, { Component } from 'react';

import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {
  
  constructor(props){
    super(props);
    let fileList = [];
    // 如果传入了imgs属性
    const {imgs} = this.props;
    if(imgs && imgs.length > 0){
      fileList = imgs.map((img,index) => ({
        uid: -index,
        name: img,
        status: "done",
        url: "http://localhost:5000/upload/" + img
      }))
    }
    this.state = {
      previewVisible: false, // 标记是否显示大图预览界面Modal
      previewImage: '',
      previewTitle: '',
      fileList
    };
  }

  // eslint-disable-next-line no-unreachable
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  // fileList: 所有已上传图片对象的数组
  // file: 当前操作的图片对象
  handleChange = ({ file, fileList }) => {
    console.log(file.status,file,file===fileList[fileList.length-1]);
    // 一旦上传成功,将当前上传的file的选择修正(name,url)
    if(file.status === "done"){
      const result = file.response; // {status:0,data:{name:"xxx.jpg",url:"图片地址"}}
      if(result.status === 0){
        message.success("上传图片成功");
        const {name,url} = result.data;
        file.name = name;
        file.url = url;
      }
      else{
        message.error("上传图片失败");
      }
    }
    this.setState({ fileList });
  }

  // 获取所有已上传图片文件名的数组
  getImgs = () => {
    return this.state.fileList.map(file => file.name);
  }

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="/manage/img/upload" // 上传图片的接口地址
          accept="image/*" // 只接收图片类型的文件
          listType="picture-card" // 上传列表的内建样式
          name="image" // 请求参数名
          fileList={fileList} // 所有已上传图片文件的数组
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}


/**
 * 1. 子组件调用父组件的方法: 将父组件的方法以函数属性的行视传递给子组件,子组件就可以调用
 * 2. 父组件调用子组件的方法: 在父组件中通过ref得到子组件标签对象(也就是组件对象),调用其方法
 */