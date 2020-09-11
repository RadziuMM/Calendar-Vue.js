<template>
  <div class='border-solid border border-pink-600 rounded-lg border-opacity-75 text-white
  SB__wrapper'>
    <div class=" mt-24 md:mt-32 lg:mt-16 text-center font-bold text-2xl tracking-wide">LOGIN</div>
      <form class="text-center" action="#" onsubmit="return false">
        <input placeholder="nickname" onfocus="this.placeholder = ''"
          onblur="this.placeholder = 'nickname'" id="nick" required
          class="mt-2 p-1 rounded-full text-center text-black outline-none"/>
        <input placeholder="password" onfocus="this.placeholder = ''"
          onblur="this.placeholder = 'password'" type=password id="pass" required
          class="mt-2 p-1 rounded-full text-center text-black outline-none"/>
        <div id="mess" class="text-red-700"></div>
          <div><button class="mt-2 h-6 w-24 btn border-solid border border-pink-600
          rounded-lg border-opacity-75 hover:bg-pink-600" @click="log()">Sign in</button></div>
          <span >Not have account? </span>
          <span class="hover:text-pink-600 cursor-pointer"
           @click="goToRegister()">Register now</span>
      </form>
    <apollo ref="apollo"/>
  </div>
</template>

<script>
import router from '../router/index';
import apollo from '../apollo.vue';

const passwordHash = require('password-hash');

export default {
  name: 'SignBox',
  components: {
    apollo,
  },
  methods: {
    goToRegister() {
      router.push({ path: 'Register' });
    },
    log() {
      document.body.style.cursor = 'progress';
      const nick = document.getElementById('nick').value;
      const pass = document.getElementById('pass').value;
      const feedBack = document.getElementById('mess');
      feedBack.innerHTML = '';

      this.$refs.apollo.fetch('pass', nick);

      const next = () => {
        if (passwordHash.verify(pass, this.$refs.apollo.fPassword)) {
          router.push({ path: 'FrontPage' });
        } else {
          feedBack.innerHTML = 'Database not connected!Try again later!';
        }
        if (this.$refs.apollo.fPassword !== 'error') {
          feedBack.innerHTML = 'Wrong nickname or password!';
        }
        document.body.style.cursor = 'default';
      };

      const check = () => setTimeout(() => {
        if (this.$refs.apollo.fPassword !== '') {
          next();
        } else { check(); }
      }, 10);

      check();
    },
  },
};
</script>
<style lang="scss" scoped>
 .SB__wrapper{
   font-family: 'Gayathri', sans-serif;
   height: 75vh;
   width: 80vw;
   margin-left: 10vw;
   margin-top: 5vh;
  @media (min-width: 768px) {
   height: 80vh;
   width: 80vw;
   margin-left: 10vw;
   margin-top: 10vh;
   }
  @media (min-width: 1024px) {
   height: 70vh;
   width: 25vw;
   margin-left: 5vw;
   margin-top: 15vh;
  }
  @media (min-width: 1280px){
   height: 60vh;
   width: 20vw;
   margin-left: 5vw;
   margin-top: 20vh;
   }
 }
 input{
   width: 85%;
 }
</style>
