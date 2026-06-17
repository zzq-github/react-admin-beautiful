import type { ReactNode } from "react";
import type { FormInstance, FormProps } from "antd";
import type { Rule } from "antd/es/form";

export type ComponentType =
  | "input"
  | "password"
  | "textarea"
  | "number"
  | "select"
  | "date"
  | "rangeDate"
  | "checkbox"
  | "radio"
  | "switch";

export interface SchemaFormItem {
  name: string;
  label?: ReactNode;
  type: ComponentType;
  rules?: Rule[];
  placeholder?: string;
  options?: { label: string; value: any }[];
  span?: number;
  hidden?: boolean;
  group?: string;
  groupDescription?: ReactNode;
  tooltip?: ReactNode;
  extra?: ReactNode;
  componentProps?: any;
  formItemProps?: any;
  render?: (item: SchemaFormItem) => ReactNode;
}

export interface SchemaFormProps extends FormProps {
  items: SchemaFormItem[];
  form?: FormInstance;
  column?: number;
  gutter?: [number, number];
  children?: ReactNode;
}
