<template>
  <div class="Tasks-Box">
     <div class="Tasks-Box__Title"> Task List </div>
     <ul class="Tasks-Box__TaskArray">
      <li v-for="(item,xNum) in x" :key="item.x" v-bind:id="'x'+xNum++"
      @click='deleteTask(xNum)'>
        {{item }}
      </li>
      <input class="TasksBox__input" id="taskBox__input"/>
      <button class="button__taskBox" @click="addTask">ADD</button>
      </ul>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-const */
/* eslint-disable prefer-template */
/* eslint-disable no-undef */
import Vue from 'vue';
import storage from '../store/index';
import updateUser from '../graphql/updateUser.gql';
import routes from '../router/index';

export default {
  name: 'TasksBox',
  data() {
    return {
      x: storage.getters.task,
      xNum: 1,
      table: '',
    };
  },
  methods: {
    addTask() {
      const x = document.getElementById('taskBox__input').value;
      this.x.push(x);
      this.change();
    },
    deleteTask(xNum) {
      const itemID = 'x' + (xNum - 1);
      const x2 = this.x.splice(xNum - 1, 1);
      this.change();
    },
    change() {
      let o = '';
      for (let i = 0; i <= this.x.length - 1;) {
        this.table = o + '||' + this.x[i];
        i += 1;
        o = this.table;
      }

      this.$apollo.mutate({
        mutation: updateUser,
        variables: {
          id: storage.getters.id,
          data: this.table,
        },
      });
    },
  },
};
</script>

<style>
  .Tasks-Box{
    position: absolute;
    top:8vh;
    right: 10vw;
    width:32vw;
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
    text-align:center;
    border-top:solid black 1px;
    width: 90%;
    margin: 0 5% 0 5%;
    transition: 1s ease-in-out;
  }
  .Tasks-Box__TaskArray>li:hover{
    background-color:white;
    cursor: pointer;
  }
  .Tasks-Box__TaskArray>li:last-child{
    padding-bottom: 5px;
  }
  .button__taskBox{
    float: left;
    margin-top:1vh
  }
  .TasksBox__input{
    width:70%;
    float: left;
    margin-bottom:5px;
    margin-left:2vw;
  }
</style>
