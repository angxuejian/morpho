/**
 * 表单项基础 ID 类型
 *
 * 用于在复杂类型中复用 `id` 标识字段
 */
export interface FormBaseID {
  /** 表单项唯一标识符 */
  id: string
}

/**
 * 通用数据源配置
 *
 * 支持静态数据（static）与远程接口数据（remote）两种模式
 */
export interface dataSourceOptions {
  /** 数据源类型：静态(static) 或 远程(remote) */
  type: 'static' | 'remote'
  /** 静态数据内容（当 type = 'static' 时生效） */
  data?: any
  /** 远程接口地址（当 type = 'remote' 时生效） */
  url?: string
  /** 显示字段名称（默认 'label'） */
  label?: 'label' | string
  /** 值字段名称（默认 'value'） */
  value?: 'value' | string
  /** 子节点字段名称（层级结构时使用） */
  children?: 'children' | string
  /** 响应数据的路径（如 'data.items'） */
  responsePath?: string
  /** 默认值 */
  defaultValue?: string | number
}

/**
 * 动态新增的表单项配置
 *
 * 可用于 `reactions.addFormItem` 场景中，动态插入新字段
 */
export interface dataSourceFormItem {
  /** 数据源类型 */
  type: 'static' | 'remote'
  /** 静态新增的表单项（当 type = 'static' 时生效） */
  data?: FormItem[]
  /** 远程获取表单项的接口地址 */
  url?: string
  /** 响应数据路径（用于提取表单项结构） */
  responsePath?: string
}


/**
 * 新增表单项方法，返回表单项（暂不支持 reactionsOptions ）
 */
export type dataSourceFormItemFn = () => Exclude<FormItem, reactionsOptions> | Promise<Exclude<FormItem, reactionsOptions>>

/**
 * 字段联动与动态行为配置项
 *
 * 用于描述表单项之间的依赖关系、显示控制、数据源更新、以及动态新增表单项等逻辑。
 */
export interface reactionsOptions {
  /** 依赖的字段键名（或字段路径） 当依赖字段的值变化时，会触发当前表单项的联动逻辑。 示例：'age' 或 'user.info.gender' */
  dependencies: string

  // when?: string

  /** 控制字段显示的可见性（与条件表达式搭配使用） */
  visible?: boolean

  // disable?: boolean

  /** 动态数据源配置 */
  dataSource?: dataSourceOptions

  /** 存储 addFormItemFn 方法 返回的表单项，无需手动配置 */
  addFormItem?: FormItem

  /** 返回表单项（暂不支持 reactionsOptions ） */
  addFormItemFn?: dataSourceFormItemFn

  // removeFormItem?: FormBaseID | FormBaseID[]
  // updateFields?: PartialExceptId<FormItem>[]
}

/**
 * 表单项核心配置（不含全局继承字段）
 */
export interface FormItemCore {
  /** 字段类型（决定数据结构） */
  itemType: 'void' | 'string' | 'number' | 'boolean' | 'object' | 'array'

  /** 字段键名（对应表单模型的字段名） */
  itemKey: string

  /** 默认值（初始表单值） */
  itemValue?: any

  /** 渲染组件类型，如 input、select、checkbox 等 */
  component: 'input' | 'grid' | 'card' | 'select' | 'cascader' | 'list'

  /** 表单项标签（显示在 UI 上的名称） */
  itemLabel?: string

  /** 是否为必填字段 */
  required?: boolean

  /** 组件 props 属性配置（透传至组件）itemVisible 与 reactions.visible 配合使用 */
  props?: Record<string, any> & { itemVisible?: boolean }

  /** 表单项数据源配置（如下拉选项等） */
  dataSource?: dataSourceOptions

  /**
   * 联动与动态行为配置
   * 可根据其他字段的值控制当前字段的显示、禁用、数据源、动态增删改项等
   */
  reactions?: reactionsOptions

  /** 子项 */
  children?: FormItem[]

  /** 字段路径, 会自动计算 */
  path?: string
}

/**
 * 完整表单项定义
 * 继承自基础 ID 类型 + 核心配置
 */
export type FormItem = FormBaseID & FormItemCore

/**
 * 工具类型：除 `id` 外的所有字段变为可选
 * 用于部分更新、动态修改字段场景
 */
export type PartialExceptId<T extends { id: any }> = {
  /** 必填 ID 字段 */
  id: T['id']
} & Partial<Omit<T, 'id'>>
