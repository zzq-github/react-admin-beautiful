# 自定义项目指南

这份文档面向第一次 clone 模板、准备替换成自己后台项目的使用者。推荐按顺序处理，先改配置，再接协议，最后替换示例页面。

## 1. 复制环境变量

```bash
cp .env.example .env.dev
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env.dev
```

生产环境可以按需创建或修改 `.env.prod`。

## 2. 修改应用信息

优先修改环境变量：

```env
VITE_APP_NAME=Your Admin
VITE_APP_SHORT_NAME=Y
VITE_APP_DESCRIPTION=Your Platform
VITE_APP_COPYRIGHT=(c) 2026 Your Company
```

这些配置会被 `src/config/app.ts` 汇总成 `appConfig`，登录页、布局、版权信息和默认跳转都会从这里读取。

如果需要调整默认首页、登录页或通知中心路径：

```env
VITE_APP_DEFAULT_ROUTE=/dashboard
VITE_APP_LOGIN_ROUTE=/login
VITE_APP_NOTIFY_ROUTE=/user/notify-message
```

## 3. 替换主题 token

主题入口：

```text
src/theme/appTheme.ts
```

常用修改项：

```ts
colorPrimary: "#1677ff",
colorSuccess: "#52c41a",
colorWarning: "#faad14",
colorError: "#ff4d4f",
colorInfo: "#1677ff",
borderRadius: 8,
componentSize: "small",
```

这些配置会同步到：

- Ant Design token
- CSS variables
- Tailwind 语义化 class

业务页面推荐使用语义化 class：

```tsx
<span className="text-theme-success">已启用</span>
<div className="bg-theme-warning-bg border border-theme-warning-border">
  风险提示
</div>
```

不要在新业务里继续散落写死 `blue-*`、`red-*`、`slate-*` 这类颜色。

## 4. 接入真实后端

关闭 Mock：

```env
VITE_MSW_ENABLE=false
```

配置接口地址：

```env
VITE_BASE_API=
VITE_API_PREFIX=/api
VITE_PROXY_TARGET=http://localhost:8080
```

开发环境常见做法是 `VITE_BASE_API` 留空，通过 Vite proxy 转发到 `VITE_PROXY_TARGET`。生产环境可以把 `VITE_BASE_API` 设置成完整后端地址，例如：

```env
VITE_BASE_API=https://api.example.com
```

## 5. 适配后端响应协议

协议入口：

```text
src/core/adapters/protocol.ts
```

如果你的后端返回：

```ts
{
  success: true,
  result: {},
  message: "ok"
}
```

可以在 adapter 中把它转换成模板内部期望的结构：

```ts
getCode: (response) => (response?.success ? 200 : 500),
getData: (response) => response?.result,
getMessage: (response) => response?.message || "",
```

优先改 adapter，不建议在页面、store 或布局里直接判断后端原始字段。

## 6. 适配认证与权限

认证服务入口：

```text
src/core/services/authService.ts
```

权限信息适配入口：

```text
src/core/adapters/auth.ts
```

通常你需要确认这些信息能被转换出来：

- 当前用户信息
- 角色列表
- 权限标识列表
- 后端菜单列表

登录、退出、刷新 token、获取权限信息等行为应尽量收口到 `authService`，避免页面直接依赖具体接口细节。

## 7. 适配后端菜单

菜单 adapter：

```text
src/core/adapters/menu.ts
```

模板内部菜单模型关注这些核心字段：

```ts
{
  type: "catalog" | "menu" | "button",
  path: string,
  component?: string,
  title: string,
  icon?: string,
  visible?: boolean,
  children?: AdminMenu[]
}
```

动态页面组件路径对应 `src/pages` 下的页面入口。例如：

```ts
{
  type: "menu",
  path: "user-management",
  component: "system/UserManagement/index"
}
```

会匹配：

```text
src/pages/system/UserManagement/index.tsx
```

菜单图标统一使用 `MenuIcon` 注册表。后端返回的 `icon` 字段应填注册名，例如 `dashboard`、`user`、`table`、`settings`。

## 8. 替换或删除示例页面

推荐保留：

```text
src/pages/Dashboard
src/pages/examples
```

它们适合给团队成员看最小写法和主题 token 用法。

可以按需替换：

```text
src/pages/system
```

这个目录主要展示复杂 CRUD 和权限页面组织方式。真实项目里可以把它替换成自己的业务模块。

新增页面建议参考：

```text
docs/create-page.md
```

推荐业务页结构：

```text
pages/example/FooManagement/
├── index.tsx
├── hooks/
│   ├── useFooTable.ts
│   ├── useFooOperations.ts
│   └── useFooModals.ts
└── schema/
    ├── queryFields.tsx
    ├── tableColumns.tsx
    └── modalForms.tsx
```

页面负责组合 UI，请求、弹窗、操作逻辑放到 hooks，查询项、表格列、表单项放到 schema。

## 9. 更新项目元信息

准备作为自己的项目维护时，建议修改：

- `package.json` 的 `name`、`version`、`description`
- `README.md` 的标题、仓库地址、在线预览地址
- `.github/workflows/*.yml` 里的 badge 对应仓库路径
- `LICENSE`，如果你要使用不同协议
- `index.html` 里的页面标题或 meta 信息

## 10. 部署

项目已经内置 GitHub Pages workflow：

```text
.github/workflows/deploy-pages.yml
```

fork 后需要在 GitHub 仓库中确认：

1. Settings -> Pages
2. Source 选择 GitHub Actions
3. 推送到 `main` 或 `master`
4. 等待 `Deploy Pages` workflow 完成

如果你部署到自己的服务器，执行：

```bash
pnpm build
```

然后把 `dist` 目录交给 Nginx、静态资源服务或容器镜像即可。

## 建议替换顺序

1. `.env.dev` / `.env.prod`
2. `src/config/app.ts`
3. `src/theme/appTheme.ts`
4. `src/core/adapters/protocol.ts`
5. `src/core/adapters/auth.ts`
6. `src/core/adapters/menu.ts`
7. `src/core/services/authService.ts`
8. `src/api`
9. `src/pages`
10. README、部署地址和项目元信息

按这个顺序改，能最大程度避免业务页面和模板核心互相缠住。
