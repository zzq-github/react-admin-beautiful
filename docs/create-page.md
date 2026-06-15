# 创建页面指南

这份指南说明如何在模板中新增一个页面，并让它出现在动态菜单里。

## 1. 创建页面目录

推荐每个页面使用一个目录，并把页面入口命名为 `index.tsx`：

```text
src/pages/examples/BasicList/index.tsx
```

最小页面示例：

```tsx
import React from "react";
import PageContainer from "@/components/PageContainer";

const BasicList: React.FC = () => {
  return (
    <PageContainer title="Basic List" subtitle="页面说明">
      <div className="rounded-lg border border-theme-border bg-theme-bg p-4">
        页面内容
      </div>
    </PageContainer>
  );
};

export default BasicList;
```

## 2. 配置菜单 component

后端菜单或 Mock 菜单中的 `component` 要对应 `src/pages` 下的页面路径：

```ts
{
  name: "Basic List",
  path: "basic-list",
  component: "examples/BasicList/index",
  type: 2
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

## 3. 使用页面容器

业务页面优先用 `PageContainer` 统一标题、说明和右侧操作区：

```tsx
<PageContainer
  title="用户管理"
  subtitle="管理用户账号和状态"
  action={<Button type="primary">新增</Button>}
>
  页面主体
</PageContainer>
```

## 4. 创建列表页

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

## 5. 创建表单页

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

## 6. 添加按钮权限

模板提供 `<Auth>` 和 `usePermission` 两种写法。

组件写法：

```tsx
import Auth from "@/components/Auth";

<Auth code="system:user:create">
  <Button type="primary">新增</Button>
</Auth>
```

Hook 写法：

```tsx
import { usePermission } from "@/hooks/usePermission";

const { hasPermission } = usePermission();
const canDelete = hasPermission("system:user:delete");
```

权限码来自后端权限信息中的 `permissions` 字段。Mock 环境默认返回 `["*"]`，表示全部放行。

## 7. 接入真实接口

推荐把请求封装在页面模块附近的 `hooks` 或 `api` 文件中：

```text
src/pages/example/FooManagement/
├── index.tsx
├── hooks/
│   └── useFooTable.ts
└── schema/
    ├── queryFields.tsx
    └── tableColumns.tsx
```

页面只负责拼装 UI；请求、弹窗、操作函数放在 hooks；查询项、表格列、表单项放在 schema。
