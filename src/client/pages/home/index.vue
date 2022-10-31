<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { UploadRawFile } from 'element-plus'
import { reactive, onMounted } from 'vue';
import { file_list } from '@/api/cloud';
import { ref } from 'vue'
const textarea = ref('')

const state = reactive({
  file_list: [],
  data: {
    desc: "",
    port: ''
  }
})
onMounted(() => {
  getList()
})
async function getList() {
  const data = await file_list()
  state.file_list = data.data.ls
}
function handle_success(res: any) {
  console.log('文件上传成功');
  console.log('res', res);
}
function before_upload(rawFile: UploadRawFile) {
  console.log(rawFile);
  state.data.desc = textarea.value
}
</script>

<template>
  <div>
    <div v-for="item in state.file_list " :key="item" class="server_item">{{ item }}</div>
    <el-input v-model="state.data.port" />
    <el-input v-model="textarea" :rows="2" type="textarea" placeholder="Please input" />
    <el-upload class="upload-demo" drag action="/api/cloud/upload" multiple :on-success="handle_success"
      :data="state.data" :before-upload="before_upload">
      <el-icon class="el-icon--upload">
        <upload-filled class="el-icon--upload" />
      </el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500kb
        </div>
      </template>
    </el-upload>
  </div>
</template>

<style scoped lang="less">
.upload-demo {
  height: 500px;
  width: 500px;

  .el-icon--upload {
    width: 200px;
    height: 200px;
  }
}
</style>
