import { useCallback } from "react";
import { message } from "antd";
import { DictTypeRespVO } from "@/api/system/dict/types";
import { addDictType, deleteDictType, updateDictType } from "@/api/system/dict";
import { FormModalRef } from "@/components/FormModal/types";

/**
 * 字典操作自定义 Hook
 * 负责处理字典类型的增删改查操作
 */
export const useDictOperations = (
  table: any,
  query: any,
  modalRefs: {
    modalRef: React.RefObject<FormModalRef>;
  }
) => {
  const { modalRef } = modalRefs;

  const handleEdit = useCallback((record: DictTypeRespVO) => {
    modalRef.current?.open({
      title: "编辑字典类型",
      record,
      api: updateDictType,
    });
  }, [modalRef]);

  const handleDelete = useCallback((record: DictTypeRespVO) => {
    deleteDictType(record.id).then(() => {
      table.reload(query.getParams());
    });
  }, [table, query]);

  const handleAddDictType = useCallback(() => {
    modalRef.current?.open({
      title: "新增字典类型",
      record: { status: 0 },
      api: addDictType,
    });
  }, [modalRef]);

  return {
    handleEdit,
    handleDelete,
    handleAddDictType,
  };
};
