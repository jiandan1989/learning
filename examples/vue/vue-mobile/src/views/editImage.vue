<template>
  <div class="edit-wrapper">
    <cube-upload
      class="edit-upload"
      ref="upload"
      v-model="files"
      :action="action"
      @files-added="addedHandler"
      @file-error="errHandler">
      <div class="clear-fix">
        <cube-upload-file v-for="(file, i) in files" :file="file" :key="i">
          <img v-if="imgUrl !== ''" :src="file.url" />
          <!-- {{ JSON.stringify(file)}} -->
        </cube-upload-file>
        <cube-upload-btn :multiple="false">
          <div>
            <i>＋</i>
            <p>Please click to upload ID card</p>
          </div>
        </cube-upload-btn>
      </div>
    </cube-upload>
    <div class="edit-btns">
      <cube-button :inline="true">取消</cube-button>
      <cube-button
        :inline="true"
        :primary="true"
        @click="backToUpload"
      >替换</cube-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditImage',
  metaInfo: {
    title: '编辑图片'
  },
  props: {
    imageData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      action: '//jsonplaceholder.typicode.com/photos/',
      files: []
    }
  },
  computed: {
    imgUrl() {
      return this.files.length > 0 ? this.files[0].url : '';
    }
  },
  methods: {
    backToUpload() {
      this.$router.back();
    },
    addedHandler() {
      const file = this.files[0]
      file && this.$refs.upload.removeFile(file)
    },
    errHandler(file) {
      this.$createToast({
        type: 'warn',
        txt: 'Upload fail',
        time: 1000
      }).show()
    }
  }
}
</script>

<style lang="stylus">
.edit-wrapper
  padding: 12px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  justify-content: space-between;

.edit-btns
  display: flex;
  justify-content: space-between;
  .cube-btn
    margin-right: 8px;
    flex: 1;

.edit-upload
  .cube-upload-file, .cube-upload-btn
    margin: 0
    height: 200px
  .cube-upload-file
    margin: 0
    // > img
    //   height: 100%;
    + .cube-upload-btn
      margin-top: -200px
      opacity: 0
  .cube-upload-file-def
    width: 100%
    height: 100%
    .cubeic-wrong
      display: none
  .cube-upload-btn
    display: flex
    align-items: center
    justify-content: center
    > div
      text-align: center
    i
      display: inline-flex
      align-items: center
      justify-content: center
      width: 50px
      height: 50px
      margin-bottom: 20px
      font-size: 32px
      line-height: 1
      font-style: normal
      color: #fff
      background-color: #333
      border-radius: 50%
</style>

