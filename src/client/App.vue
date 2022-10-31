<template>
  <div>
    <el-container>

      <el-main>
        <Header></Header>
        <router-view></router-view>
        <Footer></Footer>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/header/index.vue'
import Footer from '@/components/footer/index.vue'

</script>

<style lang="scss" scoped>

</style>