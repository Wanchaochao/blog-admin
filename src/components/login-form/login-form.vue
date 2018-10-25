<template>
    <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
        <FormItem prop="userName">
            <Input v-model="form.userName" placeholder="请输入用户名">
            <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="form.password" placeholder="请输入密码">
            <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
            </Input>
        </FormItem>
        <FormItem>
            <Button id="TencentCaptcha" data-appid="2070777383" data-cbfn="captchaCallBack" @click="handleSubmit"
                    type="primary" long>登录
            </Button>
        </FormItem>
    </Form>
</template>
<script>
import {Process} from '../../util/co'
import {captcha} from '../../service/captcha'
import {captcha as captchaAction} from '../../service/api'

export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          {required: true, message: '账号不能为空', trigger: 'blur'}
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          {required: true, message: '密码不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  data () {
    return {
      form: {
        userName: 'littlebug',
        password: '82.80.JAN'
      }
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    myCallBack (res) {
      // res（未通过验证）= {ret: 1, ticket: null}
      // res（验证成功） = {ret: 0, ticket: "String", randstr: "String"}
      if (res.ret === 0) {
        alert(res.ticket) // 票据
        return res.ticket
      }
    },
    handleSubmit () {
      let me = this
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          Process(function *() {
            let res = yield captcha()
            console.log(res)
            if (res.ret === 0) {
              yield captchaAction(res)
            }
            me.$emit('on-success-valid', {
              userName: me.form.userName,
              password: me.form.password
            })
          })
        }
      })
    }
  },
  mounted () {
  }
}
</script>
