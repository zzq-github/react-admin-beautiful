import { useCallback } from "react";
import { message } from "antd";
import { DeptRespVO } from "@/api/system/department/types";
import { addDepartment, deleteDepartment, updateDepartment } from "@/api/system/department";
import { FormModalRef } from "@/components/FormModal/types";

/**
 * 部门操作自定义 Hook
 * 负责处理部门相关的增删改查操作
 */
export const useDepartmentOperations = (
  request: any,
  query: any,
  modalRefs: {
    modalRef: React.RefObject<FormModalRef>;
  }
) => {
  const { modalRef } = modalRefs;

  const handleEdit = useCallback((record: DeptRespVO) => {
    modalRef.current?.open({
      title: "编辑部门",
      record,
      api: updateDepartment,
    });
  }, [modalRef]);

  const handleDelete = useCallback((record: DeptRespVO) => {
    deleteDepartment(record.id as number).then(() => {
      request.fetchData(query.getParams());
    });
  }, [request, query]);

  const handleAddDepartment = useCallback(() => {
    modalRef.current?.open({
      title: "新增部门",
      record: { status: 0 },
      api: addDepartment,
    });
  }, [modalRef]);

  return {
    handleEdit,
    handleDelete,
    handleAddDepartment,
  };
};
