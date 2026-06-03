import { useCallback } from "react";
import { message } from "antd";
import { PositionRespVO } from "@/api/system/position/types";
import { addPosition, deletePosition, updatePosition } from "@/api/system/position";
import { FormModalRef } from "@/components/FormModal/types";

/**
 * 岗位操作自定义 Hook
 * 负责处理岗位的增删改查操作
 */
export const usePositionOperations = (
  table: any,
  query: any,
  modalRefs: {
    modalRef: React.RefObject<FormModalRef>;
  }
) => {
  const { modalRef } = modalRefs;

  const handleEdit = useCallback((record: PositionRespVO) => {
    modalRef.current?.open({
      title: "编辑岗位",
      record,
      api: updatePosition,
    });
  }, [modalRef]);

  const handleDelete = useCallback((record: PositionRespVO) => {
    deletePosition(record.id).then(() => {
      table.reload();
    });
  }, [table]);

  const handleAddPosition = useCallback(() => {
    modalRef.current?.open({
      title: "新增岗位",
      record: { status: 0 },
      api: addPosition,
    });
  }, [modalRef]);

  return {
    handleEdit,
    handleDelete,
    handleAddPosition,
  };
};
