<script lang="ts" setup>
import { ref, type Ref } from 'vue'
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

const { formValue, formRules } = useFormWrapper(props.list)

// setTimeout(() => {
//   Object.assign(formValue, {
//     list: [
//       { teacher: null, test: [ { input: {a: null, b: null } }, { input: {a: null, b: null} }] },
//       { teacher: null, test: [ { input: {a: null, b: null } }, { input: {a: null, b: null} }] },

//       // { teacher: null }
//     ]
//   })

//   Object.assign(formRules, {
//     'list[0].teacher': { required: true },
//     "list[0].test[0].input.a": { required: true, message: '123' },
//     "list[0].test[1].input.a": { required: true },
//     "list[0].test[0].input.b": { required: true },
//     "list[0].test[1].input.b": { required: true },
//     // 'list[0].teacher': { required: true },
//     // 'list[1].teacher': { required: true }
//   })
// }, 5000);

const submit = () => {
  console.log(formValue)
  formRef.value.validate()
}

const reset = () => {
  formRef.value.clearValidate()
}
</script>

<template>
  <div>
    <form-wrapper ref="formRef" :model="formValue" :rules="formRules">
      <show-item v-model:formValue="formValue" :items="props.list" />
    </form-wrapper>

    <div class="mt-10 flex justify-end px-5">
      <NButton @click="submit" class="mr-5" type="primary">submit</NButton>
      <NButton @click="reset" type="error">reset</NButton>
    </div>
  </div>
</template>
