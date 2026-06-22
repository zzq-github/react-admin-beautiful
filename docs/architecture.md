# 架构说明

本项目的目标是提供一个可接入任意后端的 React Admin 模板。模板内部使用稳定的数据模型，具体后端返回格式通过 adapter 转换，避免业务页面直接绑定某个后端协议。

## 如何替换成自己的项目

新项目接入时，优先按下面顺序替换，避免在页面里到处搜索硬编码：

1. 复制 `.env.example` 为 `.env.dev`，修改应用名称、描述、默认路由和接口地址。
2. 在 `src/config/app.ts` 检查项目级配置读取逻辑。布局、登录页、路由和请求层都应优先从 `appConfig` 读取配置。
3. 在 `src/theme/appTheme.ts` 替换品牌色和业务状态色。这里会同步影响 Ant Design token、CSS 变量和 Tailwind `theme-*` 语义类。
4. 在 `src/core/adapters/protocol.ts` 适配后端响应协议，例如成功码、数据字段、消息字段、未登录状态码。
5. 在 `src/core/adapters/auth.ts` 和 `src/core/adapters/menu.ts` 适配用户、角色、权限和菜单字段。
6. 在 `src/core/services/authService.ts` 或 `src/api/login` 替换登录、退出、刷新 token、权限信息接口。
7. 保留 `src/pages/Dashboard` 作为首页示例，使用 `src/pages/examples/*` 学习最小页面写法，按需删除或替换 `src/pages/system/*` 等复杂示例业务页面。
8. 关闭 Mock：`VITE_MSW_ENABLE=false`，并配置 `VITE_BASE_API` 或 `VITE_PROXY_TARGET`。

模板核心和示例业务的边界建议保持清晰：

- `src/config`：应用级配置。
- `src/core`：通用模型、协议适配、认证服务。
- `src/layout`：布局。
- `src/theme`：主题系统。
- `src/components` / `src/hooks`：可复用能力。
- `src/pages/examples`：最小示例页面。
- `src/pages/system`：复杂 CRUD 和权限示例页面。
- `src/pages` 其他目录：你的项目页面。

当前 Mock 菜单被组织为：

- `Dashboard`：首页示例。
- `Examples`：最小学习示例，包含 Basic List、Form Demo 和 Theme Tokens。
- `System Demo`：复杂 CRUD 和权限示例，展示用户、角色、菜单、字典等页面。

新增页面的完整步骤见 `docs/create-page.md`。

## 核心运行链路

1. `src/main.tsx` 根据 `appConfig.mockEnabled` 启动 MSW，然后渲染应用。
2. `src/router/index.tsx` 注册登录页、布局页、Dashboard 和动态路由，默认路由来自 `appConfig.defaultRoute`。
3. `src/layout/Layout.tsx` 做登录守卫，并初始化用户信息与字典数据。
4. `src/store/useUserStore.ts` 获取权限信息，将后端菜单转换为模板内部菜单。
5. `src/utils/menu.ts` 负责侧边栏菜单转换。
6. `src/utils/route.ts` 负责动态路由转换。
7. `src/router/dynamicImport.ts` 使用 `import.meta.glob` 懒加载 `src/pages` 下的页面。

动态路由扫描只会预扫描页面入口，避免把 `schema`、`hooks`、`modal` 等辅助文件打入动态路由模块：

- `src/pages/**/index.tsx`
- `src/pages/**/index.jsx`
- `src/pages/*.tsx`
- `src/pages/*.jsx`

## 内部标准模型

通用模型定义在 `src/core/types.ts`。

- `AdminUser`：模板内部用户信息。
- `AdminMenu`：模板内部菜单/路由/按钮权限节点。
- `AdminPermissionInfo`：用户、角色、权限、菜单的聚合信息。
- `AdminSidebarMenuItem`：侧边栏渲染所需的菜单结构。

菜单节点统一使用字符串类型：

```ts
type AdminMenuType = 'catalog' | 'menu' | 'button';
```

后端可以继续返回数字枚举、字符串枚举或其他字段名，只需要在 adapter 中转换成上述内部模型。

## 后端协议适配

协议适配入口在 `src/core/adapters`。

