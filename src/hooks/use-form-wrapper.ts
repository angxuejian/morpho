import { reactive } from 'vue'
import type { FormItem } from '@/types/form'
import type { FormItemRule } from 'naive-ui'
import _ from 'lodash'

export type FormArrayItemFn = (key: string) => void
export type FormCheckArrayLength = (key: string) => number

export function useFormWrapper(formItems: FormItem[]) {
  const formValue = reactive<Record<string, any>>({})
  const formRules = reactive<Record<string, FormItemRule>>({})

  const isObject = (val: any): boolean => {
    return val !== null && typeof val === 'object' && !Array.isArray(val)
  }

  const isArray = (val: any): boolean => {
    return Array.isArray(val)
  }

  const deepNullClone = (obj: any) =>
    _.cloneDeepWith(obj, (value) => {
      if (_.isArray(value) || _.isPlainObject(value)) return
      return null
    })

  const addFormArrayItem: FormArrayItemFn = (key: string) => {
    const list = _.get(formValue, key, [])
    if (Array.isArray(list) && list.length) {
      // 添加 formValue
      const item = deepNullClone(list[0])
      list.push(item)

      // 添加 formRules
      const regex = new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      const rulesKey = Object.keys(formRules).filter((k) => regex.test(k))
      const rulesValue: Record<string, any> = {}
      rulesKey.forEach((k) => {
        rulesValue[k] = formRules[k]
        delete formRules[k]
      })
      list.forEach((item, index) => {
        rulesKey.forEach((k) => {
          const suffix = k.split(`${key}[0]`)[1]
          const ruleKey = `${key}[${index}]${suffix}`
          formRules[ruleKey] = rulesValue[k]
        })
      })
    } else {
      console.log('useFormWrapper addFormArrayItem key', key)
    }
  }

  const removeFormArrayItem: FormArrayItemFn = (key: string) => {
    const list = _.get(formValue, key, [])
    if (Array.isArray(list) && list.length) {
      const lastIndex = list.length - 1

      // 删除 formValue
      list.splice(lastIndex, 1)

      // 删除 formRules
      const lastRuleKey = `${key}[${lastIndex}]`
      const regex = new RegExp(lastRuleKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      Object.keys(formRules).forEach((k) => {
        if (regex.test(k)) {
          delete formRules[k]
        }
      })
    } else {
      console.log('useFormWrapper removeFormArrayItem key', key)
    }
  }

  const checkFormArrayLength: FormCheckArrayLength = (key: string) => {
    const list = _.get(formValue, key, [])
    return list.length
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

  // console.log(formItems, '1')
  // console.log(result, '::::')
  // console.log(r)

  Object.assign(formValue, result)
  Object.assign(formRules, r)

  return { formValue, formRules, addFormArrayItem, removeFormArrayItem, checkFormArrayLength }
}
