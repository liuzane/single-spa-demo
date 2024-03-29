<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
// import HelloWorld1 from './components/HelloWorld1.vue';
import VueSvg from './assets/vue.svg';

console.log('HelloWorld1 before')
const HelloWorld1 = () => import('./components/HelloWorld1.vue');
console.log('HelloWorld1', HelloWorld1)
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img :src="VueSvg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  12345
  <HelloWorld msg="Vite + Vue" />
  =======分割线=======
  <HelloWorld1 msg="Vue + Vite" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
