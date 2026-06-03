import useRequest from "@/hooks/useRequest";
import { getPositionListAllSimple } from "@/api/system/position";

/**
 * 岗位列表自定义 Hook
 * 负责岗位列表数据的获取
 */
export const usePositionList = () => {
  const positionRequest = useRequest({
    request: getPositionListAllSimple,
  });

  const positionList = positionRequest.data || [];

  return {
    positionRequest,
    positionList,
  };
};