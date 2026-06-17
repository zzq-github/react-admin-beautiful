import type React from "react";
import type { Rule } from "antd/es/form";

export interface QueryField {
  name: string;
  label: string;
  component: React.ReactNode;
  span?: number;
  rules?: Rule[];
  transformChangeValue?: (value: any) => any;
}

export interface QueryFilterProps {
  fields?: QueryField[];
  onSearch?: (values?: any) => void;
  onReset?: () => void;
  onChange?: (allValues: any) => void;
  initialValues?: any;
  span?: number;
  title?: React.ReactNode;
  description?: React.ReactNode;
  extra?: React.ReactNode;
  actions?: React.ReactNode;
  leftActions?: React.ReactNode;
  submitText?: string;
  resetText?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  maxVisibleRows?: number;
  className?: string;
}
