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
           @change="change_status" />
        </div>
      </template>
      <div>服务端口：{{ state.port }}</div>
      <div v-trim>服务地址： {{ state.public_path }}/ {{ state.server_name }}</div>
      <div>服务描述：{{ state.desc }}</div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { port_status, server_kill, server_restart } from '@/api/cloud';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const state = reactive({
  server_name: "",
  port: "",
  public_path: "",
  desc:"",
  port_status: false
})

const [route, router] = [useRoute(), useRouter()]

async function deal_params() {
  const { server_name, public_path, port,desc } = route.query;
  state.server_name = server_name as string;
  state.port = port as string;
  state.public_path = public_path as string;
  state.desc = desc as string
  const data = await port_status({ port: state.port });
  data.data == false ? state.port_status = false : state.port_status = true;
}

async function change_status() {
  if (state.port_status == true) {
    await server_restart({ server_name: state.server_name })
  } else {
    await server_kill({port:state.port})
  }
}

onMounted(() => {
  deal_params()
})

</script>

<style scoped lang="less">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>