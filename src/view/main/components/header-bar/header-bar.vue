<template>
    <div class="header-bar">
        <top-menu>
            <sider-trigger slot="left" :collapsed="collapsed" icon="md-menu" @on-change="handleCollpasedChange"></sider-trigger>
            <div class="custom-content-con" slot="right">
                <slot></slot>
            </div>
        </top-menu>
    </div>
</template>
<script>
import siderTrigger from './sider-trigger'
import topMenu from './top-menu'

import './header-bar.less'

export default {
  name: 'HeaderBar',
  components: {
    siderTrigger,
    topMenu
  },
  props: {
    collapsed: Boolean
  },
  computed: {
    breadCrumbList () {
      return this.$store.state.app.breadCrumbList
    }
  },
  methods: {
    handleCollpasedChange (state) {
      this.$emit('on-coll-change', state)
    }
  }
}
</script>
