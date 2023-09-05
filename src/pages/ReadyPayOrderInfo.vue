<template>
    <div class="trade-container">
        <h3 class="title">填写并核对订单信息</h3>
        <div class="content">
            <!-- 收件人信息地方 -->
            <h5 class="receive" style="font-weight: bold;">收件人信息</h5>
            <div class="address clearFix">
                <span class="username">{{ userAddr.username }}</span>
                <p>
                    <span class="s1">{{ userAddr.fullAddr }}</span>
                    <span class="s2">{{ userAddr.phone }}</span>
                </p>
            </div>
            <!-- <div class="address clearFix" v-for="user in address" :key="user.id">
                <span class="username" :class="{ selected: user.isDefault == '1' }">
                    {{ user.consignee }}
                </span>
                <p @click="changeDefault(user)">
                    <span class="s1">{{ user.fullAddress }}</span>
                    <span class="s2">{{ user.phoneNum }}</span>
                    <span class="s3" v-show="user.isDefault == '1'">默认地址</span>
                </p>
            </div> -->
            <div class="line"></div>

            <!-- 支付方式:写死 无法选择 -->
            <h5 class="pay" style="font-weight: bold;">支付方式</h5>
            <div class="address clearFix">
                <span class="username selected">在线支付</span>
                <span class="username" style="margin-left: 5px">货到付款</span>
            </div>
            <div class="line"></div>

            <!-- 送货清单：配送方式和商品清单 -->
            <h5 class="pay" style="font-weight: bold;">送货清单</h5>
            <!-- 配送方式-写死 -->
            <div class="way">
                <h5 style="font-weight: bold;">配送方式</h5>
                <div class="info clearFix">
                    <span class="s1">天天快递</span>
                    <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
                </div>
            </div>

            <!-- 商品清单 -->
            <!-- 商品清单：购物车里面的数据 -->
            <div class="detail">
                <h5 style="font-weight: bold;">商品清单</h5>
                <ul class="list clearFix" v-for="good in tradeInfo.detailArrayList" :key="good.skuId">
                    <li>
                        <img :src="good.imgUrl" style="width: 100px" />
                    </li>
                    <li>
                        <p>
                            {{ good.skuName }}
                        </p>
                        <h4>7天无理由退货</h4>
                    </li>
                    <li>
                        <h3>￥{{ good.orderPrice }}.00</h3>
                    </li>
                    <li>X{{ good.skuNum }}</li>
                    <li>有货</li>
                </ul>
            </div>


            <div class="bbs" style="font-weight: bold;">
                <h5>买家留言：</h5>
                <textarea placeholder="建议留言前先与商家沟通确认" class="remarks-cont" v-model="msg"></textarea>
            </div>
            <div class="line"></div>

            <!-- 发票信息-写死 -->
            <div class="bill">
                <h5 style="font-weight: bold;">发票信息：</h5>
                <div>普通发票（电子） 个人 明细</div>
                <h5 style="font-weight: bold;">使用优惠/抵用</h5>
            </div>
        </div>


        <div class="money clearFix">
            <ul>
                <li>
                    <b><i>{{ tradeInfo.totalNum }}</i>件商品，总商品金额</b>
                    <span>¥{{ tradeInfo.totalAmount }}.00</span>
                </li>
                <li>
                    <b>返现：</b>
                    <span>0.00</span>
                </li>
                <li>
                    <b>运费：</b>
                    <span>0.00</span>
                </li>
            </ul>
        </div>

        <div class="trade">
            <div class="price">
                应付金额:　<span>¥{{ tradeInfo.totalAmount }}.00</span>
            </div>
            <!-- 收货人地址信息 -->
            <div class="receiveInfo">
                寄送至:
                <span>{{ userAddr.fullAddr }}</span>
                收货人：
                <span>{{ userAddr.username }}</span>
                <span>{{ userAddr.phone }}</span>
            </div>
        </div>



        <div class="sub clearFix">
            <a class="subBtn" @click="submitOrder">提交订单</a>
        </div>
    </div>
</template>

<script>
import { getAddress, submitOrder, getOrderTrade } from '../api/order.js'

