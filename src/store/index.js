import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nick: '',
    id: '',
    sData: '',
    calendarData: [],
    cData: '',
    exist: false,
  },
  mutations: {
    changenick(state, nick) {
      this.state.nick = nick;
    },
    loadsData(state, Data) {
      this.state.sData = Data.data.split('||');
      this.state.id = Data.id;
      this.state.exist = Data.exist;
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
  },
});
