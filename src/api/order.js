import request from '../request'

//获取收货人地址信息
export function getAddress(){
    return request({
        url:'/api/user/userAddress/auth/findUserAddressList',
        method:'get'   
    }) 
} 

//获取订单交易页信息-点击结算后跳转的页面-也就是订单信息那个页面
export function getOrderTrade(){
    return request({
        url:'/api/order/auth/trade',
        method:'get'
    })
}

//提交订单
export function submitOrder(tradeNo,orderInfo){
    return request({
        url:`/api/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:'post',
        data:orderInfo
    })
}


//获取订单支付信息
export function getOrderPayInfo(orderId){
    return request({
        url:`/api/payment/weixin/createNative/${orderId}`,
        method:'get'
    })
}

//获取我的订单列表
export function getMyOrderList(page,limit){
    return request({
        url:`/api/order/auth/${page}/${limit}`,
        method:'get'
    })
}

//查询订单支付状态
export function getPayState(orderId){
    return request({
        url:`/api/payment/weixin/queryPayStatus/${orderId}`,
        method:'get'
    })
}

