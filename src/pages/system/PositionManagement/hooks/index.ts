import { usePositionTable } from "./usePositionTable";
import { usePositionModals } from "./usePositionModals";
import { usePositionOperations } from "./usePositionOperations";

/**
 * 岗位管理页面聚合 Hook
 * 组合表格查询、操作函数等子 Hook，提供统一的接口
 */
export const usePositionManagement = () => {
  // 1. 表格与查询
  const { query, table } = usePositionTable();

  // 2. 模态框引用
  const modals = usePositionModals();

  // 3. 岗位操作函数
  const operations = usePositionOperations(table, query, modals);

  return {
    // 数据
    query,
    table,
    // 操作
    handleEdit: operations.handleEdit,
    handleDelete: operations.handleDelete,
    handleAddPosition: operations.handleAddPosition,
    // 引用
    modalRef: modals.modalRef,
  };
};
