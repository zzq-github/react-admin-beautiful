# React Admin Plus 代码规范

所有生成的代码必须遵循以下规范：

- 使用 React 18 组合式函数 (Hooks)
- 样式必须使用 Tailwind CSS，禁止写内联 Style
- 所有的 API 请求必须封装在 `src/api` 目录下
- 使用 Ant Design 进行 UI 组件
- 组件必须使用 TypeScript 接口定义 Props
- 遵循 React 和 TypeScript 的最佳实践
- 确保所有组件都经过类型检查
- 组件和页面文件夹必须大写，目录文件夹使用小写
- 普通请求必须使用 `src/hooks/useRequest.ts` 钩子
- 表格请求必须使用 `src/hooks/useTableRequest.ts` 钩子
- 表格相关页面必须使用 `src/components/BaseTable/index.tsx` 组件
- 简单表单弹窗可以使用 `src/components/FormModal/index.tsx` 组件
- 复杂逻辑受控弹窗可以使用 `src/components/BaseModal/index.tsx` 组件
- 表格配套查询栏可以使用 `src/components/QueryFilter/index.tsx` 组件
- 页面容器统一使用 `src/components/PageContainer/index.tsx` 组件
- 权限控制使用 `src/components/Auth/index.tsx` 组件或 `usePermission` Hook
- 主题定制使用 `src/theme/` 下的 `useTheme` Hook
- 使用组件和钩子时，必须阅读当前组件和钩子的定义和使用案例，再按照规范生成代码

## 项目目录结构

```
src/
├── api/              # API 请求封装
├── assets/           # 静态资源（图标、图片等）
├── components/       # 可复用组件
├── hooks/            # 自定义 React Hooks
├── layout/           # 布局组件
├── pages/            # 页面组件
├── router/           # 路由配置
├── store/            # 状态管理（Zustand）
├── theme/            # 主题系统
├── types/            # TypeScript 类型定义
└── utils/            # 工具函数
```
