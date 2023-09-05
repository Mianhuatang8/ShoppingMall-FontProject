<template>
    <div class="footer">
        <div class="footerList" v-if="isShowFoot">
            <div class="footerItem">
                <h4>购物指南</h4>
                <ul class="footerItemCon">
                    <li>购物流程</li>
                    <li>会员介绍</li>
                    <li>生活旅行/团购</li>
                    <li>常见问题</li>
                    <li>购物指南</li>
                </ul>

            </div>
            <div class="footerItem">
                <h4>配送方式</h4>
                <ul class="footerItemCon">
                    <li>上门自提</li>
                    <li>211限时达</li>
                    <li>配送服务查询</li>
                    <li>配送费收取标准</li>
                    <li>海外配送</li>
                </ul>
            </div>
            <div class="footerItem">
                <h4>支付方式</h4>
                <ul class="footerItemCon">
                    <li>货到付款</li>
                    <li>在线支付</li>
                    <li>分期付款</li>
                    <li>邮局汇款</li>
                    <li>公司转账</li>
                </ul>
            </div>
            <div class="footerItem">
                <h4>售后服务</h4>
                <ul class="footerItemCon">
                    <li>售后政策</li>
                    <li>价格保护</li>
                    <li>退款说明</li>
                    <li>返修/退换货</li>
                    <li>取消订单</li>
                </ul>
            </div>
            <div class="footerItem">
                <h4>特色服务</h4>
                <ul class="footerItemCon">
                    <li>夺宝岛</li>
                    <li>DIY装机</li>
                    <li>延保服务</li>
                    <li>尚品汇E卡</li>
                    <li>尚品汇通信</li>
                </ul>
            </div>
            <div class="footerItem">
                <h4>帮助中心</h4>
                <img src="../images/touxiang.jpg">
            </div>
        </div>
        <div class="copyright">
            <div>
                <ul class="helpLink">
                    <li>关于我们
                        <span class="space"></span>
                    </li>
                    <li>联系我们
                        <span class="space"></span>
                    </li>
                    <li>关于我们
                        <span class="space"></span>
                    </li>
                    <li>商家入驻
                        <span class="space"></span>
                    </li>
                    <li>营销中心
                        <span class="space"></span>
                    </li>
                    <li>友情链接
                        <span class="space"></span>
                    </li>
                    <li>关于我们
                        <span class="space"></span>
                    </li>
                    <li>营销中心
                        <span class="space"></span>
                    </li>
                    <li>友情链接
                        <span class="space"></span>
                    </li>
                    <li>关于我们</li>
                </ul>
            </div>
            <div class="text">地址:广东省广州市海珠区官洲街道信息学院 </div>
            <div class="text">计科1000001号</div>
        </div>
    </div>
</template>

<script>
export default {
    computed:{
        isShowFoot(){
            return this.$store.state.UserAbout.isShowFoot
        }
    }


}
</script>

<style lang="scss" scoped>
.footer {
    width: 100%;
    background-color: #d8d8d8;
    height: 270px;
    // position: absolute;
    // bottom: 0;


}

.footerList {
    display: flex;
    justify-content: space-between;
    padding: 30px 140px 0px 140px;

    .footerItem {
        h4 {
            font-weight: bold;
            color: black;
        }

        .footerItemCon {
            font-size: 12px;
            color: #282727;

            li {
                margin-top: 7px;
            }
        }

        img {
            width: 90px;
            height: 90px;
            margin-top: 7px;

        }
    }

}

.copyright {
    display: flex;
    font-size: 12px;
    color: #282727;
    // flex-wrap: wrap;
    flex-direction: column;//主轴方向
    align-items: center;
    text-align: center;
    // width: 100%;

    .helpLink {
        // margin:0 auto;
        border-top: 1px solid #b2b1b1;
        display: flex;
        text-align: center;
        margin-top: 30px;
        padding-top:10px ;
        .space {
            border-right: 1px solid black;
            margin: 0 5px;

        }
    }
    .text{
            padding-top:10px ;
        }
}
</style>