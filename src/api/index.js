/**
 * 包含应用中所有接口请求函数的模块
 */

// 引入Ajax
import ajax from "./ajax";

// 登录接口
export const reqLogin = (username,password) => ajax("/login",{username,password},"POST");

// 添加用户接口
export const reqAddUser = (user) => ajax("/manage/user/add",user,"POST");