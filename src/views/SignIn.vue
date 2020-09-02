<template>
  <div class="SI__wrapper">
    <Sign-box class="float-left"/>
    <q class="float-left ml-24 text-pink-600 text-3xl login__t">
      Don't be fooled by the calendar.<br />
      There are only as many days in the year as you make use of.
      </q>
      <div class="float-right mr-16 text-pink-600 text-3xl login__a">- Charles Richards</div>
  </div>
</template>

<script>
import SignBox from '../components/SignBox.vue';

export default {
  name: 'SignIn',
  components: {
    SignBox,
  },
};
</script>
<style lang="scss">
.SI__wrapper{
  font-family: 'Gayathri', sans-serif;
}
.login__t{
  display: none;
  @media (min-width: 1024px) {
   width: 50vw;
   margin-top: 15vh;
   margin-bottom: 5vh;
   display: inline;
  }
  @media (min-width: 1280px){
   width: 60vw;
   margin-top: 20vh;
   }
}
.login__a{
   display: none;
  @media (min-width: 1024px) {
   display: inline;
  }
}
</style>
