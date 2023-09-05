import request from '../request'

// 获取购物车列表
export function getShopCartList(){
    return request({
        url:'/api/cart/cartList',
        method:'get'
    })
}

//添加到购物车(对已有物品进行数量改动)
export function addShopCart(skuId,skuNum){
    return request({
        url:`/api/cart/addToCart/${skuId}/${skuNum}`,
        method:'post'
    })
}

//从购物车中删除
export function delGoodCart(skuId){
    return request({
        url:`/api/cart/deleteCart/${skuId}`,
        method:'delete'
    })
}

//获取商品详情
export function getGoodDetail(skuId){
    return request({
        url:`/api/item/${skuId}`,
        method:'get'
    })
}

//切换商品选中状态
export function changeProductSelect(skuID,isChecked){
    return request({
        url:`/api/cart/checkCart/${skuID}/${isChecked}`,
        method:'get'
    })
}


