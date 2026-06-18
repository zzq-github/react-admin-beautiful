import { Button } from "antd";
import { Plus } from "lucide-react";
import QueryFilter from "@/components/QueryFilter";
import BaseTable from "@/components/BaseTable";
import EditMenuModal from "@/components/FormModal";
import PageContainer from "@/components/PageContainer";
import PagePanel from "@/components/PagePanel";
import Auth from "@/components/Auth";
import { MenuColumns } from "./schema/tableColumns";
import { MenuFields } from "./schema/queryFields";
import { renderEditMenuForm } from "./schema/modalForms";
import { useMenuManagement } from "./hooks";

const MenuManagement = () => {
  const {
    query,
    request,
    menuTree,
    handleEdit,
    handleDelete,
    handleAddMenu,
    modalRef,
  } = useMenuManagement();

  return (
    <PageContainer
      title="菜单管理"
      subtitle="管理菜单结构、路由配置和按钮权限。"
      action={
        <Auth code="system:menu:create">
          <Button type="primary" icon={<Plus size={14} />} onClick={handleAddMenu}>
            新增菜单
          </Button>
        </Auth>
      }
    >
      <PagePanel>
        <QueryFilter
          fields={MenuFields({})}
          onChange={query.onChange}
          onSearch={() => {
            request.fetchData(query.getParams());
          }}
          onReset={() => {
            query.reset();
            request.fetchData(query.getParams());
          }}
        />
        <div className="overflow-x-auto">
          <BaseTable
            columns={MenuColumns({
              EditAction: handleEdit,
              DeleteAction: handleDelete,
            })}
            dataSource={menuTree}
            loading={request.loading}
            pagination={false}
          />
        </div>
      </PagePanel>
      <EditMenuModal
        width={900}
        ref={modalRef}
        onSuccess={request.fetchData}
        renderForm={(form) => renderEditMenuForm({ form, menuTree })}
      />
    </PageContainer>
  );
};

export default MenuManagement;
