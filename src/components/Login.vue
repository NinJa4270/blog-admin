<template>
  <div class="login-container back-item1">
    <!-- 登录表单开始 -->
    <div class="login-box back-item2 center">
      <!-- logo开始 -->
      <div class="avator-box back-item2">
        <img class="back-item1" src="../assets/logo.png" />
      </div>
      <!-- logo结束 -->
      <!-- form表单开始 -->
      <div class="flex a-c j-c login-form">
        <el-form :model="loginForm" :rules="loginRules" ref="loginRef">
          <!-- 用户名 -->
          <el-form-item prop="username">
            <el-input
              prefix-icon="el-icon-user-solid"
              v-model="loginForm.username"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item class="flex j-b">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="warning" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- form表单结束 -->
    </div>
    <!-- 登录表单结束 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登录表单数据
      loginForm: {
        username: "root",
        password: "123456"
      },
      // 验证规则
      loginRules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 4, max: 8, message: "长度在 4 到 8 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 8, message: "长度在 6 到 8 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 重置表单
    resetLoginForm() {
      this.$refs.loginRef.resetFields();
    },
    // 登录
    login() {
      // 预校验
      this.$refs.loginRef.validate(async valid => {
        if (!valid) return;
        try {
          const res = await this.$http.post("login", this.loginForm);
          this.$message.success({ message: "登录成功", duration: 1000 });
          window.sessionStorage.setItem("username", res.data.username);
          window.sessionStorage.setItem("token", res.data.token);
          this.$router.push("/home");
        } catch (err) {
          this.$message.error({
            message: "用户名或密码不正确",
            duration: 1000
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  .login-box {
    width: 350px;
    height: 300px;
    border-radius: 5px;
  }
  .avator-box {
    width: 100px;
    height: 100px;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    border-radius: 50%;
    padding: 10px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .login-form {
    width: 100%;
    margin-top: 80px;
    .el-form {
      width: 80%;
    }
  }
}
</style>