<template>
    <div class="all">
        <div class="title">
            商品已经成功加入购物车！
        </div>

        <div class="goodInfo">
            <div class="left">
                <div>
                    <img :src="goodInfo.skuDefaultImg">
                </div>
                <div class="info-text">
                    <p class="text1">{{ goodInfo.skuName }}</p>
                    <p class="text2">{{ goodInfo.skuDesc }}&nbsp;&nbsp;数量：{{ count }}</p>
                </div>
            </div>
            <div class="right">
                <el-button type="info" @click="gotoSkuDetail">查看商品详情</el-button>
                <el-button type="info" @click="gotoCart">去购物车结算</el-button>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    created() {
        this.goodInfo = this.$store.state.GoodAbout.currentSkuInfo
        this.count = this.$store.state.GoodAbout.cartNum
        // console.log('this.goodInfo',this.goodInfo);
        // console.log('this.carNum',this.count);
    },

    data() {
        return {
            //当前商品数据
            goodInfo: [],
            count: 0,
        }
    },
    methods: {
        //查看商品详情
        gotoSkuDetail() {
            //跳转到商品详情页面
            //派发任务-获取商品详细信息
            // this.$store.dispatch('GoodAbout/getDetail', item.id).then(() => {
            // 数据获取完成后跳转到商品详情页面
            this.$router.push({
                name:'good',
                path: '/good',
                params: {
                    id: this.goodInfo.id
                }
            });
            // });

        },
        //去购物车结算
        gotoCart() {
            this.$router.push({ path: '/cart' })
        }
    }

}
</script>

<style scoped lang="scss">
.all {
    padding: 10px 120px;
    background-color: #f4f4f4;

    .title {
        font-size: 16px;
        color: green;
        font-weight: bold;
    }

    .goodInfo {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;

        .left {
            display: flex;
            align-items: center;

            img {
                width: 80px;
                height: 80px;
            }


            .info-text {
                margin-left: 10px;
                width:800px;
                .text1 {
                    margin-bottom: 8px;
                    // font-weight: bold;
                    font-size: 15px;
                }

                .text2 {
                    font-size: 12px;
                    color: gray;
                }
            }
        }

        .right {}
    }
}
</style>