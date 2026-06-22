# React Admin Plus 代码生成规则

这份规则用于本地 AI 代码生成工具。生成或修改代码时，应优先遵循当前项目已有结构和实现方式，而不是引入新的架构风格。

## 基础原则

- 使用 React 18、TypeScript、函数组件和 Hooks。
- UI 组件优先使用 Ant Design，图标优先使用 `lucide-react` 或项目已有的 `MenuIcon`。
- 样式优先使用 Tailwind CSS class 和项目主题 token，避免内联 style。
- 不要把后端原始字段判断散落在页面里，后端协议差异应优先在 `src/core/adapters` 收口。
- 新增代码要通过 TypeScript 类型检查，组件 Props 应定义明确类型。
- 保持改动小而集中，优先复用现有组件、hooks、service 和 adapter。
- 不要为了抽象而抽象。只有当现有重复明显、职责稳定时才新增公共封装。

## 当前目录约定

```text
src/
├── api/          # API 请求封装，只描述接口地址、方法、参数和返回类型
├── components/   # 通用组件
├── config/       # 应用级配置入口
├── core/         # 核心类型、adapter、service
├── hooks/        # 通用 Hooks
├── layout/       # 布局组件
├── mock/         # MSW Mock
├── pages/        # 页面和示例业务
├── router/       # 静态路由、动态路由、额外路由
├── store/        # Zustand 状态管理
├── theme/        # 主题 token 和 ThemeProvider
├── types/        # 全局类型声明
└── utils/        # 通用工具函数
```

目录命名遵循已有项目风格即可：

- 通用组件目录通常使用 PascalCase，例如 `PageContainer`、`BaseTable`。
- 页面目录通常使用 PascalCase，例如 `UserManagement`、`BasicList`。
- hooks、utils、adapter 文件使用当前项目已有命名风格。

## API 与后端协议

- 所有后端请求都应放在 `src/api` 下，不要在页面组件里直接调用 axios。
- `src/api` 只负责接口路径、请求方法、参数和返回类型，不写 UI 提示逻辑。
- 后端统一响应结构由 `src/core/adapters/protocol.ts` 处理。
- 分页结构由 `src/core/adapters/page.ts` 处理。
- 用户、角色、权限、菜单结构由 `src/core/adapters/auth.ts` 和 `src/core/adapters/menu.ts` 处理。
- 认证相关业务入口优先使用 `src/core/services/authService.ts`。
- 新增 API 命名参考 `docs/api-conventions.md`。

## 请求 Hooks

- 普通详情、选项列表、一次性查询优先使用 `src/hooks/useRequest.ts`。
- 表格分页查询优先使用 `src/hooks/useTableRequest.ts`。
- API 函数应支持可选的 `RequestContext`，用于透传 `AbortSignal`：

```ts
request(params, { signal });
```

- 不要在页面中重复实现 loading、分页、取消请求和过期响应保护。

## 页面与组件

- 业务页面优先使用 `PageContainer` 作为页面根容器。
- 页面内容区域优先使用 `PagePanel`。
- 表格优先使用 `BaseTable`。
- 查询栏优先使用 `QueryFilter`。
- 简单表单弹窗优先使用 `FormModal`。
- 复杂受控弹窗可以使用 `BaseModal`。
- Schema 表单优先使用 `SchemaForm`。
- 页面空状态、错误状态、403 状态优先使用 `PageState`。

常见页面结构：

```tsx
<PageContainer title="页面标题">
  <PagePanel>
    <QueryFilter fields={queryFields} onSearch={reload} />
    <BaseTable columns={columns} dataSource={data} loading={loading} />
  </PagePanel>
</PageContainer>
```

## 权限约定

- 按钮权限使用 `src/components/Auth`。
- 页面级权限使用 `src/components/RequirePermission`，通常由动态路由自动包裹。
- 权限判断逻辑统一使用 `src/hooks/usePermission.ts`。
- 菜单节点中的 `permission` 会通过 auth adapter 合并到 `AdminPermissionInfo.permissions`。
- 不要在页面里手写重复的角色或权限判断。

按钮权限示例：

```tsx
<Auth code="system:user:create">
  <Button type="primary">新增</Button>
</Auth>
```

## 动态路由和菜单

- 动态路由由后端菜单或 Mock 菜单驱动。
- 菜单到路由的转换逻辑在 `src/utils/route.ts`。
- 菜单到侧边栏数据的转换逻辑在 `src/utils/menu.ts`。
- 额外路由统一放在 `src/router/extraRoutes.tsx`。
- 新增菜单页面时，页面入口建议使用 `src/pages/**/index.tsx`。

## 主题 token

- 主题配置入口在 `src/theme/appTheme.ts`。
- 业务颜色优先使用主题语义变量，不要直接写死大量 `blue-*`、`red-*`、`slate-*`。
- Ant Design token、CSS variables 和 Tailwind 语义 class 应保持一致。
- 页面样式应服务于后台模板的清爽、可读和高效，不要加入过重装饰。

## Mock 约定

- Mock 只用于本地演示和无后端开发，不要写成第二套复杂业务后端。
- Mock 响应结构优先使用 `src/mock/utils/response.ts` 中的 `ok`、`pageOk`、`fail`。
- Mock URL、方法、分页结构和错误结构应尽量贴近真实后端。

## 文档与说明

- 项目说明入口是根目录 `README.md`。
- 详细文档入口是 `docs/README.md`。
- 新增页面说明写入 `docs/create-page.md`。
- 后端接入说明写入 `docs/backend-integration.md`。
- 架构边界说明写入 `docs/architecture.md`。
- 不要在多个文档里重复维护同一段长说明，优先链接到权威文档。
