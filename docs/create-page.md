# 创建页面指南

这份指南说明如何在模板中新增页面，并接入动态菜单、额外路由、按钮权限和图表组件。

## 1. 创建页面目录

推荐每个页面使用一个独立目录，并把页面入口命名为 `index.tsx`：

```text
src/pages/examples/BasicList/index.tsx
```

最小页面示例：

```tsx
import React from 'react';
import PageContainer from '@/components/PageContainer';
import PagePanel from '@/components/PagePanel';

const BasicList: React.FC = () => {
  return (
    <PageContainer title="Basic List" subtitle="页面说明">
      <PagePanel>页面内容</PagePanel>
    </PageContainer>
  );
};

export default BasicList;
```

## 2. 配置动态菜单页面

普通菜单页由后端菜单或 Mock 菜单驱动。菜单中的 `component` 要对应 `src/pages` 下的页面路径：

```ts
{
  name: 'CRUD 示例',
  path: 'basic-list',
  component: 'examples/BasicList/index',
  permission: 'example:project:list',
  type: 2,
  visible: true
}
```

如果父级目录 path 是 `/examples`，最终路由会是：

```text
/examples/basic-list
```

动态路由扫描支持这些入口：

```text
src/pages/**/index.tsx
src/pages/**/index.jsx
src/pages/*.tsx
src/pages/*.jsx
```

## 3. 配置额外路由页面

有些页面不适合出现在菜单里，但需要能从页面内部跳转访问，例如字典类型下的字典数据页。这类页面统一放在：

```text
src/router/extraRoutes.tsx
```

示例：

```tsx
const DetailPage = lazy(() => import('@/pages/example/DetailPage'));

export const extraRoutes = [
  {
    path: 'examples/detail/:id',
    element: withPageLoading(<DetailPage />),
  },
];
```

`extraRoutes` 会自动注册到主路由里，并且动态路由会跳过这些路径，避免重复注册。

## 4. 使用页面容器

业务页面优先使用 `PageContainer` 统一标题、说明和右侧操作区：

```tsx
<PageContainer
  title="用户管理"
  subtitle="管理用户账号、部门归属和角色授权。"
  action={<Button type="primary">新增</Button>}
>
  页面主体
</PageContainer>
```

需要承载表格、表单或图表时，使用 `PagePanel` 保持视觉结构一致。

## 5. 创建 CRUD 列表页

常见列表页组合：

```tsx
<QueryFilter
  fields={[
    {
      name: "keyword",
      label: "关键词",
      component: <Input allowClear placeholder="请输入关键词" />,
    },
  ]}
  onChange={setQuery}
  onSearch={reload}
  onReset={reset}
/>

<BaseTable
  rowKey="id"
  columns={columns}
  dataSource={data}
  pagination={pagination}
/>
```

完整示例见：

```text
src/pages/examples/BasicList/index.tsx
```

这个示例已经打通一条完整模板链路：

- 页面：`src/pages/examples/BasicList/index.tsx`
- 接口：`src/api/examples/project`
- Mock：`src/mock/handlers/examples.ts`
- 菜单：`src/mock/handlers/auth.ts` 中的 `CRUD 示例`
- 权限码：`example:project:create`、`example:project:update`、`example:project:delete`

页面使用 `useQueryFilter` 管理查询参数，使用 `useTableRequest` 统一请求分页数据，使用 `FormModal + SchemaForm` 复用新增和编辑表单：

```tsx
const query = useQueryFilter<ProjectPageReq>({});
const table = useTableRequest<ProjectPageReq, ProjectResp>({
  request: getProjectPage,
  params: query.getParams(),
});
```

新增和编辑共用一个弹窗，只需要在打开时传入不同的 `api`：

```tsx
modalRef.current?.open({
  title: '新增项目',
  record: { status: 'enabled' },
  api: createProject,
});

modalRef.current?.open({
  title: '编辑项目',
  record,
  api: updateProject,
});
```

## 6. 添加页面和按钮权限

模板提供页面权限和按钮权限两层控制。

页面权限由动态菜单中的 `permission` 字段驱动。如果用户直接访问没有权限的动态路由，会展示 `PageState type="forbidden"`：

```ts
{
  name: 'CRUD 示例',
  path: 'basic-list',
  component: 'examples/BasicList/index',
  permission: 'example:project:list',
  type: 2
}
```

按钮权限使用 `<Auth>` 和 `usePermission`。Mock 环境默认返回显式权限码，便于观察按钮权限效果。

组件写法：

```tsx
import Auth from '@/components/Auth';

<Auth code="system:user:create">
  <Button type="primary">新增</Button>
</Auth>;
```

CRUD 示例使用：

```tsx
<Auth code="example:project:create">
  <Button type="primary">新增项目</Button>
</Auth>
```

后端菜单中可以把按钮权限作为 `type: 3` 节点放在页面菜单下面。按钮节点不会进入侧栏，也不会生成路由：

```ts
{
  name: '新增项目',
  type: 3,
  permission: 'example:project:create'
}
```

如果后端不返回单独的 `permissions` 数组，也可以在 `src/core/adapters/auth.ts` 中从按钮菜单节点提取 `permission` 字段，统一收口到 `AdminPermissionInfo.permissions`。

多个权限：

```tsx
<Auth code={['system:user:create', 'system:user:update']} mode="any">
  <Button>维护用户</Button>
</Auth>
```

Hook 写法：

```tsx
import { usePermission } from '@/hooks/usePermission';

const { hasPermission } = usePermission();
const canDelete = hasPermission('system:user:delete');
```

## 7. 创建图表页

轻量图表封装位于：

```text
src/components/Charts
```

面积趋势图：

```tsx
<TrendAreaChart
  data={trendData}
  series={[
    { dataKey: 'visits', name: '访问量', color: 'var(--color-primary)' },
    { dataKey: 'orders', name: '任务量', color: 'var(--color-success)' },
  ]}
/>
```

柱状图：

```tsx
<SimpleBarChart data={trendData} dataKey="orders" name="任务量" height={220} />
```

图表封装只统一响应式容器、坐标轴、网格和 tooltip 样式。复杂图表仍然可以直接使用 Recharts 或按项目需要扩展封装。

## 8. 创建表单页

简单表单可以直接使用 Ant Design `Form`；配置化表单推荐使用 `SchemaForm`：

```tsx
<SchemaForm
  form={form}
  column={2}
  items={[
    {
      name: 'name',
      label: '名称',
      type: 'input',
      rules: [{ required: true, message: '请输入名称' }],
    },
  ]}
/>
```

完整示例见：

```text
src/pages/examples/FormDemo/index.tsx
```

## 9. 组织复杂业务页

复杂 CRUD 页面推荐按下面结构拆分：

```text
src/pages/example/FooManagement/
├── index.tsx
├── hooks/
│   └── useFooManagement.ts
└── schema/
    ├── queryFields.tsx
    ├── tableColumns.tsx
    └── modalForms.tsx
```

页面只负责组合 UI；请求、弹窗、操作函数放在 hooks；查询项、表格列、表单项放在 schema。
