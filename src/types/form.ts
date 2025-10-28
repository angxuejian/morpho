export interface FormBaseID {
  id: string
}

export interface dataSourceOptions {
  type: 'static' | 'remote';
  data?: any;
  url?: string;
  label?: 'label' | string;
  value?: 'value' | string;
  children?: 'children' | string;
  responsePath?: string;
  defaultValue?: string | number
}

export interface dataSourceFormItem {
  type: 'static' | 'remote';
  data?: FormItem[];
  url?: string;
  responsePath?: string;
}

export type component = 'input' | 'grid' | 'card'

export interface FormItemCore {
  itemType: 'void' | 'string' | 'number' | 'boolean' | 'object' | 'array';
  itemKey: string;
  itemValue?: any;
  component: component;
  itemLabel? : string;
  required?: boolean;
  props?: Record<string, any>;
  dataSource?: dataSourceOptions;
  reactions?: {
    dependencies: string | string[];
    when?: string;
    visible?: boolean;
    disable?: boolean;
    dataSource?: dataSourceOptions;
    addFormItem?: dataSourceFormItem;
    removeFormItem?: FormBaseID | FormBaseID[];
    updateFields?: PartialExceptId<FormItem>[]
  },
  children?: FormItem[]
}

export type FormItem = FormBaseID & FormItemCore;
export type PartialExceptId<T extends { id: any }> = { id: T['id'] } & Partial<Omit<T, 'id'>>;
