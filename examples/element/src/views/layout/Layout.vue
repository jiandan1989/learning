<template>
  <div :class="appWrapperKls">
    <app-sidebar :isCollapse="isCollapse" class="app-sidebar"></app-sidebar>
    <div class="main-container">
      <app-header class="main-header"></app-header>
      <app-main class="main-content"></app-main>
      <app-footer class="main-footer"></app-footer>
    </div>
  </div>
</template>

<script>
import classnames from 'classnames';
import { mapGetters } from 'vuex';

import { AppMain, AppHeader, AppSidebar, AppFooter } from './components';
export default {
  name: 'layout',
  computed: {
    ...mapGetters(['sidebar']),
    appWrapperKls() {
      return classnames('app-wrapper', {
        open: this.isCollapse
      });
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  components: {
    AppMain,
    AppSidebar,
    AppHeader,
    AppFooter
  }
};
</script>
