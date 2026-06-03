import { useMenuTable } from "./useMenuTable";
import { useMenuModals } from "./useMenuModals";
import { useMenuOperations } from "./useMenuOperations";

/**
 * 菜单管理页面聚合 Hook
 * 组合表格查询、操作函数等子 Hook，提供统一的接口
 */
export const useMenuManagement = () => {
  // 1. 表格与查询
  const { query, request, menuTree } = useMenuTable();

  // 2. 模态框引用
  const modals = useMenuModals();

  // 3. 菜单操作函数
  const operations = useMenuOperations(request, query, modals);

  return {
    // 数据
    query,
    request,
    menuTree,
    // 操作
    handleEdit: operations.handleEdit,
    handleDelete: operations.handleDelete,
    handleAddMenu: operations.handleAddMenu,
    // 引用
    modalRef: modals.modalRef,
  };
};
