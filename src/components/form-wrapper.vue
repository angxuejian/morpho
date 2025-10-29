<script lang="ts" setup>
import { NForm } from 'naive-ui'
import type { FormInst } from 'naive-ui'
import { ref } from 'vue'

const formRef = ref<FormInst | null>(null)
const props = defineProps()

const validate = () => {
  return new Promise((resolve, reject) => {
    formRef.value?.validate((err) => {
      if (!err) {
        resolve(true)
      } else {
        const firstErrorField = err[0][0].field
        const el = document.querySelector(`[data-field="${firstErrorField}"]`)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
        reject(false)
      }
    })
  })
}

const clearValidate = () => {
  formRef.value?.restoreValidation()
}

defineExpose({ validate, clearValidate })
</script>

<template>
  <NForm ref="formRef" v-bind="props">
    <slot />
  </NForm>
</template>
