<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入文章" v-model="queryInfo.query" clearable @clear="getArticleList">
            <el-button slot="append" icon="el-icon-search" @click="getArticleList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addArticle">添加</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-table :data="articleList" border stripe style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="username" label="作者"></el-table-column>
      <el-table-column prop="cover" label="封面"></el-table-column>
      <el-table-column prop="createTime" :formatter="dateFormat" label="创建时间"></el-table-column>
      <el-table-column prop="updateTime" :formatter="dateFormat" label="更新时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改" placement="top" :enterable="false">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="editArticle(scope.row.id)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="deleteArticle(scope.row.id)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pageNum"
      :page-sizes="[2, 5, 10, 20]"
      :page-size="queryInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: "",
        pageSize: 5,
        pageNum: 1
      },
      articleList: [],
      total: 0,
      pageNum: 1
    };
  },
  created() {
    this.getArticleList();
  },
  methods: {
    async getArticleList() {
      const { data: res } = await this.$http.get("/articles", {
        params: {
          query: this.queryInfo
        }
      });
      this.articleList = res.data;
      this.total = res.total;
      this.pageNum = res.page;
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getArticleList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getArticleList();
    },
    addArticle() {
      this.$router.push("/article/add");
    },
    editArticle(id) {
      this.$router.push({ path: "/article/edit/" + id });
    },
    async deleteArticle(id) {
      const confirmRes = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      if (confirmRes === "confirm") {
        await this.$http.delete("articles/" + id);
        this.$message.success({ message: "删除成功", duration: 1000 });
        this.queryInfo.pageNum= 1;
        this.getArticleList();
      } else {
        this.$message.info({ message: "取消删除", duration: 1000 });
      }
    },
    // 格式化时间
    dateFormat(row, column, cellValue, index) {
      const daterc = row[column.property];
      if (daterc != null) {
        var date = new Date(cellValue);
        var year = date.getFullYear();

        var month =
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hours =
          date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes =
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        // 拼接
        return (
          year +
          "-" +
          month +
          "-" +
          day +
          " " +
          hours +
          ":" +
          minutes +
          ":" +
          seconds
        );
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>