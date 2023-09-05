<template>
    <MenuTypeVue :show="searchShow" :oneShow="oneShow" @changeShow="handleUpdateOneShow"></MenuTypeVue>

    <div class="search-all">
        <!-- 标签tag -->
        <div class="top">
            <span class="all-result">全部结果</span>
            <el-tag v-for="tag in tags" :key="tag" class="mx-1" @close="handleClose(tag)" closable effect="light">
                {{ tag }}
            </el-tag>
        </div>
        <!-- 商品参数 -->
        <div class="table">
            <!-- 品牌 -->
            <div class="left brand-div">
                <div class="left-title">
                    <span>品牌</span>
                </div>
                <ul class="brand-name">
                    <li v-for="p in currentSearchResult.trademarkList" :key="p.tmId" class="brandNameBorder"
                        @click="addBrandTag(p)">
                        {{ p.tmName }}</li>
                </ul>
            </div>
            <!-- 属性 -->
            <div class="left" v-for="p in currentSearchResult.attrsList" :key="p.attrId">
                <div class="left-title">{{ p.attrName }}</div>
                <ul class="attr-name">
                    <li v-for="(item, index) in p.attrValueList" :key="index" @click="addAttrTag(p, item)">
                        {{ item }}</li>
                </ul>
            </div>
        </div>
        <!-- 商品展示 -->
        <div>
            <!-- 标签页-tabs -->
            <el-tabs type="border-card" v-model="activeName" @tab-click="tabClick()">
                <el-tab-pane label="综合" name="comprehensive" class="tab-pane">
                    <div class="tab-content" v-for="item in currentSearchResult.goodsList" :key="item.id">
                        <div class="img" @click="gotoGoodDetail(item)">
                            <img :src="item.defaultImg" />
                        </div>
                        <div class="price-text">
                            ￥{{ item.price }}
                        </div>
                        <div class="product-text">
                            <p class="clamp-lines">{{ item.title }}</p>
                        </div>
                        <div class="comment">已有
                            <span>{{ item.id }}</span>人评价
                        </div>
                        <div class="btn2">
                            <el-button type="danger" plain @click="addCar(item)">加入购物车</el-button>
                            <el-button type="info" plain>收藏</el-button>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="价格" name="price" class="tab-pane">
                    <div class="tab-content" v-for="item in currentSearchResult.goodsList" :key="item.id">
                        <div class="img" @click="gotoGoodDetail(item)">
                            <img :src="item.defaultImg" />
                        </div>
                        <div class="price-text">
                            ￥{{ item.price }}
                        </div>
                        <div class="product-text">
                            <p class="clamp-lines">{{ item.title }}</p>
                        </div>
                        <div class="comment">已有
                            <span>{{ item.id }}</span>人评价
                        </div>
                        <div class="btn2">
                            <el-button type="danger" plain>加入购物车</el-button>
                            <el-button type="info" plain>收藏</el-button>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!-- 底部分页条 -->
        <el-pagination background layout="prev, pager, next" small :total="currentSearchResult.total" :page-size="limit"
            v-model="currentSearchResult.pageNo" class="pageClass" @current-change="currentPageChange" />
    </div>
</template>

