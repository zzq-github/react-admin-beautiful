import { useParameterTable } from "./useParameterTable";
import { useParameterModals } from "./useParameterModals";
import { useParameterOperations } from "./useParameterOperations";

/**
 * 参数管理页面聚合 Hook
 * 组合表格查询、操作函数等子 Hook，提供统一的接口
 */
export const useParameterSettings = () => {
  // 1. 表格与查询
  const { query, table } = useParameterTable();

  // 2. 模态框引用
  const modals = useParameterModals();

  // 3. 参数操作函数
  const operations = useParameterOperations(table, query, modals);

  return {
    // 数据
    query,
    table,
    // 操作
    handleEdit: operations.handleEdit,
    handleDelete: operations.handleDelete,
    handleAddConfig: operations.handleAddConfig,
    // 引用
    modalRef: modals.modalRef,
  };
};
