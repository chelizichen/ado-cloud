<template>
  <div>
    当前位置:{{ codeStore.currEnity }}{{ activeName == "Enity" ? "" : activeName }}
  </div>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="Enity" name="Enity">
      <JavaEnity></JavaEnity>
    </el-tab-pane>
    <el-tab-pane label="Controller" name="Controller">
      <JavaController></JavaController>
    </el-tab-pane>
    <el-tab-pane label="Service" name="Service">Service</el-tab-pane>
    <el-tab-pane label="Mapper" name="Mapper">Mapper</el-tab-pane>
    <el-tab-pane label="MyBatis" name="MyBatis">MyBatis</el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import JavaController from './java/controller.vue'
import JavaEnity from './java/enity.vue'
import store from '@/store'
const { codeStore } = store
const activeName = ref('Enity')


const handleClick = (tab: TabsPaneContext, event: Event) => {
  const { label } = tab.props

}
</script>
<style>
.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>