import React from 'react';
import ReactDOM from 'react-dom';
// 引入路由相关
import {BrowserRouter} from "react-router-dom";
// 引入App组件
import App from './App';
// 引入Antd样式
import 'antd/dist/antd.css';
// 引入样式文件index.css
import './index.css';

import memoryUtils from "./utils/memoryUtils";
import storageUtils from "./utils/storageUtils";

// 读取local中保存的user,保存到内存中
memoryUtils.user = storageUtils.getUser();

ReactDOM.render(
  // React.StrictMode 开启React严格模式
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

