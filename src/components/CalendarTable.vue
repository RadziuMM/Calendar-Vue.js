<template>
  <div class="CT__wrapper">
    <div class="border border-pink-600 calendar__table">
        <div class="float-left text-center cursor-pointer
        hover:bg-gray-300 duration-1000 calendar__table--day"
         v-for="(item,xNum) in x" :key="item.x"
         v-bind:id="'x' + xNum" @click="popWindow(xNum)">
        {{(xNum + 1)-calendarRow}}
        </div>
    </div>
    <div class="float-right w-64 md:mr-5 lg:mr-10 xl:mr-16 xl:mr-40 mt-5">
      <button class="float-right border-pink-600 border rounded-lg w-12 hover:bg-pink-600 mr-10"
      @click="nextMM()">+</button>
      <div class="float-right w-24 text-center">{{focusedMM}} {{focusedYYYY}}</div>
      <button class="float-right border-pink-600 border rounded-lg w-12 hover:bg-pink-600"
      @click="previousMM()">-</button>
    </div>
    <div class="popWindow bg-black border border-pink-600 rounded-lg text-white
    bg-gradient-to-r from-gray-900 to-black text-center" id="popWindow">
      <span class="cursor-pointer fixed right-0 mr-2 text-4xl text-pink-600"
       @click="exit()">&#10799;</span>
      <span class="text-xl text-pink-600">{{this.focusDate}}</span>
      <ul class="mt-16">
        <li class="hover:text-pink-600 cursor-pointer"
        v-for="item in calendarData" :key="item" @click="deleteEvent(item)">
          {{ item }}
        </li>
      </ul>
      <form class="mt-10">
        <input type="text" id="newEvent__input" placeholder="add Event!" class="mt-2 p-1 text-center
        text-black outline-none"/>
        <button class="border-pink-600 border rounded-lg w-12 hover:bg-pink-600 ml-2"
        @click="addEvent()">ADD</button>
      </form>
    </div>
    <apollo ref="apollo"/>
  </div>
</template>

<script>
import storage from '../store/index';
import apollo from '../apollo.vue';

