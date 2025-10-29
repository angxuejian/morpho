<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { NButton } from 'naive-ui'
import formWrapper from '@/components/form-wrapper.vue'
import showItem from './show-item.vue'
import type { FormItem } from '@/types/form'

interface Props {
  list: FormItem[]
}

const props = defineProps<Props>()
const formRef: Ref = ref()
const formValue = ref<Record<string, any>>({
  user: null,
  obj: {},
  aobj: {},
  card: {}
})

const rules = ref({
  user: {
    required: true
  }
})

const submit = () => {
  console.log(formValue.value)
  formRef.value.validate()
}

const reset = () => {
  formRef.value.clearValidate()
}
</script>

<template>
  <div>
    <form-wrapper ref="formRef" :model="formValue" :rules="rules">
      <show-item v-model:formValue="formValue" :items="props.list" />
    </form-wrapper>

    <div class="mt-10 flex justify-end px-5">
      <NButton @click="submit" class="mr-5" type="primary">submit</NButton>
      <NButton @click="reset" type="error">reset</NButton>
    </div>
  </div>
</template>
