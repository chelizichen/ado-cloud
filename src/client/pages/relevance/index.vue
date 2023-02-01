<template>
  <div class="head">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div>数据库配置</div>
          <div>DataBaseConfig</div>
        </div>
      </template>
      <div v-if="( state.database instanceof Array)">
        <div v-for="item in state.database">
          <div>数据库种类：{{ item.type }}</div>
          <div>数据库主机：{{ item.host }}</div>
          <div>数据库端口号：{{ item.port }}</div>
          <div>数据库用户名：{{ item.username }}</div>
          <div>数据库密码：{{ item.password }}</div>
          <div>最大连接数：{{ item.connectionLimit }}</div>
        </div>
      </div>
      <div>数据库种类：{{ state.database.type }}</div>
      <div>数据库主机：{{ state.database.host }}</div>
      <div>数据库端口号：{{ state.database.port }}</div>
      <div>数据库用户名：{{ state.database.username }}</div>
      <div>数据库密码：{{ state.database.password }}</div>
      <div>数据库：{{ state.database.database }}</div>
      <div>最大连接数：{{ state.database.connectionLimit }}</div>

    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div>微服务配置</div>
          <div>MicroServiceConfig</div>
        </div>
      </template>
      <div>服务端口：{{ state.microService.host }}</div>
      <div>服务主机：{{ state.microService.port }}</div>
      <div>服务描述：{{ state.microService.desc }}</div>
    </el-card>
  </div>
  <div class="content">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div>微服务接口</div>
        </div>
      </template>
      <div v-for="item in state.contents" class="contents">
        <div>** 客户端接口地址：{{ item.interFace.client.controller }} **</div>
        <div>服务接口名：{{ item.interFace.name  }}</div>
        <div>服务远端地址：{{ item.interFace.remote }}</div>
        <div>服务描述：{{ item.interFace.description }}</div>
        <div v-for="(method,key) in item.method">
          <div>{{ key }} {{ method }}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { get_micro_service } from '@/api/server';
import { reactive, onBeforeMount} from 'vue';
import { useRoute, useRouter } from 'vue-router';
const [route, router] = [useRoute(), useRouter()]

const state = reactive({
  database: {} as any,
  contents: [] as any[],
  microService: {} as any,
  server_name:""
})

async function getMicroService() {
  const { server_name } = route.query;
  state.server_name = server_name as string
  if (server_name && typeof server_name == "string") {
    const data = await get_micro_service({ server_name });
    state.database = data.data.config.database;
    state.microService = data.data.config.microService;
    state.contents = data.data.contents;

    console.log('microService', state.microService);
    console.log('contents', state.contents);
    console.log('database', state.database);
    
  }
}


onBeforeMount(async () => {
  await getMicroService()
})
</script>

<style scoped lang="less">
.flex_s_b{
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
}
.flex_c_b{
    display: flex;
  align-items: center;
  justify-content: space-between;
}
.head{
  .flex_s_b();
  .card-header{
    .flex_c_b();
  }
  .box-card {
    width: 50%;
  }
}
.content{
  width: 100%;
.contents {
    margin: 20px;
  }
}
</style>