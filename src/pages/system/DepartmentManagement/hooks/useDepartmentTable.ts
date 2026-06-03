import { useMemo } from "react";
import useQueryFilter from "@/hooks/useQueryFilter";
import useRequest from "@/hooks/useRequest";
import { getDepartmentList } from "@/api/system/department";
import { handleTree } from "@/utils/ruoyi";

/**
 * 部门表格自定义 Hook
 * 负责查询参数与表格请求的管理
 */
export const useDepartmentTable = () => {
  const query = useQueryFilter({});
  const request = useRequest({
    request: getDepartmentList,
    params: query.getParams(),
  });

  const departmentTree = useMemo(() => handleTree(request.data || [], "id"), [request.data]);

  return {
    query,
    request,
    departmentTree,
  };
};
