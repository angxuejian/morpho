import { reactive } from 'vue'
import type { FormItem } from '@/types/form'
import type { FormItemRule } from 'naive-ui'

export function useFormWrapper(formItems: FormItem[]) {
  const formValue = reactive<Record<string, any>>({})
  const formRules = reactive<Record<string, FormItemRule>>({})

  const isObject = (val: any): boolean => {
    return val !== null && typeof val === 'object' && !Array.isArray(val)
  }

  const isArray = (val: any): boolean => {
    return Array.isArray(val)
  }

  const createPath = (list: FormItem[], path?: string) => {
    list.forEach((item: FormItem) => {
      const { itemKey, itemType, children } = item

      const setPath = (k: string, p?: string) => {
        let key = ''
        if (p) key += p
        key += k
        return key
      }

      switch (itemType) {
        case 'void': {
          if (children) {
            const p = path ?? ''
            createPath(children, p)
          }
          break
        }
        case 'object': {
          if (children) {
            const p = path ?? ''
            createPath(children, `${p}${itemKey}.`)
          }
          item['path'] = setPath(itemKey, path)
          break
        }
        case 'array': {
          if (children) {
            const p = path ?? ''
            createPath(children, `${p}${itemKey}[0].`)
          }
          item['path'] = setPath(itemKey, path)
          break
        }

        default: {
          item['path'] = setPath(itemKey, path)
          break
        }
      }
    })
  }

  const createRule = (item: FormItem) => {
    const { itemType, component } = item

    let validator: null | ((_: any, val: any) => void) = null

    const message = `Please ${component === 'input' ? 'enter' : 'select'}`

    if (itemType === 'number' && component === 'input') {
      validator = (_: any, val: any) => {
        if (val === '' || val === null || val === undefined) {
          return new Error(message)
        }
        if (isNaN(Number(val))) {
          return new Error('Not number')
        }
        return true
      }
    }

    return {
      type: itemType,
      required: true,
      trigger: ['blur', 'change'],
      ...(validator ? { validator } : { message })
    }
  }

  const build = (list: FormItem[], path?: string) => {
    const data: Record<string, any> = {}
    const rule: Record<string, any> = {}

    list.forEach((item: FormItem) => {
      const { itemType, itemKey, itemValue, children, required = false } = item

      switch (itemType) {
        case 'void': {
          if (children) {
            const p = path ?? ''
            const { data: d, rule: r } = build(children, p)
            Object.assign(data, d)
            Object.assign(rule, r)
          }
          break
        }

        case 'object': {
          const val = isObject(itemValue) ? itemValue : {}
          const rVal = {}

          if (children) {
            const p = path ?? ''
            const { data: d, rule: r } = build(children, `${p}${itemKey}.`)
            Object.assign(val, d)
            Object.assign(rVal, r)
          }
          Object.assign(data, { [itemKey]: val })
          Object.assign(rule, rVal)
          break
        }

        case 'array': {
          const arr = isArray(itemValue) ? itemValue : []
          const rVal = {}

          if (children) {
            const p = path ?? ''
            const { data: d, rule: r } = build(children, `${p}${itemKey}[0].`)

            arr.push(d)
            Object.assign(rVal, r)
          }

          Object.assign(data, { [itemKey]: arr })
          Object.assign(rule, rVal)
          break
        }

        default: {
          data[itemKey] = itemValue ?? null

          if (required) {
            let key = ''

            if (path) {
              key += path
            }

            key += itemKey

            rule[key] = createRule(item)
          }
          break
        }
      }
    })

    return { data, rule }
  }

  const { data: result, rule: r } = build(formItems)
  createPath(formItems)

  console.log(formItems, '1')
  console.log(result, '::::')
  console.log(r)

  Object.assign(formValue, result)
  Object.assign(formRules, r)

  return { formValue, formRules }
}
