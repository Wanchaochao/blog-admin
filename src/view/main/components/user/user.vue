<template>
    <div class="user-avator-dropdown">
        <Dropdown @on-click="handleClick('logout')">
            <Avatar :src="userInfo.avatar"/>
            <Icon :size="18" type="md-arrow-dropdown"></Icon>
            <DropdownMenu slot="list">
                <DropdownItem name="logout">退出登录</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
import './user.less'
import {mapActions, mapState} from 'vuex'

export default {
  name: 'User',
  props: {
    userAvator: {
      type: String,
      default: ''
    }
  },
  methods: {
    ...mapActions('user', ['handleLogOut']),
    handleClick (name) {
      switch (name) {
        case 'logout':
          this.handleLogOut().then(() => {
            this.$router.push({
              name: 'login'
            })
          })
          break
      }
    }
  },
  computed: {
    ...mapState('user', ['userInfo'])
  }
}
</script>
