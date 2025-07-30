<template>
  <div class="article-list">
    <!-- 操作按钮区域 -->
    <div class="action-buttons">
      <el-button type="primary" @click="handleAdd">新增</el-button>
    </div>
    <!-- 数据表格 -->
    <el-table :data="articleList" style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="author" label="作者" width="120" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { personnelService } from '@/api/articles'
import type { Article } from '@/api/articles'

// 模拟文章数据
const articleList = ref<Article[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 获取文章列表
const fetchArticleList = async () => {
  // 这里应该是实际的 API 调用，此处为模拟
  const params = {
    pageindex: currentPage.value,
    pagesize: pageSize.value,
  }

  try {
    const response = await personnelService.getArticleList(params)
    articleList.value = response.data.data
    total.value = response.data.dataCount
  } catch (error) {
    console.error('获取文章列表失败:', error)
  }
}

// 页面加载时获取数据
onMounted(() => {
  fetchArticleList()
})

// 每页条数改变
const handleSizeChange = (newSize: number) => {
  pageSize.value = newSize
  fetchArticleList()
}

// 当前页码改变
const handleCurrentChange = (newPage: number) => {
  currentPage.value = newPage
  fetchArticleList()
}

// 新增操作
const handleAdd = () => {
  console.log('执行新增操作')
  // 这里可以打开新增对话框
}

// 编辑操作
const handleEdit = (row: Article) => {
  console.log('编辑文章:', row)
  // 这里可以打开编辑对话框并填充数据
}

// 删除操作
const handleDelete = (row: Article) => {
  console.log('删除文章:', row)
  // 这里可以添加确认对话框，确认后调用删除 API
}
</script>

<style scoped>
.article-list {
  padding: 20px;
}
.action-buttons {
  margin-bottom: 20px;
}
</style>
