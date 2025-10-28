<script setup lang="ts">
import { ref } from 'vue'
import formShow from '@/components/show-wrapper.vue'
import type { FormItem } from '@/types/form'

// onMounted(async () => {})

// const handler = async () => {
//   try {
//     const res = await fetch('/api/users')
//     const data = await res.json()
//     console.log('✅ Mock data:', data)
//   } catch (err) {
//     console.error('Fetch failed:', err)
//   }
// }

const list = ref<FormItem[]>([
  {
    id: '00',
    itemType: 'string',
    itemKey: 'user',
    itemLabel: '用户1',
    component: 'input',
    props: {
      placeholder: 'test',
      type: 'textarea'
    }
  },
  {
    id: '11',
    itemType: 'object',
    itemKey: 'obj',
    component: 'grid',
    props: {
      cols: 3,
      xGap: 10
    },
    children: [
      {
        id: '22',
        itemType: 'object',
        itemLabel: '',
        itemKey: 'aobj',
        component: 'grid',
        props: {
          cols: 2,
          xGap: 10
        },
        children: [
          {
            id: '22-1',
            itemType: 'string',
            itemKey: 'age1',
            itemLabel: 'Age1',
            component: 'input',
            props: {
              type: 'textarea'
            }
          },
          {
            id: '22-2',
            itemType: 'string',
            itemKey: 'age2',
            itemLabel: 'Age2',
            component: 'input'
          }
        ]
      },
      {
        id: '33',
        itemType: 'string',
        itemLabel: '123',
        itemKey: 'name2',
        component: 'input',
        props: {
          placeholder: 'name2~'
        }
      },
      {
        id: '44',
        itemType: 'string',
        itemLabel: '123',
        itemKey: 'name3',
        component: 'input',
        props: {
          placeholder: 'name3~'
        }
      }
    ]
  },
  {
    id: 'xx',
    itemKey: 'card',
    itemType: 'object',
    component: 'card',
    props: {
      title: 'Card Information'
    },
    children: [
      {
        id: 'xx-1',
        itemKey: 'card1',
        component: 'input',
        itemType: 'string',
        itemLabel: 'CARD-1'
      }
    ]
  },
  {
    id: '399',
    itemKey: '',
    itemType: 'void',
    component: 'card',
    props: {
      title: 'test info'
    }
  }
])
</script>

<template>
  <main class="w-full h-full flex justify-center">
    <div class="w-[60%] h-full bg-[#ededed]">
      <form-show :list="list" />
    </div>
  </main>
</template>
