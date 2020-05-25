<template>
  <div id="main">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>章节管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加章节</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :inline="true"
      class="demo-form-inline"
      :model="articleItemForm"
      :rules="addArticleItemRules"
      ref="addArticleItemRef"
    >
      <el-form-item label="文章" prop="pid">
        <el-select placeholder="请选择" v-model="value" @change="selectTitle">
          <el-option
            v-for="item in articleList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="作者">
        <el-input prefix-icon="el-icon-user-solid" disabled v-model="username"></el-input>
      </el-form-item>
      <el-form-item label="章节标题" prop="item_title">
        <el-input prefix-icon="el-icon-tickets" v-model="articleItemForm.item_title"></el-input>
      </el-form-item>
      <el-form-item label="章节次序" prop="index">
        <el-input
          prefix-icon="el-icon-tickets"
          v-model="articleItemForm.index"
          placeholder="请输入英文数字 例如One"
        ></el-input>
      </el-form-item>
      <el-form-item label="提示" style="color:red">目前仅支持单图片上传,多图片请逐一上传</el-form-item>
      <el-form-item prop="md">
        <mavon-editor
          class="md"
          v-model="articleItemForm.md"
          toolbarsBackground="#74b9ff"
          ref="md"
          :ishljs="true"
          codeStyle="googlecode"
          @imgAdd="$imgAdd"
          @imgDel="$imgDel"
          @change="changeData"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="getMd">添加</el-button>
        <el-button type="warning" size="mini" @click="resetArticleItemForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      articleList: [],
      username: "",
      articleItemForm: {
        pid: "",
        item_title: "",
        md: "",
        index: "",
        mdHtml:""
      },
      img_file: {},
      // 验证规则
      addArticleItemRules: {
        pid: [{ required: true, message: "主标题不能为空", trigger: "blur" }],
        item_title: [
          { required: true, message: "标题不能为空", trigger: "blur" }
        ],
        md: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        index: [{ required: true, message: "次序不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getArticle();
  },
  methods: {
    async getArticle() {
      const { data: res } = await this.$http.get("articleList");
      this.articleList = res.data;
    },
    selectTitle(event) {
      this.articleList.forEach(item => {
        if (item.id === event) {
          this.username = item.username;
        }
      });
    },
    changeData(value, render) {
      this.articleItemForm.mdHtml=render;
    },

    // 重置表单
    resetArticleItemForm() {
      this.$refs.addArticleItemRef.resetFields();
      this.value = "";
      this.username = "";
    },
    // 获取md对象
    async getMd($e) {
      // 上传预验证
      this.articleItemForm.pid = this.value;
      console.log(this.articleItemForm);
      this.$refs.addArticleItemRef.validate(async valid => {
        await this.$http.post("article-items", this.articleItemForm);
        this.$message.success({ message: "添加成功", duration: 1000 });
        this.$router.push("/article-item/list");
      });
    },
    // 上传图片
    async $imgAdd(pos, $file) {
      var formdata = new FormData();
      formdata.append("image", $file);
      const { data: res } = await this.$http.post("upload/img", formdata);
      this.$refs.md.$img2Url(pos, res.imgPath);
    },
    async $imgDel(pos) {
      this.$delete(this.img_file, pos);
      const res = await this.$http.post("remove/img", { url: pos[0] });
      this.$message.success({ message: "删除成功", duration: 1000 });
    }
  }
};
</script>

<style>
.md {
  height: 500px;
  width: 85vw;
}
</style>