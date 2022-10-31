<template>
  <div>
    <div v-for="item in state.file_list " :key="item" class="server_item">{{ item }}</div>
    <Upload></Upload>
  </div>
</template>

<script setup lang="ts">
import { file_list } from '@/api/cloud';
import { reactive, onMounted } from 'vue';
import Upload from './upload.vue'
const state = reactive({
  file_list: [],
})

async function getList() {
  const data = await file_list()
  state.file_list = data.data.ls
}

onMounted(() => {
  getList()
})
</script>

<style scoped>

</style>