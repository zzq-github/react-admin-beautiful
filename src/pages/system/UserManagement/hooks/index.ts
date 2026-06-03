import { useCallback } from "react";
import type { Key } from "react";
import { useDepartmentTree } from "./useDepartmentTree";
import { usePositionList } from "./usePositionList";
import { useUserTable } from "./useUserTable";
import { useUserModals } from "./useUserModals";
import { useUserOperations } from "./useUserOperations";

/**
 * 用户管理页面聚合 Hook
 * 组合部门树、岗位列表、表格查询、操作函数等子 Hook，提供统一的接口
 */
export const useUserManagement = () => {
  // 1. 部门树
  const deptTree = useDepartmentTree();

  // 2. 岗位列表
  const position = usePositionList();

  // 3. 表格与查询
  const { query, table } = useUserTable();

  // 4. 模态框引用
  const modals = useUserModals();

  // 5. 用户操作函数
  const operations = useUserOperations(table, modals);

  // 6. 部门树选择处理（依赖 query 和 table）
  const handleTreeSelect = useCallback(
    (selectedKeys: Key[]) => {
      const deptId = selectedKeys.length > 0 ? String(selectedKeys[0]) : undefined;
      deptTree.setSelectedDeptId(deptId);
      query.onChange({ deptId });
      table.reload(query.getParams());
    },
    [deptTree, query, table]
  );

  return {
    // 数据
    deptTree: deptTree.deptTree,
    deptTreeNodeData: deptTree.deptTreeNodeData,
    selectedDeptId: deptTree.selectedDeptId,
    setSelectedDeptId: deptTree.setSelectedDeptId,
    positionList: position.positionList,
    query,
    table,
    // 操作
    handleTreeSelect,
    handleEdit: operations.handleEdit,
    handleDelete: operations.handleDelete,
    handleStatusChange: operations.handleStatusChange,
    handlePasswordChange: operations.handlePasswordChange,
    handleAssignRole: operations.handleAssignRole,
    handleAddUser: operations.handleAddUser,
    // 引用
    modalRef: modals.modalRef,
    passwordModalRef: modals.passwordModalRef,
    assignRoleModalRef: modals.assignRoleModalRef,
    // 原始请求（可选）
    deptRequest: deptTree.deptRequest,
    positionRequest: position.positionRequest,
  };
};