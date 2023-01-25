<template>
  <div>
    <div>服务名称：{{ state.server_name }}</div>
    <div>服务端口：{{ state.port }}</div>
    <div v-trim>服务地址：{{ state.public_path }}/{{ state.server_name }}</div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const state = reactive({
  server_name: "",
  port: "",
  public_path:""
})

const [route, router] = [useRoute(), useRouter()]
onMounted(() => {
  console.log(route.query);
  
  const { server_name, public_path, port } = route.query;
  state.server_name = server_name as string;
  state.port = port as string;
  state.public_path = public_path as string;
})
</script>

<style scoped>

</style>