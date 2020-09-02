<template>
  <div class="home">
    <SideMenu />
    <TasksBox />
  </div>
</template>

<script>
import SideMenu from '../components/SideMenu.vue';
import TasksBox from '../components/TasksBox.vue';

export default {
  name: 'Tasks',
  components: {
    SideMenu,
    TasksBox,
  },
};
</script>
<style lang="scss" scooped>
</style>
