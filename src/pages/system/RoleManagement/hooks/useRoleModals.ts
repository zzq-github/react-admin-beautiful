import { useRef } from "react";
import { FormModalRef } from "@/components/FormModal/types";
import { BaseModalRef } from "@/components/BaseModal/types";

/**
 * 角色管理模态框引用自定义 Hook
 * 负责管理编辑角色、菜单权限、数据权限等模态框的引用
 */
export const useRoleModals = () => {
  const editRoleModalRef = useRef<FormModalRef>(null);
  const editMenuPermissionModalRef = useRef<BaseModalRef>(null);
  const editDataPermissonModalRef = useRef<BaseModalRef>(null);

  return {
    editRoleModalRef,
    editMenuPermissionModalRef,
    editDataPermissonModalRef,
  };
};
