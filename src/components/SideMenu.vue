<template>
    <div class="h-screen bg-white w-12 fixed slide top-0">
        <div class="text-red-900">
            <div>
                <div class="bg-pink-600 w-8 h-px mt-5 ml-2"></div>
                <div class="bg-pink-600 w-8 h-px mt-2 ml-2"></div>
                <div class="bg-pink-600 w-8 h-px mt-2 ml-2"></div>
            </div>
            <nav class="w-0 transition bg-gradient-to-r from-black to-gray-900
            fixed h-full text-pink-600 top-0 ml-12 text-xl
            nav border-pink-600 border text-center">
                <div class="hide hidden cursor-pointer h-12 hover:bg-pink-200
                border-t border-b border-pink-600" @click="GoToFrontPage()">Today</div>
                <div class="hide hidden cursor-pointer h-12 hover:bg-pink-200
                border-b border-pink-600" @click="GoToCalendar()">Calendar</div>
                <div class="hide hidden cursor-pointer h-12 hover:bg-pink-200
                border-b border-pink-600" @click="GoToTasks()">Tasks</div>
                <div class="hide hidden cursor-pointer h-12 hover:bg-pink-200
                border-b border-pink-600" @click="GoToSettings()">Settings</div>
                <div class="hide hidden cursor-pointer h-12 hover:bg-pink-200
                border-b border-pink-600" @click="Logout()">Logout</div>
            </nav>
        </div>
    </div>
</template>
<script>
import routes from '../router/index';
import storage from '../store/index';

export default {
  name: 'SideMenu',
  methods: {
    GoToFrontPage() {
      routes.push({ path: 'FrontPage' });
    },
    GoToCalendar() {
      routes.push({ path: 'Calendar' });
    },
    GoToTasks() {
      routes.push({ path: 'Tasks' });
    },
    GoToSettings() {
      routes.push({ path: 'Settings' });
    },
    Logout() {
      storage.commit('changenick', '');
      const data = [];
      data.id = '';
      data.data = '';
      data.Events = '';
      storage.commit('loadData', data);
      routes.push({ path: '/' });
    },
  },
};

</script>
<style lang="scss" scoped>
div{
    font-family: 'Gayathri', sans-serif;
}
.nav{
    transition: ease-in-out 0.4s;
}
.slide:hover{
    .nav{
    display:block;
    width: 16rem;
    }
    .hide{
        display:block
    }
}
</style>
