<template>
    <div class="cart-all">
        <div class="cart-top-title"> 全部商品</div>
        <!-- 表格 -->
        <!-- @select="handleSelect" @select-all="handelAllCheck" -->
        <el-table :data="cartData" style="width: 100%" ref="cartTable">
            <!-- type="selection"  -->
            <el-table-column width="55" label="全部">
                <template #default="checkScope">
                    <!-- :checked="checkScope.row.isChecked == '1'"  -->
                    <el-checkbox v-model="checkScope.row.isChecked" :true-label="1" :false-label="0"
                        @change="changeCheckBox(checkScope.row, $event)" />
                </template>
            </el-table-column>

            <el-table-column label="商品" width="400">
                <template #default="scope">
                    <div class="goods">
                        <div> <img :src="scope.row.imgUrl" class="good_img"></div>
                        <div class="text">{{ scope.row.skuName }}</div>
                    </div>
                </template>
            </el-table-column>

            <el-table-column Property="skuPrice" label="单价(元)" width="150">
                <template #default="priceScope">{{ priceScope.row.skuPrice }}</template>
            </el-table-column>

            <el-table-column label="数量" width="175">
                <!-- @change="handleChange" -->
                <template #default="countScope">
                    <el-input-number v-model="countScope.row.skuNum" :min="1" size="small" @change="debouncedChangeNum"
                        @mouseenter="getSkuId(countScope.row)" />
                </template>
            </el-table-column>

            <el-table-column label="小计(元)" width="200">
                <template #default="allPriceScope">
                    {{ allPriceScope.row.skuNum * allPriceScope.row.skuPrice }}
                </template>
            </el-table-column>

            <el-table-column label="操作" width="200">
                <template #default="operationScope">
                    <el-button link type="primary" size="small" @click="delItem(operationScope.row)">删除</el-button>
                    <el-button link type="primary" size="small">移到收藏</el-button>
                </template>
            </el-table-column>

        </el-table>

        <div class="cart-bottom">
            <div class="bottom-left">
                <div class=left-all>
                    <!--indeterminate:设置不确定状态，仅负责样式控制 -->
                    <el-checkbox v-model="checkedAll" size="large" @change="updateCheckedAll">全选</el-checkbox>
                    <div @click="deleteSelect">删除选中的商品</div>
                    <div>移到我的关注</div>
                    <div>清除下柜商品</div>

                </div>
                <div class="left-price">
                    <span class="margin-span">已经选择{{ totalCount }}件商品</span>
                    <span class="margin-span">总价(不含运费):<span class="price">{{ totalPrice }}</span></span>
                </div>
            </div>
            <div class="bottom-right">
                <el-button type="danger" @click="gotoPay">结算</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import _debounce from 'lodash/debounce';//导入防抖函数
