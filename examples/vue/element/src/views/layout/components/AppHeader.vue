<template>
  <div>
    <div class="trigger_icon header-left" @click="toggleSidebar">
      <i :class="sidebar.opened ? 'el-icon-arrow-left' : 'el-icon-arrow-right'"></i>
    </div>
    <div class="header-right">
      <el-dropdown :hide-on-click="false" click="handleDrop" @command="handleCommand">
        <span class="el-dropdown-link">
        <i class="el-icon-setting"></i>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">
            <i class="el-icon-setting"></i> Logout
          </el-dropdown-item>
          <el-dropdown-item divided command="login">
            <router-link to="/login">
              <i class="el-icon-success"></i>
              Login
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item divided command="setting">
            <i class="el-icon-setting"></i>
            Setting
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AppHeader',
  props: {
    handleClickToggle: {
      type: Function,
      default: function() {}
    }
  },
  computed: {
    ...mapGetters(['sidebar'])
  },
  methods: {
    toggleSidebar() {
      console.log(this.sidebar);
      this.$store.dispatch('toggleSidebar');
    },
    handleDrop() {
      console.log(11111);
    },
    handleCommand(command) {
      this.$message({
        message: `command: ${command}`,
        type: 'success'
      });
      // if (command === 'login') {
      //   this.$router.push('/login');
      // }
    }
  }
};
</script>
