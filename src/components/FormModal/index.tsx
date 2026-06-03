import React, {
  useImperativeHandle,
  useState,
  forwardRef,
  useRef,
} from "react";
import { Form, Modal, message } from "antd";
import { FormModalProps, FormModalRef } from "./types";

const FormModal = forwardRef<FormModalRef, FormModalProps>((props, ref) => {
  const { renderForm, rowKey = "id", onSuccess, ...restProps } = props;
  const [form] = Form.useForm();
  // 使用一个状态对象管理，减少多次 setState
  const [state, setState] = useState({ visible: false, title: '', loading: false, isEdit: false });
  const contextRef = useRef<{ api?: Function; transform?: Function; id?: any }>({});
  useImperativeHandle(ref, () => ({
    open: ({ title, record, api, transform }) => {
      const id = record?.[rowKey];
      contextRef.current = { api, transform, id };
      setState({ visible: true, title, loading: false, isEdit: !!id });
      // 使用 setFieldsValue 之前先 reset，防止上一次的数据残留
      form.resetFields();
      if (record) {
        form.setFieldsValue(record);
      }
    },
  }));

  const handleOk = async () => {
    try {
      // 1. 校验
      let values = await form.validateFields();
      // 2. 格式化数据 (Transform)
      if (contextRef.current.transform) {
        values = contextRef.current.transform(values);
      }
      // 3. 注入 ID
      const params = state.isEdit 
        ? { ...values, [rowKey]: contextRef.current.id } 
        : values;
      // 4. 提交
      setState(prev => ({ ...prev, loading: true }));
      if (contextRef.current.api) {
        await contextRef.current.api(params);
        message.success("操作成功");
        onSuccess?.();
        closeModal();
      }
    } catch (error: any) {
      // 如果是 antd 表单校验失败，不需要全局提示，表单项会变红
      if (error?.errorFields) return;
      console.error("Submit Error:", error);
    } finally {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const closeModal = () => {
    setState(prev => ({ ...prev, visible: false }));
  };

  return (
    <Modal
      {...restProps}
      title={state.title}
      open={state.visible}
      confirmLoading={state.loading}
      onOk={handleOk}
      onCancel={closeModal}
      destroyOnHidden // 强烈建议：关闭时销毁子组件，保证状态纯净
    >
      {/* 如果有 renderForm 则渲染表单，否则由 children 提供内容（用于无 Form 场景） */}
      {renderForm ? (
          <Form form={form} layout="vertical" component={false}>
            {renderForm(form, state.isEdit)}
          </Form>
        ) : (
          restProps.children
        )}
    </Modal>
  );
});
export default FormModal;