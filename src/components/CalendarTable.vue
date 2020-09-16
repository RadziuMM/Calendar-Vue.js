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
    bg-gradient-to-r from-gray-900 to-black text-center text-lg" id="popWindow">
      <span class="cursor-pointer fixed right-0 mr-2 text-4xl text-pink-600"
       @click="exit()">&#10799;</span>
      <span class="text-3xl text-pink-600">{{this.focusDate}}</span>
      <ul class="mt-16">
        <li class="hover:text-pink-600 cursor-pointer text-2xl"
        v-for="item in calendarData" :key="item" @click="deleteEvent(item)">
          {{ item }}
        </li>
      </ul>
      <form class="mt-10" action="#" onsubmit="return false">
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
      const today = new Date();
      this.accDay = today.getDate();
      this.focusedMM = today.getMonth() + 1;
      this.focusedYYYY = today.getFullYear();

      this.calendarRow = new Date(this.focusedYYYY, this.focusedMM - 1).getDay();
      this.x = (new Date(this.focusedYYYY, this.focusedMM - 1, 0).getDate()) + this.calendarRow;

      this.accMMCalendarRow = this.calendarRow;
    },
    clearMinusDays() {
      for (let i = 1; i < 7;) {
        const x = document.getElementById(`x${i - 1}`);
        x.innerHTML = i - this.calendarRow;
        x.style.opacity = '1';
        x.style.cursor = 'pointer';
        i += 1;
      }
      for (let i = 1; i < this.calendarRow + 1;) {
        const x = document.getElementById(`x${i - 1}`);
        x.innerHTML = '';
        x.style.opacity = '0';
        x.style.cursor = 'auto';
        i += 1;
      }
    },
    markAccDay() {
      if (this.focusedMM - 1 === new Date().getMonth()) {
        document.getElementById(`x${(this.accMMCalendarRow + this.accDay) - 1}`).style.border = '#d53f8c 1px solid';
      } else {
        document.getElementById(`x${(this.accMMCalendarRow + this.accDay) - 1}`).style.border = 'none';
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
      this.x = new Date(this.focusedYYYY, this.focusedMM - 1, 0).getDate();
      this.calendarRow = new Date(this.focusedYYYY, this.focusedMM - 1).getDay();
      this.x += this.calendarRow;
      this.clearMinusDays();
      this.markAccDay();
    },
    popWindow(id) {
      if (id > (this.calendarRow - 1)) {
        this.focusId = id;
        document.getElementById('popWindow').style.display = 'inline';
        const focusDate = `${id - this.calendarRow + 1}.${this.focusedMM}.${this.focusedYYYY}      `;
        this.focusDate = String(focusDate.substring(0, 10));
        this.calendarData = [];
        this.calendarData.push('Free time!Plan sth for this day!');
        const array = [];
        for (let i = 0; i < this.fetchedData.length;) {
          const dataOfEvent = String(this.fetchedData[i].substring(0, 10));
          if (this.focusDate === dataOfEvent) {
            const data = this.fetchedData[i].split('||');
            array.push(data[1]);
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
      if (event === '') {
        // console.log('');
      } else {
        const newEvent = `${date}   || ${event}`;
        this.popWindow(this.focusId);
        document.getElementById('newEvent__input').value = '';
        storage.commit('addEvent', newEvent);
        this.update();
      }
    },
    deleteEvent(event) {
      let focusEvent = `${this.focusDate}   ||${event}`;
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
      this.update();
    },
    update() {
      this.fetchedData = storage.getters.calendarData;
      this.popWindow(this.focusId);
      let x = '';
      for (let i = 0; i < this.fetchedData.length;) {
        const y = this.fetchedData[i];
        x += '**';
        x += y;
        i += 1;
      }
      this.$refs.apollo.mutate('events', x);
    }
    ,
  },
};
</script>

<style lang="scss" scoped>
.CT__wrapper{
  font-family: 'Gayathri', sans-serif;
  margin-left: 18.5vw;
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
     width:77.3vw;
   }
}
.calendar__table--day{
  height:10vh;
  width:14.28%;
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
