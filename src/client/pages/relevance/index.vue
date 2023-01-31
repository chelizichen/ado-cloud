<template>
    <div>
        <el-card class="box-card">
        <template #header>
            <div class="card-header">
            <div>服务名称：{{ state.server_name }}</div>
            <el-switch 
            v-model="state.port_status" 
            class="mb-2"
            active-text="开启" 
            inactive-text="关闭"
             />
            </div>
        </template>
        <div>服务主机：{{ state.host }}</div>
        <div>服务端口：{{ state.port }}</div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const [route,router] = [useRoute(),useRouter()]

const state = reactive({
  server_name: "",
  port: "",
  host:"",
  public_path: "",
  desc:"",
  port_status: false
})


onMounted(() => {
    console.log(route.query);
    const {host,port} = route.query;
    state.port = port as string;
    state.host = host as string;
})
</script>

<style scoped lang="less">
.box-card {
  width: 49%;
}
</style>