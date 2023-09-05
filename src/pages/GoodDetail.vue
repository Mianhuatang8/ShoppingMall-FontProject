<template>
    <div class="good-all">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/" class="pagetitle">
            <el-breadcrumb-item>{{ goodInformation.categoryView.category1Name }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ goodInformation.categoryView.category2Name }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ goodInformation.categoryView.category3Name }}</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 图片和文字信息 -->
        <div class="main">
            <div class="left">
                <div class="left-1" ref="imgBody" @mouseover="enterImg" @mouseout="outImg" @mousemove="moveMask">
                    <img ref="smallImg" :src="goodInformation.skuInfo.skuDefaultImg">
                    <div class="bigImg" ref="bigImgDiv">
                        <img class="afterImg" :src="goodInformation.skuInfo.skuDefaultImg" ref="bigImg">
                    </div>
                    <!-- 照片遮罩 -->
                    <div class="mask" ref="mask"></div>
                </div>

                <!-- 底部图片选择栏 -->
                <div class="left-2">
                    <!-- 小图列表 -->
                    <div class="left-btn" @click="goBack">
                        <span> &lt;</span>
                    </div>

                    <ul class="imgList" ref="imgul">
                        <li v-for="(item, index) in goodInformation.skuInfo.skuImageList" :key="item.id" ref="imgLiRef">
                            <img :src="item.imgUrl" :class="{ 'active-on': item.isDefault == '1' }"
                                @click="handelActive(index, goodInformation.skuInfo.skuImageList)">
                        </li>
                    </ul>

                    <div class="right-btn" @click="goForward">
                        <span>&gt;</span>
                    </div>
                </div>

            </div>
            <div class="right">
                <!-- 商品名称和描述 -->
                <div class="title-1">{{ goodInformation.skuInfo.skuName }}</div>
                <div class="title-2">{{ goodInformation.skuInfo.skuDesc }}</div>
                <!-- 价格和促销 -->
                <div class="price-sale">
                    <div class="price">
                        <div class="price1">
                            <div class="p-left">价格</div>
                            <div class="p-left2">￥<span class="price-span">{{ goodInformation.skuInfo.price }}</span>降价通知
                            </div>
                        </div>
                        <div class="comment">累计评价{{ goodInformation.skuInfo.id * 2 }}</div>
                    </div>

                    <div class="sale">
                        <div class="s-left">促销</div>
                        <div class="s-left2">
                            <div class="addprice">加价购</div>
                            <div class="addprice2">{{ goodInformation.skuInfo.createTime }}</div>
                        </div>

                    </div>
                </div>
                <!-- 支持 -->
                <div class="one-all">
                    <div class="left-text">支持</div>
                    <div class="right-text">
                        以旧换新，闲置手机回收&nbsp;4G套餐超值抢&nbsp;礼品购
                    </div>
                </div>
                <!-- 配送至 -->
                <div class="one-all">
                    <div class="left-text">配送至</div>
                    <div class="right-text">广东省&nbsp;广州市&nbsp;海珠区</div>
                </div>
                <!-- 分割线 -->
                <hr class="hr-line">
                <!-- 属性选选择 -->
                <ul class="two-all" v-for="item in goodInformation.spuSaleAttrList" :key="item.id">
                    <li>
                        <span class="left-attr">{{ item.saleAttrName }}</span>
                        <el-button v-for="p in item.spuSaleAttrValueList" :key="p.id"
                            @click="changeOn(p, item.spuSaleAttrValueList)" :class="{ 'on': p.isChecked == '1' }">
                            {{ p.saleAttrValueName }}
                        </el-button>
                    </li>
                </ul>

                <!-- 加入购物车以及数量选择 -->
                <div class="addtoCart">
                    <el-input-number v-model="cartNum" :min="1" size="small" controls-position="right" />
                    <el-button type="danger" @click="addToCart">加入购物车</el-button>
                </div>

            </div>
        </div>

        <!-- 底部详情信息 -->
        <DetailFooter></DetailFooter>


    </div>
</template>

