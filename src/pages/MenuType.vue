<template>
    <div class="menu-home" >
        <div class="menu-content"  >

            <div class="topTitle">
                <div class="title-red"  @mouseover="intoAllSort" @mouseleave="outAllSort">全部商品分类</div>
                <ul class="title-ul">
                    <li><a href="##">服装城</a></li>
                    <li><a href="##">美妆馆</a></li>
                    <li><a href="##">棉花糖超市</a></li>
                    <li><a href="##">全球购</a></li>
                    <li><a href="##">闪购</a></li>
                    <li><a href="##">团购</a></li>
                    <li><a href="##">有趣</a></li>
                    <li><a href="##">秒杀</a></li>
                </ul>
            </div>
            <div class="menu-main">
                <div class="left" v-show="oneShow"  @mouseover="intoLeft" @mouseleave="outLeft">
                    <ul class="left-ul" ref="ulList">
                        <!-- @mouseleave="resetLi" -->
                        <li v-for="(p, index) in menu1Data" @mouseenter="highlightLi(p.categoryId, index)"
                            @mouseleave="resetLi" :key="p.categoryId" :class="{ 'on': category1Id == p.categoryId }"
                            :ref="index" @click="clickMenu1(p.categoryName, p.categoryId)">
                            <span>{{ p.categoryName }}</span>
                        </li>
                    </ul>
                    <div class="ulRight" ref="menu123" @mouseover="displayRight23" @mouseleave="resetRight">
                        <ul class="right-ul">
                            <li class="oneli" v-for="item in menu2Data.categoryChild" :key="item.categoryId">
                                <div class="li-all">
                                    <div class="li-left" @click="clickMenu2(item.categoryName, item.categoryId)">
                                        {{ item.categoryName }}
                                    </div>
                                    <!-- 三级分类数据 -->
                                    <ul class="menuList3-ul">
                                        <li>
                                            <span v-for="item2 in item.categoryChild" :key="item2.categoryId"
                                                @click="clickMenu3(item2.categoryName, item2.categoryId)"
                                                class="span-border">
                                                {{ item2.categoryName }}</span>
                                        </li>
                                    </ul>
                                </div>

                            </li>
                        </ul>
                    </div>
                    <!-- @mouseenter="rightHover()" @mouseleave="rightHoverOut" -->
                    <!-- 二级分类和三级分类 -->
                    <!-- <div class="ulRight" ref="menu123" >
                    <ul class="right-ul">
                        <li class="oneli" v-for="(item, index) in menu2Data" :key="item.id">
                            <div class="li-all">
                                <div class="li-left">
                                    {{ item.name }}
                                </div> -->
                    <!-- 三级分类数据 -->
                    <!-- <ul class="menuList3-ul">
                                    <li>
                                        <span v-for="item in menu3Data[index]" :key="item.id" class="span-border">
                                            {{ item.name }}</span>
                                    </li>
                                </ul>
                            </div>

                        </li>
                    </ul>
                </div> -->

                </div>
                <!-- 轮播图 -->
                <div class="center" v-show="show">
                    <el-carousel :interval="5000" arrow="always" height="510px">
                        <el-carousel-item v-for="(item, index) in changeImgData" :key="index">
                            <img :src="item" />
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <!-- 快报和图标 -->
                <div class="right" v-show="show">
                    <div class="rightTop">
                        <div class="r-top">
                            <div class="top1">
                                <div class="top1-1">棉花糖快报</div>
                                <div class="top1-2">更多&nbsp;></div>
                            </div>
                            <ul class="top2">
                                <li>
                                    <span class="top2-1">[特惠]</span>
                                    <span class="top2-2">备战开学季&nbsp;&nbsp;全民半价购数码</span>
                                </li>
                                <li>
                                    <span class="top2-1">[公告]</span>
                                    <span class="top2-2">备战开学季&nbsp;&nbsp;全民半价购数码</span>
                                </li>
                                <li>
                                    <span class="top2-1">[特惠]</span>
                                    <span class="top2-2">备战开学季&nbsp;&nbsp;全民半价购数码</span>
                                </li>
                                <li>
                                    <span class="top2-1">[公告]</span>
                                    <span class="top2-2">备战开学季&nbsp;&nbsp;全民半价购数码</span>
                                </li>
                                <li>
                                    <span class="top2-1">[特惠]</span>
                                    <span class="top2-2">备战开学季&nbsp;&nbsp;全民半价购数码</span>
                                </li>
                            </ul>
                        </div>
                        <div class="r-bottom">
                            <ul class="bottom-ul">
                                <li>
                                    <i style="background-position: 0 -5px;"></i>
                                    <span>话费</span>
                                </li>
                                <li>
                                    <i style="background-position: -65px -5px;"></i>
                                    <span>机票</span>
                                </li>
                                <li>
                                    <i style="background-position: -130px -5px;"></i>
                                    <span>电影票</span>
                                </li>
                                <li> <i style="background-position: -195px -5px;"></i>
                                    <span>游戏</span>
                                </li>
                                <li> <i style="background-position: 0 -70px;"></i>
                                    <span>彩票</span>
                                </li>
                                <li> <i style="background-position: -65px -70px"></i>
                                    <span>加油站</span>
                                </li>
                                <li> <i style="background-position:-130px -70px;"></i>
                                    <span>酒店</span>
                                </li>
                                <li> <i style="background-position: -195px -70px;"></i>
                                    <span>火车票</span>
                                </li>
                                <li> <i style="background-position: 0 -140px;"></i>
                                    <span>众筹</span>
                                </li>
                                <li> <i style="background-position: -65px -140px;"></i>
                                    <span>理财</span>
                                </li>
                                <li> <i style="background-position: -130px -140px;"></i>
                                    <span>礼品卡</span>
                                </li>
                                <li> <i style="background-position: -195px -140px;"></i>
                                    <span>白条</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="rightBottom">
                        <img src="../images/changeImageData/ad1.png">
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getMenuSort1, getMenu } from '../api/menu.js'
export default {
    created() {
        this.getData()
    },
    props: ['show', 'oneShow'],
    data() {
        return {
            isInLeft:false,
            //轮播图图片
            changeImgData: [
                '/src/images/changeImageData/banner1.jpg',
                '/src/images/changeImageData/banner2.jpg',
                '/src/images/changeImageData/banner3.jpg',
                '/src/images/changeImageData/banner4.jpg'
            ],
            menu1Data: [],//一级分类数据
            menu2Data: [],//二级分类数据
            category1Id: '',//当前指向的一级分类菜单的id
            isRightHovered: false,//标识鼠标是否悬停在右边
            //复制一级id
            copyCategory1Id: '',
        }
    },
    methods: {
        //鼠标经过全部商品分类
        intoAllSort() {
            // 触发一个自定义事件，通知父组件修改 oneShow
            console.log('鼠标进入全部商品分类');
            this.$emit('changeShow', true);
            console.log("11111");
        },
        //鼠标离开全部商品分类
        outAllSort() {
            console.log('鼠标离开全部商品分类');
            if(!this.isInLeft){//如果没停留在下面
                this.$emit('changeShow', false);
            }else{
                this.$emit('changeShow', true);
            }
            console.log('22222');
        },
        intoLeft(){
            this.isInLeft=true
            this.$emit('changeShow', true);
        },
        outLeft(){
            this.isInLeft=false
            this.$emit('changeShow', false);
            // this.$emit('changeShow', false);
        },
        //获取一级分类数据   
        async getData() {
            // const res = await getMenuSort1();
            const res = await getMenu();
            // console.log('成功获取一级分类数据',res.data);
            this.menu1Data = res.data.data
            console.log('基础菜单分类', this.menu1Data);
            // console.log('一级分类数据menu1Data', this.menu1Data);
            //派发任务获取二级数据和三级数据
            // this.$store.dispatch('MenuAbout/get2Data', this.menu1Data)

        },
        async highlightLi(id, index) {
            //显示二三级菜单
            this.$refs.menu123.style.display = "block";
            //一级分类的id
            this.category1Id = id
            this.copyCategory1Id = id
            //当前的二级分类 三级分类数据
            this.menu2Data = this.menu1Data[index]
            console.log('当前的二级分类', this.menu2Data);
        },
        //重置数据
        resetLi() {
            //判断鼠标是都悬停在右边
            if (!this.isRightHovered) {
                this.category1Id = ''
            }
            // console.log('鼠标离开左边')
            this.$refs.menu123.style.display = "none";
        },
        //鼠标进入右边
        displayRight23() {
            // console.log('鼠标进入右边')
            this.category1Id = this.copyCategory1Id
            this.$refs.menu123.style.display = "block";
            this.isRightHovered = true
        },
        //鼠标离开右边
        resetRight() {
            // console.log('鼠标离开右边')
            //隐藏二三级菜单
            this.$refs.menu123.style.display = "none";
            this.category1Id = ''
            this.isRightHovered = false
        },
        //点击一级分类菜单
        clickMenu1(name1, id1) {
            console.log('点击一级分类菜单传递过来的数据', name1, id1);
            //派发任务，发起搜索请求
            this.$store.dispatch('SearchAbout/search', {
                category1Id: id1,
                categoryName: name1
            })
            // //派发任务，存储搜索的tag
            this.$store.commit("SearchAbout/ADDCLICKTAGS", name1)
            this.$router.push({
                path: '/search',
                name: 'search',
                query: { categoryName: name1, categoryId: id1, sort: 1 }
            });

        },
        //点击二级分类菜单
        clickMenu2(name2, id2) {
            console.log('点击二级分类菜单传递过来的数据', name2, id2);
            //派发任务，发起搜索请求
            this.$store.dispatch('SearchAbout/search', {
                category2Id: id2,
                categoryName: name2
            })
            // //派发任务，存储搜索的tag
            this.$store.commit("SearchAbout/ADDCLICKTAGS", name2)
            this.$router.push({
                path: '/search',
                name: 'search',
                query: { categoryName: name2, categoryId: id2, sort: 2 }
            });
        },

        //点击三级分类菜单搜索数据
        clickMenu3(name3, id3) {
            console.log('点击三级分类菜单传递过来的数据', name3, id3)
            //派发任务，发起搜索请求
            this.$store.dispatch('SearchAbout/search', {
                category3Id: id3,
                categoryName: name3
            })
            // //派发任务，存储搜索的tag
            this.$store.commit("SearchAbout/ADDCLICKTAGS", name3)
            this.$router.push({
                path: '/search',
                name: 'search',
                query: { categoryName: name3, categoryId: id3, sort: 3 }
            });

        },




        //获取li焦点并高亮-并获取数据
        // async highlightLi(id, index) {
        //     this.$refs.menu123.style.display = "block";
        //     this.category1Id = id
        //     this.currentIndex = index
        //     // this.isRightHovered=true
        //     console.log('当前指中的一级分类的id', id);
        //     //当前的二级分类菜单
        //     this.$store.state.MenuAbout.menu2Data.map((p) => {
        //         p.map((item) => {
        //             if (item.category1Id == id) {
        //                 this.menu2Data.push(item)
        //             }
        //         })
        //     })
        //     console.log('当前二级分类菜单', this.menu2Data);
        //     //获取当前的二级分类的三级分类数据
        //     this.menu3Data = this.$store.state.MenuAbout.menu3Data[index]
        //     console.log('当前的三级分类数据', this.menu3Data);
        //     //获取二级分类的数据
        //     // getMenuSort2(this.category1Id).then((res2) => {
        //     //     this.menu2Data = res2.data.data
        //     //     console.log('二级分类数据menu2Data', this.menu2Data);
        //     //     //过滤出二级分类菜单中name为空的
        //     //     this.menu2Data = this.menu2Data.filter(p => p.name.trim() != '')
        //     //     console.log('进一步加工后的二级分类数据22222', this.menu2Data);
        //     //     this.menu2Data.map((p) => {
        //     //         if (p.id) {
        //     //             getMenuSort3(p.id).then((res) => {
        //     //                 // console.log('获取三级分类数据',res);
        //     //                 if (res.data.data.length != 0) {
        //     //                     this.menu3Data.push(res.data.data)
        //     //                     // console.log('menu3Data', this.menu3Data)
        //     //                     //对得到的三级分类数据按照二级分类id进行升序排序
        //     //                     this.menu3Data = this.menu3Data.sort((a, b) => a[0].category2Id - b[0].category2Id)
        //     //                     console.log('排序后的三级分类菜单', this.menu3Data);
        //     //                     // //对排序后的三级分类数据进行加工-去除名字为空的
        //     //                     this.menu3Data = this.menu3Data.map((p) => {
        //     //                         return p.filter(item => item.name.trim() !== '')
        //     //                     })
        //     //                     console.log('进一步加工后的三级分类数据33333', this.menu3Data);
        //     //                 }
        //     //             })
        //     //         }
        //     //     })
        //     // })
        // },

    },


}
</script>

