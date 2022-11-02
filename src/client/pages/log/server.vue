<template>
  <div>
    <div>相关输出</div>
    <div class="content">{{ state.log_data }}</div>
  </div>
</template>

<script setup lang="ts">
import { log_serverName } from '@/api/cloud';
import { watch, reactive } from 'vue';
import { useRoute } from 'vue-router';

const state = reactive({
  log_data: ""
})

const route = useRoute()

watch(route, async (newVal) => {
  console.log('watch', newVal.params);
  log_serverName({ serverName: newVal.params.serverName }).then(res => {
    state.log_data = res.data
    console.log(res.data);

  })
}, {
  immediate: true
})
</script>

<style scoped>
.content {
  white-space: pre-line;
}
</style>