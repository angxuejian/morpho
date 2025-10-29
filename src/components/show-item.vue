<script setup lang="ts">
import { NFormItem, NFormItemGi, NGrid } from 'naive-ui'
import formItem from '@/components/form-item.vue'
import type { FormItem } from '@/types/form'

interface Props {
  items: FormItem[]
  path?: string[]
}

const formValue = defineModel<Record<string, any>>('form-value')
const props = defineProps<Props>()

const checkFormItemComponent = (component: string) => {
  const list = ['input', 'select', 'cascader']
  return list.includes(component)
}

const calcPath = (current: string, parent?: string) => {
  const p = [current]
  if (parent) {
    p.unshift(parent)
  }
  if (Array.isArray(props.path)) {
    p.unshift(...props.path)
  }
  return p
}

const setPath = (current: string) => {
  return calcPath(current)
}

const getValue = (current: string, parent?: string) => {
  const p = calcPath(current, parent)
  return p.reduce((acc, key) => acc?.[key], formValue.value)
}

const setValue = (val: any, current: string, parent?: string) => {
  const p = calcPath(current, parent)
  const lastKey = p.pop()!
  let obj = formValue.value || {}
  for (let i = 0; i < p.length; i++) {
    const item = p[i]
    obj = obj[item]
  }
  obj[lastKey] = val
}
</script>

<template>
  <template v-for="(item, index) in props.items" :key="index">
    <!-- grid 布局 -->
    <template v-if="item.component === 'grid' && formValue">
      <NGrid v-bind="item.props">
        <NFormItemGi
          :label="itemgi.itemLabel"
          v-bind="itemgi.props"
          :data-id="itemgi.id"
          :data-field="itemgi.itemKey"
          v-for="(itemgi, indexgi) in item.children"
          :key="indexgi"
        >
          <template v-if="Array.isArray(itemgi.children)">
            <show-item
              :path="setPath(itemgi.itemKey)"
              :items="itemgi.children"
              v-model:form-value="formValue"
            ></show-item>
          </template>

          <template v-else>
            <form-item
              @update:val="(val: any) => setValue(val, itemgi.itemKey, item.itemKey)"
              :val="getValue(itemgi.itemKey, item.itemKey)"
              :formItem="itemgi"
            ></form-item>
          </template>
        </NFormItemGi>
      </NGrid>
    </template>

    <!-- item 布局 -->
    <template v-else-if="checkFormItemComponent(item.component) && formValue">
      <NFormItem
        :label="item.itemLabel"
        :path="item.itemKey"
        :data-id="item.id"
        :data-field="item.itemKey"
      >
        <form-item
          @update:val="(val: any) => setValue(val, item.itemKey)"
          :val="getValue(item.itemKey)"
          :formItem="item"
        ></form-item>
      </NFormItem>
    </template>

    <!-- 非表单组件 -->
    <template v-else>
      <template v-if="Array.isArray(item.children)">
        <form-item :formItem="item">
          <show-item
            :path="setPath(item.itemKey)"
            :items="item.children"
            v-model:form-value="formValue"
          ></show-item>
        </form-item>
      </template>

      <template v-else>
        <form-item :formItem="item"></form-item>
      </template>
    </template>
  </template>
</template>
