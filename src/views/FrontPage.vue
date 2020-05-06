<template>
  <div class="home">
    <div class="menu">
    <div>MENU</div>
    </div>
    ejo
  </div>
</template>

<script>
import getData from '../graphql/getData.gql';
import store from '../store/index';

let data;

export default {
  name: 'FrontPage',
  components: {
  },
  data: () => ({
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
  },
  methods: {},
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
  .menu{
    background: rgba(44,94,151,1);
    border-right: solid blue 2px;
    position: fixed;
    top: 0;
    left: 0;
    bottom:0;
    width: 5%;
    transition: ease-in-out 0.3s;
  }
  .menu:hover{
    width: 20%;
  }
  .menu>div{
    display: none;
  }
  .menu:hover>div{
    display: inline;
  }

</style>
