# React Admin Plus

[![CI](https://github.com/zzq-github/react-admin-beautiful/actions/workflows/ci.yml/badge.svg)](https://github.com/zzq-github/react-admin-beautiful/actions/workflows/ci.yml)
[![Deploy Pages](https://github.com/zzq-github/react-admin-beautiful/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/zzq-github/react-admin-beautiful/actions/workflows/deploy-pages.yml)
[![License](https://img.shields.io/github/license/zzq-github/react-admin-beautiful)](./LICENSE)
![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-4-646cff?logo=vite&logoColor=white)
![Ant Design](https://img.shields.io/badge/Ant%20Design-6-1677ff?logo=antdesign&logoColor=white)

React Admin Plus 是一个面向开源复用和快速二开的 React Admin 通用模板。它保留后台项目最常见的基础能力：登录、布局、动态路由、菜单权限、按钮权限、主题 token、Mock、CRUD 示例、CI 和 GitHub Pages 部署。

- 在线预览：[https://zzq-github.github.io/react-admin-beautiful/](https://zzq-github.github.io/react-admin-beautiful/)
- GitHub：[https://github.com/zzq-github/react-admin-beautiful](https://github.com/zzq-github/react-admin-beautiful)

## 特性

- React 18 + TypeScript + Vite + Ant Design 6 + Tailwind CSS。
- 基于后端菜单生成动态路由，页面入口按需懒加载。
- 核心 adapter 收口后端协议：响应结构、分页结构、用户信息、权限和菜单字段都可以统一适配。
- `authService` 统一认证入口，页面和 store 不直接绑定后端接口细节。
- 页面权限和按钮权限同时支持，菜单树中的 `permission` 会自动合并到前端权限集合。
- MSW Mock 支持无后端启动、演示和 GitHub Pages 在线预览。
- 内置最小 CRUD、图表封装、页面容器、空状态、权限按钮、动态路由示例。

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

默认开发端口为 `3030`。Mock 登录账号：

```text
username: admin
password: admin123
```

常用命令：

```bash
pnpm dev          # 启动开发环境
pnpm typecheck    # TypeScript 类型检查
pnpm lint         # ESLint 检查
pnpm format       # Prettier 格式化
pnpm test         # Vitest 单元测试
pnpm check        # 依次执行 typecheck、lint、test、build
pnpm build        # 生产构建
pnpm preview      # 预览生产构建产物
```

## 目录结构

```text
src/
├── api/          # API 请求封装
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
├── types/        # TypeScript 类型定义
└── utils/        # 通用工具
```

## 二开入口

新项目接入时，建议优先关注这些文件：

```text
src/config/app.ts
src/core/adapters/protocol.ts
src/core/adapters/auth.ts
src/core/adapters/menu.ts
src/core/services/authService.ts
src/theme/appTheme.ts
src/router/extraRoutes.tsx
```

接真实后端时通常需要：

```env
VITE_MSW_ENABLE=false
VITE_BASE_API=
VITE_API_PREFIX=/api
VITE_PROXY_TARGET=http://localhost:8080
```

后端返回结构不同时，优先修改 `src/core/adapters/*`，避免把后端字段判断散落到页面、布局或 store 中。

## 文档

文档入口统一放在 [docs/README.md](./docs/README.md)。推荐阅读顺序：

1. [自定义项目指南](./docs/customize-template.md)
2. [后端接入指南](./docs/backend-integration.md)
3. [创建页面指南](./docs/create-page.md)
4. [架构说明](./docs/architecture.md)

其他约定：

- [API 命名规范](./docs/api-conventions.md)

## License

[MIT](./LICENSE)
