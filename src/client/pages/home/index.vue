<template>
  <div>
    <div v-for="item in state.stats_list " :key="item" class="server_item">{{ item }}</div>
    <Upload></Upload>
  </div>
</template>

<script setup lang="ts">
import { stats_list, stats_servername } from '@/api/cloud';
import { reactive, onMounted } from 'vue';
import Upload from './upload.vue'
const state = reactive({
  stats_list: <Record<string, any>>[],
})

async function getList() {
  const data = await stats_list() as Record<string, any>

  for (let v in data.data) {
    const s_data = await stats_servername({ serverName: v, pid: data[v] })
    state.stats_list.push(s_data.data)
  }
  console.log(state.stats_list);


}

onMounted(() => {
  getList()
})
</script>

<style scoped>

</style>