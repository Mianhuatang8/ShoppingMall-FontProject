<template>
    <div class="all">
        <div class="one">
            <div class="title">
                {{ title }}
            </div>
            <ul class="one_ul">
                <li v-for="(p, index) in data" :key="index">
                    <span class="span_border" :class="{ 'no-border': index == data.length - 1 }"> {{ p }}</span>
                </li>
            </ul>
        </div>
        <div class="two">
            <div class="tow1">
                <ul class="list">
                    <li><span>滚筒洗衣机</span></li>
                    <li><span>鲁班挨揍</span></li>
                    <li><span>棉花糖真美</span></li>
                    <li><span>棉花糖真漂亮</span></li>
                    <li><span>滚筒洗衣机</span></li>
                    <li><span>电热水器</span></li>
                </ul>
                <img src="../images/phoneImage/floor-1-1.png" alt="">
            </div>
            <div class="tow2-banner">
                <el-carousel :interval="3000" arrow="always" height="380px">
                    <el-carousel-item v-for="(item, index) in imgData" :key="index">
                        <img :src="item">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="tow3_all">
                <div class="tow3">
                    <div class="left">
                        <img class="footborder"  src="../images/phoneImage/floor-1-2.png">
                        <img src="../images/phoneImage/floor-1-3.png">
                    </div>
                    <div class="center">
                        <img src="../images/phoneImage/floor-1-4.png">
                    </div>
                    <div class="right">
                        <img class="footborder" src="../images/phoneImage/floor-1-5.png">
                        <img src="../images/phoneImage/floor-1-6.png">
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title', 'data'],
    data() {
        return {
            imgData: ['/src/images/phoneImage/floor-1-b01.png',
                '/src/images/phoneImage/floor-1-b02.png',
                '/src/images/phoneImage/floor-1-b03.png'
            ],

        }
    },
}
</script>

<style scoped lang="scss">
.all {
    padding: 0 120px;
    margin-top: 30px;
    // margin-bottom: 30px;
    // background-color: red;
    // height: 380px;

    .one {
        display: flex;
        justify-content: space-between;

        .title {
            color: red;
            font-size: 19px;
            font-weight: bold;

        }

        .one_ul {
            display: flex;
            font-size: 14px;
            color: black;

            .span_border {
                border-right: 1px solid rgb(40, 40, 40);
                padding: 0 5px;
            }

            .no-border {
                border: none;
            }
        }


    }

    .two {
        background-color: rgb(255, 255, 255);
        border-top: 3px solid red;
        margin-top: 10px;
        display: flex;
        height: 380px;
        overflow: hidden;
        .tow1 {
            width: 209px;

            img {
                width: 209px;
                height: 254px;
            }

            .list {
                display: flex;
                flex-wrap: wrap;
                font-size: 14px;
                padding: 0 10px;
                padding-bottom: 22px;
                background-color: #f3f3f3;

                li {
                    width: 48%;
                    margin-top: 20px;

                    span {
                        border-bottom: 1px solid gray;
                        padding: 10px 0;

                    }
                }
            }
        }

        .tow2-banner {
            width: 329px;
            // height: 360px;

            img {
                height: 380px;
                width: 290px;
            }
        }

        .tow3_all {
            flex: 1;
            // background-color: red;

            .tow3 {
                // flex:1,

                display: flex;

                .left {
                    height: 380px;
                    img{
                        height: 50%;
                    }
                }

                .center {
                    height: 380px;
                    border-right: 1px solid #dcdcdc;
                    border-left: 1px solid #dcdcdc;
                    img{
                        height: 380px;
                    }
                }
                .right{
                    height: 380px;
                    img{
                        height: 50%;
                    }
                }
                .footborder{
                    border-bottom: 1px solid #dcdcdc;
                }

            }
        }

    }
}
</style>