import { getShopCartList, delGoodCart, addShopCart, changeProductSelect } from '../api/cart_good.js'
export default {
    //在进入之前清空头部搜索框的内容
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            console.log('路由守卫的vm', vm);
            vm.$store.commit('SearchAbout/clearKeyword')
        })
    },
    async created() {
        await this.getCartData()
        this.initCheckedAll(); // 初始化全选按钮状态
    },
    data() {
        return {
            indeterminate: false,//仅负责样式控制
            checkedAll: false,//全选按钮
            cartData: [],
            num: 2,
            // 被选中的数据列表
            // selectedList: [],
            //当前改变数量的商品的skuId
            currentSkuId: 0,
            // 当前改变数量的商品的最初的skuNum
            startSkuNum: 0,
            //防抖
            debouncedChangeNum: _debounce(this.changeNum, 1000),
            //准备结算的商品
            readyPayGood: [],
        }
    },
    computed: {
        // totalPrice() {
        //     const totalAll = this.selectedList.reduce((prev, item) => {
        //         return prev += item.skuPrice * item.skuNum
        //     }, 0)
        //     console.log('总价', totalAll);
        //     return totalAll
        // },
        totalCount() {
            const totalCount = this.cartData.reduce((prev, item) => {
                if (item.isChecked == 1) {
                    prev += 1
                }
                return prev
            }, 0)
            return totalCount

        },
        totalPrice() {
            const totalAll = this.cartData.reduce((prev, item) => {
                if (item.isChecked == 1) {
                    prev += item.skuPrice * item.skuNum
                }
                return prev
            }, 0)
            console.log('总价', totalAll);
            return totalAll
        },

        // 全选按钮的变化
        // checkedAll: {
        //     get() {
        //         console.log('计算属性', this.cartData);
        //         return this.cartData.every((item) => {
        //             return item.isChecked == 1
        //         })
        //     },
        // }
    },
    // 监听属性
    // watch: {
    //     checkedAll: {
    //         handler(newValue) {
    //             console.log('监听属性checkedAll-全选按钮发生变化', newValue)
    //         }
    //     }
    // },

    methods: {
        //获取购物车列表数据
        async getCartData() {
            let res = await getShopCartList();
            console.log('购物车列表数据', res.data);
            this.cartData = res.data.data[0].cartInfoList
            console.log('当前购物车的内容', this.cartData);
        },
        //单个复选框发生改变
        // async changeCheckBox(row, e) {
        //     console.log('单个复选框发生变化', row);
        //     console.log('单个复选框发生变化e', e);
        //     const checkedOne = e ? '1' : '0'
        //     // row.isChecked = row.isChecked == 1 ? 0 : 1
        //     let res = await changeProductSelect(row.skuId, checkedOne)
        //     console.log('修改商品选中状态', res.data);
        //     //重新获取购物车数据
        //     this.getCartData()
        //     //    this.handChangeCheckedAll()
        // },
        //初始化全选按钮状态
        initCheckedAll() {
            this.checkedAll = this.cartData.every((item) => {
                return item.isChecked == 1;
            })
        },
        async changeCheckBox(row, e) {
            let allTrue = this.cartData.every((item) => {
                return item.isChecked == 1;
            });
            let allFalse = this.cartData.every((item) => {
                return item.isChecked == 0;
            });
            if (allTrue) {
                this.checkedAll = true;
                // this.indeterminate = false;
            } else if (allFalse) {
                this.checkedAll = false;
                // this.indeterminate = false;
            }
            else {
                // this.indeterminate = true;
                this.checkedAll = false;
            }
            const checkedOne = e ? "1" : "0";
            let res = await changeProductSelect(row.skuId, checkedOne);
            //重新获取购物车数据
            // this.getCartData();
        },
        //全选按钮发生变化
        async updateCheckedAll(value) {
            if (value) {
                this.cartData.forEach((item) => {
                    item.isChecked = 1;
                });
            } else {
                this.cartData.forEach((item) => {
                    item.isChecked = 0;
                });
            }
            const checkedAll = value ? "1" : "0";
            //派发请求
            this.$store.dispatch("CartAbout/changeGoodState", { cartData: this.cartData, isChecked: checkedAll })
                .then((res) => {
                    console.log("派发全选按钮发生变化的请求结果", res);
                    //重新获取购物车数据
                    // this.getCartData()
                })
                .catch((error) => {
                    console.error("修改失败", error);
                    alert("修改失败");
                });
        },

        // 按钮发生变化
        // handleSelect(selections, row) {
        //     console.log('select-被选中的数据列表', selections);
        //     console.log('select-当前选中的数据', row);
        //     this.selectedList = selections

        //     row.isChecked = selections.includes(row);
        //     this.selectedList = this.cartData.filter(item => item.isChecked === 1);

        // },
        //手动触发全选按钮变化
        // handelAllCheck(selection) {
        //     console.log('select-all手动修改全选按钮', selection);
        //     this.selectedList = selection
        //     // if (this.selectedList.length == this.cartData.length) {
        //     //     this.checkedAll = true
        //     // } else {
        //     //     this.checkedAll = false
        //     // }
        //     // console.log('checkAll', this.checkedAll);
        //     this.cartData.forEach(item => {
        //         item.isChecked = selection.includes(item);
        //     });
        //     this.selectedList = this.cartData.filter(item => item.isChecked === 1);
        // },

        //批量删除选中的商品
        async deleteSelect() {
            for (const p of this.selectedList) {
                console.log('p', p);
                console.log('111111', p);
                let res = await delGoodCart(p.skuId);
                console.log('发起删除请求', res.data);
            }
            //重新获取购物车数据
            this.getCartData()

        },
        //删除某个商品
        async delItem(row) {
            console.log('当前准备从购物车删除的商品的内容', row);
            let res = await delGoodCart(row.skuId)
            console.log('发起删除请求', res.data);
            //重新获取购物车数据
            this.getCartData()
        },
        //获取当前改变数量的商品的skuId
        getSkuId(row) {
            console.log('row', row);
            this.currentSkuId = row.skuId
            this.startSkuNum = row.skuNum
            console.log('this.currentSkuId', this.currentSkuId);
            console.log('this.startSkuNum', this.startSkuNum);
        },
        //数量发生变化
        async changeNum(newValue, oldValue) {
            // console.log('当前传过来的值',row);
            console.log('newValue', newValue)
            console.log('oldValue', oldValue)
            const value = newValue - this.startSkuNum
            //发起改变购物车请求
            let res = await addShopCart(this.currentSkuId, value)
            console.log('res', res.data);
        },
        //结算
        gotoPay() {
            this.$router.push({ path: '/readyPayInfo', })
        },

    },
    mounted() {
    }
}
</script>

<style lang="scss">
.cart-all {
    width: 1200px;
    margin: 20px auto;
    padding: 0 10px;
    background-color: white;

    .cart-top-title {
        font-size: 16px;
        font-weight: bold;
        padding: 15px 0;
    }

    .cart-bottom {
        position: relative;
        width: 100%;

        .bottom-left {
            display: flex;
            // align-items: center;
            justify-content: space-between;
            margin-right: 100px;

            .left-all {
                display: flex;
                align-items: center;
                margin-left: 12px;

                .select-all {
                    padding: 10px;
                    overflow: hidden;
                    float: left;

                    span {
                        vertical-align: middle;
                    }

                    input {
                        vertical-align: middle;
                    }
                }


                div {
                    cursor: pointer;
                    font-size: 13px;
                    margin-left: 10px;
                }
            }

            .left-price {
                font-size: 13px;
                display: flex;
                align-items: center;

                .margin-span {
                    margin-right: 10px;
                }

                .price {
                    font-size: 16px;
                    color: red;
                }



            }
        }

        .bottom-right {
            position: absolute;
            top: 0;
            right: 0;
        }

    }

    .good_img {
        width: 82px;
        height: 82px;
    }

    .goods {
        display: flex;
        align-items: center;

        .text {
            margin-left: 5px;
            font-size: 13px;
            line-height: 18px;
        }
    }

    .el-input-number {
        width: 80px;
    }
}
</style>