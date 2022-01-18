/**
 * 能发送异步ajax请求的函数模块
 * 封装axios
 * 函数的返回值是一个Promise对象
 */

import axios from "axios";

// 为data和type指定一个默认值
/**
 * url 请求地址
 * data 请求参数
 * type 请求类型
 */
export default function ajax(url, data = {}, type = "GET") {
    if(type === "GET"){
        // 发送GET请求
        return axios.get(url, {
            params: data  // GET请求携带的参数
        })
    }
    else{
        // 发送POST请求
        return axios.post(url, data)
    }
}