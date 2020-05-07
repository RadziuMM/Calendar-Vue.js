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
  </div>
</template>

<script>
import routes from '../router/index';
import createUser from '../graphql/createUser.gql';

const passwordHash = require('password-hash');


export default {
  name: 'SignBox',
  methods: {
    goToLog() {
      routes.push({ path: '/' });
    },
    register() {
      const x = document.getElementById('pass').value;
      const x2 = document.getElementById('pass2').value;
      if (x === x2) {
        const hashedPassword = passwordHash.generate(x);
        const nick = document.getElementById('nick').value;
        const mail = document.getElementById('mail').value;
        if (nick !== '' && mail !== '' && x !== '') {
          this.$apollo.mutate({
            mutation: createUser,
            variables: {
              name: nick,
              password: hashedPassword,
            },
          });
          routes.push({ path: '/' });
        }
      } else {
        const o = document.getElementById('mess');
        o.innerHTML = 'Passwords are difrents!';
      }
    },
  },
};
</script>

<style>

</style>
