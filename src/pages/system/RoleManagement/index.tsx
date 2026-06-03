import React from "react";
import PageHeader from "@/components/PageHeader";
import QueryFilter from "@/components/QueryFilter";
import BaseTable from "@/components/BaseTable";
import FormModal from "@/components/FormModal";
import MenuPermissonModal from "./modal/MenuPermissonModal";
import DataPermissonModal from "./modal/DataPermissonModal";
import { renderRoleQueryFields } from "./schema/queryFields";
import { renderRoleColumns } from "./schema/tableColumns";
import { renderRoleForm } from "./schema/modalForms";
import { useRoleManagement } from "./hooks";

const RoleManagement: React.FC = () => {
  const {
    query,
    table,
    handleEdit,
    handleDelete,
    handleEditMenuPermission,
    handleEditDataPermission,
    handleAddRole,
    editRoleModalRef,
    editMenuPermissionModalRef,
    editDataPermissonModalRef,
  } = useRoleManagement();

  return (
    <div className="space-y-6">
      <PageHeader
        title="角色管理"
        description="管理系统角色权限和用户分配"
        buttons={[
          {
            label: "新增角色",
            icon: "plus" as const,
            type: "blue" as const,
            clickFunc: handleAddRole,
          },
        ]}
      />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col space-y-4">
          <QueryFilter
            fields={renderRoleQueryFields()}
            onChange={query.onChange}
            onSearch={() => {
              table.reload(query.getParams());
            }}
            onReset={() => {
              query.reset();
              table.reload(query.getParams());
            }}
          />
        </div>
        <div className="overflow-x-auto mt-4">
          <BaseTable
            columns={renderRoleColumns({
              EditAction: handleEdit,
              DeleteAction: handleDelete,
              handleEditMenuPermission,
              handleEditDataPermission,
            })}
            dataSource={table.data}
            loading={table.loading}
            pagination={table.pagination}
          />
        </div>
      </div>
      <FormModal
        ref={editRoleModalRef}
        onSuccess={table.reload}
        renderForm={renderRoleForm}
      />
      <MenuPermissonModal
        editMenuPermissionModalRef={editMenuPermissionModalRef}
        refreshTable={table.reload}
      />
      <DataPermissonModal
        editDataPermissonModalRef={editDataPermissonModalRef}
        refreshTable={table.reload}
      />
    </div>
  );
};

export default RoleManagement;
