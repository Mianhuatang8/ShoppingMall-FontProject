//axios二次封装
import axios from "axios";

//axios的返回结果是promise对象
//利用axios对象的creat方法创建一个axios实例
//request就是axios,但是进行了稍微配置
const requests = axios.create({
  //公共的api路径 基础路径,发请求的时候就会出现该路径
  baseURL: "http://gmall-h5-api.atguigu.cn", // url = base url + request url
  timeout: 5000, // 超时时间
});


// 请求拦截器-在发送请求之前去做一些事情
  // config:配置对象,里面有一个属性很重要,header请求头
requests.interceptors.request.use((config) => {
  //获取用户信息,携带请求头
  const token=sessionStorage.getItem('token')
  if(token){
    config.headers['token']=token
  }
  return config;
});

//响应拦截器
// requests.interceptors.response.use(
//   (res) => {
//     //成功响应的回调
//     console.log(res.data);
//   },
//   (error) => {
//     //响应失败的回调
//     // return Promise.reject(new Error('faile'))
//     console.log('失败',error);
//   }
// );

export default requests;
