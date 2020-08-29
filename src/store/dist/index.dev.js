"use strict";

var _interopRequireDefault = require("/home/boruta/Code/CalendarFrontend/node_modules/@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

_vue.default.use(_vuex.default);

var _default = new _vuex.default.Store({
  state: {
    nick: '',
    id: '',
    exist: false,
    sData: '',
    cData: '',
    calendarData: []
  },
  mutations: {
    changenick: function changenick(state, nick) {
      this.state.nick = nick;
    },
    loadData: function loadData(state, Data) {
      this.state.id = Data.id;
      this.state.exist = true;
      this.state.sData = Data.data.split('||');
      this.state.sData.shift();
      this.state.cData = Data.Events;
      this.state.calendarData = Data.Events.split('**');
    },
    addEvent: function addEvent(state, calendarData) {
      this.state.calendarData.push(calendarData);
    },
    updateEvents: function updateEvents(state, calendarData) {
      this.state.calendarData = calendarData;
    },
    fetchData: function fetchData(state, cData) {
      this.state.cData = cData;
    },
    exist: function exist(state, _exist) {
      // ? delete ?
      this.state.exist = _exist;
    }
  },
  actions: {},
  modules: {},
  getters: {
    nick: function nick(state) {
      return state.nick;
    },
    task: function task(state) {
      return state.sData;
    },
    calendarData: function calendarData(state) {
      return state.calendarData;
    },
    cData: function cData(state) {
      return state.cData;
    },
    id: function id(state) {
      return state.id;
    },
    exist: function exist(state) {
      return state.exist;
    }
  }
});

exports.default = _default;