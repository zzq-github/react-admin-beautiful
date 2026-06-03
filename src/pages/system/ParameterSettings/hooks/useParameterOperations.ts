import { useCallback } from "react";
import { message } from "antd";
import { ConfigRespVO } from "@/api/system/parameterSettings/types";
import { addConfig, deleteConfig, updateConfig } from "@/api/system/parameterSettings";
import { FormModalRef } from "@/components/FormModal/types";

/**
 * 参数操作自定义 Hook
 * 负责处理参数配置的增删改查操作
 */
export const useParameterOperations = (
  table: any,
  query: any,
  modalRefs: {
    modalRef: React.RefObject<FormModalRef>;
  }
) => {
  const { modalRef } = modalRefs;

  const handleEdit = useCallback((record: ConfigRespVO) => {
    modalRef.current?.open({
      title: "编辑参数",
      record,
      api: updateConfig,
    });
  }, [modalRef]);

  const handleDelete = useCallback((record: ConfigRespVO) => {
    deleteConfig(record.id).then(() => {
      table.reload();
    });
  }, [table]);

  const handleAddConfig = useCallback(() => {
    modalRef.current?.open({
      title: "新增参数",
      record: { visible: true },
      api: addConfig,
    });
  }, [modalRef]);

  return {
    handleEdit,
    handleDelete,
    handleAddConfig,
  };
};
