# 创建页面指南

这份指南说明如何在模板中新增页面，并接入动态菜单、额外路由、按钮权限和图表组件。

## 1. 创建页面目录

推荐每个页面使用一个独立目录，并把页面入口命名为 `index.tsx`：

```text
src/pages/examples/BasicList/index.tsx
```

最小页面示例：

```tsx
import React from "react";
import PageContainer from "@/components/PageContainer";
import PagePanel from "@/components/PagePanel";

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
  name: "Basic List",
  path: "basic-list",
  component: "examples/BasicList/index",
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
const DetailPage = lazy(() => import("@/pages/example/DetailPage"));

export const extraRoutes = [
  {
    path: "examples/detail/:id",
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

## 5. 创建列表页

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

## 6. 添加按钮权限

模板提供 `<Auth>` 和 `usePermission` 两种写法。Mock 环境默认返回 `["*"]`，表示全部放行。

组件写法：

```tsx
import Auth from "@/components/Auth";

<Auth code="system:user:create">
  <Button type="primary">新增</Button>
</Auth>
```

多个权限：

```tsx
<Auth code={["system:user:create", "system:user:update"]} mode="any">
  <Button>维护用户</Button>
</Auth>
```

Hook 写法：

```tsx
import { usePermission } from "@/hooks/usePermission";

const { hasPermission } = usePermission();
const canDelete = hasPermission("system:user:delete");
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
    { dataKey: "visits", name: "访问量", color: "var(--color-primary)" },
    { dataKey: "orders", name: "任务量", color: "var(--color-success)" },
  ]}
/>
```

柱状图：

```tsx
<SimpleBarChart
  data={trendData}
  dataKey="orders"
  name="任务量"
  height={220}
/>
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
      name: "name",
      label: "名称",
      type: "input",
      rules: [{ required: true, message: "请输入名称" }],
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
