import { http, HttpResponse, delay } from 'msw'

const BASE_URL = 'http://localhost:3030/admin-api'

/**
 * 登录 & 认证相关 mock
 */
export const authHandlers = [
  // 登录
  http.post(`${BASE_URL}/system/auth/login`, async ({ request }) => {
    await delay(300)
    const body = await request.json() as any

    if (body.username === 'admin' && body.password === 'admin123') {
      return HttpResponse.json({
        code: 0,
        data: {
          accessToken: 'mock-access-token-xxx',
          refreshToken: 'mock-refresh-token-xxx',
          userId: 1,
          expiresTime: Date.now() + 86400000,
        },
        msg: '',
      })
    }

    return HttpResponse.json({
      code: 401,
      data: null,
      msg: '用户名或密码错误',
    })
  }),

  // 获取权限信息（用户信息 + 菜单 + 权限）
  http.get(`${BASE_URL}/system/auth/get-permission-info`, async () => {
    await delay(200)
    return HttpResponse.json({
      code: 0,
      data: {
        user: {
          id: 1,
          nickname: '管理员',
          avatar: '',
          deptId: 100,
          username: 'admin',
          email: 'admin@yudao.com',
        },
        roles: ['admin'],
        permissions: ['*'],
        menus: buildMockMenus(),
      },
      msg: '',
    })
  }),

  // 退出登录
  http.post(`${BASE_URL}/system/auth/logout`, async () => {
    await delay(100)
    return HttpResponse.json({
      code: 0,
      data: true,
      msg: '',
    })
  }),

  // 刷新令牌
  http.post(`${BASE_URL}/system/auth/refresh-token`, async () => {
    await delay(100)
    return HttpResponse.json({
      code: 0,
      data: {
        accessToken: 'mock-access-token-refreshed',
        refreshToken: 'mock-refresh-token-refreshed',
        userId: 1,
        expiresTime: Date.now() + 86400000,
      },
      msg: '',
    })
  }),
]

/**
 * 构造模拟菜单树
 */
function buildMockMenus() {
  return {
    id: 1,
    parentId: 0,
    name: '系统管理',
    path: '/system',
    component: '',
    componentName: 'System',
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
        componentName: 'UserManagement',
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
        componentName: 'RoleManagement',
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
        componentName: 'DepartmentManagement',
        icon: 'tree',
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
        componentName: 'MenuManagement',
        icon: 'tree',
        visible: true,
        keepAlive: true,
        type: 2,
        children: [],
      },
      {
        id: 15,
        parentId: 1,
        name: '岗位管理',
        path: 'position-management',
        component: 'system/PositionManagement/index',
        componentName: 'PositionManagement',
        icon: 'edit',
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
        componentName: 'DictManagement',
        icon: 'dict',
        visible: true,
        keepAlive: true,
        type: 2,
        children: [],
      },
      {
        id: 17,
        parentId: 1,
        name: '参数设置',
        path: 'parameter-settings',
        component: 'system/ParameterSettings/index',
        componentName: 'ParameterSettings',
        icon: 'edit',
        visible: true,
        keepAlive: true,
        type: 2,
        children: [],
      },
      {
        id: 18,
        parentId: 1,
        name: '日志管理',
        path: 'log-management',
        component: 'system/LogManagement/index',
        componentName: 'LogManagement',
        icon: 'log',
        visible: true,
        keepAlive: true,
        type: 2,
        children: [],
      },
    ],
  }
}