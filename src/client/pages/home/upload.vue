

<template>
  <el-dialog v-model="props.dialogTableVisible" title="服务上传" @close="handleClose">
    <div>
      <!-- <el-input v-model="state.data.port" /> -->
      <el-select v-model="state.data.port" class="select" placeholder="设置端口号" size="small">
        <el-option v-for="item in options" :key="item" :label="item" :value="item" />
      </el-select>
      <el-input v-model="textarea" :rows="5" type="textarea" placeholder="添加描述信息" />
      <el-upload class="upload-demo" action="/api/cloud/server_upload" multiple :on-success="handle_success"
        :data="state.data" :before-upload="before_upload" ref="uploadRef" :auto-upload="false">
        <el-icon class="el-icon--upload">
          <upload-filled class="el-icon--upload" />
        </el-icon>
      </el-upload>
      <div class="flex">
        Drop file here or <em>click to upload</em>
      </div>
      <div class="flex">
        jpg/png files with a size less than 500kb
      </div>
      <div class="flex">
        <el-button class="flex" type="success" @click="submitUpload">
          upload to server
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { UploadInstance, UploadRawFile } from 'element-plus'
import { reactive } from 'vue';
import { ref } from 'vue'

const props = defineProps<{
  readonly dialogTableVisible: boolean
}>()

const emits = defineEmits(["handleClose"])
const textarea = ref('')

const state = reactive({
  data: {
    desc: "",
    port: ''
  },
})


function handle_success(res: any) {
  console.log('文件上传成功');
  console.log('res', res);
}
function before_upload(rawFile: UploadRawFile) {
  console.log(rawFile);
  state.data.desc = textarea.value
}
const uploadRef = ref<UploadInstance>()

const submitUpload = () => {
  uploadRef.value!.submit()
}

function handleClose() {
  emits("handleClose")
}
const options = [3004, 3005, 3006, 3007, 3008, 3009, 3010]
</script>
<style scoped lang="less">
.select {
  width: 100%;
  margin-bottom: 20px;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

.upload-demo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;

  .el-icon--upload {
    width: 100%;
    height: 100px;
  }
}
</style>
