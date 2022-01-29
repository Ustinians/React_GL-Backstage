import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"


export default class RichTextEditor extends Component {
  // state = {
  //   editorState: EditorState.createEmpty(), // 创建一个空的编辑对象
  // }
  constructor(props){
    super(props);
    const {detail} = this.props;
    if(detail){
      // 如果有值,根据html格式字符串创建一个对应的编辑对象
      const contentBlock = htmlToDraft(detail);
      if(contentBlock){
        const contentState = contentBlock.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.state = {
          editorState
        }
      }
      else{
        this.state = {
          editorState: EditorState.createEmpty(), // 创建一个空的编辑对象
        }
      }
    }
    else{
      this.state = {
        editorState: EditorState.createEmpty(), // 创建一个空的编辑对象
      }
    }
  }

  // 输入过程中实时的回调
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  // 
  getDetail = () => {
    const { editorState } = this.state;
    return draftToHtml(convertToRaw(editorState.getCurrentContent()))
  }

  uploadImageCallBack = (file) => {
    return new Promise(
      (reslove,reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST","/manage/img/upload");
        const data = new FormData();
        data.append("image",file);
        xhr.send(data);
        xhr.addEventListener("load", () => {
          const response = JSON.parse(xhr.responseText);
          const url = response.data.url; // 得到图片的url
          reslove({data: {link: url}});
        });
        xhr.addEventListener("error",() => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        })
      }
    )
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          editorStyle={{border: "1px solid black", height: 200,paddingLeft:10}}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            image: {uploadCallback: this.uploadImageCallBack, alt: {present: true, mandatory: true}}
          }}
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
  }
}