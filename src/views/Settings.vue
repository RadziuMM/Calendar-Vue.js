<template>
  <div class="home">
    <SideMenu />
    <SettingsWindow />
  </div>
</template>

<script>
import SideMenu from '../components/SideMenu.vue';
import SettingsWindow from '../components/SettingsWindow.vue';

export default {
  name: 'Settings',
  components: {
    SideMenu,
    SettingsWindow,
  },
};
</script>
