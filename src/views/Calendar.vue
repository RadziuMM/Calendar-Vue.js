<template>
  <div class="home">
    <SideMenu />
    Calendarsy
  </div>
</template>

<script>
import SideMenu from '../components/SideMenu.vue';

export default {
  name: 'Calendar',
  components: {
    SideMenu,
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
