<template>
  <div class="Tasks-Box">
     <div class="Tasks-Box__Title"> Task List </div>
     <ul class="Tasks-Box__TaskArray">
      <li v-for="item in x" :key="item.x">
        {{ item - 1 }}.00
      </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'TasksBox',
  data() {
    return {
      x: 24,
    };
  },
};
</script>

<style>
  .Tasks-Box{
    position: absolute;
    top:8vh;
    right: 10vw;
    width:30vw;
    border: solid 2px black;
    border-radius: 20px;
    background: rgb(18, 78, 78);
    box-shadow: 0px 0px 19px 9px rgba(0,0,0,0.75);
    color: black;
  }
  .Tasks-Box__Title{
    margin-top: 5%;
    text-decoration: underline;
    font-size: 20px;
  }
  .Tasks-Box__TaskArray{
    text-align: left;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  .Tasks-Box__TaskArray>li{
    border-top:solid black 1px;
    width:90%;
    margin:0 5% 0 5%;
  }
  .Tasks-Box__TaskArray>li:last-child{
    padding-bottom: 5px;
  }
</style>
