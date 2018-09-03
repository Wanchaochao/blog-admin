import {getArticles, storeArticle} from '../../service'
import co from 'co'
import {Response} from '../../model'

export default {
  namespaced: true,
  state: {
    articles: []
  },
  mutations: {
    setArticles (state, articles) {
      return this.state.articles = articles
    }
  },
  actions: {
    getArticles (store, data) {
      return co(function* () {
        let resp = yield getArticles(data)
        let articles = resp.data
        this.commit('setArticles', articles)
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
