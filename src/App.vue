<script setup lang="ts">
import { RouterView } from 'vue-router'
import { NConfigProvider } from 'naive-ui';
</script>

<template>
  <NConfigProvider>
      <RouterView />
  </NConfigProvider>
</template>


<style>
@import "tailwindcss" important;
</style>
