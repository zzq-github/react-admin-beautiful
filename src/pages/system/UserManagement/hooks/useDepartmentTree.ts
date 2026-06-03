import { useMemo, useState } from "react";
import useRequest from "@/hooks/useRequest";
import { getListSimpleDepartments } from "@/api/system/department";
import { handleTree } from "@/utils/ruoyi";
import { convert } from "@/utils/transfer";

/**
 * 部门树自定义 Hook
 * 负责部门树数据的获取、转换、选中状态管理
 */
export const useDepartmentTree = () => {
  // 部门数据请求
  const deptRequest = useRequest({
    request: getListSimpleDepartments,
  });

  // 部门树结构
  const deptTree = useMemo(() => handleTree(deptRequest.data || [], "id"), [deptRequest.data]);

  // 部门树节点数据（用于 Antd Tree 组件）
  const deptTreeNodeData = useMemo(() => {
    if (!deptTree) return [];
    return convert(deptTree);
  }, [deptTree]);

  // 选中的部门ID
  const [selectedDeptId, setSelectedDeptId] = useState<string | undefined>(undefined);

  return {
    deptRequest,
    deptTree,
    deptTreeNodeData,
    selectedDeptId,
    setSelectedDeptId,
  };
};