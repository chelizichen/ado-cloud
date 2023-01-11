<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>服务总状态</span>
        <el-button class="button" text @click="changeVs">上传服务</el-button>
      </div>
    </template>
    <div class="card-header">
      <!-- <StatusCharts :exist_list="state.exist_list"></StatusCharts> -->
      <div style="width: 100%;">
        <div v-for="(item,index) in state.server_list" style="width:100%">
          <div class="item">
            <div>
              {{ index+1 }} : {{ item.server }}
            </div>
            <div @click="to_port(item.port.server.port)" class="to_port">
              占用端口：{{ item.port.server.port }}
            </div>
          </div>
        </div>
        <!-- <el-timeline>
          <el-timeline-item v-for="(item, index) in state.server_list" :key="index" :timestamp="item.port">
            {{ item.key }}
          </el-timeline-item>
        </el-timeline> -->
      </div>
    </div>
    <Upload :dialog-table-visible="state.dialogVs" @handle-close="handleClose"></Upload>
  </el-card>

</template>
<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import Upload from '@/components/upload/index.vue'
import {test,list} from '@/api/cloud'
// import StatusCharts from '@/components/echarts/status.vue'

type _state = {
  dialogVs:boolean;
  server_list:any[]
}

const state:_state = reactive({
  dialogVs: false,
  server_list:[]
})

onMounted(async () => {
  test()
  const data = await list()
  state.server_list = data.data
  console.log('data',data);
  
})

function changeVs() {
  state.dialogVs = !state.dialogVs
}

function handleClose() {
  state.dialogVs = false
}

function to_port(port:string){
  window.open("http://localhost:"+port)
}


</script>
<style lang="less" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .to_port{
      cursor: pointer;
    }
  }
}

.text {
  font-size: 14px;
}

.box-card {
  width: 49%;
}
</style>
