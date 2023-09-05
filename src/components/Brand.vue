<template>
    <div class="brand">
        <div class="brand-all">
            <div class="border1"><img src="../images/brandImage/brand_03.png" alt=""></div>
            <div class="border1"><img src="../images/brandImage/brand_05.png" alt=""></div>
            <div class="border1"><img src="../images/brandImage/brand_09.png" alt=""></div>
            <div class="border1"><img src="../images/brandImage/brand_11.png" alt=""></div>
            <div class="border1"><img src="../images/brandImage/brand_13.png" alt=""></div>
            <div class="border1"><img src="../images/brandImage/brand_15.png" alt=""></div>
            <div class="border1"><img src="../images/brandImage/brand_17.png" alt=""></div>
            <div class="border1"><img src="../images/brandImage/brand_19.png" alt=""></div>
            <div><img src="../images/brandImage/brand_21.png" alt=""></div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.brand {
    margin: 0 120px;
}

.brand-all {
    display: flex;
    margin-top: 30px;
    height: 45px;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 30px;
    border: 1px solid #e8e4e4;

    .border1 {
        border-right: 1px solid #e8e4e4;
        display: flex;
        // text-align: center;
        align-items: center;
        /* 垂直居中 */
        justify-content: center;

        /* 水平居中 */
        img {
            margin: 0 10px;

        }

    }
}</style>