<template>
  <!-- 菜单 -->
  <MenuType :show="homeShow" :oneShow="oneShow"></MenuType>
  <!-- 今日推荐 -->
  <Recommend></Recommend>
  <!-- 热卖排行 -->
  <HotSale></HotSale>
  <!-- 猜你喜欢 -->
  <GuessLike></GuessLike>
  <!-- 洗衣机（和手机相同，只是标题不同） -->
  <Phone title="美女牌洗衣机" :data="washingData"></Phone>
  <Phone title="手机通讯" :data="phoneData"></Phone>
  <!-- 品牌 -->
  <Brand></Brand>
</template>

<script>
import MenuType from './MenuType.vue';
import Phone from '../components/Phone.vue';
import GuessLike from '../components/GuessLike.vue';
import HotSale from '../components/HotSale.vue';
import Recommend from '../components/Recommend.vue';
import Brand from '../components/Brand.vue';
export default {
  components: {
    Recommend, HotSale, GuessLike, Phone, Brand, MenuType
  },
  data() {
    return {
      homeShow:true,
      oneShow:true,
      washingData: ['热卖', '大家电', '生活电器', '厨房电器', '空气/净水', '高端电器'],
      phoneData: ['热卖2', '大家电2', '生活电器2', '厨房电器2', '空气/净水2', '高端电器2']
    }
  },
  // created() {
  //   // 在主页组件创建时显示底部
  //   this.$store.commit('UserAbout/SHOWFOOTTRUE');
  // }
  // 在主页组件的 beforeRouteEnter 守卫中加入调试输出
  // beforeRouteEnter(to, from, next) {
  //   console.log('beforeRouteEnter of Home component');
  //   next();
  // }

}
</script>

<style></style>