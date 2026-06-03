import { useMemo } from "react";
import useQueryFilter from "@/hooks/useQueryFilter";
import useRequest from "@/hooks/useRequest";
import { getListMenu } from "@/api/system/menu";
import { handleTree } from "@/utils/ruoyi";

/**
 * 菜单表格自定义 Hook
 * 负责查询参数与表格请求的管理
 */
export const useMenuTable = () => {
  const query = useQueryFilter({});
  const request = useRequest({
    request: getListMenu,
    params: query.getParams(),
  });

  const menuTree = useMemo(() => handleTree(request.data || [], "id"), [request.data]);

  return {
    query,
    request,
    menuTree,
  };
};
