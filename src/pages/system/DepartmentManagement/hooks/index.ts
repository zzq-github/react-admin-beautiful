import { useDepartmentTable } from "./useDepartmentTable";
import { useUserList } from "./useUserList";
import { useDepartmentModals } from "./useDepartmentModals";
import { useDepartmentOperations } from "./useDepartmentOperations";

/**
 * 部门管理页面聚合 Hook
 * 组合表格查询、用户列表、操作函数等子 Hook，提供统一的接口
 */
export const useDepartmentManagement = () => {
  // 1. 表格与查询
  const { query, request, departmentTree } = useDepartmentTable();

  // 2. 用户列表（用于负责人选择）
  const { userRequest, userList } = useUserList();

  // 3. 模态框引用
  const modals = useDepartmentModals();

  // 4. 部门操作函数
  const operations = useDepartmentOperations(request, query, modals);

  return {
    // 数据
    query,
    request,
    departmentTree,
    userRequest,
    userList,
    // 操作
    handleEdit: operations.handleEdit,
    handleDelete: operations.handleDelete,
    handleAddDepartment: operations.handleAddDepartment,
    // 引用
    modalRef: modals.modalRef,
  };
};
