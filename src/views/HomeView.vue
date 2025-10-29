<script setup lang="ts">
import { ref } from 'vue'
import formShow from '@/components/show-wrapper.vue'
import type { FormItem } from '@/types/form'



const list = ref<FormItem[]>([
  {
    id: '1',
    itemKey: '',
    itemType: 'void',
    component: 'card',
    props: {
      title: 'Information'
    },
    children: [
      {
        id: '1-1',
        itemKey: 'user',
        itemType: 'object',
        component: 'grid',
        props: {
          cols: 3,
          xGap: 10
        },
        children: [
          {
            id: '1-1-1',
            itemKey: 'name',
            itemType: 'number',
            itemLabel: '姓名',
            component: 'select',
            dataSource: {
              type: 'remote',
              url: '/api/users',
              label: 'name',
              value: 'id',
              responsePath: 'data'
            },
            required: true
          },
          {
            id: '1-1-2',
            itemKey: 'age',
            itemType: 'number',
            itemLabel: '年龄',
            component: 'input',
            required: true
          },
          {
            id: '1-1-3',
            itemKey: 'location',
            itemType: 'number',
            itemLabel: '地区',
            component: 'cascader',
            required: true,
            dataSource: {
              type: 'static',
              data: [
                { label: '浙江', value: 100, children: [ { label: '杭州', value: 1001 }] },
                { label: '河南', value: 200, children: [ { label: '开封', value: 2001 }] }
              ]
            }
          },
          {
            id: '1-1-3',
            itemKey: 'like',
            itemType: 'string',
            itemLabel: '爱好',
            component: 'input',
            required: true,
            props: {
              span: 3,
              type: 'textarea'
            }
          }
        ]
      }
    ]
  }
])


// const list = ref<FormItem[]>([

  // {
  //   id: '002',
  //   itemType: 'number',
  //   itemKey: 'age',
  //   itemLabel: '年龄',
  //   itemValue: null,
  //   component: 'input',
  //   required: true
  // },
  // {
  //   id: '00',
  //   itemType: 'number',
  //   itemKey: 'user',
  //   itemLabel: '用户11110',
  //   itemValue: 1,
  //   component: 'select',
  //   props: {
  //     placeholder: 'test111'
  //   },
  //   dataSource: {
  //     type: 'remote',
  //     url: '/api/users',
  //     label: 'name',
  //     value: 'id',
  //     responsePath: 'data'
  //   },
  //   required: true
  // },
  // {
  //   id: '11',
  //   itemType: 'string',
  //   itemValue: '1-1',
  //   itemKey: 'location',
  //   itemLabel: '地区',
  //   component: 'cascader',
  //   required: true,
  //   props: {
  //     placeholder: '灌灌灌灌',
  //     clearable: true
  //   },
  //   dataSource: {
  //     type: 'static',
  //     data: [{ label: '浙江', value: '1', children: [{ label: '杭州', value: '1-1' }] }]
  //   }
  // },
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
  //           },
  //           required: true
  //         },
  //         {
  //           id: '22-2',
  //           itemType: 'string',
  //           itemKey: 'age2',
  //           itemLabel: 'Age2',
  //           component: 'input',
  //           required: true
  //         }
  //       ]
  //     },
  //     {
  //       id: '33',
  //       itemType: 'string',
  //       itemLabel: '123 - 1',
  //       itemKey: 'name2',
  //       component: 'input',
  //       itemValue: '123 - 1',
  //       props: {
  //         placeholder: 'name2~'
  //       },
  //       required: true
  //     },
  //     {
  //       id: '44',
  //       itemType: 'string',
  //       itemLabel: '123 - 2',
  //       itemKey: 'name3',
  //       component: 'input',
  //       props: {
  //         placeholder: 'name3~'
  //       },
  //       required: true
  //     }
  //   ]
  // },
  // {
  //   id: 'xx02',
  //   itemKey: 'cardArray',
  //   itemType: 'array',
  //   component: 'card',
  //   props: {
  //     title: 'Card Information'
  //   },
  //   children: [
  //     {
  //       id: 'xx-1',
  //       itemKey: 'card1',
  //       component: 'card',
  //       itemType: 'object',
  //       itemLabel: 'CARD-1-Array',
  //       props: {
  //         title: 'Arr - Card'
  //       },
  //       children: [
  //         {
  //           id: 'xx-3',
  //           itemKey: 'card1',
  //           component: 'input',
  //           itemType: 'string',
  //           itemLabel: 'CARD-1-Array',
  //           itemValue: '',
  //           required: true
  //         }
  //       ]
  //     },
  //      {
  //       id: 'xx-2',
  //       itemKey: 'card2',
  //       component: 'input',
  //       itemType: 'string',
  //       itemLabel: 'CARD-2-Array',
  //       itemValue: '',
  //       required: true
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
  //   },
  //   children: [
  //     {
  //       id: '399-1',
  //       itemKey: 'test',
  //       itemType: 'object',
  //       component: 'card',
  //       props: {
  //         title: 'Test 399'
  //       },
  //       children: [
  //         {
  //           id: '399-1-1',
  //           itemKey: 'test1',
  //           component: 'input',
  //           itemType: 'string',
  //           itemLabel: 'Test-1',
  //           itemValue: 'test //',
  //           required: true
  //         }
  //       ],
  //     }
  //   ]
  // },
  // {
  //   id: 'xx00',
  //   itemKey: 'obj11',
  //   itemType: 'object',
  //   component: 'card',
  //   props: {
  //     title: 'Card Information'
  //   },
  //   children: [
  //     {
  //       id: 'xx0011',
  //       itemKey: 'testobj',
  //       itemType: 'object',
  //       component: 'card',
  //       children: [
  //         {
  //           id: 'xx-1',
  //           itemKey: 'card2',
  //           component: 'input',
  //           itemType: 'string',
  //           itemLabel: 'CARD-2',
  //           itemValue: '',
  //           required: true
  //         }
  //       ]
  //     }
  //   ]
  // }
// ])
</script>

<template>
  <main class="w-full h-full flex justify-center">
    <div class="w-[60%] h-full bg-[#ededed]">
      <form-show :list="list" />
    </div>
  </main>
</template>
