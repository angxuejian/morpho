<script setup lang="ts">
import { ref } from 'vue'
import formShow from '@/components/show-wrapper.vue'
import type { FormItem } from '@/types/form'

// const list1 = ref<FormItem[]>([
//   {
//     id: 'f1',
//     itemType: 'string',
//     itemKey: 'username',
//     itemLabel: '用户名',
//     component: 'input',
//     required: true,
//     props: { placeholder: '请输入用户名' }
//   },
//   {
//     id: 'f2',
//     itemType: 'number',
//     itemKey: 'age',
//     itemLabel: '年龄',
//     component: 'input',
//     props: { type: 'number', min: 0 }
//   },
//   {
//     id: 'f3',
//     itemType: 'boolean',
//     itemKey: 'agree',
//     itemLabel: '是否同意',
//     component: 'select',
//     dataSource: {
//       type: 'static',
//       data: [
//         { label: '是', value: 1 },
//         { label: '否', value: 0 }
//       ]
//     }
//   },
//   {
//     id: 'f4',
//     itemType: 'string',
//     itemKey: 'country',
//     itemLabel: '国家',
//     component: 'select',
//     dataSource: {
//       type: 'remote',
//       url: '/api/countries',
//       label: 'name',
//       value: 'code',
//       responsePath: 'data.list'
//     },
//     reactions: {
//       dependencies: 'username',
//       visible: true,
//       dataSource: {
//         type: 'remote',
//         url: '/api/countries?id='
//       },
//       addFormItemFn: () => {
//         return new Promise((resolve) => {
//           setTimeout(() => {
//             resolve({
//               id: 'f4-1',
//               itemKey: 'add',
//               itemType: 'string',
//               itemLabel: '新增',
//               component: 'input',
//               required: true
//             })
//           }, 5000);
//         })
//       }
//     }
//   },
//   {
//     id: 'f5',
//     itemType: 'string',
//     itemKey: 'note',
//     itemLabel: '备注',
//     component: 'input',
//     props: { type: 'textarea', rows: 3 }
//   }
// ])

// const list2 = ref<FormItem[]>([
//   {
//     id: 'g1',
//     itemType: 'object',
//     itemKey: 'userGrid',
//     itemLabel: '用户信息',
//     component: 'grid',
//     props: { cols: 2, xGap: 16 },
//     children: [
//       {
//         id: 'g1-1',
//         itemType: 'string',
//         itemKey: 'firstName',
//         itemLabel: '名',
//         component: 'input'
//       },
//       {
//         id: 'g1-2',
//         itemType: 'string',
//         itemKey: 'lastName',
//         itemLabel: '姓',
//         component: 'input'
//       },
//       {
//         id: 'g1-3',
//         itemType: 'number',
//         itemKey: 'age',
//         itemLabel: '年龄',
//         component: 'input',
//         props: { type: 'number' }
//       },
//       {
//         id: 'g1-4',
//         itemType: 'string',
//         itemKey: 'gender',
//         itemLabel: '性别',
//         component: 'select',
//         dataSource: {
//           type: 'static',
//           data: [
//             { label: '男', value: 'male' },
//             { label: '女', value: 'female' }
//           ]
//         }
//       }
//     ]
//   }
// ])

