<script lang="ts" setup>
import { NInput, NCard } from 'naive-ui';
import { computed } from 'vue';
import type { FormItem } from '@/types/form';

interface Props {
  formItem: FormItem
}

const model = defineModel<any>('val')
const props = defineProps<Props>()

const components = {
  input: NInput,
  card: NCard,
  // select: NSelect,
  // cascader: NCascader
} as const

const isUseModelValue = computed(() => {
  const list = ['input']

  return list.includes(props.formItem.component)
})

const componentToRender = computed(() => {
  const comp = components[props.formItem.component as keyof typeof components]
  return comp ?? NInput
})
const bindProps = computed(() => {
  return props.formItem.props
})
</script>


<template>
    <component v-if="isUseModelValue" :is="componentToRender" v-model:value="model" v-bind="bindProps"></component>

    <!-- v-slots -->
    <!-- 可扩展加载多个 slots -->
    <component v-else :is="componentToRender" v-bind="bindProps">
      <slot />
    </component>
</template>
