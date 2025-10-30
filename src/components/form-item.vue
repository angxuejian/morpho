<script lang="ts" setup>
import { NInput, NCard, NSelect, NCascader } from 'naive-ui'
import ListWrapper from './list-wrapper.vue'
import { computed, watch, onBeforeMount, reactive } from 'vue'
import type { FormItem } from '@/types/form'
import { useOptionsStore } from '@/stores/options'
import get from 'lodash/get'

interface Props {
  formItem: FormItem
  formItemPath?: string
}

const model = defineModel<any>('val')
const props = defineProps<Props>()
const bindProps = reactive<Record<string, any>>({})

const optionsStore = useOptionsStore()

const components = {
  input: NInput,
  card: NCard,
  select: NSelect,
  cascader: NCascader,
  list: ListWrapper
} as const

const isUseModelValue = computed(() => {
  const list = ['input', 'select', 'cascader']

  return list.includes(props.formItem.component)
})

const componentToRender = computed(() => {
  const comp = components[props.formItem.component as keyof typeof components]
  return comp ?? NInput
})

const updateBindProps = async () => {
  Object.assign(bindProps, props.formItem.props || {}, { loading: false })

  if (props.formItem.dataSource) {
    const {
      type,
      data,
      url,
      responsePath = '',
      label = 'label',
      value = 'value',
      children = 'children'
    } = props.formItem.dataSource
    if (type === 'static') {
      bindProps.options = data
    } else if (type === 'remote' && url) {
      try {
        bindProps.loading = true
        const result = await optionsStore.getOptions(url)

        // 可扩展 formatter 方法，处理想要的数据格式
        bindProps.options = get(result, responsePath, [])
      } catch (error) {
        bindProps.options = []
      } finally {
        bindProps.loading = false
      }
    }

    bindProps['label-field'] = label
    bindProps['value-field'] = value
    bindProps['children-field'] = children
  }
}

onBeforeMount(() => {
  updateBindProps()
})

watch(
  () => [props.formItem.dataSource, props.formItem.props],
  () => {
    updateBindProps()
  },
  { deep: true, immediate: true }
)
</script>

<template>
  <component
    v-if="isUseModelValue"
    :is="componentToRender"
    v-model:value="model"
    v-bind="bindProps"
  ></component>

  <!-- v-slots -->
  <!-- 可扩展加载多个 slots -->
  <component v-else :is="componentToRender" :path="props.formItemPath" v-bind="bindProps">
    <slot />
  </component>
</template>
