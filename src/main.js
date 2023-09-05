import { createApp } from "vue";
import { createPinia } from "pinia";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import * as Icons from "@element-plus/icons";
import "./assets/iconfont/iconfont.css";

import App from "./App.vue";
import router from "./router";
//引入重置样式
import "../public/reset.scss";
// import './assets/main.css'

const app = createApp(App);
app.use(store);
app.use(ElementPlusIconsVue);
app.use(ElementPlus);
app.use(createPinia());
app.use(router);
app.mount("#app");


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
  
// // 注册Icons 全局组件
// Object.keys(Icons).forEach((key) => {
//   app.component(key, Icons[key]);
// });
