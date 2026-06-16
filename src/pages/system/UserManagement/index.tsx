import React from "react";
import { Button, Tree } from "antd";
import { Plus } from "lucide-react";
import { renderUserColumns } from "./schema/tableColumns";
import { renderUserQueryFields } from "./schema/queryFields";
import QueryFilter from "@/components/QueryFilter";
import BaseTable from "@/components/BaseTable";
import EditUserModal from "@/components/FormModal";
import { renderUserForm, renderPasswordForm } from "./schema/modalForms";
import PageContainer from "@/components/PageContainer";
import PagePanel from "@/components/PagePanel";
import AssignRoleModal from "./modal/AssignRoleModal";
import { useUserManagement } from "./hooks";

const UserManagement: React.FC = () => {
  const {
    deptTree,
    deptTreeNodeData,
    selectedDeptId,
    setSelectedDeptId,
    positionRequest,
    query,
    table,
    handleTreeSelect,
    handleEdit,
    handleDelete,
    handleStatusChange,
    handlePasswordChange,
    handleAssignRole,
    modalRef,
    passwordModalRef,
    assignRoleModalRef,
    handleAddUser,
  } = useUserManagement();

  return (
    <PageContainer
      title="用户管理"
      subtitle="管理系统用户账号、部门归属、岗位和角色授权。"
      action={
        <Button type="primary" icon={<Plus size={14} />} onClick={handleAddUser}>
          新增用户
        </Button>
      }
    >
      <div className="flex flex-col gap-4 xl:flex-row">
        <div className="w-full xl:w-64 xl:flex-shrink-0">
          <PagePanel title="部门筛选" bodyClassName="p-3">
            <Tree
              treeData={deptTreeNodeData}
              selectedKeys={selectedDeptId ? [selectedDeptId] : []}
              onSelect={handleTreeSelect}
              defaultExpandAll
            />
          </PagePanel>
        </div>

        <PagePanel className="min-w-0 flex-1">
          <QueryFilter
            fields={renderUserQueryFields({
              positionList: positionRequest.data || [],
            })}
            onChange={query.onChange}
            onSearch={() => {
              table.reload(query.getParams());
            }}
            onReset={() => {
              query.reset();
              setSelectedDeptId(undefined);
              table.reload(query.getParams());
            }}
          />

          <div className="overflow-x-auto">
            <BaseTable
              columns={renderUserColumns({
                EditAction: handleEdit,
                DeleteAction: handleDelete,
                StatusAction: handleStatusChange,
                PasswordAction: handlePasswordChange,
                AssignRoleAction: handleAssignRole,
              })}
              dataSource={table.data}
              loading={table.loading}
              pagination={table.pagination}
            />
          </div>
        </PagePanel>
      </div>

      <EditUserModal
        ref={modalRef}
        onSuccess={table.reload}
        renderForm={(form, isEdit) =>
          renderUserForm({
            form,
            isEdit,
            deptTree,
            positionList: positionRequest.data || [],
          })
        }
      />
      <EditUserModal
        ref={passwordModalRef}
        onSuccess={table.reload}
        renderForm={(form) => renderPasswordForm({ form })}
      />
      <AssignRoleModal
        assignRoleModalRef={assignRoleModalRef}
        refreshTable={table.reload}
      />
    </PageContainer>
  );
};

export default UserManagement;
