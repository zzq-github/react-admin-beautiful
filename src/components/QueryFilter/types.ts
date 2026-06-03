import type {  Rule } from "antd/es/form";
/** * 定义单个表单项的配置接口 
 */
export interface QueryField {
  name: string;
  label: string;
  component: React.ReactNode;
  span?: number;
  rules?: Rule[];
  /** 转换值的特殊方法，供 onChange 回调使用 */
  transformChangeValue?: (value: any) => any;
}

/** * 定义组件的 Props 接口
 */
export interface QueryFilterProps {
  fields?: QueryField[];
  onSearch?: (values?: any) => void;
  onReset?: () => void;
  /** 当表单值变化时的回调，返回处理后的所有值 */
  onChange?: (allValues: any) => void;
  initialValues?: any;
  span?: number;
  leftActions?: React.ReactNode; // 允许传入任何 React 节点
}
