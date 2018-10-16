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
      <Button id="TencentCaptcha" data-appid="2070777383" data-cbfn="callback" @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
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
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password
          })
        }
      })
    }
  },
  mounted () {
    // 直接生成一个验证码对象
    var captcha1 = new TencentCaptcha('appid', function (res) { /* callback */ })
    captcha1.show() // 显示验证码

    // 绑定一个元素并手动传入场景Id和回调
    new TencentCaptcha(
      document.getElementById('TencentCaptcha'),
      'appid',
      function (res) {
        console.log(res)
      },
      { bizState: '自定义透传参数' }
    )

    // 绑定一个元素并自动识别场景id和回调
    // 验证码会读取dom上的`data-appid`和`data-cbfn`以及`data-biz-state`(可选)自动初始化
    new TencentCaptcha(document.getElementById('TencentCaptcha'))
  }
}
</script>
