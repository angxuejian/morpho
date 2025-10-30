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

  /** 组件 props 属性配置（透传至组件） */
  props?: Record<string, any>

  /** 表单项数据源配置（如下拉选项等） */
  dataSource?: dataSourceOptions

  /**
   * 联动与动态行为配置
   * 可根据其他字段的值控制当前字段的显示、禁用、数据源、动态增删改项等
   */
  reactions?: {
    /** 依赖字段 ID（或 ID 数组） */
    dependencies: string | string[]

    /** 条件表达式（如 `{{$deps.age > 18}}`） */
    when?: string

    /** 是否显示该字段（与条件搭配使用） */
    visible?: boolean

    /** 是否禁用该字段（与条件搭配使用） */
    disable?: boolean

    /** 动态更新数据源（如下拉选项） */
    dataSource?: dataSourceOptions

    /** 动态新增表单项配置 */
    addFormItem?: dataSourceFormItem

    /** 动态移除表单项（支持单个或多个 ID） */
    removeFormItem?: FormBaseID | FormBaseID[]

    /** 动态更新已有表单项（除 id 外字段为可选） */
    updateFields?: PartialExceptId<FormItem>[]
  }

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
