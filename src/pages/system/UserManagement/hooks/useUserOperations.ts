import { useCallback } from "react";
import { message } from "antd";
import { UserRespVO } from "@/api/system/user/types";
import {
  deleteUser,
  updateUserStatus,
  updateUserPassword,
  createUser,
  updateUser,
} from "@/api/system/user";
import { FormModalRef } from "@/components/FormModal/types";
import { BaseModalRef } from "@/components/BaseModal/types";

/**
 * 用户操作自定义 Hook
 * 负责处理用户相关的增删改查、状态修改、密码修改、分配角色等操作
 */
export const useUserOperations = (
  table: any,
  modalRefs: {
    modalRef: React.RefObject<FormModalRef>;
    passwordModalRef: React.RefObject<FormModalRef>;
    assignRoleModalRef: React.RefObject<BaseModalRef>;
  }
) => {
  const { modalRef, passwordModalRef, assignRoleModalRef } = modalRefs;

  const handleEdit = useCallback((record: UserRespVO) => {
    modalRef.current?.open({
      title: "编辑用户",
      record,
      api: updateUser,
    });
  }, [modalRef]);

  const handleDelete = useCallback((record: UserRespVO) => {
    deleteUser(record.id).then(() => {
      message.success("删除成功");
      table.reload();
    });
  }, [table]);

  const handleStatusChange = useCallback(
    (record: UserRespVO, status: number) => {
      updateUserStatus({ id: record.id, status }).then(() => {
        table.reload();
      });
    },
    [table]
  );

  const handlePasswordChange = useCallback((record: UserRespVO) => {
    passwordModalRef.current?.open({
      title: "修改密码",
      record,
      api: updateUserPassword,
      transform: (values: any) => {
        const { confirmPassword, ...rest } = values;
        return rest;
      },
    });
  }, [passwordModalRef]);

  const handleAssignRole = useCallback((record: UserRespVO) => {
    assignRoleModalRef.current?.open({
      title: `分配角色 - ${record.nickname} (${record.username})`,
      record,
    });
  }, [assignRoleModalRef]);

  const handleAddUser = useCallback(() => {
    modalRef.current?.open({
      title: "新增用户",
      record: { status: 0 },
      api: createUser,
    });
  }, [modalRef]);

  return {
    handleEdit,
    handleDelete,
    handleStatusChange,
    handlePasswordChange,
    handleAssignRole,
    handleAddUser,
  };
};