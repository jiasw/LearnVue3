<template>
  <el-dialog v-model="open" :title="title" width="680px" append-to-body>
    <el-form ref="formRef" v-loading="loading" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio v-for="option in genderOptions" :key="option.value" :label="option.value">
            {{ option.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input-number v-model="form.age" placeholder="请输入年龄"></el-input-number>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>

      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address" placeholder="请输入地址"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="onSubmit">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { id, lo } from 'element-plus/es/locales.mjs';
import userinfoService from "@/api/userinfoService";
import { type UserInfo } from "@/api/userinfoService";

const open = ref(false);
const title = ref('编辑用户信息');
const loading = ref(false)
const formRef = ref(null)
const action = ref("add");
const form = ref({
  id: 0,
  name: '',
  gender: 0,
  age: 1,
  email: '',
  password: '',
  address: ''
})
// emit事件 #####################################################
const emit = defineEmits<{
  (event: "refreshData"): void;
}>();
// 性别选项配置
const genderOptions = ref([
  { value: 1, label: '男' },
  { value: 0, label: '女' }
])

const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', min: 0, max: 120, message: '年龄范围0-120', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
}



const onSubmit = () => {


  formRef.value.validate((valid, errors) => {
    if (valid) {
      loading.value = true
      const updateuser: UserInfo = {
        id: form.value.id,
        name: form.value.name,
        gender: form.value.gender,
        age: form.value.age,
        email: form.value.email,
        password: form.value.password,
        address: form.value.address
      }
      if (action.value === 'edit') {
        userinfoService.updateUserInfo(updateuser).then(res => {
          loading.value = false
          if (res.code === 200) {
            ElMessage.success('保存成功')
            // 这里可以添加保存逻辑
            open.value = false
            emit("refreshData");
          } else {
            ElMessage.error(res.message)
          }
        }).catch(err => {
          loading.value = false
          ElMessage.error(err.message)
        })


      } else {
        userinfoService.addUserInfo(updateuser).then(res => {
          loading.value = false
          if (res.code === 200) {
            ElMessage.success('保存成功')
            // 这里可以添加保存逻辑
            open.value = false
            emit("refreshData");
          } else {
            ElMessage.error(res.message)
          }
        }).catch(err => {
          loading.value = false
          ElMessage.error(err.message)
        })

      }
    } else {
      console.log('error', errors)
    }

  })
}

function reset() {
  form.value = {
    id: 0,
    name: '',
    gender: 0,
    age: 1,
    email: '',
    password: ''
  }
  formRef.value?.resetFields()
}



const cancel = () => {
  open.value = false
}







function show(options: { action: "add" | "edit"; userId?: number; }) {
  console.log("操作：", options.action)
  open.value = true
  reset();
  if (options.action === 'edit') {
    action.value = 'edit'
    loading.value = true;
    userinfoService.getUserInfo(options.userId).then(res => {
      form.value = res.data.data
      loading.value = false;
    })
  } else {
    action.value = 'add'
    title.value = '新增用户信息'
    loading.value = false

  }
}
defineExpose({ show });
</script>

<style scoped>
.user-edit {
  max-width: 400px;
  margin: 40px auto;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px #f0f1f2;
}
</style>
