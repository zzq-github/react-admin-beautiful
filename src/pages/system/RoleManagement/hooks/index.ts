import { useRoleTable } from "./useRoleTable";
import { useRoleModals } from "./useRoleModals";
import { useRoleOperations } from "./useRoleOperations";

/**
 * 角色管理页面聚合 Hook
 * 组合表格查询、操作函数等子 Hook，提供统一的接口
 */
export const useRoleManagement = () => {
  // 1. 表格与查询
  const { query, table } = useRoleTable();

  // 2. 模态框引用
  const modals = useRoleModals();

  // 3. 角色操作函数
  const operations = useRoleOperations(table, query, modals);

  return {
    // 数据
    query,
    table,
    // 操作
    handleEdit: operations.handleEdit,
    handleDelete: operations.handleDelete,
    handleEditMenuPermission: operations.handleEditMenuPermission,
    handleEditDataPermission: operations.handleEditDataPermission,
    handleAddRole: operations.handleAddRole,
    // 引用
    editRoleModalRef: modals.editRoleModalRef,
    editMenuPermissionModalRef: modals.editMenuPermissionModalRef,
    editDataPermissonModalRef: modals.editDataPermissonModalRef,
  };
};
