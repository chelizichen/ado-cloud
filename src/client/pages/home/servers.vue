<template>
  <div>
    <div v-for="item in state.exist_list " :key="item" class="server_item">
      <div>{{ item.serverName }}</div>
      <el-switch v-model="item.data.alive" @change="loadServer(item)" />

    </div>

  </div>
</template>

<script setup lang="ts">
import { file_list, stats_restart, stats_servername, stats_shutdown } from '@/api/cloud';
import { reactive, onMounted } from 'vue';
const state = reactive({
  stats_list: <Record<string, any>>[],
  file_list: [],
  exist_list: <any[]>[]
})

async function getServerAliveList() {
  const f_data = await file_list();
  state.file_list = f_data.data.ls
  state.file_list.forEach(async el => {
    const data = await stats_servername({ serverName: el })
    state.exist_list.push({
      data,
      serverName: el
    })
    // @ts-ignore
    // if (!data.alive) {
    //   // 重启
    //   stats_restart({ serverName: el })
    // }
  })
}

async function loadServer(item: any) {
  const { serverName, data: { alive } } = item
  if (alive) {
    stats_restart({ serverName })
  } else {
    stats_shutdown({ serverName })
  }
}


onMounted(() => {
  getServerAliveList()
})
</script>

<style scoped>

</style>