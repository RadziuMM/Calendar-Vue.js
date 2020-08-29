<template>
  <div class="settingsW">
      <div><span class="text">Delete account</span>
      <button @click="deleteAcc()">Delete</button></div>
      <div><span class="text">Change nick</span>
      <input class="inputCN" id="nick"/><button @click="changeN()">Change</button></div>
      <div><span class="text">Change password</span>
      <input class="inputCN" id="pass0" type="password"/> <input class="inputCN" id="pass1"
      type="password" />
      <button @click="changeP()">Change</button></div>
      <span id="settings__feedBack">passwords are diffrent!</span>
      <apollo ref="apollo"/>
  </div>
</template>

<script>
import apollo from '../apollo.vue';
import routes from '../router/index';

const passwordHash = require('password-hash');

export default {
  name: 'SignBox',
  components: {
    apollo,
  },
  methods: {
    deleteAcc() {
      this.$refs.apollo.delete();
      routes.push({ path: '/' });
    },
    changeN() {
      const nick = document.getElementById('nick').value;
      this.$refs.apollo.mutate('nick', nick);
      routes.push({ path: '/' });
    },
    changeP() {
      const pass0 = document.getElementById('pass0').value;
      const pass1 = document.getElementById('pass1').value;
      if (pass0 === pass1) {
        const hashedPassword = passwordHash.generate(pass0);
        this.$refs.apollo.mutate('pass', hashedPassword);
        document.getElementById('settings__feedBack').style.display = 'none';
        document.getElementById('pass0').value = '';
        document.getElementById('pass1').value = '';
        routes.push({ path: '/' });
      } else {
        document.getElementById('settings__feedBack').style.display = 'inline';
        document.getElementById('pass0').value = '';
        document.getElementById('pass1').value = '';
      }
    },
  },
};
</script>
<style lang="scss">
.settingsW{
    float: right;
    width: 75vw;
    padding: 10px;
    border: black solid 2px;
    border-radius: 19px;
}
.text{
    float: left;
    padding-left: 3vw;
}
.inputCN{
    margin: 0;
    width: auto;
}
#settings__feedBack{
    color:red;
    display: none;
}
</style>
