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
            <Button  @click="handleSubmit" type="primary" long>登录</Button>
        </FormItem>
    </Form>
</template>
<script>
import {Process} from '../../util/co'
import {captcha} from '../../service/captcha'

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
        password: ''
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
    handleSubmit () {
      let me = this
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          Process(function *() {
            let res = yield captcha()
            if (res.ret === 0) {
              return me.$emit('on-success-valid', {
                userName: me.form.userName,
                password: me.form.password
              })
            } else {
              me.$Message.error('captcha cancel！')
            }
            // me.$emit('on-success-valid', {
            //   userName: me.form.userName,
            //   password: me.form.password
            // })
          }).catch(e => {
            me.$Message.error(Response.instance(e).msg)
          })
        }
      })
    }
  },
  mounted () {
  }
}
</script>
