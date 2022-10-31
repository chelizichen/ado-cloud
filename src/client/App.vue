<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { ElUpload, UploadRawFile } from 'element-plus'
import { reactive, onMounted } from 'vue';
import { list } from './api/cloud';

const that = reactive({
  server_list: []
})
onMounted(() => {
  getList()
})
async function getList() {
  const data = await list()
  that.server_list = data.data.ls
}
function handle_success(res: any) {
  console.log('文件上传成功');
  console.log('res', res);
}
function before_upload(rawFile: UploadRawFile) {
  console.log(rawFile);

}
</script>

<template>
  <div>
    <div v-for="item in that.server_list " :key="item" class="server_item">{{ item }}</div>
    <el-upload class="upload-demo" drag action="/api/cloud/upload" multiple :on-success="handle_success"
      :before-upload="before_upload">
      <el-icon class="el-icon--upload">
        <upload-filled />
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

<style scoped>

</style>
