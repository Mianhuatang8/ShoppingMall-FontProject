import { formContextKey } from 'element-plus'
import request from '../request'

//获取验证码
export function getScore(phone){
    return request({
        url:`/api/user/passport/sendCode/${phone}`,
        method:'get'
    })
}

//发起完成注册请求
export function finishCreate(form){
    // console.log('1111',form);
    return request({
        url:'/api/user/passport/register',
        method:'post',
        data:form
        // phone\password\code
    })
}
//登录
export function login(loginForm){
    console.log('1111',loginForm);
    return request({
        url:'/api/user/passport/login',
        method:'post',
        data:loginForm
    })
}

//退出登录
export function quitLogin(){
    return request({
        url:'/api/user/passport/logout',
        method:'get',
    })
}