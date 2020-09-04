<template>
    <div class="ToB__wrapper text-pink-600 text-center text-xl float-left">
    <span class=""> Here you have everything you have planned for today :</span>
        <div class="text-3xl" v-for="(item,todayNum) in todayCounter" :key="item"
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
        let accDate = `${dd}.${mm + 1}.${yyyy}      `;
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
<style lang="scss" scoped>
.ToB__wrapper{
  font-family: 'Gayathri', sans-serif;
  margin-left:20vw;
  margin-top: 2vh;
  min-height: 50vh;
  width: 78vw;
  @media (min-width: 768px) {
    margin-left:25vw;
    margin-top: 10vh;
    width: 40vw;
   }
  @media (min-width: 1024px) {
    min-height: 50vh;

  }
  @media (min-width: 1280px){
    min-height: 50vh;
   }
}
</style>
