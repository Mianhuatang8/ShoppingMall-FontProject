<template>
    <!-- 猜你喜欢 -->
    <div class="like_all">
        <div class="one">
            <div class="like_text">猜你喜欢</div>
            <div class="change">换一换
                <i class="iconfont  icon-change"></i>
            </div>
        </div>
        <div class="two">
            <ul class="two-ul">
                <li>
                    <div class="two-li">
                        <img src="../images/guessLikeImage/like_01.png" />
                        <div class="context">
                            <p>阳光美包新款单肩包女包时尚子母包四件套女</p>
                            <h3>¥116.00</h3>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="two-li">
                        <img src="../images/guessLikeImage/like_02.png" />
                        <div class="context">
                            <p>阳光美包新款单肩包女包时尚子母包四件套女</p>
                            <h3>¥116.00</h3>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="two-li">
                        <img src="../images/guessLikeImage/like_03.png" />
                        <div class="context">
                            <p>阳光美包新款单肩包女包时尚子母包四件套女</p>
                            <h3>¥116.00</h3>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="two-li">
                        <img src="../images/guessLikeImage/like_01.png" />
                        <div class="context">
                            <p>阳光美包新款单肩包女包时尚子母包四件套女</p>
                            <h3>¥116.00</h3>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="two-li">
                        <img src="../images/guessLikeImage/like_02.png" />
                        <div class="context">
                            <p>阳光美包新款单肩包女包时尚子母包四件套女</p>
                            <h3>¥116.00</h3>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="two-li">
                        <img src="../images/guessLikeImage/like_03.png" />
                        <div class="context">
                            <p>阳光美包新款单肩包女包时尚子母包四件套女</p>
                            <h3>¥116.00</h3>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            iconColor: 'red',
        }
    }

}
</script>

<style lang="scss" scoped>
.like_all {
    padding: 0 120px;
    margin-top: 30px;
}

.one {
    display: flex;
    justify-content: space-between;

    .like_text {
        font-size: 19px;
        font-weight: bold;
        color: black;
    }

    .change {
        font-size: 14px;
    }

    .icon {
        color: red;
    }
}

.two {
    border: 1px solid rgb(222 222 222);
    background-color: white;
    margin-top: 5px;
    height: 240px;

    .two-ul {
        display: flex;

        .two-li {
            text-align: center;
            cursor: pointer; //鼠标经过时候出现小手
            overflow: hidden;//放大时超出部分隐藏
            img {
                transition: all 400ms;
                &:hover {//鼠标经过时图片放大
                    opacity: 0.8;
                    transform: scale(1.1)//放大1.1倍
                }
            }

            .context {
                text-align: center;

                p {
                    font-size: 14px;
                    margin-top: 5px;
                    padding: 0 10px;
                }

                h3 {
                    color: red;
                    font-weight: bold;
                    margin-top: 8px;
                    font-size: 20px;

                }
            }
        }
    }
}</style>