<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
          </el-breadcrumb>
        </span>
        <el-button class="button" text>刷新</el-button>
      </div>
    </template>
    <router-view></router-view>
  </el-card>
</template>

<script setup lang="ts">
import { server_list_db } from '@/api/cloud';
import { onMounted } from 'vue';

onMounted(async () => {
  const data = await server_list_db()
  console.log(data);
})
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 80%;
}
</style>