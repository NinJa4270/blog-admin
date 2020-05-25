<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>修改用户</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form label-width="80px" :model="editUserForm" :rules="editUserRules" ref="editUserRef">
      <el-row>
        <el-col :span="7">
          <el-form-item label="用户名" prop="username">
            <el-input
              prefix-icon="el-icon-user-solid"
              disabled
              v-model="editUserForm.username"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="密码" prop="password">
            <el-input
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
              v-model="editUserForm.password"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item>
            <el-button type="primary" size="mini" @click="editSetUserForm">修改</el-button>
            <el-button type="warning" size="mini" @click="reseteditUserForm">重置</el-button>
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
      editUserForm: {},
      // 验证规则
      editUserRules: {
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
  created() {
    // console.log(this.$route.params.id)
    this.getUserInfo();
  },
  methods: {
     reseteditUserForm() {
      this.$refs.addUserRef.resetFields();
    },
    async getUserInfo() {
      let { data: res } = await this.$http.get(
        "users/" + this.$route.params.id
      );
      this.editUserForm = res.data[0];
    },
    async editSetUserForm(){
      await this.$http.put('users/' + this.$route.params.id,this.editUserForm)
      this.$message.success({message:'修改成功', duration: 1000 });
      this.$router.push('/user/list')
    }
  }
};
</script>

<style>
</style>