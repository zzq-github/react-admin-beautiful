import useRequest from "@/hooks/useRequest";
import { getUsersSimpleList } from "@/api/system/user";

/**
 * 用户列表自定义 Hook
 * 负责获取用户简单列表（用于负责人选择等）
 */
export const useUserList = () => {
  const request = useRequest({
    request: getUsersSimpleList,
  });

  return {
    userRequest: request,
    userList: request.data || [],
  };
};
