import { useRef } from "react";
import { FormModalRef } from "@/components/FormModal/types";
import { BaseModalRef } from "@/components/BaseModal/types";

/**
 * 用户管理模态框引用自定义 Hook
 * 负责管理新增/编辑、修改密码、分配角色等模态框的引用
 */
export const useUserModals = () => {
  const modalRef = useRef<FormModalRef>(null);
  const passwordModalRef = useRef<FormModalRef>(null);
  const assignRoleModalRef = useRef<BaseModalRef>(null);

  return {
    modalRef,
    passwordModalRef,
    assignRoleModalRef,
  };
};