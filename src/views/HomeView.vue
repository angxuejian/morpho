<script setup lang="ts">
import { NInput } from 'naive-ui'
import { onMounted } from 'vue'

onMounted(async () => {})

const handler = async () => {
  try {
    const res = await fetch('/api/users')
    const data = await res.json()
    console.log('✅ Mock data:', data)
  } catch (err) {
    console.error('Fetch failed:', err)
  }
}
</script>

<template>
  <main class="bg-[red] w-[500px] h-[500px]">
    <NInput />

    <button @click="handler">click</button>
  </main>
</template>
