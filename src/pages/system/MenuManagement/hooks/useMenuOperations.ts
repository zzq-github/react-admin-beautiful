import { useCallback } from "react";
import { message } from "antd";
import { MenuRespVO } from "@/api/system/menu/types";
import { addMenu, deleteMenu, updateMenu } from "@/api/system/menu";
import { FormModalRef } from "@/components/FormModal/types";

/**
 * 菜单操作自定义 Hook
 * 负责处理菜单的增删改查操作
 */
export const useMenuOperations = (
  request: any,
  query: any,
  modalRefs: {
    modalRef: React.RefObject<FormModalRef>;
  }
) => {
  const { modalRef } = modalRefs;

  const handleEdit = useCallback((record: MenuRespVO) => {
    modalRef.current?.open({
      title: "编辑菜单",
      record,
      api: updateMenu,
    });
  }, [modalRef]);

  const handleDelete = useCallback((record: MenuRespVO) => {
    deleteMenu(record.id).then(() => {
      request.fetchData(query.getParams());
    });
  }, [request, query]);

  const handleAddMenu = useCallback(() => {
    modalRef.current?.open({
      title: "新增菜单",
      record: { type: 1 },
      api: addMenu,
    });
  }, [modalRef]);

  return {
    handleEdit,
    handleDelete,
    handleAddMenu,
  };
};
