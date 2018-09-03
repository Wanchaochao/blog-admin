import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import articles from './module/articles'
import app from './module/app'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    articles
  }
})
