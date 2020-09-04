<template>
  <div>
    <SideMenu />
    <div class="text-center date text-pink-600 float-left text-3xl">
      Have a nice day!<br/>
      <span class="text-5xl">Today is {{date}}</span>
      </div>
    <TodayBoard />
    <apollo ref="apollo"/>
  </div>
</template>

<script>
import SideMenu from '../components/SideMenu.vue';
import TodayBoard from '../components/TodayBoard.vue';
import apollo from '../apollo.vue';

export default {
  name: 'FrontPage',
  components: {
    SideMenu,
    TodayBoard,
    apollo,
  },
  data: () => ({
    date: 0,
  }),
  mounted() {
    this.$refs.apollo.fetch('all', 0);
    this.getDate();
  },
  methods: {
    getDate() {
      const today = new Date();
      const dd = today.getDate();
      const mm = today.getMonth();
      const yyyy = today.getFullYear();
      // eslint-disable-next-line prefer-template
      this.date = (dd) + '.' + (mm + 1) + '.' + yyyy;
    },
  },
};
</script>
<style lang="scss" scoped>
div{
  font-family: 'Gayathri', sans-serif;
}
.date{
  z-index:-1;
  width: 78vw;
  position: relative;
  left:20vw;
  @media (min-width: 768px) {
    margin-top: 10vh;
    left:20vw;
    min-height: 50vh;
    padding-top:12vh;
    width: 30vw;
   }
  @media (min-width: 1024px) {
    margin-top: 10vh;
    min-height: 50vh;
    padding-top:12vh;
  }
  @media (min-width: 1280px){
    margin-top: 10vh;
    min-height: 50vh;
    padding-top:12vh;
   }
}
</style>
