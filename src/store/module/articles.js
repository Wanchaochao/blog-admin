import {getArticles, getCategories, storeArticle} from '../../service'
import co from 'co'

export default {
  namespaced: true,
  state: {
    articles: []
  },
  mutations: {
    setArticles (state, articles) {
      return state.articles = articles
    }
  },
  actions: {
    getArticles (store, data) {
      return co(function* () {
        let resp = yield getArticles(data)
        store.commit('setArticles', resp.data)
        return resp.data
      })
    },
    storeArticle (store, data) {
      return co(function* () {
        return yield storeArticle(data)
      })
    },
    getCate (store, data) {
      return co(function *() {
        let resp = yield getCategories(data)
        return resp.data
      })
    }

  }

}
