<template>
  <div>
    <h1>User Info</h1>
    <p>Welcome ,{{ name }}</p>
    <button @click="LogoutFunc">Logout</button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { removeToken } from "@/utils/tokenHelper";
const name = ref("John");


const LogoutFunc = () => {
  removeToken();
  window.location.href = "/login";
  console.log("Logout");
}

</script>
