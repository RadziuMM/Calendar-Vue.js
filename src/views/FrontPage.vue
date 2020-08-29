<template>
  <div class="home">
    <SideMenu />
    <TodayBoard />
    {{date}}
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
<style lang="scss" scooped>
  html{
    background: rgb(204,164,19);
    background: linear-gradient(106deg, rgba(204,164,19,1) 0%, rgba(44,94,151,1) 60%,
     rgba(55,50,154,1) 100%);
    background-size: cover;
    background-repeat:no-repeat;
    height: 100%;
    width: 100%;
  }
</style>
