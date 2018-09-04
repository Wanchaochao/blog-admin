import {getArticles, storeArticle} from '../../service'
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
        let articles = resp.data
        store.commit('setArticles', articles)
        return articles
      })
    },
    storeArticle (store, data) {
      return co(function* () {
        return yield storeArticle(data)
      })
    }

  }

}
