import { useDictTable } from "./useDictTable";
import { useDictModals } from "./useDictModals";
import { useDictOperations } from "./useDictOperations";

/**
 * 字典管理页面聚合 Hook
 * 组合表格查询、操作函数等子 Hook，提供统一的接口
 */
export const useDictManagement = () => {
  // 1. 表格与查询
  const { query, table } = useDictTable();

  // 2. 模态框引用
  const modals = useDictModals();

  // 3. 字典操作函数
  const operations = useDictOperations(table, query, modals);

  return {
    // 数据
    query,
    table,
    // 操作
    handleEdit: operations.handleEdit,
    handleDelete: operations.handleDelete,
    handleAddDictType: operations.handleAddDictType,
    // 引用
    modalRef: modals.modalRef,
  };
};
