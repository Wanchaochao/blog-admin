import {store} from '../store'

class Storage {
  constructor () {
    const user = this.getUser()
    if (user) {
      store.commit('user/setUserInfo', user)
    }
  }

  setUser (data) {
    store.commit('user/setUserInfo', data)
    if (data !== {}) {
      sessionStorage.setItem('__user', JSON.stringify(data))
    }
  }

  getUser () {
    let user = sessionStorage.getItem('__user')
    return user ? JSON.parse(user) : {}
  }
}

export const StorageModel = new Storage()
// window['StorageModel'] = StorageModel
