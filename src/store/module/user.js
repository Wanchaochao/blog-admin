import co from 'co'
import {loginApi} from '../../service'
// import {setToken} from '../../libs/util'
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
        console.log("loginApi data:", data)
        let resp = yield loginApi(data)
        console.log("resp:",resp)
        StorageModel.setUser(resp.data)
        return resp.userInfo
      })
    },
    handleLogOut () {
      return co(function *() {
        StorageModel.setUser({})
      })
    }

  }
}
