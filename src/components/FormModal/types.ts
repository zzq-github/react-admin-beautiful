import {  FormInstance, ModalProps  } from 'antd';
export interface FormModalRef {
  open: (config: {
    title: string;
    record?: any;
    api: (values: any) => Promise<any>;
    transform?: (values: any) => any; // 数据格式化
  }) => void;
}

export interface FormModalProps extends ModalProps {
  onSuccess?: () => void;
  // 渲染表单项的函数，传入 form 实例供业务组件使用
  renderForm: (form: FormInstance, isEdit: boolean) => React.ReactNode;
  /** 从 record 中取值的键名，默认为 'id' */
  rowKey?: string;
  /** 提交给接口时的键名，如果不传则默认与 rowKey 一致 */
  submitKey?: string;
  /** 其他透传给 BaseModal 的属性 */
  [key: string]: any;
}