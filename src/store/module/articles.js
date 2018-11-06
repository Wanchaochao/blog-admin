import {getArticles, getCategories, storeArticle, getArticle, updateArticle} from '../../service'
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
    updateArticle (store, data) {
      return co(function* () {
        return yield updateArticle(data)
      })
    },
    getCate (store, data) {
      return co(function *() {
        let resp = yield getCategories(data)
        return resp.data
      })
    },
    getArticle (store, data) {
      return co(function *() {
        let resp = yield getArticle(data)
        return resp.data
      })
    }

  }

}