<script>
import DetailFooter from '../components/DetailFooter.vue';
import { addShopCart } from '../api/cart_good.js'
import { ElMessage } from "element-plus";
export default {
    components: { DetailFooter },

    //从vuex中获取存储的商品详情数据
    created() {
        // console.log('1111',this.goodInformation);
        this.goodInformation = this.$store.state.GoodAbout.goodDetail;
        this.goodInformation.skuInfo.skuImageList.forEach(item=>item.isDefault='0')
        this.goodInformation.skuInfo.skuImageList[0].isDefault='1'
    },
    data() {
        return {
            // 商品信息
            goodInformation: {},
            cartNum: 1,
            //存放当前图片的索引
            currentIndex: 0,
        }
    },
    methods: {
        //小图列表
        //激活当前点击图片的高亮
        handelActive(index, imgListArr) {
            console.log('1111', imgListArr);
            imgListArr.forEach((item) => {
                item.isDefault = '0'
            })
            imgListArr[index].isDefault = '1'
            this.currentIndex = index
            console.log('222222', imgListArr);
            console.log('this.currentIndex', this.currentIndex);
        },
        // 前进
        goForward() {
            if (this.currentIndex < this.goodInformation.skuInfo.skuImageList.length - 1) {
                console.log('111', this.currentIndex);
                this.currentIndex++;
                console.log('2222', this.currentIndex);
                //排他留己
                this.goodInformation.skuInfo.skuImageList.forEach((item) => { item.isDefault = '0' })
                this.goodInformation.skuInfo.skuImageList[this.currentIndex].isDefault = '1'
                //错误-this.$refs.imgli.offsetWidth输出undefined
                // this.$refs.imgul.style.transform = `translateX(${-this.$refs.imgli.offsetWidth}px)`;
                //原因：使用了错误的参考（this.$refs.imgLiRef.offsetWidth,this.$refs.imgLiRef 是一个包含所有 li 元素引用的数组
                //正确的做法是在循环中通过索引来获取对应的 li 元素的引用，然后获取其宽
                  const liWidth = this.$refs.imgul.children[this.currentIndex].offsetWidth;
                // const liWidth=this.$refs.imgLiRef[this.currentIndex].offsetWidth
                  //或者this.$refs.imgLiRef[this.currentIndex].offsetWidth
                // this.$refs.imgul.style.transform = `translateX(-${liWidth * this.currentIndex}px)`;
                 this.$refs.imgul.style.transform = `translateX(-${liWidth * this.currentIndex}px)`;

            }
        },
        // 后退
        goBack() {
            if (this.currentIndex > 0) {
                console.log('111', this.currentIndex);
                this.currentIndex--;
                console.log('2222', this.currentIndex);
                //排他留己
                this.goodInformation.skuInfo.skuImageList.forEach((item) => { item.isDefault = '0' })
                this.goodInformation.skuInfo.skuImageList[this.currentIndex].isDefault = '1'
                const liWidth = this.$refs.imgul.children[this.currentIndex].offsetWidth;
                this.$refs.imgul.style.transform =`translateX(-${liWidth * this.currentIndex}px)`;

            }
        },

        //1-遮罩层和放大层的显示与隐藏
        //鼠标进入预览图片
        enterImg() {
            this.$refs.mask.style.display = 'block'
            this.$refs.bigImgDiv.style.display = 'block'

        },
        //鼠标移除预览图片
        outImg() {
            this.$refs.mask.style.display = 'none'
            this.$refs.bigImgDiv.style.display = 'none'
        },
        //2-遮罩层跟着鼠标移动
        moveMask(e) {
            // console.log('输出当前的鼠标对象', e);
            //当前的鼠标位置
            const x = e.pageX
            const y = e.pageY
            // console.log('x,y', x, y);
            //offsetLeft、offsetTop:放照片的div距离左边的距离和顶部距离
            //鼠标距离盒子的距离
            var X = x - this.$refs.imgBody.offsetLeft
            var Y = y - this.$refs.imgBody.offsetTop
            //mask的移动距离
            var maskX = X - this.$refs.mask.offsetWidth / 2
            var maskY = Y - this.$refs.mask.offsetHeight / 2

            //存放照片盒子的自身宽高
            // this.$refs.imgBody.offsetWidth
            // this.$refs.imgBody.offsetHeight
            //遮罩的移动距离
            if (maskX > this.$refs.imgBody.offsetWidth - this.$refs.mask.offsetWidth) {
                maskX = this.$refs.imgBody.offsetWidth - this.$refs.mask.offsetWidth
            } else if (maskX < 0) {
                maskX = 0
            }
            if (maskY > this.$refs.imgBody.offsetHeight - this.$refs.mask.offsetHeight) {
                maskY = this.$refs.imgBody.offsetHeight - this.$refs.mask.offsetHeight
            } else if (maskY < 0) {
                maskY = 0
            }
            this.$refs.mask.style.top = maskY + 'px'
            this.$refs.mask.style.left = maskX + 'px'
            // 遮罩偏移量   大图偏移量
            // 遮罩最大移动距离   大图最大移动距离
            // 大图偏移量=遮罩偏移量*大图最大移动距离/遮罩最大移动距离

            // 遮罩最大移动距离 
            var mx = this.$refs.imgBody.offsetWidth - this.$refs.mask.offsetWidth
            var my = this.$refs.imgBody.offsetWidth - this.$refs.mask.offsetWidth

            //大图最大移动距离
            //大图最大移动距离
            // var bx = this.$refs.bigImgDiv.offsetWidth - this.$refs.bigImg.offsetWidth
            // var by = this.$refs.bigImgDiv.offsetHeight - this.$refs.bigImg.offsetHeight

            // this.$refs.bigImgDiv.offsetWidth-this.$refs.bigImg.offsetWidth
            var bx = this.$refs.bigImg.offsetWidth - this.$refs.bigImgDiv.offsetWidth
            var by = this.$refs.bigImg.offsetHeight - this.$refs.bigImgDiv.offsetHeight

            var bigX = maskX * bx / mx
            var bigY = maskY * by / my

            //遮罩向右移动 放大图片应向左移动 
            this.$refs.bigImg.style.top = '-' + bigY + 'px'
            this.$refs.bigImg.style.left = '-' + bigX + 'px'
            // console.log('  this.$refs.bigImg.style.top', this.$refs.bigImg.style.top, this.$refs.bigImg.style.left);
        },
        //改变选中的按钮
        changeOn(item, items) {
            console.log('item', item);
            console.log('items', items);
            items.forEach((p) => {
                p.isChecked = '0'
            })
            item.isChecked = '1'
        },
        //加入购物车
        async addToCart() {
            //用户未登录则跳转到登陆页面
            if (sessionStorage.getItem('token')) {
                let res = await addShopCart(this.goodInformation.skuInfo.id, this.cartNum)
                console.log('发起添加到购物车请求', res.data);
                if (res.data.code == '200') {
                    //跳转到成功添加到购物车页面
                    this.$router.push({ path: '/finishAddCart' })
                    //清空关键词
                    this.$store.commit('SearchAbout/clearKeyword')
                    //存储当前的商品详情skuInfo信息
                    this.$store.commit('GoodAbout/SAVE_CURRENTSKUINFO', { SKUINFO: this.goodInformation.skuInfo, CARTNUM: this.cartNum })
                    ElMessage({
                        showClose: true,
                        message: '成功添加到购物车',
                        type: "success",
                    });
                } else {
                    ElMessage({
                        showClose: false,
                        message: '添加失败',
                        type: "error",
                    });
                }
            } else {
                console.log('未登录-跳转到登陆页面');
                ElMessage({
                    showClose: true,
                    message: '请先登录',
                    type: "error",
                });
                this.$router.push({ path: '/login' })
                console.log('11111');
            }


        },


    }
}
</script>

