<template>
  <el-dialog v-model="props.dialogTableVisible" title="服务上传" @close="handleClose">
    <div>
      <el-input v-model="app_desc" :rows="1" type="textarea" placeholder="请输入App名称" />
      <el-form-item label="请选择版本">
        <el-select v-model="V1" clearable placeholder="Select">
          <el-option v-for="item in v1" :key="item" :label="item" :value="item" />
        </el-select>
        <el-select v-model="V2" clearable placeholder="Select">
          <el-option v-for="item in v2" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-input v-model="textarea" :rows="5" type="textarea" placeholder="添加描述信息" />
      <el-upload class="upload-demo" action="/api/cloud/upload" multiple :on-success="handle_success"
        :data="state.data" :before-upload="before_upload" ref="uploadRef" :auto-upload="false">
        <el-icon class="el-icon--upload">
          <upload-filled class="el-icon--upload" />
        </el-icon>
      </el-upload>
      <div class="flex">
        点击上传
      </div>
      <div class="flex">
        适用于 基于 ado-node 的服务
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
import { update } from '@/api/server';
import { v1, v2 } from '@/utils/version';
import { UploadFilled } from '@element-plus/icons-vue'
import { UploadInstance, UploadRawFile } from 'element-plus'
import { reactive } from 'vue';
import { ref } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute()

const V1 = ref("")
const V2 = ref("")

const props = defineProps<{
  readonly dialogTableVisible: boolean,
  readonly is_link_service: boolean,
  readonly master_service?:Record<string,any>
}>()

const emits = defineEmits(["handleClose"])
const textarea = ref('')
const app_desc = ref('')
const state = reactive({
  data: {
    desc: "",
    name: "",
    is_link_service: props.is_link_service ? "1" : "0",
    id: null,
  },
  version: ""
})

function add_info() {
  console.log(props.master_service);
  const { id } = props.master_service as any;
  state.data.id = id 
}

function handle_success(res: any) {
  console.log('文件上传成功');
  console.log('res', res);
}
function before_upload(rawFile: UploadRawFile) {
  console.log("rawFile", rawFile);
  let file_name_tostr = rawFile.name.split("")
  state.version = V1.value+V2.value
  file_name_tostr.splice(file_name_tostr.length - 4, 0, "." + state.version)
  state.data.name = file_name_tostr.join("")
  if (props.is_link_service) {
    add_info()
  }
  state.data.desc = textarea.value
}
const uploadRef = ref<UploadInstance>()

const submitUpload = async () => {
  uploadRef.value!.submit()

  const record = {
    server_pkg: split_pkg_name(state.data.name),
    server_name: state.data.name,
    server_desc:state.data.desc,
    server_type: props.is_link_service ? "1" : "2",
    link_server_id: state.data.id,
  }

  const data = await update(record)
  console.log(data);
  
}

function split_pkg_name(name:string) {
  return name.split(".")[0]
}

function handleClose() {
  emits("handleClose")
}

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
