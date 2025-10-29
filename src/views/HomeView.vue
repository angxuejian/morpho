<script setup lang="ts">
import { ref } from 'vue'
import formShow from '@/components/show-wrapper.vue'
import type { FormItem } from '@/types/form'

const list = ref<FormItem[]>([
  {
    id: '00',
    itemType: 'string',
    itemKey: 'user',
    itemLabel: '用户11110',
    component: 'select',
    props: {
      placeholder: 'test111',
    },
    dataSource: {
      type: 'remote',
      url: '/api/users',
      label: 'name',
      value: 'id',
      responsePath: 'data'
    }
  },
  {
    id: '11',
    itemType: 'number',
    itemKey: 'location',
    itemLabel: '地区',
    component: 'cascader',
    props: {
      placeholder: '灌灌灌灌'
    },
    dataSource: {
      type: 'static',
      data: [
        { label: '浙江', value: '1', children: [ { label: '杭州', value: '1-1'}]}
      ]
    }
  }
  // {
  //   id: '11',
  //   itemType: 'object',
  //   itemKey: 'obj',
  //   component: 'grid',
  //   props: {
  //     cols: 3,
  //     xGap: 10
  //   },
  //   children: [
  //     {
  //       id: '22',
  //       itemType: 'object',
  //       itemLabel: '',
  //       itemKey: 'aobj',
  //       component: 'grid',
  //       props: {
  //         cols: 2,
  //         xGap: 10
  //       },
  //       children: [
  //         {
  //           id: '22-1',
  //           itemType: 'string',
  //           itemKey: 'age1',
  //           itemLabel: 'Age1',
  //           component: 'input',
  //           props: {
  //             type: 'textarea'
  //           }
  //         },
  //         {
  //           id: '22-2',
  //           itemType: 'string',
  //           itemKey: 'age2',
  //           itemLabel: 'Age2',
  //           component: 'input'
  //         }
  //       ]
  //     },
  //     {
  //       id: '33',
  //       itemType: 'string',
  //       itemLabel: '123',
  //       itemKey: 'name2',
  //       component: 'input',
  //       props: {
  //         placeholder: 'name2~'
  //       }
  //     },
  //     {
  //       id: '44',
  //       itemType: 'string',
  //       itemLabel: '123',
  //       itemKey: 'name3',
  //       component: 'input',
  //       props: {
  //         placeholder: 'name3~'
  //       }
  //     }
  //   ]
  // },
  // {
  //   id: 'xx',
  //   itemKey: 'card',
  //   itemType: 'object',
  //   component: 'card',
  //   props: {
  //     title: 'Card Information'
  //   },
  //   children: [
  //     {
  //       id: 'xx-1',
  //       itemKey: 'card1',
  //       component: 'input',
  //       itemType: 'string',
  //       itemLabel: 'CARD-1'
  //     }
  //   ]
  // },
  // {
  //   id: '399',
  //   itemKey: '',
  //   itemType: 'void',
  //   component: 'card',
  //   props: {
  //     title: 'test info'
  //   }
  // }
])
</script>

<template>
  <main class="w-full h-full flex justify-center">
    <div class="w-[60%] h-full bg-[#ededed]">
      <form-show :list="list" />
    </div>
  </main>
</template>
