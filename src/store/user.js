import { ElMessage } from "element-plus";
import { login, quitLogin } from "../api/user.js";

const UserAbout = {
  namespaced: true,
  state() {
    return {
      token: "", //用户登陆标记
      isShowFoot: true, //判断是否展示底部
      name: "", //用户名字
    };
  },
  actions: {
    //登录
    async login(context, value) {
      // console.log("action-login接收到的参数", value);
      //发起登录请求
      let res = await login(value);
      if (res.data.code == "200") {
        ElMessage({
          showClose: true,
          message: "登录成功",
          type: "success",
        });
        context.commit("LOGIN", res.data.data);
        return true;
      } else {
        console.log("失败", res.data);
        ElMessage({
          showClose: true,
          message: res.data.message == "" ? "登录失败" : res.data.message,
          type: "error",
        });
        return false;
      }
    },

    //退出登录
    // async quit(context) {
    //   let res = await quitLogin();
    //   console.log("退出登录请求", res.data);
    //   context.commit("QUITLOGIN");
    //   console.log('action-quit111111111');
    // },
  },
  mutations: {
    //不展示底部
    SHOWFOOTFALSE(state) {
      state.isShowFoot = false;
      console.log("mutations-修改之后的isSHowFoot", state.isShowFoot);
    },
    //展示底部
    SHOWFOOTTRUE(state) {
      //登陆进去之后要修改
      state.isShowFoot = true;
    },
    //登录-存储token
    LOGIN(state, value) {
      console.log("mutation-login接收到的参数", value);
      state.token = value.token;
      state.name = value.name;
      state.isShowFoot = true;
      //本地存储token
      sessionStorage.setItem("token", value.token);
      // sessionStorage.setItem("name", value.name);
    },
    //退出登录-移除token-清空store数据
    QUITLOGIN(state) {
      console.log('mutation-quit-22222');
      sessionStorage.removeItem("token");
      // sessionStorage.removeItem("name")
      state.name = "";
      state.token = "";
      state.isShowFoot = true; //退出登录回到首页
    },
  },
};

export default UserAbout;
