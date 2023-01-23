import Vuex from 'vuex'
import Vue from "vue";
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
         userInfo: null
      
    },
    mutations: {
        setUserInfo(state, payload) {
            state.userInfo = payload;
        }
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage,
        reducer(val) {
          return { // 只储存state中的user 
            userInfo: val.userInfo
          }
        }
      })]

})