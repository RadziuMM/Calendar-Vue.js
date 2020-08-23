<template>
  <div class="settingsW">
      <div><span class="text">Delete account</span><button>Delete</button></div>
      <div><span class="text">Change nick</span>
      <input class="inputCN"/><button>Change</button></div>
      <div><span class="text">Change password</span>
      <input class="inputCN"/> <input class="inputCN"/><button>Change</button></div>
  </div>
</template>
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
</style>