export default {
  name: 'CalendarTable',
  components: {
    apollo,
  },
  data() {
    return {
      x: 0,
      calendarRow: 0,
      accMMCalendarRow: 0,
      accDay: 0,
      focusedMM: 0,
      focusedYYYY: 0,
      calendarData: [],
      cData: storage.getters.cData,
      fetchedData: storage.getters.calendarData,
      focusDate: '',
      focusId: 0,
    };
  },
  mounted() {
    this.getDays();
  },
  updated() {
    this.clearMinusDays();
    this.markAccDay();
  },
  methods: {
    getDays() {
      // get acctual date
      const today = new Date();
      const dd = today.getDate();
      const mm = today.getMonth();
      const yyyy = today.getFullYear();

      this.accDay = dd;
      this.focusedMM = mm + 1;
      this.focusedYYYY = yyyy;
      // set number of days in this month
      const x = new Date(yyyy, mm, 0).getDate();
      this.x = x;

      const calendarRow = new Date(yyyy, mm).getDay(); // Sunday is 0 saturday is 6
      this.x = x + calendarRow;
      this.calendarRow = calendarRow;
      this.accMMCalendarRow = calendarRow;
    },
    clearMinusDays() {
      const x = this.calendarRow;

      // eslint-disable-next-line no-cond-assign
      for (let i = 1; i < 7;) {
        // eslint-disable-next-line prefer-template
        const acc = 'x' + (i - 1);
        document.getElementById(acc).innerHTML = i - this.calendarRow;
        document.getElementById(acc).style.opacity = '1';
        document.getElementById(acc).style.cursor = 'pointer';
        i += 1;
      }

      // eslint-disable-next-line no-cond-assign
      for (let i = 1; i < x + 1;) {
        // eslint-disable-next-line prefer-template
        const acc = 'x' + (i - 1);
        document.getElementById(acc).innerHTML = '';
        document.getElementById(acc).style.opacity = '0';
        document.getElementById(acc).style.cursor = 'auto';
        i += 1;
      }
    },
    markAccDay() {
      // eslint-disable-next-line prefer-template
      const dayVar = 'x' + ((this.accMMCalendarRow + this.accDay) - 1);
      const today = new Date();
      const mm = today.getMonth();
      if (this.focusedMM - 1 === mm) {
        document.getElementById(dayVar).style.border = '#d53f8c 1px solid';
      } else {
        document.getElementById(dayVar).style.border = 'none';
      }
    },
    nextMM() {
      this.focusedMM += 1;
      if (this.focusedMM === 13) {
        this.focusedMM = 1;
        this.focusedYYYY += 1;
      }
      this.onChange();
    },
    previousMM() {
      this.focusedMM -= 1;
      if (this.focusedMM === 0) {
        this.focusedMM = 12;
        this.focusedYYYY -= 1;
      }
      this.onChange();
    },
    onChange() {
      const x = new Date(this.focusedYYYY, this.focusedMM - 1, 0).getDate();
      this.x = x;
      const calendarRow = new Date(this.focusedYYYY, this.focusedMM - 1).getDay();
      this.x = x + calendarRow;
      this.calendarRow = calendarRow;
      this.clearMinusDays();
      this.markAccDay();
    },
    popWindow(id) {
      if (id > (this.calendarRow - 1)) {
        this.focusId = id;
        document.getElementById('popWindow').style.display = 'inline';
        // eslint-disable-next-line prefer-template
        let focusDate = (id - this.calendarRow + 1) + '.' + this.focusedMM + '.' + this.focusedYYYY + '      ';
        focusDate = focusDate.substring(0, 10);
        focusDate = String(focusDate);
        this.focusDate = focusDate;
        this.calendarData = [];
        this.calendarData.push('Free time!Plan sth for this day!');
        const array = [];
        for (let i = 0; i < this.fetchedData.length;) {
          let dataOfEvent = this.fetchedData[i].substring(0, 10);
          dataOfEvent = String(dataOfEvent);
          if (focusDate === dataOfEvent) {
            const data = this.fetchedData[i].split('||');
            const int = 1;
            array.push(data[int]);
            this.calendarData = array;
          }

          i += 1;
        }
      }
    },
    exit() {
      document.getElementById('popWindow').style.display = 'none';
    },
    addEvent() {
      const date = this.focusDate;
      const event = document.getElementById('newEvent__input').value;
      // eslint-disable-next-line prefer-template
      const newEvent = (date + '   || ' + event);
      this.popWindow(this.focusId);
      document.getElementById('newEvent__input').value = '';
      storage.commit('addEvent', newEvent);
      this.fetchedData = storage.getters.calendarData;
      this.popWindow(this.focusId);
      // update in apollo
      let x = '';
      for (let i = 0; i < this.fetchedData.length;) {
        const y = this.fetchedData[i];
        x += '**';
        x += y;
        i += 1;
      }

      this.$refs.apollo.mutate('events', x);
    },
    deleteEvent(event) {
      // eslint-disable-next-line prefer-template
      let focusEvent = (this.focusDate + '   ||' + event);
      focusEvent = String(focusEvent);
      let arrNum = [];
      for (let i = 0; i < this.fetchedData.length;) {
        let fetchData = this.fetchedData[i];
        fetchData = String(fetchData);
        if (fetchData === focusEvent) {
          arrNum = i;
        }
        i += 1;
      }
      this.fetchedData.splice(arrNum, 1);
      storage.commit('updateEvents', this.fetchedData);
      this.fetchedData = storage.getters.calendarData;
      this.popWindow(this.focusId);
      // update in appolo
      let x = '';
      for (let i = 0; i < this.fetchedData.length;) {
        const y = this.fetchedData[i];
        x += '**';
        x += y;
        i += 1;
      }

      this.$refs.apollo.mutate('events', x);
    },

  },
};
</script>

<style lang="scss" scoped>
.CT__wrapper{
  margin-left: 19vw;
  margin-top: 0;
  @media (min-width: 768px) {
    margin-left: 15vw;
    margin-top: 12vh;
   }
}
.calendar__table{
  height:60.4vh;
  width:78vw;
   @media (min-width: 768px) {
     width:77.28vw;
   }
}
.calendar__table--day{
  height:10vh;
  width:11vw;
}
#x0{
  color:red;
}
#x7{
  color:red;
}
#x7{
  color:red;
}
#x14{
  color:red;
}
#x21{
  color:red;
}
#x28{
  color:red;
}
#x35{
  color:red;
}
.popWindow{
  position: fixed;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  display: none;
  height: 80vh;
  width: 95vw;;
}
</style>
