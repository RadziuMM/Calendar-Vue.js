<template>
  <div class="TB__wrapper border border-grey-600 rounded-lg text-center text-xl">
     <div class="text-4xl text-grey-600 border-b border-grey-600"> Task List </div>
     <ul class="">
      <li v-for="(item,xNum) in tasks" :key="item.t" v-bind:id="'t'+xNum++"
      @click='deleteTask(xNum)' class="bg-gradient-to-r from-black to-gray-900
      hover:bg-gradient-to-r hover:from-gray-900 hover:to-black border-b
      border-grey-600 hover:text-pink-600 cursor-pointer">
        {{item }}
      </li>
      <form class="mt-12 mb-12" action="#" onsubmit="return false">
      <input class="text-black text-center outline-none mr-4 border-grey-900 border rounded-lg"
      placeholder="add Task" id="taskBox__input"/>
      <button class=" btn border-solid border border-grey-600 text-sm hover:text-pink-600
          rounded-lg border-opacity-75 hover:bg-gray-900 hover:border-pink-600 p-1 pl-2 pr-2"
           @click="addTask">ADD</button>
      </form>
      </ul>
      <apollo ref="apollo"/>
  </div>
</template>

<script>
import storage from '../store/index';
import apollo from '../apollo.vue';

export default {
  name: 'TasksBox',
  components: {
    apollo,
  },
  data() {
    return {
      tasks: storage.getters.task,
      xNum: 1,
      table: '',
    };
  },
  methods: {
    addTask() {
      const x = document.getElementById('taskBox__input').value;
      this.tasks.push(x);
      this.change();
      document.getElementById('taskBox__input').value = '';
    },
    deleteTask(xNum) {
      this.tasks.splice(xNum - 1, 1);
      this.change();
    },
    change() {
      let o = '';
      for (let i = 0; i <= this.tasks.length - 1;) {
        this.table = `${o}||${this.tasks[i]}`;
        i += 1;
        o = this.table;
      }
      this.$refs.apollo.mutate('taskList', this.table);
    },
  },
};
</script>

<style lang="scss" scoped>
.TB__wrapper{
  font-family: 'Gayathri', sans-serif;
  width: 80vw;
  min-height: 60vh;
  margin-left: 19vw;
  input{
    width: 60%;
  }
  margin-right: 0vh;
  @media (min-width: 768px) {
    width: 80vw;
    min-height: 50vh;
    margin-left: 15vw;
    margin-top: 12vw;
   }
  @media (min-width: 1024px) {
    width: 40vw;
    margin-top: 5vh;
    margin-left: 30vw;
  }
  @media (min-width: 1280px){
    width: 40vw;
    margin-top: 5vh;
    margin-right: 60vh;
   }
}
</style>
