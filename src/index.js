import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// 引入Antd样式
import 'antd/dist/antd.css';
import './index.css';

ReactDOM.render(
  // StrictMode 开启React严格模式
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

