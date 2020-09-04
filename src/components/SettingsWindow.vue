<template>
  <div class="SW__wrapper border border-pink-600 text-right rounded-lg">
      <div><span class="mr-10 float-left ml-2 mt-4">Delete account:</span>
      <button class="btn border-pink-600 border hover:bg-pink-600 rounded-lg mt-4 mb-4"
       @click="deleteAcc()">Delete</button></div>
      <div><span class="float-left ml-2 mt-2">Change nick:</span>
      <input class="text-black text-center" placeholder="new Nickname" id="nick"/><button
      class="btn border-pink-600 border hover:bg-pink-600 rounded-lg mt-10 mb-4 ml-2 "
      @click="changeN()">Change</button></div>
      <div><span class="float-left ml-2 mt-2">Change password:</span>
      <input class="text-black text-center" id="pass0" type="password" placeholder="password"/>
      <input class="text-black text-center" id="pass1" placeholder="reapeat"
      type="password" />
      <button class="btn border-pink-600 border hover:bg-pink-600 rounded-lg mt-10 ml-2"
      @click="changeP()">Change</button></div>
      <div id="feedBack" class="text-red-700">passwords are diffrent!</div>
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
        document.getElementById('feedBack').style.display = 'none';
        document.getElementById('pass0').value = '';
        document.getElementById('pass1').value = '';
        routes.push({ path: '/' });
      } else {
        document.getElementById('feedBack').style.display = 'inline';
        document.getElementById('pass0').value = '';
        document.getElementById('pass1').value = '';
      }
    },
  },
};
</script>
<style lang="scss">
.SW__wrapper{
  width: 79vw;
  margin-left:19.5vw;
  margin-top:5vh;
  padding-right: 1vh;
  height: 55vh;
  input{
    width: 52%;
    float:left;
    margin-top:1.5vh;
    margin-left:5vh
  }
  @media (min-width: 768px) {
    width: 53vw;
    margin-top:5vh;
    margin-left:26vw;
    input{
      width: 60%;
    }
   }
  @media (min-width: 1024px) {
    input{
      width: 70%;
    }
  }
  @media (min-width: 1280px){
    input{
      width: 78%;
      margin-right: 5%;
    }
   }
}
#feedBack{
  font-family: 'Gayathri', sans-serif;
  display: none;
  margin-right: 15vw;
  margin-top: 8vh;
  height: 1vh;
  @media (min-width: 1024px) {
    margin-right: 23vh;
  }
  @media (min-width: 1280px){
    margin-right: 35vh;
   }
}
</style>
