import { useCallback } from "react";
import { message } from "antd";
import { RoleRespVO } from "@/api/system/role/types";
import { addRole, deleteRole, updateRole } from "@/api/system/role";
import { FormModalRef } from "@/components/FormModal/types";
import { BaseModalRef } from "@/components/BaseModal/types";

/**
 * 角色操作自定义 Hook
 * 负责处理角色的增删改查、菜单权限、数据权限等操作
 */
export const useRoleOperations = (
  table: any,
  query: any,
  modalRefs: {
    editRoleModalRef: React.RefObject<FormModalRef>;
    editMenuPermissionModalRef: React.RefObject<BaseModalRef>;
    editDataPermissonModalRef: React.RefObject<BaseModalRef>;
  }
) => {
  const { editRoleModalRef, editMenuPermissionModalRef, editDataPermissonModalRef } = modalRefs;

  const handleEdit = useCallback((record: RoleRespVO) => {
    editRoleModalRef.current?.open({
      title: "编辑角色",
      record,
      api: updateRole,
    });
  }, [editRoleModalRef]);

  const handleDelete = useCallback((record: RoleRespVO) => {
    deleteRole(record.id).then(() => {
      table.reload();
    });
  }, [table]);

  const handleEditMenuPermission = useCallback((record: RoleRespVO) => {
    editMenuPermissionModalRef.current?.open({
      title: "编辑菜单权限",
      record,
    });
  }, [editMenuPermissionModalRef]);

  const handleEditDataPermission = useCallback((record: RoleRespVO) => {
    editDataPermissonModalRef.current?.open({
      title: "编辑数据权限",
      record,
    });
  }, [editDataPermissonModalRef]);

  const handleAddRole = useCallback(() => {
    editRoleModalRef.current?.open({
      title: "新增角色",
      record: { status: 0 },
      api: addRole,
    });
  }, [editRoleModalRef]);

  return {
    handleEdit,
    handleDelete,
    handleEditMenuPermission,
    handleEditDataPermission,
    handleAddRole,
  };
};