// const list3 = ref<FormItem[]>([
//   {
//     id: 'c1',
//     itemType: 'object',
//     itemKey: 'contactCard',
//     itemLabel: '联系方式',
//     component: 'card',
//     props: { bordered: true },
//     children: [
//       {
//         id: 'c1-1',
//         itemType: 'string',
//         itemKey: 'email',
//         itemLabel: '邮箱',
//         component: 'input',
//         required: true,
//         props: { placeholder: '请输入邮箱' }
//       },
//       {
//         id: 'c1-2',
//         itemType: 'string',
//         itemKey: 'phone',
//         itemLabel: '手机号',
//         component: 'input',
//         props: { maxlength: 11 }
//       },
//       {
//         id: 'c1-3',
//         itemType: 'object',
//         itemKey: 'address',
//         itemLabel: '地址',
//         component: 'grid',
//         props: {
//           cols: 2
//         },
//         children: [
//           {
//             id: 'c1-3-1',
//             itemType: 'string',
//             itemKey: 'city',
//             itemLabel: '城市',
//             component: 'input'
//           },
//           {
//             id: 'c1-3-2',
//             itemType: 'string',
//             itemKey: 'zip',
//             itemLabel: '邮编',
//             component: 'input'
//           }
//         ]
//       }
//     ]
//   }
// ])

// const list4 = ref<FormItem[]>([
//   {
//     id: 'cs1',
//     itemType: 'string',
//     itemKey: 'category',
//     itemLabel: '分类选择',
//     component: 'cascader',
//     dataSource: {
//       type: 'remote',
//       url: '/api/categories',
//       label: 'name',
//       value: 'id',
//       children: 'sub',
//       responsePath: 'data.categories'
//     }
//   },
//   {
//     id: 'cs2',
//     itemType: 'number',
//     itemKey: 'priceRange',
//     itemLabel: '价格区间',
//     component: 'select',
//     dataSource: {
//       type: 'static',
//       data: [
//         { label: '0 - 100', value: 1 },
//         { label: '100 - 500', value: 2 },
//         { label: '500 - 1000', value: 3 }
//       ]
//     }
//   },
//   {
//     id: 'cs3',
//     itemType: 'string',
//     itemKey: 'keyword',
//     itemLabel: '关键词',
//     component: 'input'
//   }
// ])

// const list5 = ref<FormItem[]>([
//   {
//     id: 'l1',
//     itemType: 'array',
//     itemKey: 'education',
//     itemLabel: '教育经历',
//     component: 'list',
//     children: [
//       {
//         id: 'l1-1',
//         itemType: 'object',
//         itemKey: 'schoolItem',
//         component: 'card',
//         children: [
//           {
//             id: 'l1-1-1',
//             itemType: 'string',
//             itemKey: 'school',
//             itemLabel: '学校名称',
//             component: 'input'
//           },
//           {
//             id: 'l1-1-2',
//             itemType: 'string',
//             itemKey: 'degree',
//             itemLabel: '学历',
//             component: 'select',
//             dataSource: {
//               type: 'static',
//               data: [
//                 { label: '本科', value: 'bachelor' },
//                 { label: '硕士', value: 'master' },
//                 { label: '博士', value: 'phd' }
//               ]
//             }
//           },
//           {
//             id: 'l1-1-3',
//             itemType: 'number',
//             itemKey: 'year',
//             itemLabel: '毕业年份',
//             component: 'input',
//             props: { type: 'number' }
//           }
//         ]
//       }
//     ]
//   }
// ])

