<template>
  <div class="calendar">
    <div class="calendar__table">
        <div class="calendar__table--day" v-for="(item,xNum) in x" :key="item.x">
        {{xNum + 1}}
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CalendarTable',
  data() {
    return {
      x: 31,
    };
  },
  methods: {},
};
</script>

<style>
.calendar__table--day{
    float:left;
    width:11vw;
    height:10vh;
    text-align:center;
    padding-top:5vh;
}
.calendar__table{
    border:2px black solid;
    height:75vh;
    width:78vw;
    float:right;
}
</style>
