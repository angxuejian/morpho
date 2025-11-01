<script lang="ts" setup>
import { provide, ref, type Ref } from 'vue'
import { NButton } from 'naive-ui'
import formWrapper from '@/components/form-wrapper.vue'
import showItem from './show-item.vue'
import type { FormItem } from '@/types/form'
import { useFormWrapper } from '@/hooks/use-form-wrapper'

interface Props {
  list: FormItem[]
}

const props = defineProps<Props>()
const formRef: Ref = ref()

const { formValue, formRules, addFormArrayItem, removeFormArrayItem, checkFormArrayLength } =
  useFormWrapper(props.list)

const submit = () => {
  console.log(formValue)
  formRef.value.validate()
}

const reset = () => {
  formRef.value.clearValidate()
}

provide('useFormWrapper', { addFormArrayItem, removeFormArrayItem, checkFormArrayLength })
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <div class="flex-1 overflow-y-auto">
      <form-wrapper ref="formRef" :model="formValue" :rules="formRules">
      <show-item v-model:formValue="formValue" :items="props.list" />
    </form-wrapper>
    </div>

    <div class="py-4 bg-[#fff] flex justify-end px-5">
      <NButton @click="submit" class="mr-5" type="primary">submit</NButton>
      <NButton @click="reset" type="error">reset</NButton>
    </div>
  </div>
</template>
