<template>
    <div class="menu">
        <div class="MTitle">MENU</div>
        <div class="MFrontPage" @click="GoToFrontPage()">Today</div>
        <div class="MCalendar" @click="GoToCalendar()">Calendar</div>
        <div class="MTasks" @click="GoToTasks()">Tasks</div>
        <div class="MSettings" @click="GoToSettings()">Settings</div>
    </div>
</template>
<script>
import routes from '../router/index';

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
  },
};

</script>
<style lang="scss" scoped>
    .menu{
        background: rgb(39, 88, 145);
        border-right: solid rgb(0, 0, 0) 1px;
        -webkit-box-shadow: 11px 2px 20px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 11px 2px 20px 0px rgba(0,0,0,0.75);
        box-shadow: 11px 2px 20px 0px rgba(0,0,0,0.75);
        position: fixed;
        top: 0;
        left: 0;
        bottom:0;
        width: 5%;
        transition: ease-in-out 0.3s;
    }
    .menu:hover{
        width: 20%;
    }
    .menu>div{
        display: none;
        transition: ease-in-out 0.3s;
    }
    .menu:hover>div{
        display: block;
    }
    .MTitle{
        color: rgb(0, 0, 0);
        margin-top: 30vh;
        text-shadow: 3px 1px 1px rgba(155, 148, 150, 1);
        font-size: 20px;
        cursor: default;
    }

    .MCalendar{
        color: rgb(0, 0, 0);
        margin-top: 1vh;
        text-shadow: 3px 1px 1px rgba(155, 148, 150, 1);
        font-size: 15px;
    }
    .MCalendar:hover{
        cursor: pointer;
        font-size:1.5rem;
        color: rgb(192, 151, 15);
    }
    .MTasks{
        color: rgb(0, 0, 0);
        margin-top: 1vh;
        text-shadow: 3px 1px 1px rgba(155, 148, 150, 1);
        font-size: 15px;
    }
    .MTasks:hover{
        cursor: pointer;
        font-size:1.5rem;
        color: rgb(192, 151, 15);
    }
    .MSettings{
        color: rgb(0, 0, 0);
        margin-top: 1vh;
        text-shadow: 3px 1px 1px rgba(155, 148, 150, 1);
        font-size: 15px;
    }
    .MSettings:hover{
        cursor: pointer;
        font-size:1.5rem;
        color: rgb(192, 151, 15);
    }
    .MFrontPage{
        color: rgb(0, 0, 0);
        margin-top: 2vh;
        text-shadow: 3px 1px 1px rgba(155, 148, 150, 1);
        font-size: 15px;
    }
    .MFrontPage:hover{
        cursor: pointer;
        font-size:1.5rem;
        color: rgb(192, 151, 15);
    }

</style>
