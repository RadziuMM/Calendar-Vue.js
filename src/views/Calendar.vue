<template>
  <div>
    <SideMenu />
    <CalendarTable />
  </div>
</template>

<script>
import SideMenu from '../components/SideMenu.vue';
import CalendarTable from '../components/CalendarTable.vue';

export default {
  name: 'Calendar',
  components: {
    SideMenu,
    CalendarTable,
  },
};
</script>
