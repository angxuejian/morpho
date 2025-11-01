<script setup lang="ts">
import { NCard, NButton } from 'naive-ui'
import { computed, inject } from 'vue'
import type { FormArrayItemFn, FormCheckArrayLength } from '@/hooks/use-form-wrapper'

interface Props {
  title?: string
  path?: string
}
type useFormWrapperFn = {
  addFormArrayItem: FormArrayItemFn
  removeFormArrayItem: FormArrayItemFn
  checkFormArrayLength: FormCheckArrayLength
}

const props = defineProps<Props>()
const useFormWrapper = inject<useFormWrapperFn>('useFormWrapper')

const removeDisabled = computed(() => {
  if (props.path) {
    const length = useFormWrapper?.checkFormArrayLength(props.path) || 0
    return length <= 1
  } else {
    return true
  }
})

const add = () => {
  if (props.path) {
    useFormWrapper?.addFormArrayItem(props.path)
  } else {
    console.log('list-wrapper component ::: add props.path', !!props.path, props.path)
  }
}

const remove = () => {
  if (props.path) {
    useFormWrapper?.removeFormArrayItem(props.path)
  } else {
    console.log('list-wrapper component ::: remove props.path', !!props.path, props.path)
  }
}
</script>

<template>
  <NCard :title="props.title">
    <p class="flex justify-end mb-3">
      <NButton @click="add" ghost type="primary">Add Item</NButton>
      <NButton @click="remove" :disabled="removeDisabled" ghost class="ml-4" type="error"
        >Remove Item</NButton
      >
    </p>

    <p>
      <slot />
    </p>
  </NCard>
</template>
