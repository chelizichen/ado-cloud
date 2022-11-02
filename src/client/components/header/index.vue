<template>
  <el-header class="el-header">
    <div class="flex">
      <div class="flex" @click="router.push(`/home`)">
        <div style="width: 50px;height:50px;margin-right:20px">
          <img :src="Logo" class="logo" />
        </div>
        <div class="cumulus">Cumulus</div>

        <div class="cumulus">@Ado/Cloud</div>

      </div>

      <div>
        <el-menu mode="horizontal" :ellipsis="false">
          <el-menu-item index="1">服务</el-menu-item>
          <el-menu-item index="2">状态</el-menu-item>
          <el-menu-item index="3">管理</el-menu-item>
        </el-menu>
      </div>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import Logo from '@/assets/cumulus.jpeg'
import { useRouter } from 'vue-router';
const router = useRouter()
</script>

<style scoped lang="less">
.el-header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  z-index: 999;
  border-bottom: 2px dashed rgb(231, 231, 242);
  background-color: white;

  .flex {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .cumulus {
      font-size: 25px;
      font-weight: 700;
      font-style: oblique;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
      color: #007979;
      margin: 0 10px;
    }
  }

  .logo {
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
}
</style>