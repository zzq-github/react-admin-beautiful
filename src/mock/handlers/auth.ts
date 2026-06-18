import { http, HttpResponse, delay } from 'msw';

const BASE_URL = '/api';

/**
 * 登录 & 认证相关 mock
 */
export const authHandlers = [
  // 登录
  http.post(`${BASE_URL}/system/auth/login`, async ({ request }) => {
    await delay(300);
    const body = (await request.json()) as any;

    if (body.username === 'admin' && body.password === 'admin123') {
      return HttpResponse.json({
        code: 200,
        data: {
          accessToken: 'mock-access-token-xxx',
          refreshToken: 'mock-refresh-token-xxx',
          userId: 1,
          expiresTime: Date.now() + 86400000,
        },
        msg: '',
      });
    }

    return HttpResponse.json({
      code: 401,
      data: null,
      msg: '用户名或密码错误',
    });
  }),

  // 获取权限信息（用户信息 + 菜单 + 权限）
  http.get(`${BASE_URL}/system/auth/get-permission-info`, async () => {
    await delay(200);
    return HttpResponse.json({
      code: 200,
      data: {
        user: {
          id: 1,
          nickname: '管理员',
          avatar: '',
          deptId: 100,
          username: 'admin',
          email: 'admin@example.com',
        },
        roles: ['template_admin'],
        permissions: [
          'example:project:create',
          'example:project:update',
          'example:project:delete',
          'system:user:create',
          'system:role:create',
          'system:dict:create',
          'system:menu:create',
        ],
        menus: buildMockMenus(),
      },
      msg: '',
    });
  }),

  // 退出登录
  http.post(`${BASE_URL}/system/auth/logout`, async () => {
    await delay(100);
    return HttpResponse.json({
      code: 200,
      data: true,
      msg: '',
    });
  }),

  // 刷新令牌
  http.post(`${BASE_URL}/system/auth/refresh-token`, async () => {
    await delay(100);
    return HttpResponse.json({
      code: 200,
      data: {
        accessToken: 'mock-access-token-refreshed',
        refreshToken: 'mock-refresh-token-refreshed',
        userId: 1,
        expiresTime: Date.now() + 86400000,
      },
      msg: '',
    });
  }),
];

/**
 * 构造模拟菜单树
 */
function buildMockMenus() {
  return {
    id: 0,
    parentId: 0,
    name: 'Root',
    path: '/',
    component: '',
    visible: true,
    keepAlive: true,
    alwaysShow: true,
    type: 1,
    children: [
      {
        id: 100,
        parentId: 0,
        name: '仪表盘',
        path: '/dashboard',
        component: 'Dashboard/index',
        icon: 'dashboard',
        visible: true,
        keepAlive: true,
        type: 2,
        children: [],
      },
      {
        id: 200,
        parentId: 0,
        name: '示例',
        path: '/examples',
        component: '',
        componentName: 'Examples',
        icon: 'example',
        visible: true,
        keepAlive: true,
        alwaysShow: true,
        type: 1,
        children: [
          {
            id: 201,
            parentId: 200,
            name: 'CRUD 示例',
            path: 'basic-list',
            component: 'examples/BasicList/index',
            icon: 'table',
            visible: true,
            keepAlive: true,
            type: 2,
            children: [
              {
                id: 20101,
                parentId: 201,
                name: '新增项目',
                path: '',
                permission: 'example:project:create',
                visible: true,
                keepAlive: false,
                type: 3,
                children: [],
              },
              {
                id: 20102,
                parentId: 201,
                name: '编辑项目',
                path: '',
                permission: 'example:project:update',
                visible: true,
                keepAlive: false,
                type: 3,
                children: [],
              },
              {
                id: 20103,
                parentId: 201,
                name: '删除项目',
                path: '',
                permission: 'example:project:delete',
                visible: true,
                keepAlive: false,
                type: 3,
                children: [],
              },
            ],
          },
          {
            id: 202,
            parentId: 200,
            name: '表单示例',
            path: 'form-demo',
            component: 'examples/FormDemo/index',
            icon: 'form',
            visible: true,
            keepAlive: true,
            type: 2,
            children: [],
          },
          {
            id: 203,
            parentId: 200,
            name: '主题 Tokens',
            path: 'theme-tokens',
            component: 'examples/ThemeTokens/index',
            icon: 'sliders',
            visible: true,
            keepAlive: true,
            type: 2,
            children: [],
          },
        ],
      },
      {
        id: 1,
        parentId: 0,
        name: '系统管理',
        path: '/system-demo',
        component: '',
        componentName: 'SystemDemo',
        icon: 'system',
        visible: true,
        keepAlive: true,
        alwaysShow: true,
        type: 1,
        children: [
          {
            id: 11,
            parentId: 1,
            name: '用户管理',
            path: 'user-management',
            component: 'system/UserManagement/index',
            icon: 'user',
            visible: true,
            keepAlive: true,
            type: 2,
            children: [],
          },
          {
            id: 12,
            parentId: 1,
            name: '角色管理',
            path: 'role-management',
            component: 'system/RoleManagement/index',
            icon: 'peoples',
            visible: true,
            keepAlive: true,
            type: 2,
            children: [],
          },
          {
            id: 13,
            parentId: 1,
            name: '部门管理',
            path: 'department-management',
            component: 'system/DepartmentManagement/index',
            icon: 'building',
            visible: true,
            keepAlive: true,
            type: 2,
            children: [],
          },
          {
            id: 14,
            parentId: 1,
            name: '菜单管理',
            path: 'menu-management',
            component: 'system/MenuManagement/index',
            icon: 'menu-square',
            visible: true,
            keepAlive: true,
            type: 2,
            children: [],
          },
          {
            id: 16,
            parentId: 1,
            name: '字典管理',
            path: 'dict-management',
            component: 'system/DictManagement/index',
            icon: 'dict',
            visible: true,
            keepAlive: true,
            type: 2,
            children: [],
          },
        ],
      },
    ],
  };
}