<style scoped lang="scss">
.menu-home {
    position: relative;
    background-color:white;
    .menu-content{
        padding: 0 120px;
    }
    .topTitle {
        border-bottom: 2px solid red;
       
        display: flex;
        background-color: white;

        .title-red {
            width: 210px;
            background-color: red;
            color: white;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .title-ul {
            display: flex;
            // margin-left: 30px;
            margin: 20px 0 20px 30px;

            li {
                margin-right: 30px;
            }
        }
    }

    .menu-main {
        // padding: 0 120px;
        // width: 100%;
        display: flex;
        // background-color: aquamarine;
        // position: relative;

        .left {
            width: 210px;
            height: 510px;
            background-color: #f0f0f0;
            // position: relative;
            position: absolute;
            top: 58px;
            left: 120px;
            z-index: 99999;

            .left-ul {
                // text-align: center;
                display: flex;
                flex-direction: column;

                // display: flex;
                li {
                    height: 30px;
                    line-height: 30px;
                    padding-left: 15px;
                    padding-top: 3px;
                }

                .on {
                    background-color: rgb(96, 181, 247);
                }
            }

            .ulRight {
                overflow: hidden; //超出部分隐藏
                width: 732px;
                height: 512px;
                position: absolute; //相对于left定位
                top: 0;
                left: 210px;
                display: none;
                background-color: #e6e6e6;
                z-index: 999;

                .right-ul {

                    .oneli {
                        margin: 20px 0px 0px 20px;

                        // display: flex;
                        .li-all {
                            display: flex;
                            align-items: flex-start;

                        }

                        .li-left {
                            margin-right: 5px;
                            font-weight: bold;
                            color: #5a5a5a;
                            min-width: 70px; // 保持一定宽度
                        }

                        .menuList3-ul {
                            display: flex;
                            flex-direction: column;
                            flex-wrap: wrap;
                            margin-right: 80px;
                            padding-left: 15px;

                            li {
                                margin-bottom: 5px; // 调整下方间距
                                font-size: 14px;
                                line-height: 20px;
                            }

                            .span-border {
                                border-left: 1px solid gray;
                                padding: 0 6px;
                                font-weight: normal;
                            }

                        }





                    }
                }
            }
        }

        .center {
            margin-top: 2px;
            width: 730px;
            height: 510px;
            background-color: bisque;
            margin-left: 210px;

            img {
                width: 730px;
                height: 510px;
            }
        }

        .right {
            margin-top: 2px;
            flex: 1;
            // background-color: aquamarine;
            margin-left: 15px;

            .rightTop {
                border: 1px solid #eaeaea;
                overflow: hidden;
            }

            .r-top {

                padding: 15px 10px 15px 10px;
                background-color: white;

                .top1 {
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                    padding-bottom: 5px;
                    border-bottom: 1px solid #eaeaea;

                    .top1-1 {
                        font-size: 17px;
                        font-weight: bold;
                    }

                    .top1-2 {
                        font-size: 14px;
                    }
                }

                .top2 {
                    display: flex;
                    flex-direction: column;

                    li {
                        margin-top: 10px;

                        .top2-1 {
                            font-size: 13px;
                            font-weight: bold;
                        }

                        .top2-2 {
                            font-size: 13px;
                            margin-left: 5px;
                        }
                    }
                }
            }

            .r-bottom {
                // margin-top: 15px;
                height: 200px;
                background-color: white;


                .bottom-ul {
                    display: flex;
                    flex-wrap: wrap;

                    li {
                        width: 25%;
                        display: flex;
                        flex-direction: column;
                        text-align: center;
                        font-size: 14px;

                        i {
                            // background-image: url(/img/icons.eb262dc2.png);
                            width: 60px;
                            height: 50px;
                            display: block;
                            // background-position: -65px -70px
                            background-image: url('../images/changeImageData/icons.png');
                        }
                    }
                }

            }

            .rightBottom {
                margin-top: 10px;
                position: absolute;
                bottom: 0;

                // width: 100%;
                // overflow: hidden;
                img {
                    width: 227px;
                    height: 90px;
                }
            }
        }
    }
}
</style>