import BaseModal from "@/components/BaseModal";
import { BaseModalRef } from "@/components/BaseModal/types";
import React, { useMemo, useRef, useState } from "react";
import { Checkbox, Form, message, Spin } from "antd";
import useRequest from "@/hooks/useRequest";
import { assignUserRole, listUserRoles } from "@/api/system/permission";
import { getRoleListAllSimple } from "@/api/system/role";
import { UserRespVO } from "@/api/system/user/types";

interface AssignRoleModalProps {
  assignRoleModalRef: React.RefObject<BaseModalRef>;
  refreshTable: () => void;
}

const AssignRoleModal: React.FC<AssignRoleModalProps> = ({
  assignRoleModalRef,
  refreshTable,
}) => {
  // 获取角色列表
  const roleListRes = useRequest({
    request: getRoleListAllSimple,
  });

  const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(false);

  // 初始化用户角色数据
  const handleBeforeOpen = async (record: UserRespVO) => {
    setLoadingRoles(true);
    try {
      const res = await listUserRoles(record.id);
      if (res.data) {
        setSelectedRoleIds(res.data);
      }
    } catch (error) {
      message.error("获取用户角色失败");
    } finally {
      setLoadingRoles(false);
    }
  };

  // 确定按钮
  const handleOk = async (record: UserRespVO) => {
    try {
      await assignUserRole({
        userId: record.id,
        roleIds: selectedRoleIds,
      });
      message.success("分配角色成功");
      refreshTable?.();
    } catch (error) {
      message.error("分配角色失败");
      throw error; // 让 BaseModal 保持打开状态
    }
  };

  const handleRoleCheckboxChange = (checkedValues: number[]) => {
    setSelectedRoleIds(checkedValues);
  };

  // 全选/全不选逻辑
  const allRoleIds = useMemo(() => {
    return (roleListRes.data || []).map((role: any) => role.id);
  }, [roleListRes.data]);

  const handleSelectAll = (checked: boolean) => {
    setSelectedRoleIds(checked ? allRoleIds : []);
  };

  return (
    <BaseModal
      ref={assignRoleModalRef}
      onBeforeOpen={handleBeforeOpen}
      onOk={handleOk}
      width={600}
    >
      {(record: UserRespVO) => (
        <Spin spinning={loadingRoles}>
          <div className="py-4">
            <div className="mb-4 text-gray-600">
              为用户 <span className="font-semibold">{record?.nickname}</span> (
              {record?.username}) 分配角色
            </div>
            <Form layout="vertical" component={false}>
              <Form.Item label="选择角色">
                <div className="mb-3">
                  <Checkbox
                    indeterminate={
                      selectedRoleIds.length > 0 &&
                      selectedRoleIds.length < allRoleIds.length
                    }
                    checked={
                      allRoleIds.length > 0 &&
                      selectedRoleIds.length === allRoleIds.length
                    }
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  >
                    全选/全不选
                  </Checkbox>
                </div>
                <Checkbox.Group
                  value={selectedRoleIds}
                  onChange={handleRoleCheckboxChange}
                  className="flex flex-col gap-3"
                >
                  {roleListRes.data?.map((role: any) => (
                    <Checkbox
                      key={role.id}
                      value={role.id}
                      className="py-1 hover:bg-gray-50 rounded px-2"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{role.name}</span>
                        <span className="text-gray-500 text-sm">
                          {role.code}
                        </span>
                      </div>
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </Form.Item>
              {roleListRes.loading && (
                <div className="text-center py-4">
                  <Spin size="small" />
                  <span className="ml-2">加载角色列表中...</span>
                </div>
              )}
              {!roleListRes.loading &&
                (!roleListRes.data || roleListRes.data.length === 0) && (
                  <div className="text-center py-4 text-gray-500">
                    暂无角色数据
                  </div>
                )}
            </Form>
          </div>
        </Spin>
      )}
    </BaseModal>
  );
};

export default AssignRoleModal;