const list = ref<FormItem[]>([
  {
    id: 'h0',
    itemType: 'object',
    itemKey: 'info',
    itemLabel: '个人表单',
    component: 'card',
    children: [
      {
        id: 'h1',
        itemType: 'string',
        itemKey: 'nickname',
        itemLabel: '昵称',
        component: 'input',
        required: true,
        props: {
          placeholder: '请输入你的昵称'
        }
      },
      {
        id: 'h2',
        itemType: 'number',
        itemKey: 'age',
        itemLabel: '年龄',
        component: 'input',
        props: {
          type: 'number',
          min: 0,
          max: 120,
          placeholder: '请输入年龄'
        }
      },
      {
        id: 'h3',
        itemType: 'string',
        itemKey: 'favoriteType',
        itemLabel: '爱好类型',
        component: 'select',
        dataSource: {
          type: 'static',
          data: [
            { label: '运动', value: 'sports' },
            { label: '艺术', value: 'art' },
            { label: '阅读', value: 'reading' },
            { label: '旅行', value: 'travel' },
            { label: '游戏', value: 'gaming' }
          ]
        },
        required: true
      },
      {
        id: 'h4',
        itemType: 'object',
        itemKey: 'details',
        itemLabel: '兴趣详情',
        component: 'card',
        props: {
          bordered: true
        },
        children: [
          {
            id: 'h4-1',
            itemType: 'string',
            itemKey: 'favoriteSport',
            itemLabel: '最喜欢的运动',
            component: 'select',
            dataSource: {
              type: 'static',
              data: [
                { label: '篮球', value: 'basketball' },
                { label: '足球', value: 'football' },
                { label: '网球', value: 'tennis' },
                { label: '跑步', value: 'running' }
              ]
            }
          },
          {
            id: 'h4-2',
            itemType: 'string',
            itemKey: 'favoriteArtist',
            itemLabel: '最喜欢的艺术家',
            component: 'input',
            props: {
              placeholder: '如：梵高、周杰伦'
            }
          },
          {
            id: 'h4-3',
            itemType: 'string',
            itemKey: 'readingPreference',
            itemLabel: '喜欢的阅读类型',
            component: 'cascader',
            dataSource: {
              type: 'static',
              data: [
                {
                  label: '文学',
                  value: 'literature',
                  children: [
                    { label: '小说', value: 'novel' },
                    { label: '诗歌', value: 'poetry' }
                  ]
                },
                {
                  label: '非虚构',
                  value: 'nonfiction',
                  children: [
                    { label: '传记', value: 'biography' },
                    { label: '科技', value: 'science' }
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        id: 'h5',
        itemType: 'array',
        itemKey: 'hobbyList',
        itemLabel: '我的兴趣清单',
        component: 'list',
        children: [
          {
            id: 'h5-1',
            itemType: 'object',
            itemKey: 'hobbyItem',
            component: 'card',
            children: [
              {
                id: 'h5-1-1',
                itemType: 'string',
                itemKey: 'name',
                itemLabel: '爱好名称',
                component: 'input',
                required: true
              },
              {
                id: 'h5-1-2',
                itemType: 'string',
                itemKey: 'frequency',
                itemLabel: '进行频率',
                component: 'select',
                dataSource: {
                  type: 'static',
                  data: [
                    { label: '每天', value: 'daily' },
                    { label: '每周', value: 'weekly' },
                    { label: '偶尔', value: 'sometimes' }
                  ]
                }
              },
              {
                id: 'h5-1-3',
                itemType: 'string',
                itemKey: 'description',
                itemLabel: '爱好描述',
                component: 'input',
                props: {
                  type: 'textarea',
                  rows: 3,
                  placeholder: '简单介绍一下这个爱好'
                }
              }
            ]
          }
        ]
      },
      {
        id: 'h6',
        itemType: 'number',
        itemKey: 'share',
        itemLabel: '是否公开展示爱好',
        component: 'select',
        dataSource: {
          type: 'static',
          data: [
            { label: '是', value: 1 },
            { label: '否', value: 0 }
          ]
        }
      },
      {
        id: 'agree',
        itemKey: 'agree',
        itemType: 'number',
        itemLabel: '是否同意',
        component: 'select',
        dataSource: {
          type: 'static',
          data: [
            { label: '是', value: 0 },
            { label: '否', value: 1 }
          ]
        },
        reactions: {
          dependencies: 'info.agree',
          addFormItemFn: async () => ({
            id: 'reason',
            itemKey: 'reason',
            itemType: 'string',
            itemLabel: '原因说明',
            component: 'input',
            props: {
              placeholder: '请输入原因'
            }
          })
        }
      }
    ]
  }
])
</script>

<template>
  <main class="w-full h-full flex justify-center">
    <div class="w-[60%] h-full bg-[#ededed] md:w-[60%] w-full">
      <form-show :list="list" />
    </div>
  </main>
</template>
