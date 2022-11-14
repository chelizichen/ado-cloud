<template>
  <div class="layout">
    <div class="left">
      <el-form :model="form" label-width="120px">
        <el-form-item label="方法名">
          <el-input v-model="form.methodName" style="width:50%" />
        </el-form-item>
        <!-- <el-form-item label="方法属性">
          <el-select v-model="form.attr" placeholder="请设置属性">
            <el-option label="私有" value="private" />
            <el-option label="公有" value="public" />
          </el-select>
        </el-form-item> -->
        <el-form-item label="是否为共有">
          <el-switch v-model="form.isPublic" />
        </el-form-item>

        <!-- <el-form-item label="返回值">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="String" name="type" />
            <el-checkbox label="Integer" name="type" />
            <el-checkbox label="List" name="type" />
            <el-checkbox label="Map" name="type" />
            <el-checkbox label="void" name="type" />
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="泛型">
          <el-input v-model="form.generics" style="width:20%" />
        </el-form-item> -->

        <!-- <el-form-item label="Resources">
              <el-radio-group v-model="form.resource">
                <el-radio label="Sponsor" />
                <el-radio label="Venue" />
              </el-radio-group>
            </el-form-item> -->
        <el-form-item label="方法体">
          <el-input v-model="form.body" type="textarea" :rows="10" style="width:50%" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">生成</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <code v-if="!codeBodyArray.length">{{ codeRef }}</code>
      <div class="code">{{ form.head }}</div>
      <div class="java code" v-for="(item) in codeBodyArray">{{ item }}</div>
      <div v-if="codeBodyArray.length">}</div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { reactive, ref } from 'vue';
import store from '@/store'
const { codeStore } = store
/**
 * [@Decorator](Args)
 * [PerMission] [Type] [MethodName](Args){
 *  Body
 * }
 */

// do not use same name with ref
const form = reactive({
  methodName: '',
  isPublic: true,
  type: "",
  body: '',
  head: ""
})


const codeBodyArray = ref<string[]>([])

const codeRef = ref("generate code!");

/**
 * 通过 ; 符号进行分组
 */

/**
List<User> list = UserService.getList();
return list;
 */

function getAllCode() {
  let _arr = form.body.split(";")
  _arr.pop()
  _arr = _arr.map(el => {
    return el + ";"
  })
  codeBodyArray.value = _arr
  // return _arr as string[]
}

function getType() {

  const ret = codeBodyArray.value[codeBodyArray.value.length - 1];
  const reg = /return (.*);/
  const getArgByReg = ret.match(reg);
  let arg = "" // get return xxx;

  console.log(getArgByReg);

  if (getArgByReg) {
    arg = getArgByReg[1]
  }

  // 找到返回值的类型
  const getTypeReg = RegExp("(.*)" + arg)

  // @ts-ignore
  const ReturnType = codeBodyArray.value.map(el => {
    let TypeReg = el.match(getTypeReg)
    return TypeReg
  })[0][1].trim()

  // @ts-ignore
  form.type = ReturnType as string
}

function getHeadCode() {
  if (form.isPublic) {
    form.head = `public ${form.type} ${form.methodName} (){`
  }
}

const onSubmit = () => {
  getAllCode()
  getType()
  getHeadCode()

}

</script>

<style scoped lang="less">
.layout {
  width: 100%;
  display: flex;
  // align-items: center;
  justify-content: center;

  .left {
    width: 70%;
  }

  .right {
    width: 30%;

    .java {
      margin-top: 10px;
    }

    .code {
      font-size: 18px;
    }
  }
}
</style>