import type React from "react";
import type { FormInstance, ModalProps } from "antd";

export interface FormModalOpenConfig {
  title: React.ReactNode;
  description?: React.ReactNode;
  record?: any;
  api: (values: any) => Promise<any>;
  transform?: (values: any) => any;
}

export interface FormModalRef {
  open: (config: FormModalOpenConfig) => void;
}

export interface FormModalProps extends ModalProps {
  onSuccess?: () => void;
  renderForm?: (form: FormInstance, isEdit: boolean) => React.ReactNode;
  rowKey?: string;
  submitKey?: string;
}
