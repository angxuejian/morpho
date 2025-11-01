# 🧬 Morpho

> A **JSON-driven UI generator** — build dynamic, reactive UIs powered entirely by JSON.

Morpho 是一个基于 **JSON Schema 思想** 的动态表单与界面生成框架。  
基于 **[Naive UI](https://www.naiveui.com/)** 构建，只需一份 JSON 配置，就能自动生成可交互的 UI，包括字段依赖、数据源加载、动态增删项等。  
无需硬编码组件逻辑，让开发专注于数据与业务。


---

## ✨ 特性

- 🧩 **JSON 驱动**：配置即 UI，无需手写模板。
- 💠 **Naive UI 原生集成**：与 `n-input`、`n-select`、`n-cascader` 等组件深度结合。
- 🔁 **动态依赖**：支持字段联动、动态显隐、数据源刷新、表单项增删。
- ⚙️ **统一数据源**：支持静态与远程接口。
- 💡 **类型安全**：完整 TypeScript 定义，智能提示。
- 🧠 **可扩展性强**：支持自定义组件、验证规则与渲染逻辑。

---

## 📦 安装

```bash
git clone https://github.com/angxuejian/morpho.git

cd morpho
npm install
npm run dev
```

## 🧱 核心类型定义

### FormItem

每个表单项的核心描述结构：

| 字段名       | 类型                                                                 | 必填 | 说明         |
| ------------ | -------------------------------------------------------------------- | ---- | ------------ |
| `id`         | `string`                                                             | ✅   | 唯一标识符   |
| `itemType`   | `'void' \| 'string' \| 'number' \| 'boolean' \| 'object' \| 'array'` | ✅   | 数据类型     |
| `itemKey`    | `string`                                                             | ✅   | 字段名       |
| `itemLabel`  | `string`                                                             | ❌   | 标签文本     |
| `component`  | `'input' \| 'grid' \| 'card' \| 'select' \| 'cascader' \| 'list'`    | ✅   | 组件类型     |
| `itemValue`  | `any`                                                                | ❌   | 默认值       |
| `required`   | `boolean`                                                            | ❌   | 是否必填     |
| `props`      | `Record<string, any>`                                                | ❌   | 组件属性     |
| `dataSource` | [`dataSourceOptions`](#datasourceoptions)                            | ❌   | 数据源配置   |
| `reactions`  | [`reactionsOptions`](#reactionsoptions)                              | ❌   | 动态联动配置 |
| `children`   | `FormItem[]`                                                         | ❌   | 嵌套子项     |
| `path`       | `string`                                                             | ❌   | 内部生成路径 |

### dataSourceOptions

定义数据源来源和映射字段：

| 字段名            | 类型                     | 必填 | 说明                      |
| -------------- | ---------------------- | -- | ----------------------- |
| `type`         | `'static' \| 'remote'` | ✅  | 数据源类型                   |
| `data`         | `any`                  | ❌  | 静态数据（type=static）       |
| `url`          | `string`               | ❌  | 接口地址（type=remote）       |
| `label`        | `string`               | ❌  | 显示字段名（默认 `'label'`）     |
| `value`        | `string`               | ❌  | 值字段名（默认 `'value'`）      |
| `children`     | `string`               | ❌  | 子级字段名（级联结构）             |
| `responsePath` | `string`               | ❌  | 响应数据路径（如 `'data.list'`） |
| `defaultValue` | `string \| number`     | ❌  | 默认选中项                   |

### reactionsOptions

定义字段依赖与动态逻辑：

| 字段名             | 类型                                        | 必填 | 说明                                   |
| --------------- | ----------------------------------------- | -- | ------------------------------------ |
| `dependencies`  | `string`                                  | ✅  | 依赖字段路径（如 `"country"` 或 `"user.age"`） |
| `visible`       | `boolean`                                 | ❌  | 控制字段显隐                               |
| `dataSource`    | [`dataSourceOptions`](#datasourceoptions) | ❌  | 动态数据源                                |
| `addFormItem`   | `FormItem`                                | ❌  | 存储addFormItemFn方法返回的表单项，无需手动配置                           |
| `addFormItemFn` | `() => FormItem \| Promise<FormItem>`     | ❌  | 动态创建表单项（支持异步）                        |


## 🧩 示例

### 动态添加表单项

```ts
const formItems: FormItem[] = [
  {
    id: 'agree',
    itemKey: 'agree',
    itemType: 'boolean',
    itemLabel: '是否同意',
    component: 'select',
    dataSource: {
      type: 'static',
      data: [
        { label: '是', value: 1 },
        { label: '否', value: 0 }
      ]
    },
    reactions: {
      dependencies: 'agree',
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

```

### 动态数据源刷新

```ts
{
  id: 'city',
  itemKey: 'city',
  itemType: 'string',
  itemLabel: '城市',
  component: 'select',
  reactions: {
    dependencies: 'country',
    dataSource: {
      type: 'remote',
      url: '/api/cities?country=',
      label: 'name',
      value: 'id'
    }
  }
}
```
`country` 变化后，会自动刷新 `city` 的数据源。

### 嵌套结构
```ts
{
  id: 'address',
  itemKey: 'address',
  itemType: 'void',
  component: 'card',
  itemLabel: '地址信息',
  children: [
    { id: 'province', itemKey: 'province', itemType: 'string', component: 'select' },
    { id: 'city', itemKey: 'city', itemType: 'string', component: 'select' }
  ]
}

```

## 📂 目录结构
``` csharp
morpho/
├─ mock                   # 模拟远程数据
├─ src/
│  ├─ components/         # 核心逻辑（formItem, formWrapper, showWrapper...） + naiveui
|  ├─ hooks/              # 计算 formValue、formRules
|  ├─ stores/             # options数据源统一管理
│  ├─ App.vue/            # app.vue
│  └─ main.ts             # 导出入口
├─ package.json
└─ README.md
```

<!-- ##

grid布局

- array -> grid label / item.children 循环
  - array -> show item / item.children 循环
  - item -> form item

array布局

- item -> form
  - array - show item / formValue[itemKey] 循环

非表单布局

- item -> form
  - array - show item / item.children 循环

item布局

- item -> (label + form) -->
