import { ReactNode } from 'react';
import {  FormProps, FormInstance 
} from 'antd';
import { Rule } from 'antd/es/form';
// --- 1. 定义支持的组件类型 ---
export type ComponentType = 
  | 'input' | 'password' | 'textarea' | 'number' 
  | 'select' | 'date' | 'rangeDate' | 'checkbox' | 'radio';

// --- 2. 定义表单项的接口 ---
export interface SchemaFormItem {
  name: string;
  label?: ReactNode;
  type: ComponentType;
  rules?: Rule[];
  placeholder?: string;
  options?: { label: string; value: any }[]; // 针对 select/radio/checkbox
  span?: number; // 栅格占据份数
  hidden?: boolean;
  tooltip?: ReactNode;
  componentProps?: any; // 透传给底层组件的属性
  formItemProps?: any; // 透传给 Form.Item 的属性
  render?: (item: SchemaFormItem) => ReactNode; // 自定义渲染“逃生舱”
}

export interface SchemaFormProps extends FormProps {
  items: SchemaFormItem[];
  form?: FormInstance;
  column?: number;
  children?: ReactNode;
}
