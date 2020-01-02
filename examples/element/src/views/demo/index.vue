<template>
  <div class="demo">
    <div>{{ message }}</div>
    <router-link to="/dashboard">
      <Button type="primary">Go To dashboard</Button>
    </router-link>
  </div>
</template>

<script>
import { Button } from 'element-ui';
export default {
  name: 'demo',
  components: {
    Button
  },
  data() {
    return {
      message: 'this is the demo page'
    };
  }
};
</script>

<style lang="scss">
.demo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  flex-direction: column;
  color: purple;
  font-size: 24px;
}
</style>

