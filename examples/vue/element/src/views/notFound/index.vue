<template>
  <div class="not-found">
    <div>page not found </div>
    <router-link to="/">
      <Button type="primary">回到首页</Button>
    </router-link>
  </div>
</template>

<script>
import { Button } from "element-ui";
export default {
  name: "notFound",
  components: {
    Button
  }
};
</script>

<style lang="scss">
.not-found {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 28px;
  color: red;
}
</style>