- `protocol.ts`：统一成功码、未授权码、消息字段、数据字段读取方式。
- `auth.ts`：把后端权限信息转换为 `AdminPermissionInfo`。
- `menu.ts`：把后端菜单转换为 `AdminMenu`。

如果后端返回结构不同，优先修改 adapter，而不是修改页面、布局或 store。

认证服务入口在 `src/core/services/authService.ts`。登录页、用户 store、退出逻辑和 token 刷新都通过 `authService` 访问认证能力，具体接口路径仍由 `src/api/login` 承担。接入其他后端时，优先替换 `authService` 或它调用的底层 API 文件。

例如后端返回：

```ts
{
  success: true,
  result: {},
  message: 'ok'
}
```

可以在 `protocol.ts` 中调整：

```ts
getCode: (response) => response?.success ? 200 : 500,
getData: (response) => response?.result,
getMessage: (response) => response?.message || '',
```

## 菜单接入约定

模板内部动态路由只关心 `AdminMenu` 中的这些字段：

- `type: 'menu'`
- `path`
- `component`
- `visible !== false`

`component` 对应 `src/pages` 下的页面路径，例如：

```ts
{
  type: 'menu',
  path: 'user-management',
  component: 'system/UserManagement/index'
}
```

会匹配：

```text
src/pages/system/UserManagement/index.tsx
```

## CRUD 页面组织方式

推荐业务页面保持当前模式：

```text
pages/example/FooManagement/
├── index.tsx
├── hooks/
│   ├── index.ts
│   ├── useFooTable.ts
│   ├── useFooOperations.ts
│   └── useFooModals.ts
└── schema/
    ├── queryFields.tsx
    ├── tableColumns.tsx
    └── modalForms.tsx
```

页面只负责拼装 UI；请求、弹窗、操作函数放在 hooks；查询项、表格列、表单项放在 schema。这样模板可以持续沉淀 `QueryFilter`、`BaseTable`、`FormModal`、`SchemaForm` 等通用组件。

## 推荐后续演进

1. 将字典模块也适配为通用 enum/dict provider。
2. 为新增 CRUD 页面提供脚本或模板生成器。
3. 为真实后端接入补充一份最小示例配置。
4. 优化 Ant Design 相关 chunk 拆分，降低首包体积与构建耗时。
5. 增加 CI，至少覆盖 typecheck 和 build。

## 主题配置

主题主色采用代码级配置，不在设置面板中暴露多预设颜色切换。默认配置位于：

```text
src/theme/appTheme.ts
```

`ThemeProvider` 会把 `appTheme` 同步到 Ant Design token 和 CSS 变量：

```ts
--color - primary;
--color - primary - hover;
--color - primary - active;
--color - primary - bg;
--color - success;
--color - success - bg;
--color - warning;
--color - warning - bg;
--color - error;
--color - error - bg;
--color - info;
--color - info - bg;
```

运行时设置面板只保留显示模式和布局模式；侧边栏明暗跟随显示模式。品牌色、成功、警告、错误、信息等业务色，以及 Ant Design 全局组件尺寸都通过 `src/theme/appTheme.ts` 自定义。业务组件应优先使用 `theme` 语义变量，例如 `text-theme-success`、`bg-theme-error-bg`、`border-theme-warning-border`，而不是直接写死 `blue-*`、`red-*` 等 Tailwind 颜色。

默认 Ant Design 组件尺寸为：

```ts
componentSize: 'small';
```

## 图标使用边界

模板只保留两类图标入口，避免在业务代码中混用多套图标系统：

1. 菜单和后端可配置图标使用 `MenuIcon` 线条图标。

   - 图标注册表位于 `src/components/MenuIcon`。
   - 菜单接口的 `icon` 字段填写注册表名称，例如 `dashboard`、`user`、`table`。
   - 渲染入口是 `src/components/MenuIcon`，统一使用扁平线条风格。
   - 菜单管理页的图标选择器也读取同一份注册表。

2. 前端 UI 操作图标使用 `lucide-react`。

   - 页面按钮、登录页、顶部栏操作、设置面板、状态提示等前端写死的图标都使用 lucide。
   - 不再在业务代码中直接使用 `@ant-design/icons`。

`MenuIcon` 会对菜单图标做存在性校验。如果后端返回的图标名不存在，会回退到 `dashboard`，避免菜单出现空图标。
