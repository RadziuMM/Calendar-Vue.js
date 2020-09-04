<template>
  <div class='border-solid border border-pink-600 rounded-lg border-opacity-75 text-white
  RB__wrapper'>
    <div class=" mt-24 md:mt-32 lg:mt-16 text-center font-bold text-2xl tracking-wide">
      REGISTER</div>
    <form class="text-center">
    <input placeholder="nickname" onfocus="this.placeholder = ''"
    onblur="this.placeholder = 'nickname'" required id="nick"
    class="mt-2 p-1 rounded-full text-center text-black outline-none"/>
    <input placeholder="password" type="password" onfocus="this.placeholder = ''"
    onblur="this.placeholder = 'password'" required id="pass" minlength="6"
    class="mt-2 p-1 rounded-full text-center text-black outline-none"/>
    <input placeholder="repeat password" onfocus="this.placeholder = ''"
    onblur="this.placeholder = 'reapet password'" type="password"
    required id="pass2" minlength="6"
    class="mt-2 p-1 rounded-full text-center text-black outline-none"/>
    <div id="mess" class="text-red-700"></div>
    <input placeholder="email" onfocus="this.placeholder = ''"
    onblur="this.placeholder = 'email'" type="email" required id="mail"
    class="mt-2 p-1 rounded-full text-center text-black outline-none"/>
    <div><button class="mt-2 h-6 w-24 btn border-solid border border-pink-600
      rounded-lg border-opacity-75 hover:bg-pink-600" type="submit"
      @click="register()">Register</button></div>
      <span >Have account?</span>
      <span class="hover:text-pink-600 cursor-pointer" @click="goToLog()">Go Back</span>
    </form>
    <apollo ref="apollo"/>
  </div>
</template>

<script>
import routes from '../router/index';
import apollo from '../apollo.vue';

const passwordHash = require('password-hash');

export default {
  name: 'SignBox',
  components: {
    apollo,
  },
  methods: {
    goToLog() {
      routes.push({ path: '/' });
    },
    register() {
      const pass0 = document.getElementById('pass').value;
      const pass1 = document.getElementById('pass2').value;
      if (pass0 === pass1) {
        const hashedPassword = passwordHash.generate(pass0);
        const nick = document.getElementById('nick').value;
        const mail = document.getElementById('mail').value;
        if (nick !== '' && mail !== '' && pass0 !== '') {
          this.$refs.apollo.create(nick, hashedPassword);
          routes.push({ path: '/' });
        }
      } else {
        const feedBack = document.getElementById('mess');
        feedBack.innerHTML = 'Passwords are difrents!';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.RB__wrapper{
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