<style scoped lang="scss">
.good-all {
    padding: 20px 120px;
    background-color: white;

    //面包屑
    .pagetitle {
        margin-bottom: 10px;
    }

    .main {
        // width: 100%;
        display: flex;

        .left {
            //左边图片
            width: 400px;
            // height: 400px;
            // background-color: red;
            display: flex;
            flex-direction: column;

            .left-1 {
                width: 401px;
                height: 400px;
                border: 1px solid #ccc;
                // margin-bottom: 1px;
                position: relative;

                .mask {
                    width: 150px;
                    height: 150px;
                    background-color: rgba(240, 207, 115, 0.5);
                    /* 设置遮罩层颜色和透明度 */
                    cursor: pointer;
                    /* 将鼠标光标设置为小手 */
                    position: absolute; //定位遮罩的位置
                    top: 0;
                    left: 0;
                    display: none;
                }

                img {
                    width: 400px;
                    height: 400px;
                }

                .bigImg {
                    width: 400px;
                    height: 400px;
                    position: absolute;
                    top: -1px;
                    left: 400px;
                    border: 1px solid #ccc;
                    background-color: antiquewhite;
                    overflow: hidden;
                    display: none;
                    z-index: 9999;
                    // position: relative;

                    .afterImg {
                        position: relative;
                        top: 0px;
                        left: 0px;
                        width: 800px;
                        height: 800px;
                    }
                }

            }

            //底部图片选择器
            .left-2 {
                width: 400px;
                height: 60px;
                position: relative;
                overflow: hidden;
                display: flex;
                align-items: center;

                .imgList {
        
                    background-color: white;
                    margin: 0 15px;
                    display: flex;
                     transition: transform 0.3s ease; // 添加过渡效果

                    li {
                        // width:183px;
                        flex:0 0 62%;
                        img {
                            width: 58px;
                            height: 58px;
                        }

                    }
                      // flex: 0 0 61%;

                    .active-on {
                        border: 2px solid red;
                    }
                }

                .left-btn {
                    position: absolute;
                    top: 0;
                    left: 0;
                    line-height: 60px;
                    text-align: center;
                    width: 15px;
                    height: 100%;
                    background-color: #e0e0e0;
                    text-align: center;
                    border: 1px solid #ccc;
                    cursor: pointer;
                    z-index:9999;
                }

                .right-btn {
                    z-index:9999;
                    position: absolute;
                    top: 0;
                    right: 0;
                    line-height: 60px;
                    text-align: center;
                    width: 15px;
                    height: 100%;
                    background-color: #e0e0e0;
                    text-align: center;
                    cursor: pointer;
                    border: 1px solid #ccc;

                }

                // .el-button{
                //     background-color:#e0e0e0;
                // }
                // .carousel {
                //     display: flex;
                //     width: 400px;
                //     height: 50px;

                //     .carousel-img {
                //         width: 50px;
                //         height: 50px;
                //     }
                // }
            }
        }

        //右边产品信息
        .right {
            flex: 1;
            // background-color: aqua;
            // display: flex;
            padding: 20px 60px;

            .title-1 {
                font-size: 16px;
                font-weight: bold;
                margin-bottom: 10px;
            }

            .title-2 {
                color: red;
                font-size: 13px;
                margin-bottom: 10px;
            }

            .price-sale {
                background-color: #ffe1e1;

                .price {
                    display: flex;
                    justify-content: space-between;
                    // padding: 20px 5px;
                    padding: 20px 5px 10px 5px;
                    align-items: baseline;


                    .price1 {
                        display: flex;
                        align-items: baseline;

                        .p-left {
                            font-size: 14px;
                            margin-right: 8px;
                            width: 45px;

                        }

                        .p-left2 {
                            color: red;
                            font-size: 13px;

                            .price-span {
                                font-size: 20px;
                                font-weight: bold;

                            }
                        }
                    }

                    .comment {
                        font-size: 13px;
                        margin-right: 5px;
                    }
                }

                .sale {
                    display: flex;
                    padding: 10px 5px 10px 5px;
                    align-items: baseline;

                    .s-left {
                        font-size: 14px;
                        margin-right: 8px;
                        width: 45px;
                    }

                    .s-left2 {
                        font-size: 12px;
                        display: flex;
                        align-items: center;

                        .addprice {
                            color: white;
                            background-color: red;
                            padding: 3px;

                        }

                        .addprice2 {
                            color: #9c9898;
                        }
                    }
                }
            }

            .one-all {
                display: flex;
                font-size: 14px;
                margin-top: 20px;

                .left-text {
                    width: 45px;
                    margin-right: 8px;
                }

                .right-text {
                    color: #9c9898;
                }

            }

            //分割线
            .hr-line {
                margin: 10px 0 22px 0;
                border-color: #f2f2f2;
            }

            .two-all {
                font-size: 14px;
                margin-bottom: 10px;

                .left-attr {
                    width: 45px;
                    margin-right: 8px;
                }

                .el-button {
                    background-color: white;
                }

                .on {
                    border: 1px solid red;
                    color: red;
                }
            }

            .el-input-number {
                width: 80px;
            }


        }
    }
}</style>