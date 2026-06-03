import { useRef } from "react";
import { FormModalRef } from "@/components/FormModal/types";

/**
 * 岗位管理模态框引用自定义 Hook
 * 负责管理新增/编辑模态框的引用
 */
export const usePositionModals = () => {
  const modalRef = useRef<FormModalRef>(null);

  return {
    modalRef,
  };
};
