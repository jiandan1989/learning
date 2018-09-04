<template>
  <div class="dashboard-wrapper">
    <router-link class="gird-item" to="/demo/index">
      <Button type="primary"> Back Demo </Button>
    </router-link>
    <router-link class="gird-item" to="/notFound/index">
      <Button type="primary"> Look NotFound </Button>
    </router-link>
  </div>
</template>

<script>
import { Button } from "element-ui";

export default {
  name: "dashboard",
  components: {
    Button
  }
};
</script>

<style lang="scss">
.dashboard-wrapper {
  display: grid;
  grid-template-columns: auto 200px auto;
  grid-column-gap: 50px;
  .gird-item {
    border: 1px #333 dashed;
  }
}
</style>


