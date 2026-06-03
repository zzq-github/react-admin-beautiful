import React, { useCallback, useMemo, useRef, useState } from "react";
import { renderUserColumns } from "./schema/tableColumns";
import { renderUserQueryFields } from "./schema/queryFields";
import QueryFilter from "@/components/QueryFilter";
import BaseTable from "@/components/BaseTable";
import EditUserModal from "@/components/FormModal";
import { renderUserForm, renderPasswordForm } from "./schema/modalForms";
import PageHeader from "@/components/PageHeader";
import {  Tree } from "antd";
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

  // 其余部分保持不变
  return (
    <div className="space-y-6">
      {/* 页面标题区 */}
      <PageHeader
        title="用户管理"
        description="管理系统中的所有用户信息"
        buttons={[
          {
            label: "新增用户",
            icon: "plus" as const,
            type: "blue" as const,
            clickFunc: handleAddUser,
          },
        ]}
      />
      <div className="flex gap-6">
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="font-medium text-gray-700 mb-3">部门筛选</div>
            <Tree
              treeData={deptTreeNodeData}
              selectedKeys={selectedDeptId ? [selectedDeptId] : []}
              onSelect={handleTreeSelect}
              defaultExpandAll
            />
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col space-y-4">
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
            </div>

            <div className="overflow-x-auto mt-4">
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
          </div>
        </div>
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
    </div>
  );
};

export default UserManagement;
