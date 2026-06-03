import { Plus } from "lucide-react";
import QueryFilter from "@/components/QueryFilter";
import BaseTable from "@/components/BaseTable";
import EditDepartmentModal from "@/components/FormModal";
import { DepartmentColumns } from "./schema/tableColumns";
import { DepartmentFields } from "./schema/queryFields";
import { renderEditDepartmentForm } from "./schema/modalForms";
import PageHeader from "@/components/PageHeader";
import { useDepartmentManagement } from "./hooks";

const DepartmentManagement = () => {
  const {
    query,
    request,
    departmentTree,
    userList,
    handleEdit,
    handleDelete,
    handleAddDepartment,
    modalRef,
  } = useDepartmentManagement();

  return (
    <div className="space-y-6">
      <PageHeader
        title="部门管理"
        description="管理组织架构和部门信息"
        buttons={[
          {
            label: "新增部门",
            icon: "plus" as const,
            type: "blue" as const,
            clickFunc: handleAddDepartment,
          },
        ]}
      />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col space-y-4">
          <QueryFilter
            fields={DepartmentFields({})}
            onChange={query.onChange}
            onSearch={() => {
              request.fetchData(query.getParams());
            }}
            onReset={() => {
              query.reset();
              request.fetchData(query.getParams());
            }}
          />
        </div>
        <div className="overflow-x-auto">
          <BaseTable
            columns={DepartmentColumns({
              EditAction: handleEdit,
              DeleteAction: handleDelete,
            })}
            dataSource={departmentTree}
            loading={request.loading}
            pagination={false}
          />
        </div>
      </div>
      <EditDepartmentModal
        width={900}
        ref={modalRef}
        onSuccess={request.fetchData}
        // 直接传递一个渲染函数
        renderForm={(form) =>
          renderEditDepartmentForm({
            userListData: userList || [],
            departmentTree,
          })
        }
      />
    </div>
  );
};

export default DepartmentManagement;
