<template>
    <div class="login-all">
        <div class="img"></div>
        <div class="login">
            <div class="login-form">
                <!-- 头部 -->
                <el-tabs v-model="activeName" type="border-card" :stretch="true">
                    <el-tab-pane label="扫描登录" name="scanLogin" class="tab-item">scan</el-tab-pane>
                    <el-tab-pane label="账号登录" name="nameLogin" class="tab-item">
                        <el-form :model="loginForm">
                            <el-form-item>
                                <el-input v-model="loginForm.phone" placeholder="邮箱/用户名/手机号" />
                                <template #prepend><el-icon>
                                        <User />
                                    </el-icon></template>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="loginForm.password" placeholder="请输入密码" />
                                <template #prepend><el-icon>
                                        <Lock />
                                    </el-icon></template>
                            </el-form-item>
                            <el-form-item>
                                <el-col :span="18">
                                    <el-checkbox v-model="checked1">自动登录</el-checkbox>
                                </el-col>
                                <el-col :span="6">
                                    <a href="##">忘记密码</a>
                                </el-col>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="danger" class="loginBtn" @click="login">登录</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-col :span="18">
                                    <ul class="vx-qq">
                                        <li><img src="../images/qq.png" alt="" /></li>
                                        <li><img src="../images/sina.png" alt="" /></li>
                                        <li><img src="../images/ali.png" alt="" /></li>
                                        <li><img src="../images/weixin.png" alt="" /></li>
                                    </ul>
                                </el-col>
                                <el-col :span="6"> <router-link to="/create">立即注册</router-link> </el-col>
                            </el-form-item>

                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>

    </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import { login, quitLogin } from '../api/user.js'
export default {
    // 在路由配置中使用箭头函数
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            // 这里的 vm 是组件实例，可以通过 vm.$store 访问 Vuex store
            vm.$store.commit('UserAbout/SHOWFOOTFALSE');
        });
    },

    data() {
        return {
            activeName: 'nameLogin',
            loginForm: {
                phone: '',
                password: '',
            },
            checked1: true,
        }
    },
    methods: {
        //登录
        login() {
            //发起登录请求
            this.$store.dispatch("UserAbout/login", this.loginForm).then((res)=>{
                console.log('res',res);
                if(res==true){
                    this.$router.push({path:'/'})
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.login-all {
    width: 100%;
    height: 474px;
    background-color: rgb(233 56 84);
    display: flex;

    .img {
        width: 953px;
        height: 100%;
        background-position: 60px 0px;
        background-image: url('../images/loginbg.png');
    }

    .login {
        display: flex;
        align-items: center;
    }

    .el-tabs {
        width: 300px;
        // display: flex;
    }

    .tab-item {
        min-width: 150px;
    }

    .loginBtn {
        width: 300px;
        ;
    }


    //底部图标
    .vx-qq {
        display: flex;

        li {
            margin-left: 5px;

            i {
                img {


                    height: 16px;
                    width: 16px;
                }
            }
        }
    }
}
</style>


