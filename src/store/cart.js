// import { getGoodDetail } from "../api/cart_good.js";
import { changeProductSelect } from "../api/cart_good.js";
const CartAbout = {
  namespaced: true,
  state() {
    return {};
  },
  actions: {
    //修改全部商品状态
    async changeGoodState(content, value) {


      console.log("action-value", value);
      const promises = value.cartData.map(async (item) => {
        const res = await changeProductSelect(item.skuId, value.isChecked);
        console.log("action-res", res);
        return res;
      });

      const results = await Promise.all(promises);
      // console.log("results", results);
      return results;
    },
  },
  mutations: {},
};

export default CartAbout;
      //   console.log("action-value", value);
      //   let arr = [];
      //   value.cartData.map(async (item) => {
      //     let res = await changeProductSelect(item.skuId, value.isChecked);
      //     arr.push(res);
      //     console.log("action-res", res);
      //   });
      //   let result= await Promise.all(arr)
      //   return result;

 //   return Promise
      // 在所有异步操作完成后，继续处理 arr 或其他逻辑
      //Promise.all():参数需要的是一个数组【数组里面需要promise】
      //Promise.all()执行一次,返回的是一个Promise对象,Promise对象状态：成功、失败取决于什么?
      //成功、还是失败取决于数组里面的promise状态:四个都成功、返回成功Promise、只要有一个失败、返回Promise失败状态！！