<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>章节管理</el-breadcrumb-item>
      <el-breadcrumb-item>修改章节</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :inline="true"
      class="demo-form-inline"
      :model="editArticleItemForm"
      :rules="editArticleItemRules"
      ref="editArticleItemRef"
    >
      <el-form-item label="文章" prop="pid">
        <el-input prefix-icon="el-icon-tickets" disabled v-model="editArticleItemForm.title"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input prefix-icon="el-icon-user-solid" disabled v-model="editArticleItemForm.username"></el-input>
      </el-form-item>
      <el-form-item label="章节标题" prop="item_title">
        <el-input prefix-icon="el-icon-tickets" disabled v-model="editArticleItemForm.item_title"></el-input>
      </el-form-item>
      <el-form-item label="章节次序" prop="index">
        <el-input prefix-icon="el-icon-tickets" v-model="editArticleItemForm.index"></el-input>
      </el-form-item>
      <el-form-item label="提示" style="color:red">目前仅支持单图片上传,多图片请逐一上传</el-form-item>
      <el-form-item prop="md">
        <mavon-editor
          class="md"
          v-model="editArticleItemForm.md"
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
        <el-button type="primary" size="mini" @click="putMd">修改</el-button>
        <el-button type="warning" size="mini" @click="resetArticleItemForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editArticleItemForm: {},
      img_file: {},
      // 验证规则
      editArticleItemRules: {
        item_title: [
          { required: true, message: "标题不能为空", trigger: "blur" }
        ],
        md: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        index: [
          { required: true, message: "章节次序不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getArticleItemInfo();
  },
  methods: {
    // 重置表单
    resetArticleItemForm() {
      this.$refs.editArticleItemRef.resetFields();
    },
    // 加载
    async getArticleItemInfo() {
      let { data: res } = await this.$http.get(
        "article-items/" + this.$route.params.id
      );
      this.editArticleItemForm = res.data;
    },
    changeData(value, render) {
      this.editArticleItemForm.mdHtml = render;
    },
    // 修改按钮
    async putMd() {
      await this.$http.put(
        "article-items/" + this.$route.params.id,
        this.editArticleItemForm
      );
      this.$message.success({ message: "修改成功", duration: 1000 });
      this.$router.push("/article-item/list");
    },
    // 上传图片
    async $imgAdd(pos, $file) {
      var formdata = new FormData();
      formdata.append("image", $file);
      const { data: res } = await this.$http.post("upload/img", formdata);
      this.$refs.md.$img2Url(pos, res.imgPath);
      this.$message.success({ message: "图片上传成功", duration: 1000 });
    },
    // 删除图片
    async $imgDel(pos) {
      this.$delete(this.img_file, pos);
      const res = await this.$http.post("remove/img", { url: pos[0] });
      this.$message.success({ message: "删除成功", duration: 1000 });
    }
  }
};
</script>

<style>
</style>