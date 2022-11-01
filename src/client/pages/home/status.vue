<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>服务总状态</span>
        <el-button class="button" text @click="changeVs">上传服务</el-button>
      </div>
    </template>
    <div class="card-header">
      <StatusCharts :exist_list="state.exist_list"></StatusCharts>
      <div style="width: 50%;">
        <el-timeline>
          <el-timeline-item v-for="(item, index) in props.port_list" :key="index" :timestamp="item.port">
            {{ item.key }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
    <Upload :dialog-table-visible="state.dialogVs" @handle-close="handleClose"></Upload>
  </el-card>

</template>
<script setup lang="ts">
import { reactive, onMounted, watch } from 'vue';
import Upload from './upload.vue'
import StatusCharts from '@/components/echarts/status.vue'

const props = defineProps<{
  exist_list: Array<any>,
  port_list: Array<any>
}>()
const state = reactive({
  dialogVs: false,
  exist_list: [] as any[]
})
watch(props, async (newVal) => {
  state.exist_list = await Promise.all(newVal.exist_list)
})

onMounted(() => {

})

function changeVs() {
  state.dialogVs = !state.dialogVs
}

function handleClose() {
  state.dialogVs = false
}


</script>
<style>
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
  width: 49%;
}
</style>
