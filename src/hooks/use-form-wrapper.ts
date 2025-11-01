import { reactive, watch } from 'vue'
import type { FormItem } from '@/types/form'
import type { FormItemRule } from 'naive-ui'
import _ from 'lodash'

export type FormArrayItemFn = (key: string) => void
export type FormCheckArrayLength = (key: string) => number

export function useFormWrapper(formItems: FormItem[]) {
  const formValue = reactive<Record<string, any>>({})
  const formRules = reactive<Record<string, FormItemRule>>({})

  let watchStopHandles: (() => void)[] = []

  const handleReactions = (dependencies: Record<string, string[]>) => {

    const keys = Object.keys(dependencies)
    watchStopHandles.forEach((stop) => stop())
    watchStopHandles = []

    for (let i = 0; i < keys.length; i++) {
      const valKey = keys[i]
      const items = dependencies[valKey]

      const stop = watch(
        () => _.get(formValue, valKey),
        (newVal, oldVal) => {
          const isNewVal = Boolean(newVal)
          if (isNewVal !== Boolean(oldVal)) {
            items.forEach(async (itemKey) => {
              const item: FormItem = _.get(formItems, itemKey)
              if (!item.reactions) return

              // visible
              if (item.reactions.visible) {
                if (item.props === undefined) {
                  item.props = {}
                }
                item.props.itemVisible = isNewVal
              }

              // dataSource
              if (item.reactions.dataSource) {
                if (!item.dataSource) return

                if (item.dataSource.type === 'remote') {
                  const url = item.reactions.dataSource.url + newVal
                  Object.assign(item.dataSource, item.reactions.dataSource, { url })
                } else {
                  Object.assign(item.dataSource, item.reactions.dataSource)
                }
              }

              // addFormItemFn
              if (item.reactions.addFormItemFn) {
                if (isNewVal) {
                  const result = item.reactions.addFormItemFn()
                  const newItem: FormItem = result instanceof Promise ? await result : result
                  item.reactions.addFormItem = newItem
                  rebuild(newItem)

                  if (item.children) {
                    item.children.push(newItem)
                  } else {
                    formItems.push(newItem)
                  }

                } else {
                  if (!item.reactions.addFormItem) return
                  const arr = item.children || formItems
                  const index = arr.findIndex(sub => sub.id === item.reactions?.addFormItem?.id)
                  if (index === -1) return
                  arr.splice(index, 1)

                  if (!item.reactions.addFormItem.path) return
                  _.unset(formValue, item.reactions.addFormItem.path)
                  _.unset(formRules, item.reactions.addFormItem.path)
                  console.log(formValue, formRules)
                }
              }
            })
          }
        }
      )

      watchStopHandles.push(stop)
    }
  }

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

  const build = (list: FormItem[], path = '', nodePath = '') => {
    const data: Record<string, any> = {}
    const rule: Record<string, any> = {}
    const depe: Record<string, string[]> = {}

    list.forEach((item: FormItem, index: number) => {
      const { itemKey, itemType, itemValue, children, required = false, reactions } = item

      // formValue 生成路径（核心逻辑合并）
      const currentPath = path ? `${path}${itemKey}` : itemKey
      item.path = currentPath // 保留 path 信息

      // formItems 路径
      const currentNodePath = nodePath ? `${nodePath}[${index}]` : `[${index}]`

      // 收集 reactive
      if (reactions && reactions.dependencies) {
        if (!Object.prototype.hasOwnProperty.call(depe, reactions.dependencies)) {
          depe[reactions.dependencies] = []
        }

        depe[reactions.dependencies].push(currentNodePath)
      }

      switch (itemType) {
        case 'void': {
          if (children) {
            const { data: d, rule: r, depe: _depe } = build(children, path, nodePath)
            Object.assign(data, d)
            Object.assign(rule, r)
            Object.assign(depe, _depe)
          }
          break
        }

        case 'object': {
          const val = isObject(itemValue) ? itemValue : {}
          const rVal = {}
          const dVal = {}

          if (children) {
            const {
              data: d,
              rule: r,
              depe: _depe
            } = build(children, `${currentPath}.`, `${currentNodePath}.children`)
            Object.assign(val, d)
            Object.assign(rVal, r)
            Object.assign(dVal, _depe)
          }

          data[itemKey] = val
          Object.assign(rule, rVal)
          Object.assign(depe, dVal)
          break
        }

        case 'array': {
          const arr = isArray(itemValue) ? itemValue : []
          const rVal = {}
          const dVal = {}

          if (children) {
            const {
              data: d,
              rule: r,
              depe: _depe
            } = build(children, `${currentPath}[0].`, `${currentNodePath}[${index}].children`)
            arr.push(d)
            Object.assign(rVal, r)
            Object.assign(dVal, _depe)
          }

          data[itemKey] = arr
          Object.assign(rule, rVal)
          Object.assign(depe, dVal)
          break
        }

        default: {
          data[itemKey] = itemValue ?? null
          if (required) {
            rule[currentPath] = createRule(item)
          }
          break
        }
      }
    })

    return { data, rule, depe }
  }

  const rebuild = (formItem: FormItem) => {
    const { data, rule } = build([formItem])

    Object.assign(formValue, data)
    Object.assign(formRules, rule)
    // handleReactions(newDepe)
  }

  const { data: result, rule: r, depe } = build(formItems)


  Object.assign(formValue, result)
  Object.assign(formRules, r)
  handleReactions(depe)

  console.log(formValue, 'formValue')
  console.log(formRules, 'formRules')
  console.log(depe, 'reactions')

  return { formValue, formRules, addFormArrayItem, removeFormArrayItem, checkFormArrayLength }
}
