import co from 'co'
import {loginApi} from '../../service'
import {StorageModel} from '../../model'

export default {
  namespaced: true,
  state: {
    userInfo: {}
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 登录
    handleLogin (store, data) {
      return co(function* () {
        let resp = yield loginApi(data)
        StorageModel.setUser(resp.data)
        return resp.data
      })
    },
    handleLogOut () {
      return co(function *() {
        StorageModel.setUser({})
      })
    }

  }
}
