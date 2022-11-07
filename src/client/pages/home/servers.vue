<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>服务列表</span>
        <el-button class="button" text>过滤</el-button>
      </div>
    </template>
    <div v-for="item in state.exist_list " :key="item" class="server_item">
      <div class="flex margin">
        <div class="server_name" @click="toLog(item.serverName)">{{ item.serverName }}</div>
        <el-switch v-model="item.data.alive" @change='emit("loadServer", item)' />
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ElCard, ElButton, ElSwitch } from 'element-plus';
import { onMounted, onUpdated, reactive, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';



const props = defineProps<{
  stats_list: Array<any>,
  file_list: Array<any>,
  exist_list: Array<any>
}>()
const state = reactive({
  dialogVs: false,
  exist_list: [] as any[]
})
const router = useRouter();

watch(props, async (newVal) => {
  state.exist_list = await Promise.all(newVal.exist_list)
})
const emit = defineEmits(["loadServer"])

function toLog(serverName: string) {
  router.push(`/log/${serverName}`)
}

onUpdated(() => {
  console.log("父组件状态更新");
})


onMounted(() => {
})
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box-card {
  width: 49%;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.magin {
  margin: 5px;
}

.server_name {
  font-size: 20px;
  color: darkblue;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  cursor: pointer;
}
</style>