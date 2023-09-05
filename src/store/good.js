import { getGoodDetail } from "../api/cart_good.js";

const GoodAbout = {
  namespaced: true,
  state() {
    return {
      goodDetail: [], //保存商品详细信息
      currentSkuInfo:[],//存放当前商品详情信息
      cartNum:0,//当前准备加入购物车的数量
    };
  },
  actions: {
    //获取商品详情
    async getDetail(context, skuId) {
      console.log("action-getDetail", skuId);
      let res = await getGoodDetail(skuId);
      console.log("请求结果", res.data);
      context.commit('GET_DETAIL',res.data.data)
    },
    

  },
  mutations: {
    //获取商品详情
    GET_DETAIL(state,value){
        state.goodDetail=value
    },
    //存放当前商品信息
    SAVE_CURRENTSKUINFO(state,value){
      console.log('mutation-SAVE_CURRENTSKUINFO接收到的数据',value);
      state.currentSkuInfo=value.SKUINFO
      state.cartNum=value.CARTNUM
    }

  },
};

export default GoodAbout;
