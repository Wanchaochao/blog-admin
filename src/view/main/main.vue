<template>
    <Layout style="height: 100%" class="main">
        <Header class="header-con">
            <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
                <user/>
                <language @on-lang-change="setLocal" style="margin-right: 10px;" :lang="local"/>
            </header-bar>
        </Header>
        <Layout>
            <Sider hide-trigger collapsible :width="232" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{overflow: 'hidden'}">
                <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList"></side-menu>
            </Sider>
            <Layout>
                <bread-crumb show-icon :list="breadCrumbList"></bread-crumb>
                <Content class="main-content-con">
                    <Layout class="main-layout-con">
                        <Content class="content-wrapper">
                            <keep-alive :include="cacheList">
                                <router-view/>
                            </keep-alive>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        </Layout>
    </Layout>
</template>
<script>
import BreadCrumb from './components/bread-crumb'
import SideMenu from './components/side-menu'

import HeaderBar from './components/header-bar'
import User from './components/user'
import Language from './components/language'
import {mapMutations, mapActions, mapState} from 'vuex'
import {getNewTagList, getNextRoute, routeEqual} from '@/libs/util'
import './main.less'

export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    Language,
    User,
    BreadCrumb
  },
  data () {
    return {
      collapsed: false
    }
  },
  computed: {
    // ...mapState('app',['tagNavList','tagRouter','cacheList','menuList']),
    ...mapState('user', ['userInfo']),
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    tagRouter () {
      return this.$store.state.app.tagRouter
    },
    cacheList () {
      return this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []
    },
    menuList () {
      return this.$store.getters.menuList
    },
    local () {
      return this.$store.state.app.local
    },
    breadCrumbList () {
      return this.$store.state.app.breadCrumbList
    }
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag',
      'setLocal'
    ]),
    ...mapActions('user', ['handleLogin']),
    turnToPage (route) {
      let {name, params, query} = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    },
    handleCloseTag (res, type, route) {
      let openName = ''
      if (type === 'all') {
        this.turnToPage('home')
        openName = 'home'
      } else if (routeEqual(this.$route, route)) {
        if (type === 'others') {
          openName = route.name
        } else {
          const nextRoute = getNextRoute(this.tagNavList, route)
          this.$router.push(nextRoute)
          openName = nextRoute.name
        }
      }
      this.setTagNavList(res)
      this.$refs.sideMenu.updateOpenName(openName)
    },
    handleClick (item) {
      this.turnToPage(item)
    }
  },
  watch: {
    '$route' (newRoute) {
      this.setBreadCrumb(newRoute.matched)
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
    }
  },
  mounted () {
    /**
         * @description 初始化设置面包屑导航和标签导航
         */
    this.setTagNavList()
    this.addTag({
      route: this.$store.state.app.homeRoute
    })
    this.setBreadCrumb(this.$route.matched)
    // 设置初始语言
    this.setLocal(this.$i18n.locale)
    // 文档提示
    // this.$Notice.info({
    //   title: '想快速上手，去看文档吧',
    //   duration: 0,
    //   render: (h) => {
    //     return h('p', {
    //       style: {
    //         fontSize: '13px'
    //       }
    //     }, [
    //       '点击',
    //       h('a', {
    //         attrs: {
    //           href: 'https://lison16.github.io/iview-admin-doc/#/',
    //           target: '_blank'
    //         }
    //       }, 'iview-admin2.0文档'),
    //       '快速查看'
    //     ])
    //   }
    // })
  }
}
</script>
