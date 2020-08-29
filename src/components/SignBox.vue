<template>
  <div class='Box'>
    <div class="Login">Login</div>
    <form>
    <input placeholder="nickname" onfocus="this.placeholder = ''"
    onblur="this.placeholder = 'nickname'" id="nick" required/>
    <input placeholder="password" onfocus="this.placeholder = ''"
    onblur="this.placeholder = 'password'" type=password id="pass" required/>
    <div id="mess2"></div>
      <div><button class="SButton" @click="log()">Sign in</button></div>
      <span class="nregister">Not have account?</span>
      <span class="register" @click="goToRegister()">Register now</span>
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
      const feedBack = document.getElementById('mess2');
      feedBack.innerHTML = '';
      this.$refs.apollo.fetch('pass', nick);

      setTimeout(() => {
        if (passwordHash.verify(pass, this.$refs.apollo.fPassword)) {
          document.body.style.cursor = 'default';
          router.push({ path: 'FrontPage' });
        } else {
          feedBack.innerHTML = 'Wrong nickname or password!';
          document.body.style.cursor = 'default';
        }
        if (this.$refs.apollo.dataBaseError === true) {
          feedBack.innerHTML = 'Database not connected!Try again later!';
          document.body.style.cursor = 'default';
        }
      }, 1000);
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700&display=swap');
.Box{
  font-family: 'Roboto Condensed', sans-serif;
  height: auto;
  width: 45vh;
  padding-bottom:20vh;
  background: rgb(204,164,19);
  background: linear-gradient(160deg, rgba(204,164,19,1) 22%,
   rgba(44,94,151,1) 64%, rgba(55,50,154,1) 100%);
  background-size: cover;
  background-repeat:no-repeat;
  border:2px ridge black;
  box-shadow: 0px 0px 30px 5px rgba(0,0,0,0.75);
  border-radius: 10px;
  margin-top:9vh;
  margin-left:10vh;
  float: left;
}
input{
  letter-spacing: 0.5px;
  font-size: 16px;
  font-family: 'Roboto Condensed', sans-serif;
  margin-top:5%;
  height:6%;
  width: 80%;
  text-align: center;
  border:none;
  background: none;
  border-bottom:solid 0.5px black;
  outline: none;
  transition: ease-in-out 1s;
  text-shadow: 2px 1px 2px rgb(82, 79, 78);
}

input:hover{
  border-bottom: yellow 0.5px solid;
  cursor: default;
}
input:focus{
  border-bottom: yellow 0.5px solid;
  cursor: default;
  box-shadow: 0px 17px 20px -9px rgba(0,0,0,0.75);
}
::placeholder{
  color:black
}
.SButton{
  margin-top:5%;
  padding: 5px;
  background: rgba(204,164,19,1);
  border-radius: 5px;
  padding-left: 5%;
  padding-right: 5%;
  transition: ease-in 1s;
  outline: none;
}
.SButton:hover{
  background: rgb(216, 178, 39);
  cursor: pointer;
}
.SButton:focus{
  background: rgb(240, 211, 107);
}
.register{
  letter-spacing: 0.5px;
  font-size: 10px;
  transition: ease-in-out 1s;
}
.register:hover{
  color:red;
  cursor: pointer;
}
.nregister{
  letter-spacing: 0.5px;
  font-size: 10px;
}
#mess2{
  color: red;
  font-size: 12px;
}
input:first-child{
  margin-top:10%;
}
.Login{
  font-size: 2vw;
  margin-top: 10vh;
  color: rgb(25, 49, 116);
  text-shadow: 3px 1px 2px #6b6467;
}
</style>
