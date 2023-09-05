import { createStore } from "vuex";
import UserAbout from "./user";
import MenuAbout from "./menu";
import SearchAbout from "./search";
import GoodAbout from "./good";
import OrderAbout from "./order";
import CartAbout from "./cart";
//创建store实例对象
const store=createStore({
    modules:{
        MenuAbout,UserAbout,SearchAbout,GoodAbout,OrderAbout,CartAbout
    }

    
})

export default store