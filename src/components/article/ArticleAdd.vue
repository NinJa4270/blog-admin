<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加文章</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form label-width="80px" :model="articleForm" :rules="addArticleRules" ref="addArticleRef">
      <el-row>
        <el-col :span="7">
          <el-form-item label="标题" prop="title">
            <el-input
              prefix-icon="el-icon-user-solid"
              placeholder="请输入标题"
              v-model="articleForm.title"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="作者" prop="user_id">
            <el-select v-model="articleForm.user_id" placeholder="请选择">
              <el-option
                v-for="item in userlist"
                :key="item.id"
                :label="item.username"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="作者" prop="name">
            <el-input prefix-icon="el-icon-lock" placeholder="请输入作者姓名" v-model="articleForm.name"></el-input>
          </el-form-item>-->
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="简介" prop="introduce">
            <el-input
              prefix-icon="el-icon-user-solid"
              placeholder="简介..."
              v-model="articleForm.introduce"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="封面图" prop="cover">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + 'upload/cover'"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="articleForm.cover" :src="articleForm.cover" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item>
            <el-button type="primary" size="mini" @click="addArticleForm">添加</el-button>
            <el-button type="warning" size="mini" @click="resetArticleForm">重置</el-button>
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
      articleForm: {
        title: "",
        user_id: "",
        cover: "",
        introduce:""
      },
      // 验证规则
      addArticleRules: {
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
        user_id: [{ required: true, message: "作者不能为空", trigger: "blur" }],
        introduce: [{ required: true, message: "简介不能为空", trigger: "blur" }],
        cover: [{ required: true, message: "封面图不能为空", trigger: "blur" }]
      },
      userlist: []
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // 重置表单
    resetArticleForm() {
      this.$refs.addUserRef.resetFields();
    },
    // 创建文章
    addArticleForm() {
      // 预校验
      this.$refs.addArticleRef.validate(async valid => {
        if (!valid) return;
        await this.$http.post("articles", this.articleForm);
        this.$message.success({ message: "添加成功", duration: 1000 });
        this.$router.push("/article/list");
      });
    },
    // 获取用户列表
    async getUserList() {
      let { data: res } = await this.$http.get("articlesuser");
      this.userlist = res.data;
    },
    // 图片上传
    afterUpload(res) {
      this.articleForm.cover = res.imgPath;
    }
  }
};
</script>

<style >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px !important;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>