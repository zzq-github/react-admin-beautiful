# React Admin Plus

[![CI](https://github.com/zzq-github/react-admin-beautiful/actions/workflows/ci.yml/badge.svg)](https://github.com/zzq-github/react-admin-beautiful/actions/workflows/ci.yml)
[![Deploy Pages](https://github.com/zzq-github/react-admin-beautiful/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/zzq-github/react-admin-beautiful/actions/workflows/deploy-pages.yml)
[![License](https://img.shields.io/github/license/zzq-github/react-admin-beautiful)](./LICENSE)
![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-4-646cff?logo=vite&logoColor=white)
![Ant Design](https://img.shields.io/badge/Ant%20Design-6-1677ff?logo=antdesign&logoColor=white)

一个面向开源复用和快速二开的 React Admin 通用模板。

它提供了登录、布局、动态路由、权限菜单、主题 token、Mock、基础列表、基础表单、系统管理示例、CI 和 GitHub Pages 部署能力。目标不是塞满业务页面，而是让你可以更快接入自己的后端和业务模块。

- 在线预览：[https://zzq-github.github.io/react-admin-beautiful/](https://zzq-github.github.io/react-admin-beautiful/)
- GitHub：[https://github.com/zzq-github/react-admin-beautiful](https://github.com/zzq-github/react-admin-beautiful)

## 特性

- React 18 + TypeScript + Vite + Ant Design 6 + Tailwind CSS
- 基于后端菜单的动态路由，页面入口按需懒加载
- 后端协议 adapter：响应结构、用户信息、权限、菜单字段都可适配
- `authService` 统一认证入口：登录、退出、权限信息、刷新 token
- 主题 token 系统：品牌色、成功、警告、错误、信息、背景、边框、文本层级统一配置
- CSS variables + Ant Design token + Tailwind 语义化 class 同步生效
- 两种布局模式：侧边栏布局和顶部栏布局
- 统一菜单图标入口 `MenuIcon`，业务操作图标使用 `lucide-react`
- 统一 PageLoading、PageState、BaseTable 空状态和页面切换动画
- MSW Mock，支持无后端启动、演示和 GitHub Pages 在线预览
- GitHub Actions：typecheck、lint、test、build、Pages 自动部署

## 快速开始

环境要求：

- Node.js >= 20
- pnpm >= 9

```bash
git clone https://github.com/zzq-github/react-admin-beautiful.git
cd react-admin-beautiful
pnpm install
pnpm dev
```

浏览器打开终端输出的本地地址，默认开发端口是 `3030`。

默认 Mock 账号：

```text
username: admin
password: admin123
```

常用命令：

```bash
pnpm dev        # 启动开发环境，默认读取 .env.dev
pnpm typecheck  # TypeScript 类型检查
pnpm lint       # ESLint 代码检查
pnpm format     # 使用 Prettier 格式化代码
pnpm format:check # 检查代码格式是否符合 Prettier 配置
pnpm test       # Vitest 单元测试
pnpm check      # 执行 typecheck、lint、test、build
pnpm build      # 构建生产版本，默认读取 .env.prod
pnpm preview    # 预览生产构建产物
```

## 内置页面

默认 Mock 菜单分为三组：

- `Dashboard`：首页概览示例
- `Examples`：最小学习示例，包括 CRUD 示例、基础表单、Theme Tokens
- `System Demo`：复杂 CRUD 和权限示例，包括用户、角色、部门、菜单、字典等页面

`Examples` 更适合学习如何新建页面、接入接口和按钮权限，`System Demo` 更适合参考复杂业务页如何组织 hooks、schema、表格、弹窗和操作逻辑。

## 模板定位

这个项目更适合作为中后台项目的起点，而不是完整业务系统。模板默认保留登录、权限菜单、动态路由、主题、Mock、基础 CRUD 和部署流程，把业务模型、接口协议和页面细节留给实际项目接入。

如果你需要的是低代码平台、数据大屏或完整权限后台，本项目可以作为工程底座；如果你需要的是轻量、清晰、便于 fork 后二开的 React Admin 模板，它会更贴近这个目标。

## 技术栈

- React 18
- TypeScript
- Vite
- Ant Design 6
- Tailwind CSS
- Zustand
- React Router
- Axios
- MSW
- Vitest
- ESLint
- GitHub Actions

## 目录结构

```text
src/
├── api/              # API 请求封装
├── components/       # 通用组件
├── config/           # 应用级配置入口
├── core/             # 模板核心模型、adapter、service
├── hooks/            # 通用 Hooks
├── layout/           # 布局组件
├── mock/             # MSW Mock
├── pages/            # 页面和示例业务
├── router/           # 静态路由、动态路由、页面扫描
├── store/            # Zustand 状态管理
├── theme/            # 主题 token 和 ThemeProvider
├── types/            # TypeScript 类型定义
└── utils/            # 通用工具
```

## 替换成你的项目

新项目接入时，推荐优先从这些入口开始：

1. 复制环境变量示例：

```bash
cp .env.example .env.dev
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env.dev
```

2. 修改应用名称、Logo 简写、描述、版权和默认路由：

```env
VITE_APP_NAME=Your Admin
VITE_APP_SHORT_NAME=Y
VITE_APP_DESCRIPTION=Your Platform
VITE_APP_COPYRIGHT=(c) 2026 Your Company
VITE_APP_DEFAULT_ROUTE=/dashboard
```

3. 接真实后端时关闭 Mock，并配置接口地址：

```env
VITE_MSW_ENABLE=false
VITE_BASE_API=
VITE_API_PREFIX=/api
VITE_PROXY_TARGET=http://localhost:8080
```

4. 根据你的后端返回格式调整 adapter：

```text
src/core/adapters/protocol.ts
src/core/adapters/auth.ts
src/core/adapters/menu.ts
src/core/services/authService.ts
```

5. 替换主题 token：

```text
src/theme/appTheme.ts
```

完整二开清单见：[自定义项目指南](./docs/customize-template.md)。

## 配置入口

项目级配置集中在：

```text
src/config/app.ts
```

这里统一读取应用名称、描述、默认路由、登录路由、通知路由、API 前缀、Mock 开关等配置。布局、登录页、路由和请求层应优先使用 `appConfig`，避免在页面里散落读取环境变量。

## 主题定制

主题采用代码级配置，不在运行时暴露多套预设主题色切换。默认配置位于：

```text
src/theme/appTheme.ts
```

你可以统一配置：

- `colorPrimary`
- `colorSuccess`
- `colorWarning`
- `colorError`
- `colorInfo`
- 背景、边框、文本层级
- `borderRadius`
- `componentSize`
- `motionDuration*`
- `motionEase*`

这些 token 会同步到 Ant Design token、CSS variables 和 Tailwind 语义化 class。

推荐在业务页面中使用：

```tsx
<span className="text-theme-success">已启用</span>
<div className="border border-theme-error-border bg-theme-error-bg">
  错误提示
</div>
```

避免直接写死 `blue-*`、`red-*`、`slate-*` 等 Tailwind 颜色。

## 动态路由

动态路由根据后端菜单生成。页面扫描基于 `import.meta.glob`，只扫描页面入口文件：

```text
src/pages/**/index.tsx
src/pages/**/index.jsx
src/pages/*.tsx
src/pages/*.jsx
```

后端菜单中的组件路径可以写成：

```ts
{
  type: "menu",
  path: "user-management",
  component: "system/UserManagement/index"
}
```

它会匹配：

```text
src/pages/system/UserManagement/index.tsx
```

## 文档

- [文档索引](./docs/README.md)
- [自定义项目指南](./docs/customize-template.md)
- [后端接入指南](./docs/backend-integration.md)
- [创建页面指南](./docs/create-page.md)
- [模板设计说明](./docs/admin-template-guide.md)
- [掘金介绍文章](./docs/juejin-intro-post.md)

## CI 与部署

项目内置 GitHub Actions：

- `.github/workflows/ci.yml`：push / pull request 时执行 typecheck、lint、test、build
- `.github/workflows/deploy-pages.yml`：push 到 `main` 或 `master` 后自动部署 GitHub Pages

如果你 fork 后使用 GitHub Pages，请在仓库 Settings -> Pages 中确认 Source 使用 GitHub Actions。

## License

[MIT](./LICENSE)
