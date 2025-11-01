<script setup lang="ts">
import { NFormItem, NFormItemGi, NGrid } from 'naive-ui'
import formItem from '@/components/form-item.vue'
import type { FormItem } from '@/types/form'

interface Props {
  items: FormItem[]
  itemParentPath?: string
}

const formValue = defineModel<Record<string, any>>('form-value')
const props = defineProps<Props>()

const checkFormItemComponent = (component: string) => {
  const list = ['input', 'select', 'cascader']
  return list.includes(component)
}

// 只有 item.itemType === 'array' 时才会使用动态计算的path
const calcPath = (item: FormItem, parent?: string) => {
  if (props.itemParentPath !== undefined) {
    return [props.itemParentPath, parent, item.itemKey].filter(Boolean).join('.')
  } else {
    return item.path!
  }
}

// 只有 item.itemType === 'array' 时才会动态计算path
const setParentPath = (item: FormItem, i?: string | number) => {
  let p = ''
  if (props.itemParentPath !== undefined) {
    p += props.itemParentPath + '.'
  }
  p += item.itemKey
  if (i !== undefined) {
    p += `[${i}]`
  }
  return p
}

const parsePath = (path: string) => {
  return (
    path
      // 把 [0] 这种写法转为 .0
      .replace(/\[(\w+)\]/g, '.$1')
      // 去掉多余的前后点
      .replace(/^\./, '')
      .split('.')
  )
}

// 手动v-model, 获取多层嵌套formValue的值
const getValue = (path: string) => {
  const p = parsePath(path)
  return p.reduce((acc, key) => acc?.[key], formValue.value)
}

// 手动v-model, 赋值给多层嵌套formValue
const setValue = (val: any, path: string) => {
  const p = parsePath(path)
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
          :path="calcPath(itemgi, item.itemKey)"
          v-bind="itemgi.props"
          :data-id="itemgi.id"
          :data-field="calcPath(itemgi, item.itemKey)"
          v-for="(itemgi, indexgi) in item.children"
          :key="indexgi"
        >
          <!-- show-item -->
          <template v-if="Array.isArray(itemgi.children)">
            <show-item
              :itemParentPath="setParentPath(item)"
              :items="itemgi.children"
              v-model:form-value="formValue"
            ></show-item>
          </template>

          <template v-else>
            <form-item
              :formItemPath="calcPath(itemgi, item.itemKey)"
              @update:val="(val: any) => setValue(val, calcPath(itemgi, item.itemKey))"
              :val="getValue(calcPath(itemgi, item.itemKey))"
              :formItem="itemgi"
            ></form-item>
          </template>
        </NFormItemGi>
      </NGrid>
    </template>

    <!-- array item 布局 -->
    <template v-else-if="item.itemType === 'array'">
      <form-item :formItemPath="calcPath(item)" :formItem="item">
        <!-- show-item -->
        <template v-if="item.children && getValue(calcPath(item))">
          <template v-for="(sub, i) in getValue(calcPath(item))" :key="i">
            <show-item
              :itemParentPath="setParentPath(item, i)"
              :items="item.children"
              v-model:form-value="formValue"
            ></show-item>
          </template>
        </template>
      </form-item>
    </template>

    <!-- item 布局 -->
    <template v-else-if="checkFormItemComponent(item.component) && formValue">
      <NFormItem
        :label="item.itemLabel"
        :path="calcPath(item)"
        :data-id="item.id"
        :data-field="calcPath(item)"
      >
        <form-item
          :formItemPath="calcPath(item)"
          @update:val="(val: any) => setValue(val, calcPath(item))"
          :val="getValue(calcPath(item))"
          :formItem="item"
        ></form-item>
      </NFormItem>
    </template>

    <!-- 非表单组件 -->
    <template v-else>
      <form-item :formItemPath="calcPath(item)" :formItem="item">
        <!-- show-item -->
        <template v-if="Array.isArray(item.children)">
          <show-item
            :itemParentPath="setParentPath(item)"
            :items="item.children"
            v-model:form-value="formValue"
          ></show-item>
        </template>
      </form-item>
    </template>
  </template>
</template>
