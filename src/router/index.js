import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      // redirect:'/home',
      component: () => import("../pages/Home.vue"),
    },
    {
      //登录
      path: "/login",
      name: "login",
      component: () => import("../pages/Login.vue"),
    },
    {
      //注册
      path: "/create",
      name: "create",
      component: () => import("../pages/Create.vue"),
    },
    {
      //搜素
      path: "/search",
      name: "search",
      component: () => import("../pages/Search.vue"),
    },
    {
      //商品详情
      path: "/good/:id",
      name: "good",
      component: () => import("../pages/GoodDetail.vue"),
    },
    {
      //成功加入到购物车也页面
      path: "/finishAddCart",
      name: "finishAddCar",
      component: () => import("../pages/FinishAddCart.vue"),
    },
    {
      //购物车列表
      path: "/cart",
      name: "cart",
      component: () => import("../pages/CartList.vue"),
    },
    {
      //订单页面
      path: "/order",
      name: "order",
      component: () => import("../pages/Order.vue"),
      redirect: "/order/center",
      children: [
        {
          //我的订单
          path: "center",
          name: "center",
          component: () => import("../pages/OrderCenter.vue"),
        },
        {
          //团购订单
          path: "teamorder",
          name: "teamorder",
          component: () => import("../pages/TeamOrder.vue"),
        },
      ],
    },

    {
      //点击结算后跳转的填写订单信息页面
      path: "/readyPayInfo",
      name: "readyPayInfo",
      component: () => import("../pages/ReadyPayOrderInfo.vue"),
    },
    {
      //点击提交订单后跳转的支付页面
      path: "/afterSubmitOrder/:orderId",
      name: "afterSubmitOrder",
      component: () => import("../pages/AfterSubmitOrder.vue"),
    },
    {
      //支付成功跳转页面
      path: "/paySuccess",
      name: "paySuccess",
      component: () => import( "../pages/PaySuccess.vue")
    },

  ],
});

export default router;
