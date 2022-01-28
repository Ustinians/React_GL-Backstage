import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"


export default class RichTextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(), // 创建一个空的编辑对象
  }
  constructor(props){
    
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

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          editorStyle={{border: "1px solid black", height: 200,paddingLeft:10}}
          onEditorStateChange={this.onEditorStateChange}
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
  }
}