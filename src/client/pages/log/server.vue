<template>
  <div class="console" v-loading="state.load">
    <div>
      <div class="content">{{ state.log_data }}</div>
      <br>
      <div ref="append" class="content">{{ state.append_data }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { log_serverName } from '@/api/cloud';
import { watch, reactive, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const state = reactive({
  log_data: "",
  append_data: "",
  load: true
})

const append = ref({} as HTMLDivElement)

const route = useRoute()

watch(route, async (newVal) => {
  console.log('watch', newVal.params);
  log_serverName({ serverName: newVal.params.serverName }).then(res => {
    state.log_data = res.data
    setTimeout(() => {
      state.load = false
    }, 500)
    console.log(res.data);
  })
  const socket = new WebSocket(`ws://localhost:3001/api/ws/${newVal.params.serverName}`)
  socket.onmessage = function (e) {
    // append.value.innerHTML += e.data
    // append.value.app
    console.log(e.data);

    state.append_data += e.data
  }
}, {
  immediate: true
})

onMounted(() => {
})
</script>

<style scoped>
.content {
  white-space: pre-line;
  color: aliceblue;
}

.console {
  height: auto;
  min-height: 500px;
  background-color: black;
  padding: 10px 20px;
}
</style>