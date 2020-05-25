<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>章节管理</el-breadcrumb-item>
      <el-breadcrumb-item>章节列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="请输入章节"
            v-model="queryInfo.query"
            clearable
            @clear="getArticleItemList"
          >
            <el-button slot="append" icon="el-icon-search" @click="getArticleItemList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addArticleItem">添加</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-table :data="articleItemList" border stripe style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="title" label="主标题"></el-table-column>
      <el-table-column prop="item_title" label="子标题"></el-table-column>
      <el-table-column prop="index" label="章节次序"></el-table-column>
      <el-table-column prop="md" label="文件地址"></el-table-column>
      <el-table-column prop="createTime" :formatter="dateFormat" label="创建时间"></el-table-column>
      <el-table-column prop="updateTime" :formatter="dateFormat" label="更新时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改" placement="top" :enterable="false">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="editArticleItem(scope.row.id)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="deleteArticleItem(scope.row.id)"
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
      articleItemList: [],
      total: 0,
      pageNum: 1
    };
  },
  created() {
    this.getArticleItemList();
  },
  methods: {
    async getArticleItemList() {
      const { data: res } = await this.$http.get("/article-items", {
        params: {
          query: this.queryInfo
        }
      });
      this.articleItemList = res.data;
      this.total = res.total;
      this.pageNum = res.page;
    },
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getArticleItemList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getArticleItemList();
    },
    addArticleItem() {
      this.$router.push("/article-item/add");
    },
    editArticleItem(id) {
      this.$router.push({ path: "/article-item/edit/" + id });
    },
    async deleteArticleItem(id) {
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
        await this.$http.delete("article-items/" + id);
        this.$message.success({ message: "删除成功", duration: 1000 });
        this.queryInfo.pageNum = 1;
        this.getArticleItemList();
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