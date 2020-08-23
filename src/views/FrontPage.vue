<template>
  <div class="home">
    <SideMenu />
    <TodayBoard />
    {{date}}
  </div>
</template>

<script>
import getData from '../graphql/getData.gql';
import store from '../store/index';
import SideMenu from '../components/SideMenu.vue';
import TodayBoard from '../components/TodayBoard.vue';

let data;

export default {
  name: 'FrontPage',
  components: {
    SideMenu,
    TodayBoard,
  },
  data: () => ({
    date: 0,
  }),
  mounted() {
    const { nick } = store.getters;
    this.$apollo.query({
      query: getData,
      variables: {
        name: nick,
      },
    }).then((result) => {
      data = result.data.userBYname; // all feched info
      store.commit('loadsData', data);// send to store
    });
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
