# React项目-后台管理系统
## 前台数据交互
### 创建基本目录结构

>src
>
>​	> api	ajax相关
>
>​	> assets	公共资源
>
>​	> components	非路由组件
>
>​	> config	配置
>
>​	> pages	路由组件
>
>​	> utils	工具模块
>
>​	   App.js	应用跟组件
>
>​	   index.js	入口JS文件

### 项目准备工作

* 引入`Antd`组件库

  1. 执行 `yarn add antd` 命令进行安装

  2. 在入口文件`index.js`中引入antd样式

     ```js
     // 引入Antd样式
     import "antd/dist/antd.css"
     ```

* 引入路由

  执行`yarn add react-router-dom`安装路由

### 高阶函数和高阶组件

#### 高阶函数

- 一类特别的函数
  - 接受**函数类型的参数**
  - 返回值是**函数**
- 常见的高阶函数
  * 定时器 : `setTimeout() / setInterval()`
  * `Promise` : `Promise(() => {}) then(value => {}, reason => {})`
  * 数组遍历相关的方法 : `forEach() / filter() / map() / reduce() / find() / findIndex()`
  * 函数对象的`bind()`
- 高阶函数更新动态,更加具有拓展性

#### 高阶组件

* 本身就是一个函数
* 接收一个组件(被包装组件),返回一个新的组件(包装组件),包装组件会向被包装组件传入特定属性
* 作用: 扩展组件的功能
* 高阶组件也是高阶函数: 接收一个组件函数,返回的是一个新的组件函数

### 用户名/密码规范

用户名/密码的合法性要求

1. 必须输入
2. 必须大于4位
3. 必须小于12位
4. 必须是英文,数字或者下划线组成

## 后台应用































