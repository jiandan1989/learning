<template>
  <div class="upload-wrapper">
    <cube-form :model="model">
      <cube-form-group>
        <cube-upload
          v-model="model.uploadValue"
          ref="upload"
          :action="action"
          @files-added="onFilesAdded"
          @file-removed="onFilesRemove"
          :max="max"
          @file-click="onFileClick"
          accept="image/*"
        />
      </cube-form-group>
    </cube-form>
    <div class="operate-btns" v-if="model.uploadValue.length > 0">
      <cube-button
        @click="showImagePreview"
        :inline="true"
      >点击预览</cube-button>
      <cube-button
        :primary="true"
        :inline="true"
        :disabled="submitBtnStatus"
        @click="submitForm"
      >提交</cube-button>
    </div>
  </div>
</template>

<script>
// 需要抽取上传公共组件, 编辑时需要
export default {
  name: 'UploadWrapper',
    metaInfo: {
      title: '上传图片'
  },
  data() {
    return {
      submited: false,
      model: {
        uploadValue: [],
      },
      max: 12,
      action: {
        target: '//jsonplaceholder.typicode.com/photos/',
        // headers: { token: '1111' }, // 上传时传的 token,
        // withCredentials: true, // 是否携带 cookie
        // timeout: 10000, // 超时时间
        // checkSuccess(ref, file) { // 上传成功回调
        //   console.log(ref, '>>>>>>>');
        // },
        // data(file) {
        //   console.log(file);
        //   return file;
        // }
      }
    }
  },
  computed: {
    previewImgs() {
      return this.model.uploadValue.map(item => item.url);
    },
    submitBtnStatus() {
      console.log(this.submited, 'this.submited>>>>>>>>>>>');
      return this.submited || this.model.uploadValue.some(item => item.status !== 'success');
    }
  },
  methods: {
    // 提交表单
    submitForm(e) {
      e.preventDefault();
      this.submited = true;
      console.log(this.model, '>>>>>>>>>>>');
    },
    showImagePreview() {
      this.$createImagePreview({
        imgs: this.previewImgs,
      }).show()
    },
    onFilesAdded(files) {
      // const file = this.files[0]
      // file && this.$refs.upload.removeFile(file);
      let hasIgnore = false
      const maxSize = 1 * 1024 * 1024 // 1M
      for (let k in files) {
        const file = files[k]
        if (file.size > maxSize) {
          file.ignore = true
          hasIgnore = true
        }
      }
      hasIgnore && this.$createToast({
        type: 'warn',
        time: 1000,
        txt: '上传图片最大限制为 1M'
      }).show()
    },
    // 删除之前做提示
    onFilesRemove(file) {
      this.$createDialog({
        type: 'confirm',
        icon: 'cubeic-alert',
        title: '此图片已被删除',
        confirmBtn: {
          text: '知道了',
          active: true,
        },
        cancelBtn: {
          text: '取消',
        },
        onConfirm: () => {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '确定'
          }).show()
        },
      }).show()
    },
    onFileClick(file) {
      console.log(file, '>>>>>>>>>>>>');
      this.$createDialog({
        type: 'confirm',
        icon: 'cubeic-alert',
        title: '是否要对图片进行编辑',
        onConfirm: () => {
          this.$router.push('/editImg/1');
        }
      }).show();
    }
  }
}
</script>

<style lang="stylus" scoped>
.upload-wrapper
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  box-sizing: border-box;

  .operate-btns
    display: flex;
    justify-content: space-between;
    .cube-btn
      flex: 1;
      margin: 8px;

</style>

