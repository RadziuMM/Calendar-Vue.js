import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nick: '',
    id: '',
    sData: '',
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
    id(state) {
      return state.id;
    },
  },
});
