import {  ModalProps,  } from 'antd';
export interface BaseModalProps extends Omit<ModalProps, "onOk"> {
  onOk?: (payload?: any) => Promise<void> | void;
  onCancel?: () => void;
  children?: React.ReactNode;
  [key: string]: any; // 兼容透传给 Modal 的其他属性
}

export interface BaseModalRef {
  open: ( config:{title?: React.ReactNode, record?: any} ) => void;
  close: () => void;
}
