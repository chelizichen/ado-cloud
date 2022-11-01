<template>
  <div>
    <div class="flex">
      <Servers :stats_list="state.stats_list" :file_list="state.file_list" :exist_list="state.exist_list"
        @load-server="loadServer"></Servers>
      <Status :exist_list="state.exist_list" :port_list="state.port_list"></Status>
    </div>
  </div>
</template>

<script setup lang="ts">

import Servers from './servers.vue'
import Status from './status.vue'
import { file_list, port_list, stats_restart, stats_servername, stats_shutdown } from '@/api/cloud';
import { onMounted, onUpdated, reactive } from 'vue';

const state = reactive({
  stats_list: <any>[],
  file_list: <any>[],
  exist_list: <any[]>[],
  port_list: <any>[]
})

async function getServerAliveList() {
  const f_data = await file_list();
  state.file_list = f_data.data.ls
  state.exist_list = await state.file_list.map(async el => {
    const data = await stats_servername({ serverName: el })
    return {
      data,
      serverName: el
    }
  })
  state.exist_list = await Promise.all(state.exist_list)
}


async function loadServer(item: any) {
  const { serverName, data: { alive } } = item
  if (alive) {
    await stats_restart({ serverName })
  } else {
    await stats_shutdown({ serverName })
  }
  getServerAliveList()
}

async function getPortlist() {
  const data = await port_list()
  state.port_list = Object.entries(data.data).map(el => {
    const key = el[0]
    const port = el[1]
    return {
      key, port
    }
  })
  console.log(state.port_list);

}


onMounted(async () => {
  await getServerAliveList()
  await getPortlist()
})

onUpdated(() => {
  console.log("状态更新了");
})
</script>

<style scoped>
.flex {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
</style>