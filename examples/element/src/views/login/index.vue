<template>
<div class="login-wrapper">
  <vue-particles
    class="particles"
    color="#dedede"
    :particleOpacity="0.7"
    :particlesNumber="80"
    shapeType="circle"
    :particleSize="4"
    linesColor="#0ae"
    :linesWidth="1"
    :lineLinked="true"
    :lineOpacity="0.4"
    :linesDistance="150"
    :moveSpeed="3"
    :hoverEffect="true"
    hoverMode="grab"
    :clickEffect="true"
    clickMode="push"
  >
  </vue-particles>
  <div class="login-container">
    <el-form
      :model="loginForm"
      status-icon
      :rules="loginRules"
      ref="loginForm"
    >
      <el-form-item
        prop="username"
      >
        <el-input
          size="medium"
          v-model="loginForm.username"
          auto-complete="off"
          placeholder="username"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        prop="password"
      >
        <el-input
          type="password"
          size="medium"
          v-model="loginForm.password"
          auto-complete="off"
          placeholder="password"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-button
          class="login-btn"
          type="primary"
          @click="handleSubmit"
        >
          submit
        </el-button>
      </el-col>
      <el-col :span="12">
        <el-button
          class="login-btn"
          type="primary"
          @click="handleReset"
        >
          reset
        </el-button>
      </el-col>
    </el-row>
    <div class="login-tips">
      <div>
        <span>账号: </span>
        <span>&nbsp;admin</span>
      </div>
      <div>
        <span>密码: </span>
        <span>&nbsp;admin</span>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import Login from '../../service/';
import { validateUsername, validatePassword } from '../../utils/vali.js';
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      }
    };
  },
  mounted() {
    // console.log(this.$route, this.$http);
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          const data = await this.$http
            .post(Login.login, JSON.stringify(this.loginForm))
            .then(res => res.body);
          if (data.data.success) {
            this.$message.success('登录成功');
          }
        } else {
          this.$message.error('error');
        }
      });
    },
    handleReset() {
      this.$refs.loginForm.resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.login-wrapper {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: url('../../assets/img/bg.jpg') no-repeat 0 0;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .particles {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  .login-container {
    margin: 0 auto;
    position: relative;
    top: -24px;
    padding: 35px 35px 15px 35px;
    box-sizing: border-box;
    width: 520px;
    border-radius: 8px;
    box-shadow: 1px 1px 1px #eee, -1px -1px 1px #eee;

    .el-form-item {
      margin-bottom: 24px;
    }
    .login-btn {
      width: 100%;
    }

    .login-tips {
      margin: 24px 0;
      display: flex;
      height: 50px;
      flex-direction: column;
      justify-content: space-between;
      color: #cab0b0;
    }
  }
}
</style>
