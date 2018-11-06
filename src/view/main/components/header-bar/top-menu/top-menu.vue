<template>
    <Menu mode="horizontal" :theme="theme1" active-name="1">
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <div class="logo-con" style="float: left">
            <div class="logo-text">Little Bug</div>
            <!--<img v-show="!collapsed" :src="logo" key="max-logo"/>-->
            <!--<img v-show="collapsed" :src="logo_s" key="min-logo"/>-->
        </div>
        <div style="float: left">
            <slot name="left"></slot>
        </div>
        <slot name="right"></slot>
    </Menu>
</template>
<script>
import logo from '@/assets/images/icon-admin.jpeg'
import logo_s from '@/assets/images/icon-admin-s.jpeg'
import './top-menu.less'
import {mapState} from 'vuex'

export default {
  data () {
    return {
      collapsed: false,
      logo,
      logo_s,
      theme1: 'dark'
    }
  },

  computed: {
    ...mapState('user', ['userInfo'])
  }
}
</script>

<style scoped>
    .logo-text {
        width: 160px;
        height: 40px;
        font-size: 22px;
        font-family: initial;
        font-weight: bold;
        text-align: center;
        margin: 5px auto;
        border-radius: 10px;
        line-height: 40px;
        border: 2px solid #ccc;
    }
</style>
