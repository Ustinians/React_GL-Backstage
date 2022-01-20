/**
 * 能发送异步ajax请求的函数模块
 * 封装axios
 * 函数的返回值是一个Promise对象
 * 1. 优化1: 统一处理请求异常
 *      在外层包一个自己创建的promise对象
 *      在请求出错时,不reject(error),而是显示错误提示
 * 2. 优化2: 异步直接获取到response.data而不是response
 */

import axios from "axios";

// 引入需要的Antd组件
import {message} from "antd";

// 为data和type指定一个默认值
/**
 * url 请求地址
 * data 请求参数
 * type 请求类型
 */
export default function ajax(url, data = {}, type = "GET") {
    return new Promise((resolve,reject) => {
        let promise;
        // 1. 执行异步Ajax请求
        if(type === "GET"){
            // 发送GET请求
            promise = axios.get(url, {
                params: data  // GET请求携带的参数
            })
        }
        else{
            // 发送POST请求
            promise =  axios.post(url, data)
        }

        promise.then(response => {
            // 2. 如果成功了,调用resolve(value)
            resolve(response.data);

        }).catch(error => {
            // 3. 如果失败了,不调用reject(reason),而是提示异常信息
            message.error("请求出错了: " + error.message);
        })
    })

}