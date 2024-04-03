<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button type="button" @click="count++">count is {{ count }}</button>
  <p class="bar mr-2">Bar Component</p>
</template>

<style scoped>
.bar {
  color: red;
}
</style>