export default {
     //在进入之前清空头部搜索框的内容
     beforeRouteEnter(to, from, next) {
        next((vm)=>{
            console.log('路由守卫的vm',vm);
            vm.$store.commit('SearchAbout/clearKeyword')
        })
    },
    created() {
        this.getAddress()
        //获取交易页页面信息
        this.getTradeInfo()

        //在进入之前清空头部搜索框的内容


    },
    data() {
        return {
            userAddr: {
                username: '棉花糖',
                fullAddr: '广东省广州市海珠区',
                phone: '15016111111'
            },
            msg: '',//买家留言
            //该交易页页面信息
            tradeInfo: [],


        }
    },
    methods: {
        //获取收货人地址信息
        async getAddress() {
            let res = await getAddress()
            console.log('获取收件人地址信息', res.data);
        },
        //获取订单页页面信息
        async getTradeInfo() {
            let res = await getOrderTrade()
            console.log('获取交易页页面信息', res.data);
            this.tradeInfo = res.data.data
        },
        //提交订单
        async submitOrder() {
            let res = await submitOrder(this.tradeInfo.tradeNo, {
                consignee: this.userAddr.username,
                consigneeTel: this.userAddr.phone,
                deliveryAddress: this.userAddr.fullAddr,
                paymentWay: "ONLINE",
                orderComment: this.msg,
                orderDetailList: this.tradeInfo.detailArrayList
            })
            const orderId = res.data.data
            console.log('提交订单获取的数据', res.data);
            this.$router.push({
                path: '/afterSubmitOrder',
                name: "afterSubmitOrder",
                params: {
                    orderId: orderId
                }
            })
            //在vuex中存储支付金额和订单id
            this.$store.commit('OrderAbout/saveOrderIdMoney', {
                orderId: orderId,
                shouldPayMoney: this.tradeInfo.totalAmount
            })

        },
    }

}
</script>

<style scoped lang="scss">
.trade-container {
    background-color: white;
    font-size: 14px;

    //标题
    .title {
        width: 1200px;
        margin: 0 auto;
        font-size: 14px;
        line-height: 21px;
    }

    .content {
        width: 1200px;
        margin: 10px auto 0;
        border: 1px solid rgb(221, 221, 221);
        padding: 25px;
        box-sizing: border-box;

        .receive,
        .pay {
            line-height: 36px;
            margin: 18px 0;
        }

        // 送货方式
        .address {
            padding-left: 20px;
            margin-bottom: 15px;
            height: 40px;

            .username {
                float: left;
                width: 100px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                border: 1px solid #ddd;
                position: relative;
            }

            .username::after {
                content: "";
                display: none;
                width: 13px;
                height: 13px;
                position: absolute;
                right: 0;
                bottom: 0;
                background: url(../images/readyPayOrderInfoImage/choosed.png) no-repeat;
            }

            .username.selected {
                border-color: #e1251b;
            }

            .username.selected::after {
                display: block;
            }

            p {
                width: 610px;
                float: left;
                line-height: 30px;
                margin-left: 10px;
                padding-left: 5px;
                cursor: pointer;

                .s1 {
                    float: left;
                }

                .s2 {
                    float: left;
                    margin: 0 5px;
                }

                .s3 {
                    float: left;
                    width: 56px;
                    height: 24px;
                    line-height: 24px;
                    margin-left: 10px;
                    background-color: #878787;
                    color: #fff;
                    margin-top: 3px;
                    text-align: center;
                }
            }

            p:hover {
                background-color: #ddd;
            }
        }

        .line {
            height: 1px;
            background-color: #ddd;
        }

        .way {
            width: 1080px;
            height: 160px;
            background: #f4f4f4;
            padding: 15px;
            margin: 0 auto;

            h5 {
                line-height: 50px;
            }

            .info {
                margin-top: 20px;

                .s1 {
                    float: left;
                    border: 1px solid #ddd;
                    width: 120px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    margin-right: 10px;
                }

                p {
                    line-height: 30px;
                }
            }
        }

        .detail {
            width: 1080px;

            background: #feedef;
            padding: 15px;
            margin: 2px auto 0;

            h5 {
                line-height: 50px;
            }

            .list {
                display: flex;
                justify-content: space-between;
                padding: 0 60px 0 0;

                li {
                    line-height: 30px;

                    p {
                        margin-bottom: 20px;
                    }

                    h4 {
                        color: #c81623;
                        font-weight: 400;
                    }

                    h3 {
                        color: #e12228;
                    }
                }
            }
        }

        .bbs {
            margin-bottom: 15px;

            h5 {
                line-height: 50px;
            }

            textarea {
                width: 100%;
                border-color: #e4e2e2;
                line-height: 1.8;
                outline: none;
                resize: none;
            }
        }

        .bill {
            h5 {
                line-height: 50px;
            }

            div {
                padding-left: 15px;
            }
        }
    }

    .money {
        width: 1200px;
        margin: 20px auto;
        height: 100px;

        ul {
            width: 220px;
            float: right;

            li {
                line-height: 30px;
                display: flex;
                justify-content: space-between;

                i {
                    color: red;
                }
            }
        }
    }

    .trade {
        box-sizing: border-box;
        width: 1200px;
        padding: 10px;
        margin: 10px auto;
        text-align: right;
        background-color: #f4f4f4;
        border: 1px solid #ddd;

        div {
            line-height: 30px;
        }

        .price span {
            color: #e12228;
            font-weight: 700;
            font-size: 14px;
        }

        .receiveInfo {
            color: #999;
        }
    }

    .sub {
        width: 1200px;
        margin: 0 auto 10px;
        height: 80px;

        .subBtn {
            float: right;
            width: 164px;
            height: 56px;
            font: 700 18px "微软雅黑";
            line-height: 56px;
            text-align: center;
            color: #fff;
            background-color: #e1251b;
        }
    }
}
</style>