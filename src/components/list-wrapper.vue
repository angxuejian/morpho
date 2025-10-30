<script setup lang="ts">
import { NCard, NButton } from 'naive-ui'

interface Props {
  title: string
  path?: string[] | string
}
const props = defineProps<Props>()

const add = () => {
  console.log(props.path)
}
</script>

<template>
  <NCard :title="props.title">
    <p class="flex justify-end mb-3">
      <NButton @click="add" ghost type="primary">Add Item</NButton>
      <NButton ghost class="ml-4" type="error">Remove Item</NButton>
    </p>

    <p>
      <slot />
    </p>
  </NCard>
</template>
