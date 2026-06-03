import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, Spin } from "antd";
import { BaseModalProps, BaseModalRef } from "./types";

const BaseModal = forwardRef<BaseModalRef, BaseModalProps>((props, ref) => {
  const { onOk, onBeforeOpen, children, ...restProps } = props;
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(false);
  const [config, setConfig] = useState<{
    title?: React.ReactNode;
    record?: any;
  }>({});

  useImperativeHandle(ref, () => ({
    open: async ({ title, record }) => {
      setConfig({ title, record });
      setVisible(true);

      if (onBeforeOpen) {
        setInitLoading(true);
        try {
          // 这里让父组件去执行具体的回显逻辑：比如 form.setFieldsValue
          await onBeforeOpen(record);
        } finally {
          setInitLoading(false);
        }
      }
    },
    close: () => setVisible(false),
  }));

  const handleOk = async () => {
    if (!onOk) return setVisible(false);

    setConfirmLoading(true);
    try {
      // 这里的 onOk 是父组件传进来的，它包含了：格式化 -> 调用 API -> 刷新列表
      await onOk(config.record);
      setVisible(false);
    } catch (error) {
      // 错误由具体的 API 调用处处理（message.error）
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <Modal
      {...restProps}
      title={config.title || restProps.title}
      open={visible}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={() => !confirmLoading && setVisible(false)}
      destroyOnHidden
    >
      <Spin spinning={initLoading}>
        <div style={{ minHeight: initLoading ? 120 : "auto" }}>
          {typeof children === "function" ? children(config.record) : children}
        </div>
      </Spin>
    </Modal>
  );
});

export default BaseModal;
