<template>
  <!-- 今日推荐 -->
  <div class="today_recommend">
    <div class="clockImage">
      <div>
        <img src="../images/todayImage/clock.png" alt="">
      </div>

      <div class="text">今日推荐</div>
    </div>

    <ul>
      <li class="border_li"><img src="../images/todayImage/today01.png"></li>
      <li class="border_li"><img src="../images/todayImage/today02.png"></li>
      <li class="border_li"><img src="../images/todayImage/today03.png"></li>
      <li><img src="../images/todayImage/today04.png"></li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.today_recommend {
  display: flex;
  padding: 0 120px;
  height: 150px;
  margin-top: 30px;

  .clockImage {
    background-color: #726565;
    text-align: center;
    width: 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  

    .text {
      padding-top: 10px;
      font-weight: bold;
      color: white;
      font-size: 17px;
    }
  }

  ul {
    display: flex;
    

    li {
      img {
        height: 150px;
        width: 244px;
      }

      .border_li {
        border-right: 1px solid #666;
        padding: 0 10px;
      }
    }
  }
}
</style>