<script>
import MenuTypeVue from './MenuType.vue';
import { addShopCart } from '../api/cart_good.js'
import { ElMessage } from "element-plus";
export default {
    components: { MenuTypeVue },
    beforeRouteUpdate(to, from, next) {
        this.searchObj2.category1Id = ""
        this.searchObj2.category2Id = ""
        this.searchObj2.category3Id = ""
        this.searchObj2.categoryName = ""
        next();
    },
    created() {
        console.log('this.$router', this.$route);
        if (this.$route.query.categoryName && this.$route.query.categoryId) {
            console.log("this.$route.query.categoryName ", this.$route.query.categoryName);
            console.log('this.$route.query.categoryId', this.$route.query.categoryId);
            console.log('this.$route.query.sort', this.$route.query.sort);
            // this.searchObj2.keyword = this.$route.query.name
            this.searchObj2.categoryName = this.$route.query.categoryName
            if (this.$route.query.sort == 1) {
                this.searchObj2.category1Id = this.$route.query.categoryId
            } else if (this.$route.query.sort == 2) {
                this.searchObj2.category2Id = this.$route.query.categoryId
            } else {
                this.searchObj2.category3Id = this.$route.query.categoryId
            }
        }
    },
    data() {
        return {
            searchShow:false,
            oneShow: false,
            //标签页-tabs
            activeName: 'comprehensive',
            limit: 5,
            // currentPage: 1,
            searchObj2: {
                keyword: '',//搜索关键词
                trademark: '',//品牌
                props: [],//属性,
                order: "1:desc",//排序方式
                pageSize: 5,//一页显示的数量
                categoryName: '',
                category1Id: '',
                category2Id: '',
                category3Id: '',
            },
            sort: 'desc',
            // lastValue: 'comprehensive'
        }
    },
    computed: {
        //获取当前的搜索结果
        currentSearchResult() {
            // console.log('1111', this.$store.state.SearchAbout.searchResult);
            return this.$store.state.SearchAbout.searchResult
        },
        //动态获取标签
        tags() {
            return this.$store.state.SearchAbout.tags
        }
    },
    methods: {
        //修改show的值
        handleUpdateOneShow(newValue) {
            // 在这里修改 oneShow
            console.log('修改前的oneShow',this.oneShow);
            this.oneShow = newValue;
            console.log('修改后的oneShow',this.oneShow);
        },
        //获取商品详情
        gotoGoodDetail(item) {
            console.log('当前的商品信息', item);
            //派发任务-获取商品详细信息
            this.$store.dispatch('GoodAbout/getDetail', item.id).then(() => {
                // 数据获取完成后跳转到商品详情页面
                this.$router.push({
                    path: '/good',
                    name: 'good',
                    params: {
                        id: item.id
                    }
                });
            });
        },
        //加入购物车
        async addCar(item) {
            console.log("点击按钮-添加到购物车");
            console.log('加入购物车', item);
            //用户未登录则跳转到登陆页面
            if (sessionStorage.getItem('token')) {
                // this.$store.state.UserAbout.token
                let res = await addShopCart(item.id, 1)
                console.log('发起添加到购物车请求', res.data);
                if (res.data.code == '200') {
                    //跳转到成功添加到购物车页面
                    // this.$router.push({ path: '/finishAddCart' })
                    //清空关键词
                    // this.$store.commit('SearchAbout/clearKeyword')
                    //存储当前的商品详情skuInfo信息
                    // this.$store.commit('GoodAbout/SAVE_CURRENTSKUINFO', { SKUINFO: item, CARTNUM: this.cartNum })
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
        // 标签页发生变化-点击价格或综合
        // tabClick() {
        //     this.$nextTick(() => {
        //         const value = this.activeName;
        //         console.log('标签页发生变化-当前点击', value);
        //         // const value=this.activeName
        //         // console.log('标签页发生变化-当前点击', value);
        //         if (value == this.lastValue) {//再次点击
        //             if (value == 'price') {
        //                 this.searchObj2.order = this.sort == 'desc' ? '2:desc' : '2:asc'
        //                 this.sort = this.sort == 'desc' ? 'asc' : 'desc'
        //             } else {
        //                 this.searchObj2.order = this.searchObj2.order == '1:desc' ? '1:asc' : '1:desc'
        //             }
        //         } else {
        //             if (value == 'price') {
        //                 this.searchObj2.order = this.sort == 'desc' ? '2:desc' : '2:asc'
        //                 this.sort = this.sort == 'desc' ? 'asc' : 'desc'
        //             }
        //             else{
        //                 this.searchObj2.order = '1:desc'
        //             }
        //         }
        //         this.lastValue = value
        //         this.searchObj2.keyword = this.$store.state.SearchAbout.keyword
        //         // console.log('标签页变化发起请求', this.searchObj2);
        //         //     //重新发起搜索请求
        //         this.$store.dispatch('SearchAbout/search', this.searchObj2)
        //     })
        // },
        tabClick() {
            this.$nextTick(() => {
                const value = this.activeName;
                console.log('标签页发生变化-当前点击', value);

                if (value === 'price') {
                    this.searchObj2.order = this.sort === 'desc' ? '2:asc' : '2:desc';
                    this.sort = this.sort === 'desc' ? 'asc' : 'desc';
                } else {
                    this.searchObj2.order = this.searchObj2.order === '1:desc' ? '1:asc' : '1:desc';
                }
                this.lastValue = value;
                this.searchObj2.keyword = this.$store.state.SearchAbout.keyword;
                this.$store.dispatch('SearchAbout/search', this.searchObj2);
            });
        },
        //页数发生变化
        currentPageChange(newValue) {
            console.log('当前页数', newValue);
            this.searchObj2.keyword = this.$store.state.SearchAbout.keyword
            this.searchObj2.pageNo = newValue
            console.log('页数变化', this.searchObj2);
            // 发起搜索请求
            this.$store.dispatch('SearchAbout/search', this.searchObj2);
        },
        //点击品牌-添加对应的tag并发起搜索
        addBrandTag(p) {
            console.log('点击品牌', p);
            this.searchObj2.keyword = this.$store.state.SearchAbout.keyword
            this.searchObj2.trademark = p.tmId + ":" + p.tmName
            // console.log('this.searchObj2',this.searchObj2);
            //发起搜索请求
            this.$store.dispatch('SearchAbout/search', this.searchObj2)
            //存储当前点击的品牌/属性，添加到tag中
            this.$store.commit("SearchAbout/ADDTAGS", p.tmName)
        },
        //关闭某个标签
        handleClose(tag) {
            console.log('关闭某个标签', tag, this.searchObj2.keyword);
            //移除当前标签名
            this.$store.state.SearchAbout.tags = this.$store.state.SearchAbout.tags.filter(p => p !== tag)
            // 因为不知道是点击属性还是点击品牌-所以要进行判断
            if (this.searchObj2.trademark.includes(tag)) {
                this.searchObj2.trademark = ''
            } else {
                this.searchObj2.props = this.searchObj2.props.filter((p) => {
                    return !p.includes(tag)
                })
            }
            //判断点击的是否去除搜索关键词
            if (tag == this.searchObj2.keyword) {
                this.searchObj2.keyword = ''
                this.searchObj2.trademark = ''
                this.searchObj2.props = []
                //清空tabs
                this.$store.commit('SearchAbout/clearTags')
                this.$store.commit('SearchAbout/clearKeyword')
                console.log('清空关键词后的searchObj2', this.searchObj2);
            }
            //判断点击的是否为categoryName
            if (tag == this.$route.query.categoryName) {
                this.searchObj2.category1Id = ""
                this.searchObj2.category2Id = ""
                this.searchObj2.category3Id = ""
                this.searchObj2.categoryName = ""
            }
            //重新发起搜索请求
            this.$store.dispatch('SearchAbout/search', this.searchObj2)

        },
        //点击某个属性值-添加对应的tag并发起搜索
        addAttrTag(p, item) {
            console.log('点击属性-属性名', p);
            console.log('点击属性-属性值', item);
            // "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"]
            this.searchObj2.keyword = this.$store.state.SearchAbout.keyword
            const processAttr = p.attrId + ":" + item + ":" + p.attrName
            this.searchObj2.props.push(processAttr)
            console.log('this.searchObj2', this.searchObj2);
            //  //发起搜索请求
            this.$store.dispatch('SearchAbout/search', this.searchObj2)
            // //存储当前点击的品牌/属性，添加到tag中
            this.$store.commit("SearchAbout/ADDTAGS", item)
        },
    }
}
</script>

<style scoped lang="scss">
.search-all {
    padding: 30px 120px 80px 120px;
    background-color: white;
    position: relative;
}

//标签tag
.top {
    .all-result {
        margin: 10px 10px;
        font-size: 14px;
    }

    .el-tag {
        margin-left: 5px;
    }
}

// 商品参数
.table {
    width: 100%;
    border: 1px solid #ddd;
    margin: 15px 0;

    .brand-div {
        height: 110px;
    }

    .left {
        display: flex;
        border-top: 1px solid #ddd;
        text-align: center;



        .left-title {
            width: 15%;
            background-color: #f1f1f1;
            border-right: 1 solid #ddd;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 7px 0px;
            font-size: 14px;

        }

        //属性名字
        .attr-name {
            display: flex;
            align-items: center;

            li {
                color: #4d4d4d;
                margin-left: 20px;
                font-size: 13px;
            }
        }

        //品牌名字
        .brand-name {
            display: flex;
            align-items: center;
            margin-left: 20px;

            li {
                font-size: 13px;
                font-weight: bold;
                color: red;
                border: 1px solid #ddd;
                padding: 20px 30px;
            }
        }


    }
}

// 商品展示
//标签页-综合/价格
.tab-pane {
    display: flex;
    position: relative;
}

.tab-content {
    width: 20%;
    margin: 10px;

    .price-text {
        margin-bottom: 10px;
        color: red;
        font-size: 20px;
        font-weight: bold;
    }

    .product-text {
        font-size: 13px;
        line-height: 18px;

        .clamp-lines {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            margin: 10px 7px;
            /* 指定最大行数 */
            /* 注意：为了跨浏览器兼容性，您可以使用 -webkit-line-clamp 和 -webkit-box-orient，但这可能不适用于所有浏览器 */
            /* 对于其他浏览器，您可能需要使用更多的CSS规则来实现相同的效果 */
        }
    }

    .comment {
        font-size: 14px;
        color: gray;
        margin: 10px 7px;

        span {
            color: blue;
            font-weight: bold;
        }
    }

    .btn {
        display: flex;
    }

    .img {
        img {
            width: 215px;
            height: 215px;
        }

    }
}


//分页条
.pageClass {
    position: absolute;
    right: 120px;
    bottom: 40px;
}
</style>