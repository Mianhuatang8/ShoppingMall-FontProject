<template>
  <!-- 热卖排行 -->
  <div class="hot-home">
    <div class="hotIcon">
      <div class="one" @click="changeType(1)">
        <i :class="{ 'on': selectedType === 1 }"></i>
        <a href="#" :class="{ 'on': selectedType === 1 }">热卖排行</a>
      </div>
      <div class="one" @click="changeType(2)">
        <i :class="{ 'on': selectedType === 2 }"></i>
        <a href="#" :class="{ 'on': selectedType === 2 }">特价排行</a>
      </div>
      <div class="one" @click="changeType(3)">
        <i :class="{ 'on': selectedType === 3 }"></i>
        <a href="#" :class="{ 'on': selectedType === 3 }">新品排行</a>
      </div>

    </div>

    <div class="all">
      <div class="hotSale-all">
        <div class="img-div">
          <img src="../images/hotSaleImage/1.jpg">
        </div>
        <div class="saleText">
          <a href="#">【官网价直降1100】Apple iPhone 8 Plus 256GB 银色
            移动联通电信4G手机</a>

          <p class="info-price">定金：¥100.00</p>
        </div>
      </div>
      <div class="hotSale-all">
        <div class="img-div">
          <img src="../images/hotSaleImage/1.jpg">
        </div>
        <div class="saleText">
          <a href="#">【官网价直降1100】Apple iPhone 8 Plus 256GB 银色
            移动联通电信4G手机</a>

          <p class="info-price">定金：¥100.00</p>
        </div>
      </div>
      <div class="hotSale-all">
        <div class="img-div">
          <img src="../images/hotSaleImage/1.jpg">
        </div>
        <div class="saleText">
          <a href="#">【官网价直降1100】Apple iPhone 8 Plus 256GB 银色
            移动联通电信4G手机</a>

          <p class="info-price">定金：¥100.00</p>
        </div>
      </div>
      <div class="hotSale-all">
        <div class="img-div">
          <img src="../images/hotSaleImage/1.jpg">
        </div>
        <div class="saleText">
          <a href="#">【官网价直降1100】Apple iPhone 8 Plus 256GB 银色
            移动联通电信4G手机</a>

          <p class="info-price">定金：¥100.00</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedType: 1,
    }
  },
  methods: {
    changeType(type) {
      this.selectedType = type
    },
  }

}
</script>

<style scoped lang="scss">
.hot-home {
  margin: 30px 120px 0 120px;

}

.hotIcon {
  display: flex;
  // margin: 0 auto;
  text-align: center;
  justify-content: center;

  .one {
    display: flex;
    flex-direction: column;
    margin-right: 15px;
    align-items: center;

    i {
      width: 35px;
      height: 35px;
      background: url(../images//hotSaleImage/bg0.png);
    }
    .on {
      color: red;
      background-position: -35px 0;
    }

    a {
      margin: 10px;
    }
  }
}

.all {
  // margin: 10px 120px 0px 120px;
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}

.hotSale-all {
  border: 1px solid red;
  width: 270px;
  height: 330px;
  // background-color: gray;
  display: flex;
  align-items: center;
  flex-direction: column;

  .img-div {
    width: 268px;
    height: 230px;
    background-color: white;
    text-align: center;
  }

  .saleText {
    background-color: #f6f6f6;
    padding: 0px 18px 10px 18px;
    line-height: 24px;

    a {
      font-size: 13px;
    }

    p {
      font-size: 20px;
      margin-top: 10px;
      color: red;
    }
  }

  .img-div {
    img {
      width: 200px;
      height: 200px;
    }
  }
}
</style>