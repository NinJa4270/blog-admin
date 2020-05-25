<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加用户</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form label-width="80px" :model="userForm" :rules="addUserRules" ref="addUserRef">
      <el-row>
        <el-col :span="7">
          <el-form-item label="用户名" prop="username">
            <el-input
              prefix-icon="el-icon-user-solid"
              placeholder="请输入用户名"
              v-model="userForm.username"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="密码" prop="password">
            <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="userForm.password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item>
            <el-button type="primary" size="mini" @click="addUserForm">添加</el-button>
            <el-button type="warning" size="mini" @click="resetUserForm">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userForm: {
        username: "",
        password: ""
      },
      // 验证规则
      addUserRules: {
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
    resetUserForm() {
      this.$refs.addUserRef.resetFields();
    },
    // 创建用户
    addUserForm() {
      // 预校验
      this.$refs.addUserRef.validate(async valid => {
        if (!valid) return;
        try {
          await this.$http.post("users", this.userForm);
          this.$message.success({ message: "添加成功", duration: 1000 });
          this.$router.push("/user/list");
        } catch (err) {
          this.$message.error({ message: '用户名已存在', duration: 1000 });
        }
      });
    }
  }
};
</script>

<style>
</style>