<template>
    <div class="head_all">
        <div class="login">
            <div class="left">
                <span class="span-one">棉花糖商城欢迎您!</span>
                <span v-if="!username == ''">{{ username }}</span>
                <a href="/login" @click="editShowFoot" v-if="token == ''">请登录</a>
                <a class="register" href="/create" v-if="token == ''">注册</a>
                <a class="register" @click="quit" v-if="token != ''">退出登录</a>
            </div>
            <div class="right">
                <ul>
                    <li><a @click="myHome">棉花糖商城首页</a> </li>
                    <li><a class="register" @click="myOrder">我的订单</a> </li>
                    <li><a class="register" @click="myShopCar">我的购物车</a></li>
                    <li><a href="##" class="register">我的棉花糖</a></li>
                    <li><a href="##" class="register">棉花糖会员</a></li>
                    <li><a href="##" class="register">企业采购</a></li>
                    <li><a href="##" class="register">关注尚品会</a></li>
                    <li><a href="##" class="register">合作招商</a></li>
                    <li><a href="##" class="register">商家后台</a></li>
                </ul>
            </div>
        </div>
        <div class="img">
            <div class="left">
                <img src="../images/logo.png">
            </div>
            <div class="right">
                <input ref="searchInput" type="text" v-model="keyword" @keyup.enter="searchBtn">
                <button @click="searchBtn">搜索</button>
            </div>
        </div>

    </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { login, quitLogin } from "../api/user.js";
export default {
    // create() {
    //     this.searchObj.keyword = this.$store.state.SearchAbout.keyword
    //     console.log('create-keyword', this.searchObj);
    // },
    data() {
        return {
            //搜索关键字
            // searchObj: {
            //     keyword: '',
            //     order: "1:desc",//综合-默认降序
            // }
        }
    },
    computed: {
        //从本地获取token
        token() {
            return this.$store.state.UserAbout.token
        },
        //用户名
        username() {
            return this.$store.state.UserAbout.name
            // return sessionStorage.getItem("name")
        },
        //关键词
        keyword: {
            get() {
                return this.$store.state.SearchAbout.keyword
            },
            set(value) {
                //派发任务-修改vuex的keyword
                this.$store.commit('SearchAbout/saveKeyword', value)
            }
        },
    },
    methods: {
        myHome(){
            this.$router.push({ path: '/' })
        },
        //点击搜索
        async searchBtn() {
            //input框失去焦点
            this.$refs.searchInput.blur()
            //派发任务，发起搜索请求
            this.$store.dispatch('SearchAbout/search', { keyword: this.keyword })
            // this.$store.dispatch('SearchAbout/search', this.searchObj)
            //派发任务，存储搜索的tag
            this.$store.commit("SearchAbout/ADDSEARCHTAG", this.keyword)
            // this.$store.commit("SearchAbout/ADDSEARCHTAG", this.searchObj.keyword)
            //跳转到搜索页面
            this.$router.push({
                path: '/search',
                name: 'search',
                query:{
                    keyword:this.keyword
                }
            });
        },
        //退出登录
        async quit() {
            let res = await quitLogin();
            console.log("退出登录请求", res.data);
            if (res.data.code == '200') {
                //派发人物-清空vuex的数据
                this.$store.commit("UserAbout/QUITLOGIN");
                // console.log('action-quit111111111');
                this.$router.push({ path: '/' })
                // console.log('成功跳转到主页');
                ElMessage({
                    message: '成功退出登录',
                    type: 'success',
                })
            } else {
                ElMessage({
                    message: '退出登录失败',
                    type: 'error',
                })
            }
            // this.$store.dispatch("UserAbout/quit").then(() => {
            //     console.log('退出登录请求执行');
            //     // 清除完状态后进行跳转
            //     console.log('isShowFoot after quit:', this.$store.state.UserAbout.isShowFoot);
            //     this.$router.push({ path: '/' });
            //     console.log('成功退出登录', this.$store.state.UserAbout.isShowFoot);
            // })
        },
        //点击我的订单
        myOrder() {
            if (sessionStorage.getItem('token')) {
                //目前假装跳转到注册页面
                this.$router.push({ path: '/order' })
            }
            else {
                //跳转到登录页面
                this.$router.push({ path: '/login' })
            }
        },
        //点击我的购物车
        myShopCar() {
            // this.$store.state.UserAbout.token
            if (sessionStorage.getItem('token')) {
                this.$router.push({ path: '/cart' })
            }
            else {
                // console.log('未登录-跳转到登陆页面');
                ElMessage({
                    showClose: true,
                    message: '请先登录',
                    type: "error",
                });
                //跳转到登录页面
                this.$router.push({ path: '/login' })
            }
        },

    }

}
</script>

<style lang="scss" scoped>
.head_all {
    width: 100%;
}

.login {
    display: flex;
    justify-content: space-between;
    padding: 0 120px;
    align-items: center;
    color: #3e3e3e;
    height: 40px;
    font-size: 14px;
    background-color: #d8d8d8;


    .left {
        cursor:pointer;
        .span-one {
            padding-right: 15px;
        }
    }

    .register {
        border-left: 1px solid #b3aeae;
        padding: 0 5px;
        margin-left: 5px;
    }

    .right {
        ul {
            display: flex;

            li {
                cursor: pointer;
                list-style: none;
                font-size: 13px;

            }
        }
    }
}

.img {
    display: flex;
    justify-content: space-between;
    padding: 0 130px;
    background-color: white;
    height: 90px;
    align-items: center;

    .right {
        cursor: pointer;
        input {
            border: 2px solid red;
            width: 450px;
            height: 25px;
            outline: none;
        }

        button {
            height: 29px;
            width: 68px;
            background-color: red;
            border: none;
            color: #fff;
            position: absolute;
            right: 132px;

        }

    }
}
</style>