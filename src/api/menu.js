import request from '../request'

//获取商品菜单
export function getMenu(){
    return request({
        url:'/api/product/getBaseCategoryList',
        method:'get',
    })
}









//获取商品分类-一级分类
export function getMenuSort1(){
    return request({
        url:'/admin/product/getCategory1',
        method:'get'
    })
}

//获取商品的二级分类
export function getMenuSort2(category1Id){
    return request({
        url:`/admin/product/getCategory2/${category1Id}`,
        method:'get'
    })
}


//获取商品的三级分类
export function getMenuSort3(category2Id){
    return request({
        url:`/admin/product/getCategory3/${category2Id}`,
        method:'get'
    })
}