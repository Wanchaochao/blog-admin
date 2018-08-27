<template>
    <Menu mode="horizontal" :theme="theme1" active-name="1">
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <div class="logo-con" style="float: left">
            <img v-show="!collapsed" :src="maxLogo" key="max-logo"/>
            <img v-show="collapsed" :src="minLogo" key="min-logo"/> <span> - 运营管理后台</span>
        </div>
        <div style="float: left">
            <slot name="left"></slot>
        </div>
        <MenuItem name="1">
            <Icon type="ios-paper"/>
            内容管理
        </MenuItem>
        <MenuItem name="2">
            <Icon type="ios-people"/>
            用户管理
        </MenuItem>
        <Submenu name="3">
            <template slot="title">
                <Icon type="ios-stats"/>
                统计分析
            </template>
            <MenuGroup title="使用">
                <MenuItem name="3-1">新增和启动</MenuItem>
                <MenuItem name="3-2">活跃分析</MenuItem>
                <MenuItem name="3-3">时段分析</MenuItem>
            </MenuGroup>
            <MenuGroup title="留存">
                <MenuItem name="3-4">用户留存</MenuItem>
                <MenuItem name="3-5">流失用户</MenuItem>
            </MenuGroup>
        </Submenu>
        <MenuItem name="4">
            <Icon type="ios-construct"/>
            综合设置
        </MenuItem>
        <slot name="right"></slot>
    </Menu>
</template>
<script>
import minLogo from '@/assets/images/logo-min.png'
import maxLogo from '@/assets/images/logo.png'
import './top-menu.less'
import {mapState} from 'vuex'

export default {
  data () {
    return {
      collapsed: false,
      minLogo,
      maxLogo,
      theme1: 'dark'
    }
  },

  computed: {
    ...mapState('user', ['userInfo'])
  }
}
</script>
