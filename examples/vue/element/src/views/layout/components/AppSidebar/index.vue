<template>
  <div class="app-sidebar" isCollapse="isCollapse">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      style="height: 100%"
    >
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { SIDEBAR } from "@/constants";
import SidebarItem from "./SidebarItem.vue";

export default {
  name: "AppSidebar",
  computed: {
    ...mapGetters(["permission_routers"])
  },
  mounted() {
    console.log("====================================");
    console.log(this.$route.path);
    console.log("====================================");
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  components: { SidebarItem }
};
</script>

<style lang="sass" scoped>

</style>

