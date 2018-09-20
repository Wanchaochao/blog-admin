<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login">
        <div class="login-con">
            <Card icon="log-in" title="欢迎登录" :bordered="false">
                <div class="form-con">
                    <login-form @on-success-valid="submitLogin"></login-form>
                    <p class="login-tip">输入任意用户名和密码即可</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import LoginForm from '_c/login-form'
import {mapActions} from 'vuex'
import {Process} from '../../util/co'
import {Response} from '../../model'

export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions('user', ['handleLogin']),
    submitLogin (data) {
      let me = this
      console.log("store data:", data , Process)
      window['Process'] = Process
      Process(function* () {
        try {
          yield me.handleLogin({name: data.userName, password: data.password})
          console.log("router:")
          return me.$router.push({path: '/'})
        } catch (e) {
          console.log("exception", e)
          return me.$Message.error(Response.instance(e).msg)
        }
      })
    }
  }
}
</script>

<style>

</style>
