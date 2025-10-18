<template>



  <!-- 查询区域 -->
  <el-form :inline="true" :model="query" class="demo-form-inline" style="margin: 20px 0;">
    <el-form-item label="用户名">
      <el-input v-model="query.username" placeholder="请输入用户名" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleQuery">查询</el-button>
      <el-button @click="resetQuery">重置</el-button>
      <el-button type="primary" @click="handleAdd">新增</el-button>
    </el-form-item>
  </el-form>

  <!-- 用户列表 -->
  <el-table v-loading="loading" :data="users" style="width: 100%; margin-bottom: 20px;">
    <el-table-column prop="id" label="ID" width="80" />
    <el-table-column prop="name" label="用户名" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="gender" label="性别" />
    <el-table-column prop="age" label="年龄" />
    <el-table-column prop="address" label="地址" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="text" @click="handleEdit(scope.$index)">编辑</el-button>
        <el-button type="text" @click="handleDelete(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" :current-page="page"
    @current-change="handlePageChange" />
  <!-- 添加或修改菜单对话框 -->
  <EditDialog ref="editDialogRef" @refresh-data="queryusers"></EditDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import userinfoService from "@/api/userinfoService";
import { type UserInfo } from "@/api/userinfoService";
import type { PageResult } from '@/utils/request'
import EditDialog from "./edit.vue";
import { ElMessage } from "element-plus";

// ref 元素
const editDialogRef = ref();
// 分页相关
const page = ref(1);
const pageSize = 10;
const total = ref(0);
const loading = ref(true)
// 查询条件
const query = ref({
  username: "",
});
/** 新增按钮操作 */
function handleAdd() {

  editDialogRef.value.show({ action: "add" });
}
// 模拟用户数据
const users = ref<UserInfo[]>([]);

// 编辑用户
const editUser = ref<UserInfo | null>(null);

// 编辑用户
const handleEdit = (index: number) => {
  editUser.value = users.value[index];
  //弹出编辑界面
  editDialogRef.value.show({ action: "edit", userId: editUser.value.id });
};

// 删除用户
const handleDelete = (index: number) => {
  const id = users.value[index].id;
  userinfoService.deleteUserInfo(id)
    .then(() => {
      queryusers();
    });
};

const queryusers = function () {
  loading.value = true;
  userinfoService.listUserInfo(page.value, pageSize)
    .then((res: PageResult<UserInfo[]>) => {
      loading.value = false;
      users.value = res.data;
      total.value = res.meta.total;
    }).finally(() => {
      loading.value = false;

    });
}
queryusers();






// 查询
function handleQuery() {
  page.value = 1;
}

// 重置
function resetQuery() {
  query.value.username = "";
  page.value = 1;
}

// 分页切换
function handlePageChange(val: number) {
  page.value = val;
  queryusers();
}


</script>

<style scoped>
.demo-form-inline .el-form-item {
  margin-right: 16px;
}
</style>
