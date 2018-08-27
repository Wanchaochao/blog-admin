import co from 'co'
import {loginApi } from '../../service'
import {setToken} from '../../libs/util'
import {StorageModel} from '../../model'

export default {
  namespaced: true,
  state: {
    userInfo: {

    }
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 登录
    handleLogin (store, data) {
      return co(function *() {
        let userInfo = yield loginApi(data)
        StorageModel.setUser(userInfo)
        return userInfo
      })
    }

  }
}
