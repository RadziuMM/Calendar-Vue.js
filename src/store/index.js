import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nick: '',
    id: '',
    exist: false,
    sData: '',
    cData: '',
    calendarData: [],
  },
  mutations: {
    changenick(state, nick) {
      this.state.nick = nick;
    },
    loadData(state, Data) {
      this.state.id = Data.id;
      this.state.exist = true;
      this.state.sData = Data.data.split('||');
      this.state.sData.shift();
      this.state.cData = Data.Events;
      this.state.calendarData = Data.Events.split('**');
    },
    addEvent(state, calendarData) {
      this.state.calendarData.push(calendarData);
    },
    updateEvents(state, calendarData) {
      this.state.calendarData = calendarData;
    },
    fetchData(state, cData) {
      this.state.cData = cData;
    },
    exist(state, exist) { // ? delete ?
      this.state.exist = exist;
    },
  },
  actions: {
  },
  modules: {
  },
  getters: {
    nick(state) {
      return state.nick;
    },
    task(state) {
      return state.sData;
    },
    calendarData(state) {
      return state.calendarData;
    },
    cData(state) {
      return state.cData;
    },
    id(state) {
      return state.id;
    },
    exist(state) {
      return state.exist;
    },
  },
});
