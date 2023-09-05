<template>
    <div class="create-all">
        <div class="create">
            <div class="top">
                <div class="one">注册新用户</div>
                <div class="two">
                    <span>我有账号,去</span>
                    <a href="/login">登录</a>
                </div>

            </div>
            <div class="bottom">

                <el-form :model="form" class="create-form">
                    <el-form-item>
                        <template #label>
                            <label class="custom-label">手机号：</label>
                        </template>
                        <el-input v-model="form.phone" style="width: 280px;" />
                    </el-form-item>
                    <el-form-item class="score-all">
                        <template #label>
                            <label class="custom-label">验证码：</label>
                        </template>
                        <el-input v-model="form.code" style="width: 280px;" />
                        <el-button type="info" @click="getScore">获取验证码</el-button>
                    </el-form-item>
                    <el-form-item>
                        <template #label>
                            <label class="custom-label">登陆密码：</label>
                        </template>
                        <el-input v-model="form.password" style="width: 280px;" />
                    </el-form-item>
                    <el-form-item>
                        <template #label>
                            <label class="custom-label">确认密码：</label>
                        </template>
                        <el-input v-model="form.password2" style="width: 280px;" />
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox class="checkbtn" v-model="checkAgain"><span>同意协议并注册《棉花糖用户协议》</span></el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="danger" class="create-btn" @click="finshCreate">完成注册</el-button>
                    </el-form-item>


                </el-form>
            </div>

        </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import { getScore, finishCreate } from '../api/user.js'

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
            form: {
                phone: '',
                code: '',
                password: '',
                password2: ''
            },
            checkAgain: false,
        }
    },
    methods: {
        //获取验证码
        async getScore() {
            let res = await getScore(this.form.phone)
            console.log('获取验证码', res.data);
            if (res.data.code == '200') {
                this.form.code = res.data.data
                ElMessage({
                    showClose: true,
                    message: '成功获取验证码',
                    type: "success"
                })
            } else {
                ElMessage({
                    showClose: true,
                    message: '获取失败,请再次获取',
                    type: "error"
                })
            }


        },
        //完成注册,发起请求
        async finshCreate() {
            let res2 = await finishCreate(this.form)
            console.log('成功注册', res2.data);
            if (res2.data.code == '200') {
                this.form.code = res2.data.data
                ElMessage({
                    showClose: true,
                    message: '成功注册',
                    type: "success"
                })
                //跳转到登录
                this.$router.push({path:'/login'})
            } else {
                ElMessage({
                    showClose: true,
                    message: res2.data.message,
                    type: "error"
                })
            }
            //清空表单
            this.form.phone = '',
                this.form.code = '',
                this.form.password = '',
                this.form.password2 = ''
        }
    }
}
</script>

<style scoped lang="scss">
.create-all {
    width: 100%;
    background-color: white;
    //    margin-bottom: 10px;
    padding-bottom: 40px;


    .create {
        width: 1150px;
        height: 400px;
        margin: 0 auto;
        display: flex;
        // flex-wrap: nowrap;
        flex-direction: column;
        align-items: center;
        border: 1px solid #e0e0e0;

        .top {
            background-color: #cbcbcb;
            display: flex;
            justify-content: space-between;
            height: 50px;
            width: 100%;
            align-items: center;
            padding: 0 15px;

            .one {
                font-weight: bold;
                font-size: 20px;
            }

            .two {
                font-weight: bold;
                font-size: 15px;

                a {
                    color: red;
                }
            }
        }

        .bottom {
            margin-top: 20px;
            width: 500px;

            .score-all {
                display: flex;
            }

            .create-form {
                display: flex;
                flex-direction: column;
                align-content: center;

                .custom-label {
                    width: 70px;
                    text-align: end;
                }

                .create-btn {
                    width: 280px;
                    margin-left: 82px;
                }

                .checkbtn {
                    margin-left: 82px;

                    span {
                        font-size: 12px;
                    }
                }
            }
        }
    }
}
</style>