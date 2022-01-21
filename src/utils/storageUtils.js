/**
 * 用于对user进行相关操作的工具模块
 */
import store from "store"
const USER_KEY = "user_key"
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    // 保存user
    saveUser(user){
        // localStorage.setItem(USER_KEY,JSON.stringify(user));
        store.set(USER_KEY,user);
    },
    // 读取user
    getUser(){
        // return JSON.parse(localStorage.getItem(USER_KEY) || "{}");
        // PS: 这里曾经少写了一个 "|| {}"导致/login登陆不进去...ψ(._. )>
        return store.get(USER_KEY) || {};
    },
    // 删除user
    removeUser(){
        // localStorage.removeItem(USER_KEY);
        store.remove(USER_KEY);
    }
}