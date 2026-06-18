import React, { useMemo, useRef, useState } from 'react';
import { Button, Input, Popconfirm, Progress, Select, Space, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Archive, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import type { FormInstance } from 'antd';
import Auth from '@/components/Auth';
import BaseTable from '@/components/BaseTable';
import FormModal from '@/components/FormModal';
import type { FormModalRef } from '@/components/FormModal/types';
import PageContainer from '@/components/PageContainer';
import PagePanel from '@/components/PagePanel';
import QueryFilter from '@/components/QueryFilter';
import SchemaForm from '@/components/SchemaForm';
import useQueryFilter from '@/hooks/useQueryFilter';
import useTableRequest from '@/hooks/useTableRequest';
import {
  createExampleProject,
  deleteExampleProject,
  deleteExampleProjectList,
  getExampleProjectPage,
  updateExampleProject,
} from '@/api/examples/project';
import type {
  ExampleProjectCategory,
  ExampleProjectPageReq,
  ExampleProjectResp,
  ExampleProjectStatus,
} from '@/api/examples/project/types';

const categoryOptions: Array<{ label: string; value: ExampleProjectCategory }> = [
  { label: '控制台', value: 'console' },
  { label: '工作流', value: 'workflow' },
  { label: '报表', value: 'report' },
];

const statusOptions: Array<{ label: string; value: ExampleProjectStatus }> = [
  { label: '启用', value: 'enabled' },
  { label: '停用', value: 'disabled' },
  { label: '草稿', value: 'draft' },
];

const categoryLabels = Object.fromEntries(
  categoryOptions.map((item) => [item.value, item.label]),
) as Record<ExampleProjectCategory, string>;

const statusMap: Record<ExampleProjectStatus, { color: string; label: string }> = {
  enabled: { color: 'success', label: '启用' },
  disabled: { color: 'default', label: '停用' },
  draft: { color: 'warning', label: '草稿' },
};

const BasicList: React.FC = () => {
  const modalRef = useRef<FormModalRef>(null);
  const query = useQueryFilter<ExampleProjectPageReq>({});
  const table = useTableRequest<ExampleProjectPageReq, ExampleProjectResp>({
    request: getExampleProjectPage,
    params: query.getParams(),
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const enabledCount = table.data.filter((item) => item.status === 'enabled').length;
  const averageProgress =
    table.data.length > 0
      ? Math.round(table.data.reduce((sum, item) => sum + item.progress, 0) / table.data.length)
      : 0;

  const handleAdd = () => {
    modalRef.current?.open({
      title: '新增项目',
      description: '演示新增接口、表单校验和成功后刷新列表。',
      record: {
        category: 'console',
        status: 'enabled',
        progress: 0,
      },
      api: createExampleProject,
    });
  };

  const handleEdit = (record: ExampleProjectResp) => {
    modalRef.current?.open({
      title: '编辑项目',
      description: '演示编辑接口与 FormModal 复用。',
      record,
      api: updateExampleProject,
    });
  };

  const handleDelete = async (record: ExampleProjectResp) => {
    await deleteExampleProject(record.id);
    message.success('删除成功');
    table.reload(query.getParams());
  };

  const handleBatchDelete = async () => {
    await deleteExampleProjectList(selectedRowKeys.map(Number));
    message.success('批量删除成功');
    setSelectedRowKeys([]);
    table.reload(query.getParams());
  };

  const columns: ColumnsType<ExampleProjectResp> = useMemo(
    () => [
      {
        title: '项目名称',
        dataIndex: 'name',
        render: (name: string, record) => (
          <div>
            <div className="font-medium text-theme-text">{name}</div>
            <div className="text-xs text-theme-text-tertiary">
              #{record.id} · {categoryLabels[record.category]}
            </div>
          </div>
        ),
      },
      {
        title: '负责人',
        dataIndex: 'owner',
        width: 140,
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 120,
        render: (status: ExampleProjectStatus) => {
          const option = statusMap[status];
          return <Tag color={option.color}>{option.label}</Tag>;
        },
      },
      {
        title: '进度',
        dataIndex: 'progress',
        width: 180,
        render: (progress: number) => <Progress percent={progress} size="small" />,
      },
      {
        title: '更新时间',
        dataIndex: 'updatedAt',
        width: 140,
      },
      {
        title: '操作',
        key: 'action',
        width: 160,
        render: (_, record) => (
          <Space>
            <Auth code="example:project:update">
              <Button type="link" className="!px-0" onClick={() => handleEdit(record)}>
                编辑
              </Button>
            </Auth>
            <Auth code="example:project:delete">
              <Popconfirm
                title="提示"
                description="确定删除该项目？"
                okText="删除"
                cancelText="取消"
                onConfirm={() => handleDelete(record)}
              >
                <Button type="link" danger className="!px-0">
                  删除
                </Button>
              </Popconfirm>
            </Auth>
          </Space>
        ),
      },
    ],
    [query, table],
  );

  return (
    <PageContainer
      title="CRUD 示例"
      subtitle="打通后端菜单、动态路由、接口请求、分页表格、弹窗表单和按钮权限。"
      action={
        <Auth code="example:project:create">
          <Button type="primary" icon={<Plus size={14} />} onClick={handleAdd}>
            新增项目
          </Button>
        </Auth>
      }
    >
      <div className="mb-4 grid gap-3 md:grid-cols-3">
        <PagePanel bodyClassName="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-theme-primary-bg text-theme-primary">
              <Archive size={18} />
            </div>
            <div>
              <div className="text-xs text-theme-text-tertiary">当前页项目</div>
              <div className="text-xl font-semibold text-theme-text">{table.data.length}</div>
            </div>
          </div>
        </PagePanel>
        <PagePanel bodyClassName="p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-theme-success-bg text-theme-success">
              <CheckCircle2 size={18} />
            </div>
            <div>
              <div className="text-xs text-theme-text-tertiary">启用项目</div>
              <div className="text-xl font-semibold text-theme-text">{enabledCount}</div>
            </div>
          </div>
        </PagePanel>
        <PagePanel bodyClassName="p-4">
          <div className="text-xs text-theme-text-tertiary">平均进度</div>
          <Progress percent={averageProgress} size="small" className="mt-2" />
        </PagePanel>
      </div>

      <PagePanel>
        <QueryFilter
          title="筛选条件"
          description="查询参数会传入接口，列表由 useTableRequest 统一处理分页。"
          span={8}
          fields={[
            {
              name: 'keyword',
              label: '关键词',
              component: <Input allowClear placeholder="项目名称 / 负责人" />,
            },
            {
              name: 'status',
              label: '状态',
              component: <Select allowClear placeholder="全部状态" options={statusOptions} />,
            },
            {
              name: 'category',
              label: '分类',
              component: <Select allowClear placeholder="全部分类" options={categoryOptions} />,
            },
          ]}
          onChange={query.onChange}
          onSearch={() => table.reload(query.getParams())}
          onReset={() => {
            query.reset();
            table.reload({});
          }}
        />

        <div className="overflow-x-auto">
          <BaseTable<ExampleProjectResp>
            rowKey="id"
            toolbarTitle="项目列表"
            toolbarDescription={`接口返回共 ${table.pagination.total} 条记录`}
            toolbarActions={
              <Auth code="example:project:delete">
                <Popconfirm
                  title="提示"
                  description={`确定删除选中的 ${selectedRowKeys.length} 个项目？`}
                  okText="删除"
                  cancelText="取消"
                  disabled={selectedRowKeys.length === 0}
                  onConfirm={handleBatchDelete}
                >
                  <Button
                    danger
                    icon={<Trash2 size={14} />}
                    disabled={selectedRowKeys.length === 0}
                  >
                    批量删除
                  </Button>
                </Popconfirm>
              </Auth>
            }
            showRefresh
            onRefresh={() => table.reload(query.getParams())}
            columns={columns}
            dataSource={table.data}
            loading={table.loading}
            pagination={table.pagination}
            showSelection
            onSelectionChange={(keys) => setSelectedRowKeys(keys)}
          />
        </div>
      </PagePanel>

      <FormModal
        ref={modalRef}
        onSuccess={() => table.reload(query.getParams())}
        renderForm={(form, isEdit) => renderProjectForm(form, isEdit)}
      />
    </PageContainer>
  );
};

function renderProjectForm(form: FormInstance, isEdit: boolean) {
  return (
    <SchemaForm
      form={form}
      column={2}
      items={[
        {
          name: 'name',
          label: '项目名称',
          type: 'input',
          span: 12,
          rules: [{ required: true, message: '请输入项目名称' }],
        },
        {
          name: 'owner',
          label: '负责人',
          type: 'input',
          span: 12,
          rules: [{ required: true, message: '请输入负责人' }],
        },
        {
          name: 'category',
          label: '分类',
          type: 'select',
          span: 12,
          options: categoryOptions,
          rules: [{ required: true, message: '请选择分类' }],
        },
        {
          name: 'status',
          label: '状态',
          type: 'select',
          span: 12,
          options: statusOptions,
          rules: [{ required: true, message: '请选择状态' }],
        },
        {
          name: 'progress',
          label: '进度',
          type: 'number',
          span: 12,
          rules: [{ required: true, message: '请输入进度' }],
          componentProps: {
            min: 0,
            max: 100,
            addonAfter: '%',
          },
        },
        {
          name: 'description',
          label: '说明',
          type: 'textarea',
          span: 24,
          componentProps: {
            rows: 3,
            placeholder: isEdit ? '补充项目变更说明' : '补充项目说明',
          },
        },
      ]}
    />
  );
}

export default BasicList;
