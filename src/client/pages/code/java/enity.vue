<template>
  <div class="layout">
    <div class="left">
      <el-form :model="form" label-width="120px">
        <el-form-item label="注解(装饰器)">
          <el-select v-model="form.decorators" multiple placeholder="Select" style="width: 240px">
            <el-option v-for="item in defaultDecorators" :key="item.value" :label="item.value" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="实体类名">
          <el-input v-model="form.EnityName" style="width:50%" />
        </el-form-item>

        <el-form-item v-for="item, index in form.filed" label="字段" :key="index">
          <el-select v-model="item.type" class="m-2" placeholder="Select">
            <el-option v-for="key in options" :key="key.value" :label="key.value" :value="key.value" />
          </el-select>
          <el-input v-model="item.name" style="width:50%" />
        </el-form-item>
        <el-form-item label="增加字段">
          <el-button type="primary" @click="addFields">ADD FIELDS</el-button>
        </el-form-item>

        <!-- <el-form-item label="方法体">
          <el-input v-model="form.body" type="textarea" :rows="10" style="width:50%" />
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">生成</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <code v-if="!code.body.length">{{ code.temp }}</code>
      <div class="java code" v-for="(item) in code.decorator">{{ item }}</div>
      <div class="code">{{ code.head }}</div>
      <div v-if="code.body.length" class="java code">{</div>
      <div class="java code" v-for="(item) in code.body">{{ item }}</div>
      <div v-if="code.body.length" class="java code">}</div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { reactive } from 'vue';
import store from '@/store'
const { codeStore } = store
const options = [{
  value: 'String',
},
{
  value: 'Integer',
},
{
  value: "Date"
}]
const defaultDecorators = [
  {
    value: '@Data',
  },
  {
    value: '@AllArgsConstructor',
  },
  {
    value: '@NoArgsConstructor',
  },
]

const defaultFileds = [{
  name: "",
  type: "String"
}, {
  name: "",
  type: "String"
}]

const form = reactive({
  EnityName: '',
  filed: defaultFileds,
  decorators: []
})

const code = reactive({
  decorator: [],
  head: "",
  body: [] as string[],
  temp: "generate Enity!"
})


/**
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HotKeyWords {
    public Integer id;
    public String text;
    public String thekeys;
    public String href;
    public Date createTime;
}
*/
/**
 * 获取注解
 */
function getDecorator() {
  code.decorator = form.decorators
}
/**
 * 获取头部
 */
function getHead() {
  code.head = `public class ` + form.EnityName
}

/**
 * 获取方法体
 */
function getBody() {
  code.body = form.filed.map((el) => {
    let tempStr = `public ${el.type} ${el.name};`
    return tempStr
  })
}

const onSubmit = () => {
  getDecorator()
  getHead()
  getBody()
  codeStore.setEnity(form.EnityName)
}

const addFields = () => {
  form.filed.push({ name: "", type: "String" })
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