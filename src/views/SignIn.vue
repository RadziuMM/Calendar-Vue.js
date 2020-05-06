<template>
  <div class="home">
    <div class="quote">"The two most poweful warriors are patience and time"
       <span class="quote__author">-Leo Tolstoy, War and Peace</span></div>
    <Sign-box />
    <img class="cal" src="../assets/calendar.png" alt="">
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
<style lang="scss" scooped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@1,200&display=swap');
  html{
    background: rgb(204,164,19);
    background: linear-gradient(106deg, rgba(204,164,19,1) 0%, rgba(44,94,151,1) 60%,
     rgba(55,50,154,1) 100%);
    background-size: cover;
    background-repeat:no-repeat;
    height: 100%;
    width: 100%;
  }
  .cal{
    width: 30vw;
    float: left;
    margin-top: 10vh;
    margin-left: 20vw;
  }
  .quote{
    font-size:5vh;
    font-family: 'Raleway', sans-serif;
    color: black;
  }
  .quote__author{
    display: block;
    color: rgb(36, 35, 35);
    font-size: 4vh;
    padding-left: 60vw;
  }
</style>
