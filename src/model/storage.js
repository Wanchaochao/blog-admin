import {store} from '../store'
class Storage {
  setUser (data) {
    store.commit('user/setUserInfo', data)
    localStorage.setItem('__user', JSON.stringify(data))
  }

  getUser () {
    const data = JSON.parse(localStorage.getItem('__user'))
    store.commit('user/setUserInfo', data)
    return data
  }
}
export const StorageModel = new Storage()
window['StorageModel'] = StorageModel
