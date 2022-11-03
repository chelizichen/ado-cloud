<template>
  <div class="flex">
    <Menu></Menu>
    <Manage></Manage>
  </div>
</template>

<script setup lang="ts">
import Manage from './manage.vue'
import Menu from './menu.vue'
</script>

<style scoped>
.flex {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
</style>