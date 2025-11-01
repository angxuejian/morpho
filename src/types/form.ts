export interface FormBaseID {
  id: string
}

export interface dataSourceOptions {
  type: 'static' | 'remote'
  data?: any
  url?: string
  label?: 'label' | string
  value?: 'value' | string
  children?: 'children' | string
  responsePath?: string
  defaultValue?: string | number
}

export interface reactionsOptions {
  dependencies: string
  // when?: string
  visible?: boolean
  // disable?: boolean
  dataSource?: dataSourceOptions
  addFormItem?: FormItem
  addFormItemFn?: dataSourceFormItemFn
  // removeFormItem?: FormBaseID | FormBaseID[]
  // updateFields?: PartialExceptId<FormItem>[]
}

export type dataSourceFormItemFn = () => Exclude<FormItem, reactionsOptions> | Promise<Exclude<FormItem, reactionsOptions>>

export type component = 'input' | 'grid' | 'card' | 'select' | 'cascader' | 'list'

export interface FormItemCore {
  itemType: 'void' | 'string' | 'number' | 'boolean' | 'object' | 'array'
  itemKey: string
  itemValue?: any
  component: component
  itemLabel?: string
  required?: boolean
  props?: Record<string, any> & { itemVisible?: boolean }
  dataSource?: dataSourceOptions
  reactions?: reactionsOptions
  children?: FormItem[]
  path?: string
}

export type FormItem = FormBaseID & FormItemCore
export type PartialExceptId<T extends { id: any }> = { id: T['id'] } & Partial<Omit<T, 'id'>>
