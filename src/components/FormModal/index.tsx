import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Form, Modal, message } from "antd";
import type { FormModalOpenConfig, FormModalProps, FormModalRef } from "./types";

interface ModalState {
  visible: boolean;
  title: React.ReactNode;
  description?: React.ReactNode;
  loading: boolean;
  isEdit: boolean;
}

const FormModal = forwardRef<FormModalRef, FormModalProps>((props, ref) => {
  const {
    renderForm,
    rowKey = "id",
    onSuccess,
    children,
    okText = "保存",
    cancelText = "取消",
    width = 640,
    className,
    ...restProps
  } = props;
  const [form] = Form.useForm();
  const [state, setState] = useState<ModalState>({
    visible: false,
    title: "",
    loading: false,
    isEdit: false,
  });
  const contextRef = useRef<{
    api?: FormModalOpenConfig["api"];
    transform?: FormModalOpenConfig["transform"];
    id?: any;
  }>({});

  const closeModal = () => {
    if (state.loading) {
      return;
    }
    setState((prev) => ({ ...prev, visible: false }));
  };

  useImperativeHandle(ref, () => ({
    open: ({ title, description, record, api, transform }) => {
      const id = record?.[rowKey];
      contextRef.current = { api, transform, id };
      form.resetFields();
      if (record) {
        form.setFieldsValue(record);
      }
      setState({
        visible: true,
        title,
        description,
        loading: false,
        isEdit: !!id,
      });
    },
  }));

  const handleOk = async () => {
    try {
      let values = await form.validateFields();

      if (contextRef.current.transform) {
        values = contextRef.current.transform(values);
      }

      const params = state.isEdit
        ? { ...values, [rowKey]: contextRef.current.id }
        : values;

      setState((prev) => ({ ...prev, loading: true }));

      if (contextRef.current.api) {
        await contextRef.current.api(params);
      }

      message.success("操作成功");
      onSuccess?.();
      setState((prev) => ({ ...prev, visible: false }));
    } catch (error: any) {
      if (error?.errorFields) {
        return;
      }
      console.error("Submit Error:", error);
      message.error(error?.message || "提交失败，请稍后重试");
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <Modal
      {...restProps}
      width={width}
      className={["form-modal", className].filter(Boolean).join(" ")}
      title={
        <div className="form-modal-title">
          <div className="text-base font-semibold text-theme-text">
            {state.title}
          </div>
          {state.description ? (
            <div className="mt-1 text-xs font-normal leading-5 text-theme-text-secondary">
              {state.description}
            </div>
          ) : null}
        </div>
      }
      open={state.visible}
      confirmLoading={state.loading}
      okText={okText}
      cancelText={cancelText}
      maskClosable={false}
      onOk={handleOk}
      onCancel={closeModal}
      destroyOnHidden
    >
      <div className="form-modal-body">
        {renderForm ? (
          <Form form={form} layout="vertical" component={false}>
            {renderForm(form, state.isEdit)}
          </Form>
        ) : (
          children
        )}
      </div>
    </Modal>
  );
});

export default FormModal;
