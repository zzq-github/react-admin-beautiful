import React from "react";
import { Button } from "antd";
import { Plus } from "lucide-react";
import PageContainer from "@/components/PageContainer";
import PagePanel from "@/components/PagePanel";
import Auth from "@/components/Auth";
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
    <PageContainer
      title="角色管理"
      subtitle="管理角色、菜单权限和数据权限范围。"
      action={
        <Auth code="system:role:create">
          <Button type="primary" icon={<Plus size={14} />} onClick={handleAddRole}>
            新增角色
          </Button>
        </Auth>
      }
    >
      <PagePanel>
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
        <div className="overflow-x-auto">
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
      </PagePanel>
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
    </PageContainer>
  );
};

export default RoleManagement;
