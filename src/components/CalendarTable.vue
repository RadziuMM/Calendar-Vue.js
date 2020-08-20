<template>
  <div class="calendar">
    <div class="calendar__table">
        <div class="calendar__table--day" v-for="(item,xNum) in x" :key="item.x"
         v-bind:id="'x' + xNum" @click="popWindow(xNum)">
        {{(xNum + 1)-calendarRow}}
        </div>
    </div>
    <div>
      <button @click="nextMM()">+</button>
      <div>{{focusedMM}} {{focusedYYYY}}</div>
      <button @click="previousMM()">-</button>
    </div>
    <div class="popWindow" id="popWindow">
      <div class="exit" @click="exit()">X</div>
      <ul class="eventBoard">
        <li class="singleEvent" v-for="item in calendarData" :key="item" @click="deleteEvent(item)">
          {{ item }}
        </li>
      </ul>
      <div>
        <input type="text" id="newEvent__input"/>
        <button @click="addEvent()">ADD</button>
      </div>
    </div>
  </div>
</template>

<script>
import storage from '../store/index';
import getData from '../graphql/getData.gql';
import updateUser from '../graphql/updateUser.gql';

export default {
  name: 'CalendarTable',
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
  beforeMount() {
    this.fetchGraphQL();
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
      if (this.focusedMM === 8) {
        document.getElementById(dayVar).style.backgroundColor = 'white';
      } else {
        document.getElementById(dayVar).style.backgroundColor = 'transparent';
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

      this.$apollo.mutate({
        mutation: updateUser,
        variables: {
          id: storage.getters.id,
          Events: x,
        },
      });
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

      this.$apollo.mutate({
        mutation: updateUser,
        variables: {
          id: storage.getters.id,
          Events: x,
        },
      });
    },
    fetchGraphQL() {
      // const { nick } = storage.getters;
      const nick = 'Andrzej';
      this.$apollo.query({
        query: getData,
        variables: {
          name: nick,
        },
      }).then((result) => {
        const data = result.data.userBYname;
        storage.commit('fetchData', data.Events);
        this.cData = storage.getters.cData;
        const array = this.cData.split('**');
        this.fetchedData = array;
      });
    },
  },
};
</script>

<style lang="scss" scoped>

.calendar__table--day{
  float:left;
  width:11vw;
  height:5vh;
  text-align:center;
  padding-top:5vh;
  padding-bottom: 2vh;
  transition: 1s;
}
.calendar__table--day:hover{
  opacity: 0.4;
  background-color: darkgray;
  cursor: pointer;
}
.calendar__table{
  border:2px black solid;
  height:72vh;
  width:77vw;
  float:right;
}
#x0{
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
  height: 80vh;
  width: 80vw;;
  background-color: whitesmoke;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  display: none;
  border: 1px black solid;
  border-radius: 3vh;
}
.exit{
  cursor: pointer;
  float: right;
  padding: 2vw;
}
.eventBoard {
  list-style: none;
  margin-top:10vh;
  margin-left: 0;
  margin-right: 0;
}
.singleEvent{
  width:90%;
}
.singleEvent:hover{
  background-color: red;
  cursor: pointer;
}
</style>
