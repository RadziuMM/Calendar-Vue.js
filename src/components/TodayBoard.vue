<template>
    <div>
        <div v-for="(item,todayNum) in todayCounter" :key="item"
         v-bind:id="'today' + todayNum" >
        {{item}}
        </div>
    </div>
</template>

<script>
import storage from '../store/index';

export default {
  name: 'TodayBoard',
  data() {
    return {
      todayNum: 0,
      todayData: '',
      todayCounter: [],
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      setTimeout(() => {
        const array = storage.getters.calendarData;
        this.todayCounter = [];

        const today = new Date();
        const dd = today.getDate();
        const mm = today.getMonth();
        const yyyy = today.getFullYear();
        // eslint-disable-next-line prefer-template
        let accDate = (dd) + '.' + (mm + 1) + '.' + yyyy + '      ';
        accDate = accDate.substring(0, 10);
        accDate = String(accDate);
        for (let i = 0; i < array.length;) {
          const array2 = array[i].split('||');
          array2[0] = array2[0].substring(0, 10);
          array2[0] = String(array2[0]);
          if (accDate === array2[0]) { this.todayCounter.push(array2[1]); }
          i += 1;
        }
      }, 1000);
    },
  },
};

</script>
