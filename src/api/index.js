/**
 * 包含应用中所有接口请求函数的模块
 */

// 引入Ajax
import ajax from "./ajax";

// 登录接口
export const reqLogin = (username,password) => ajax("/login",{username,password},"POST");

// "品类管理" GET请求函数 获取一级/二级分类列表
export const reqCategorys = (parentId) => ajax("/manage/category/list",{parentId});

// 添加分类
export const reqAddCategory = (categoryName,parentId) => ajax("/manage/category/add",{categoryName,parentId},"POST");

// 更新分类
export const reqUpdateCategory = ({categoryName,categoryId}) => ajax("/manage/category/update",{categoryName,categoryId},"POST");

// 获取商品分页列表
export const reqProducts = (pageNum,pageSize) => ajax("/manage/product/list",{pageNum,pageSize});

// 搜索商品分页列表 (按名称搜索)/(按描述搜索)
// searchType: 搜索的类型, productName/productDesc
export const reqSearchProducts = ({pageNum,pageSize,searchName,searchType}) => ajax("/manage/product/search",{
    pageNum,
    pageSize,
    [searchType]: searchName
});
// // 搜索商品分页列表 (按描述搜索)
// export const reqSearchProducts2 = (pageNum,pageSize,searchName) => ajax("/manage/product/search",{
//     pageNum,
//     pageSize,
//     productDesc: searchName
// });

// 获取一个分类的请求
export const reqCategory = (categoryId) => ajax("/manage/category/info",{categoryId});

// 更新商品的状态(上架/下架)
export const reqUpdateStatus = (productId,status) => ajax("/manage/product/updateStatus",{productId,status},"POST");

// 添加商品
export const reqAddProduct = (product) => ajax("/manage/product/add",product,"POST");

// 更新商品
export const reqUpdateProduct = (product) => ajax("/manage/product/update",product,"POST");

// 获取所有角色信息的列表
export const reqRoles = () => ajax("/manage/role/list");

// 添加角色信息
export const reqAddRole = (roleName) => ajax("/manage/role/add",{roleName},"POST");

// 更新角色权限
export const reqUpdateRole = (role) => ajax("/manage/role/update",role,"POST");

// 获取用户列表
export const reqUsers = () => ajax("/manage/user/list");

// 删除指定用户
export const reqDeleteUser = (userId) => ajax("/manage/user/delete",{userId},"POST");

// 添加用户
export const reqAddUser = (user) => ajax("/manage/user/add",user,"POST");

// 添加/更新用户
export const reqAddOrUpdateUser = (user) => ajax('/manage/user/'+(user._id?'update':'add'),user,'POST')