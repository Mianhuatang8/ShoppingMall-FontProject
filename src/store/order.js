
const OrderAbout = {
  namespaced: true,
  state() {
    return {
        //订单号
        orderId:0,
        shouldPayMoney:0,
    };
  },
  actions: {

  },
  mutations: {
    //保存准备计算的商品信息
    // saveReadyPayGood(state,value){
    //     console.log('mutations准备结算的商品信息:',value);
    //     state.goodsOrder=value.goods
    //     state.goodsCount=value.count
    //     state.goodsMoney=value.price
    // },
    //保存订单号和应付金额
    saveOrderIdMoney(state,value){
        state.orderId=value.orderId
        state.shouldPayMoney=value.shouldPayMoney

    }
  },
};

export default OrderAbout;
