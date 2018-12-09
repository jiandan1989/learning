<template>
  <div />
</template>
<script>

export default {
  name: 'Home',
  metaInfo: {
    title: '首页'
  },
  mounted() {
     this.dialog = this.$createDialog({
        type: 'prompt',
        title: '请输入手机号',
        prompt: {
          value: '',
          placeholder: '请输入您的手机号',
          maxlength: 11,
        },
        onConfirm: (e, promptValue) => {
          // @todo: 校验手机号是否合法
          this.$router.push('/upload');
        }
      }).show()
  },
};
</script>

<style lang="stylus">
.home-wrapper
  height: 100%;
  display: flex;
  flex-direction: column;

  .home-bg
    flex: 1;
    background: blue;
  .page-num
    display: flex;
    justify-content: center;

  .submit-btn
    a
      color: red;
</style>

