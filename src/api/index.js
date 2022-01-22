/**
 * 包含应用中所有接口请求函数的模块
 */

// 引入Ajax
import ajax from "./ajax";

// 登录接口
export const reqLogin = (username,password) => ajax("/login",{username,password},"POST");

// 添加用户接口
export const reqAddUser = (user) => ajax("/manage/user/add",user,"POST");

// "品类管理" GET请求函数 获取一级/二级分类列表
export const reqCategorys = (parentId) => ajax("/manage/category/list",{parentId});

// 添加分类
export const reqAddCategory = (categoryName,parentId) => ajax("/manage/category/add",{categoryName,parentId},"POST");

// 更新分类
export const reqUpdateCategory = ({categoryName,categoryId}) => ajax("/manage/category/update",{categoryName,categoryId},"POST");