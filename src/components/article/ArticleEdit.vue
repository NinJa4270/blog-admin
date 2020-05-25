<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>修改文章</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      label-width="80px"
      :model="editArticleForm"
      :rules="editArticleRules"
      ref="editArticleRef"
    >
      <el-row>
        <el-col :span="7">
          <el-form-item label="标题" prop="title">
            <el-input prefix-icon="el-icon-user-solid" v-model="editArticleForm.title"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="作者" >
            <el-input prefix-icon="el-icon-lock"  disabled v-model="editArticleForm.username"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="封面图" prop="cover">
            <el-input
              prefix-icon="el-icon-picture"
              placeholder="请输入封面图"
              v-model="editArticleForm.cover"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item>
            <el-button type="primary" size="mini" @click="editSetArticleForm">修改</el-button>
            <el-button type="warning" size="mini" @click="reseteditArticleForm">重置</el-button>
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
      editArticleForm: {},
      // 验证规则
      editArticleRules: {
        title: [
          { required: true, message: "标题不能为空", trigger: "blur" },
        ],       
        cover: [
          { required: true, message: "封面图不能为空", trigger: "blur" },
        ]
      }
    };
  },
  created() {
    // console.log(this.$route.params.id)
    this.getArticleInfo();
  },
  methods: {
    reseteditArticleForm() {
      this.$refs.editArticleRef.resetFields();
    },
    async getArticleInfo() {
      let { data: res } = await this.$http.get(
        "articles/" + this.$route.params.id
      );
      this.editArticleForm = res.data[0];
    },
    async editSetArticleForm() {
      await this.$http.put("articles/" + this.$route.params.id, this.editArticleForm);
      this.$message.success({ message: "修改成功", duration: 1000 });
      this.$router.push("/article/list");
    }
  }
};
</script>

<style>
</style>