<template>
    <div class="myorder">
        <div class="top">我的订单</div>
        <div class="title">
            <div style="width:25%;">商品</div>
            <div style="width: 25%;">订单详情</div>
            <div style="width: 17%;">收获人</div>
            <div style="width: 13%;">金额</div>
            <div style="width: 12%;">状态</div>
            <div style="width: 8%;">操作</div>
        </div>

        <!-- 订单情况 -->
        <div class="aboutorder" v-for="order in orderInfo.records" :key="order.id">
            <div class="time_code_del">
                <div class="left">
                    <span style="margin-right: 8px;">{{ order.createTime }}</span>
                    <span>订单编号:&nbsp;{{ order.outTradeNo }}</span>
                </div>
                <!-- <el-icon class="el-icon-delete " color="red" ></el-icon> -->
                <div class="right">
                    <el-icon class="right" >
                        <Delete />
                    </el-icon>
                </div>
            </div>
            <div class="orderInformation">
                <div class="gooInfoAll">
                    <div class="good_info" v-for="item in order.orderDetailList" :key="item.id">
                        <div class="imgDiv"> <img :src="item.imgUrl"></div>
                        <div class="desc">
                            <span>{{ item.skuName }}</span>
                        </div>
                        <div class="count">x{{ item.skuNum }}</div>
                        <a>售后申请</a>
                    </div>
                </div>

                <div class="getName"><div>{{ order.consignee }}</div></div>
                <div class="price">
                    <div>总金额￥{{ order.totalAmount }}</div>
                    <div class="payType">在线支付</div>
                </div>
                <div class="state">
                    <div>{{ order.orderStatusName }}</div></div>
                <div class="operations">
                    <div>
                        <a>评价</a>|<a>晒单</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- 分页条 -->
        <el-pagination small background layout="prev, pager, next" :total="page.total" :page-size="page.limit"
            v-model="page.currentPage" class="mt-4" @current-change="currentPageChange" />

        <!-- 猜你喜欢 -->
        <div class="like">
            <h4 class="kt">猜你喜欢</h4>
            <ul class="like-list">
                <li class="likeItem">
                    <div class="p-img">
                        <img src="../images/orderImage/itemlike01.png" />
                    </div>
                    <div class="attr">
                        <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>3699.00</i>
                    </div>
                    <div class="commit">已有6人评价</div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img src="../images/orderImage/itemlike02.png" />
                    </div>
                    <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
                    <div class="price">
                        <em>¥</em>
                        <i>4388.00</i>
                    </div>
                    <div class="commit">已有700人评价</div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img src="../images/orderImage/itemlike03.png" />
                    </div>
                    <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
                    <div class="price">
                        <em>¥</em>
                        <i>4088.00</i>
                    </div>
                    <div class="commit">已有700人评价</div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img src="../images/orderImage/itemlike04.png" />
                    </div>
                    <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
                    <div class="price">
                        <em>¥</em>
                        <i>4088.00</i>
                    </div>
                    <div class="commit">已有700人评价</div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
import { getMyOrderList, } from '../api/order.js'
export default {
    created() {
        this.getMyOrder()
    },
    data() {
        return {
            page: {
                limit: 2,
                currentPage: 1
            },
            //订单情况
            orderInfo: [],
        }
    },
    methods: {
        //获取我的订单列表
        async getMyOrder() {
            let res = await getMyOrderList(this.page.currentPage, this.page.limit)
            console.log('获取我的订单列表数据', res.data);
            this.orderInfo = res.data.data
            this.page.total = this.orderInfo.total
        },
        //分页条当前页面发生变化重新获取数据
        currentPageChange(value) {
            console.log('当前点击的页数', value);
            // console.log('当前页面',this.page.currentPage);
            this.page.currentPage = value
            // console.log('当前页面2',this.page.currentPage);
            //重新获取订单列表
            this.getMyOrder()
        },
        // //删除某个订单
        // delOrder() {

        // },
    }

}
</script>

<style scoped lang="scss">
.myorder {
    margin: 0 10px;
    width: 83.33%;

    .top {
        background-color: #e0e0e0;
        font-size: 16px;
        font-weight: bold;
        padding: 15px 15px;
        color: #444;
        margin: 15px;
        border: 1px solid #d8d8d8;
    }

    .title {
        display: flex;
        color: #444;
        padding: 10px 15px;
        margin: 25px 15px 15px 15px;
        background-color: #e0e0e0;
        border: 1px solid #d8d8d8;
        font-size: 14px;
        font-weight: bold;
    }

    // 订单详情
    .aboutorder {

        margin: 15px;

        .time_code_del {
            padding: 8px 15px;
            background-color: #e0e0e0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: 1px solid #d8d8d8;

            .left {
                font-size: 14px;
                font-weight: bold;
                color: #444;
            }

            .right {
                z-index: 9999;
            }
        }

        .orderInformation {
            display: flex;
            font-size: 12px;
            border: 1px solid #d8d8d8;

            .gooInfoAll {
                display: flex;
                flex-direction: column;
            }

            .good_info {
                display: flex;
                width: 100%;
                border-right: 1px solid #d8d8d8;
                margin-right: 10px;
                border-bottom: 1px solid #d8d8d8;


                .imgDiv {
                    padding: 10px;
                    width: 80px;
                    height: 80px;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    img {
                        width: 60px;
                        height: 60px;
                    }
                }

                .desc {
                    color: red;
                    width: 240px;
                    white-space: normal;
                    /* 自动换行 */
                    word-wrap: break-word;
                    /* 在单词内进行换行 */
                    padding: 10px 0 0 10px;
                    margin-right: 15px;

                    span {
                        line-height: 14px;
                    }
                }

                .count {
                    padding: 10px 0 0 10px;
                }

                a {
                    padding: 10px 0 0 10px;
                }

            }

            .getName {
                width: 10%;
                border-right: 1px solid #d8d8d8;
                // padding: 10px 0 0 10px;
                text-align: center;
                display: flex;
                align-items: center;
                div{
                    width: 100%;
                }
            }

            .price {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 18%;
                border-right: 1px solid #d8d8d8;
                padding: 10px 0 0 10px;
                line-height: 20px;
                justify-content: center;
            }

            .state {
                width: 12%;
                border-right: 1px solid #d8d8d8;
                // padding: 10px 0 0 10px;
                text-align: center;
                display: flex;
                align-items: center;
                div{
                    width: 100%;
                }
            }

            .operations {
                width: 8%;
                // padding: 10px 0 0 10px;
                display: flex;
                align-items: center;
                text-align:center;
                margin-left: 30px;
                div{
                    width: 100%;
                }
            }


        }

    }

    //分页条
    .emt-4 {
        margin: 30px 15px;
    }

    //猜你喜欢
    .like {
        border: 1px solid #d8d8d8;
        margin: 15px 15px;

        .kt {
            border-bottom: 1px solid #d8d8d8;
            background: #e0e0e0;
            color: #444;
            margin: 0;
            padding: 12px;
            font-size: 14px;
            font-weight: bold;
        }

        .like-list {
            padding: 15px 11px;
            overflow: hidden;
            background-color: white;

            .likeItem {
                width: 25%;
                float: left;


                .p-img {
                    text-align: left;

                    img {
                        width: 167px;
                        height: 123px;
                    }
                }

                .attr {
                    padding: 5px 15px;
                    font-size: 14px;
                }

                .price {
                    padding: 0 15px;
                    font-size: 16px;
                    color: #c81623;
                    margin-bottom: 15px;
                }

                .commit {
                    padding: 0 15px;
                    font-size: 13px;
                }
            }
        }
    }
}
</style>