import request from '../request'


//根据关键字点击搜索得到搜索详情
export function searchResult(searchObj){
    console.log('发起请求的搜索对象',searchObj);
    return request({
        url:'/api/list',
        method:'post',
        data:searchObj
    })
}



