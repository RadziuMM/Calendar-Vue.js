<template>
  <div class='Box'>
    <div class="Login">Register</div>
    <form autocomplete="off">
    <input placeholder="nickname" onfocus="this.placeholder = ''"
    onblur="this.placeholder = 'nickname'" required id="nick"/>
    <input placeholder="password" type="password" onfocus="this.placeholder = ''"
    onblur="this.placeholder = 'password'" required id="pass" minlength="6"/>
    <input placeholder="repeat password" onfocus="this.placeholder = ''"
    onblur="this.placeholder = 'reapet password'" type="password"
    required id="pass2" minlength="6"/>
    <div id="mess"></div>
    <input placeholder="email" onfocus="this.placeholder = ''"
    onblur="this.placeholder = 'email'" type="email" required id="mail"/>
    <div><button class="SButton" type="submit" @click="register()">Register</button></div>
      <span class="nregister">Have account?</span>
      <span class="register" @click="goToLog()">Go Back</span>
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

<style>

</style>
