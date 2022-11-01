<template>
  <div>
    <div v-for="item in state.stats_list " :key="item" class="server_item">{{ item }}</div>
    <Upload></Upload>
  </div>
</template>

<script setup lang="ts">
import { file_list, stats_list, stats_restart, stats_servername } from '@/api/cloud';
import { reactive, onMounted } from 'vue';
import Upload from './upload.vue'
const state = reactive({
  stats_list: <Record<string, any>>[],
  file_list: [],
  exist_list: <any[]>[]
})

async function getRedisList() {
  const f_data = await file_list();
  state.file_list = f_data.data.ls
  state.file_list.forEach(async el => {
    const data = await stats_servername({ serverName: el })
    // @ts-ignore
    if (!data.alive) {
      // 重启
      stats_restart({ serverName: el })
    }
  })

  // const data = await stats_list() as Record<string, any>
  // for (let v in data.data) {
  //   const s_data = await stats_servername({ serverName: v, pid: data[v] })
  //   state.stats_list.push(s_data.data)
  // }
}




onMounted(() => {
  getRedisList()
})
</script>

<style scoped>

</style>