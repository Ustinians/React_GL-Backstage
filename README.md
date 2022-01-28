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

### async和await

作用 : 

简化`promise`对象的使用: 不用再使用`then()`来指定成功/失败的回调函数

以同步编码(没有回调函数了)方式实现异步流程 

### CSS伪元素实现样式

效果如图

![image-20220121102604755](C:\Users\admin\AppData\Roaming\Typora\typora-user-images\image-20220121102604755.png)

代码如下

```css
&::after{
    position: absolute;
    content: '';
    // 设置定位
    right: 50%;
    top: 100%;
    transform: translateX(50%);
    border-top: 20px solid #fff;
    border-right: 20px solid transparent; // 透明化
    border-left: 20px solid transparent; // 透明化
    border-bottom: 20px solid transparent; // 透明化
}
```

### 通过当前地点获取天气

1. 引入高德地图

   ```html
   <script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=___"></script> 
   ```

2. 实现获取天气的功能

   ```js
   var map = new window.AMap.Map('container', {
       zoom: 10
   })
   console.log(map.getCenter());
   let _this = this;
   await window.AMap.plugin('AMap.Weather', () => {
       //创建天气查询实例
       var weather = new window.AMap.Weather();
       //执行实时天气信息查询
       weather.getLive("你所在的地址", function (err, data) {
           console.log(err, data);
           if (!err) {
               // 在render挂载之前获取到实时天气
               _this.setState({ weather: data.weather, address: data.province + "省" + data.city })
           }
           else {
               message.error('获取天气信息失败')
           }
       });
   });
   ```

### 获取当前的时间

编写dateUtils模块

```js
export function formateDate(time){
    if(!time) return ''
    let date = new Date(time);
    // 返回当前时间
    return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}
```

设置当前时间

```jsx
state = {
    nowTime: formateDate(Date.now())
  }
```

在项目刚挂在完毕的时候打开定时器

```jsx
componentDidMount(){
    this.timer = setInterval(()=>{
        this.setState({nowTime:formateDate(Date.now())})
    },1000)
}
```

在项目关闭之前关闭計時器

```jsx
componentWillUnmount(){
    clearInterval(this.timer);
}
```

### 获取当前路径对应的标题

```jsx
// 获取当前路径对应的标题
getNowTitle = () => {
    let title;
    const {pathname} = this.props.location;
    // 遍历找到对应的标题
    memoryUtils.menu.forEach(item => {
        if(item.path && item.path === pathname){
            title = item.title;
        }
        if(item.child){
            // 如果该菜单项下面有子菜单项,遍历子菜单项
            // 查找有没有对应的菜单项
            const cItem = item.child.find(cItem => pathname.indexOf(cItem.path) === 0);
            if(cItem){
                title = cItem.title;
            }
        }
    })
    return title;
}
```

### 退出登陆功能

```jsx
isExit = () => {
    const _this = this;
    Modal.confirm({
        icon: <ExclamationCircleOutlined />,
        content: "确定要退出吗ψ(._. )>",
        onOk() {
            console.log("用户退出了系统o(〃＾▽＾〃)o");
            message.success("退出登录成功o(〃＾▽＾〃)o")
            // 将内存中的user变为空
            memoryUtils.user = {};
            // 清除local中的数据
            storageUtils.removeUser();
            // 跳转到登陆界面
            _this.props.history.replace("/login");
        },
        onCancel() {
            const {username} = memoryUtils.user;
            console.log(username,'取消了退出行为§(*￣▽￣*)§');
        },
    });
}
```

### React路由跳转时传参

```jsx
this.props.history.push(path,[state])
```

### ProductDetail组件

1. 读取商品数据 : `this.props.location.state.product`

2. 显示商品数据 : `<Card> / List`

3. 异步显示商品所属分类的名称

   ```
   pCategoryId==0 : 异步获取categoryId的分类名称
   pCategoryId!=0 : 异步获取pCategoryId/categoryId的分类名称
   ```

4. `Promise.all([promise1,promise2])`

   返回值是`promise`

   异步得到的是所有`promise`的结果的数组

   特点: 一次发多个请求,只有当所有请求都成功,才成功,并得到成功的数据,一旦有一个失败,就无法得到成功的数据

### 添加/更新商品 富文本编辑器

* 下载依赖

  ```yarn
  yarn add react-draft-wysiwtg draftjs-to-html
  ```

* 

## 后台应用































