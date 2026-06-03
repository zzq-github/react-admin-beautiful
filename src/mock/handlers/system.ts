import { http, HttpResponse, delay } from 'msw'

const BASE_URL = 'http://localhost:3030/admin-api'

/**
 * 用户管理 mock
 */
export const userHandlers = [
  // 用户分页
  http.get(`${BASE_URL}/system/user/page`, async ({ request }) => {
    await delay(200)
    const url = new URL(request.url)
    const pageNo = Number(url.searchParams.get('pageNo') || 1)
    const pageSize = Number(url.searchParams.get('pageSize') || 10)

    const userList = [
      { id: 1, username: 'admin', nickname: '管理员', deptId: 100, email: 'admin@yudao.com', mobile: '18818260277', sex: 1, avatar: '', status: 0, createTime: 1672531200000, deptName: '芋道源码', postIds: [1] },
      { id: 2, username: 'zhangsan', nickname: '张三', deptId: 101, email: 'zhangsan@yudao.com', mobile: '15601691300', sex: 1, avatar: '', status: 0, createTime: 1672531200000, deptName: '技术部', postIds: [2] },
      { id: 3, username: 'lisi', nickname: '李四', deptId: 102, email: 'lisi@yudao.com', mobile: '15601691301', sex: 0, avatar: '', status: 0, createTime: 1672531200000, deptName: '市场部', postIds: [3] },
      { id: 4, username: 'wangwu', nickname: '王五', deptId: 103, email: 'wangwu@yudao.com', mobile: '15601691302', sex: 1, avatar: '', status: 1, createTime: 1672531200000, deptName: '财务部', postIds: [4] },
      { id: 5, username: 'zhaoliu', nickname: '赵六', deptId: 104, email: 'zhaoliu@yudao.com', mobile: '15601691303', sex: 1, avatar: '', status: 0, createTime: 1672531200000, deptName: '运维部', postIds: [5] },
    ]

    const start = (pageNo - 1) * pageSize
    const list = userList.slice(start, start + pageSize)

    return HttpResponse.json({
      code: 0,
      data: { list, total: userList.length },
      msg: '',
    })
  }),

  // 用户精简列表
  http.get(`${BASE_URL}/system/user/list-all-simple`, async () => {
    await delay(100)
    return HttpResponse.json({
      code: 0,
      data: [
        { id: 1, nickname: '管理员' },
        { id: 2, nickname: '张三' },
        { id: 3, nickname: '李四' },
      ],
      msg: '',
    })
  }),

  // 创建/修改/删除用户
  http.post(`${BASE_URL}/system/user/create`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: true, msg: '' })
  }),
  http.put(`${BASE_URL}/system/user/update`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: true, msg: '' })
  }),
  http.get(`${BASE_URL}/system/user/get`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: { id: 1, username: 'admin', nickname: '管理员', deptId: 100, email: 'admin@yudao.com', mobile: '18818260277', sex: 1, status: 0, createTime: 1672531200000 }, msg: '' })
  }),
  http.put(`${BASE_URL}/system/user/update-status`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: true, msg: '' })
  }),
  http.put(`${BASE_URL}/system/user/update-password`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: true, msg: '' })
  }),
  http.delete(`${BASE_URL}/system/user/delete`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: true, msg: '' })
  }),
  http.delete(`${BASE_URL}/system/user/delete-list`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: true, msg: '' })
  }),
]

/**
 * 角色管理 mock
 */
export const roleHandlers = [
  http.get(`${BASE_URL}/system/role/page`, async ({ request }) => {
    await delay(200)
    const url = new URL(request.url)
    const pageNo = Number(url.searchParams.get('pageNo') || 1)
    const pageSize = Number(url.searchParams.get('pageSize') || 10)

    const roleList = [
      { id: 1, name: '超级管理员', code: 'super_admin', sort: 1, dataScope: 1, dataScopeDeptIds: [], status: 0, type: 2, remark: '超级管理员', createTime: 1672531200000 },
      { id: 2, name: '普通角色', code: 'common', sort: 2, dataScope: 2, dataScopeDeptIds: [], status: 0, type: 1, remark: '普通角色', createTime: 1672531200000 },
      { id: 101, name: '租户管理员', code: 'tenant_admin', sort: 3, dataScope: 1, dataScopeDeptIds: [], status: 0, type: 1, remark: '租户管理员', createTime: 1672531200000 },
    ]

    const start = (pageNo - 1) * pageSize
    const list = roleList.slice(start, start + pageSize)

    return HttpResponse.json({
      code: 0,
      data: { list, total: roleList.length },
      msg: '',
    })
  }),

  http.get(`${BASE_URL}/system/role/list-all-simple`, async () => {
    await delay(100)
    return HttpResponse.json({
      code: 0,
      data: [
        { id: 1, name: '超级管理员', code: 'super_admin', sort: 1 },
        { id: 2, name: '普通角色', code: 'common', sort: 2 },
        { id: 101, name: '租户管理员', code: 'tenant_admin', sort: 3 },
      ],
      msg: '',
    })
  }),

  http.post(`${BASE_URL}/system/role/create`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: true, msg: '' })
  }),
  http.put(`${BASE_URL}/system/role/update`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: true, msg: '' })
  }),
  http.delete(`${BASE_URL}/system/role/delete`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: true, msg: '' })
  }),
]

/**
 * 部门管理 mock
 */
export const deptHandlers = [
  http.get(`${BASE_URL}/system/dept/list`, async () => {
    await delay(150)
    const deptList = [
      { id: 100, name: '芋道源码', parentId: 0, sort: 1, leaderUserId: 1, phone: '18818260277', email: 'admin@yudao.com', status: 0, createTime: 1672531200000 },
      { id: 101, name: '技术部', parentId: 100, sort: 1, leaderUserId: 2, phone: '', email: '', status: 0, createTime: 1672531200000 },
      { id: 102, name: '市场部', parentId: 100, sort: 2, leaderUserId: 3, phone: '', email: '', status: 0, createTime: 1672531200000 },
      { id: 103, name: '财务部', parentId: 100, sort: 3, leaderUserId: 4, phone: '', email: '', status: 0, createTime: 1672531200000 },
      { id: 104, name: '运维部', parentId: 100, sort: 4, leaderUserId: 5, phone: '', email: '', status: 0, createTime: 1672531200000 },
      { id: 105, name: '前端开发', parentId: 101, sort: 1, leaderUserId: 2, phone: '', email: '', status: 0, createTime: 1672531200000 },
      { id: 106, name: '后端开发', parentId: 101, sort: 2, leaderUserId: 2, phone: '', email: '', status: 0, createTime: 1672531200000 },
    ]
    return HttpResponse.json({ code: 0, data: deptList, msg: '' })
  }),

  http.get(`${BASE_URL}/system/dept/list-all-simple`, async () => {
    await delay(100)
    return HttpResponse.json({
      code: 0,
      data: [
        { id: 100, name: '芋道源码', parentId: 0, sort: 1 },
        { id: 101, name: '技术部', parentId: 100, sort: 1 },
        { id: 102, name: '市场部', parentId: 100, sort: 2 },
        { id: 103, name: '财务部', parentId: 100, sort: 3 },
        { id: 104, name: '运维部', parentId: 100, sort: 4 },
        { id: 105, name: '前端开发', parentId: 101, sort: 1 },
        { id: 106, name: '后端开发', parentId: 101, sort: 2 },
      ],
      msg: '',
    })
  }),

  http.post(`${BASE_URL}/system/dept/create`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: true, msg: '' })
  }),
  http.put(`${BASE_URL}/system/dept/update`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: true, msg: '' })
  }),
  http.delete(`${BASE_URL}/system/dept/delete`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: true, msg: '' })
  }),
]

/**
 * 岗位管理 mock
 */
export const positionHandlers = [
  http.get(`${BASE_URL}/system/post/page`, async ({ request }) => {
    await delay(200)
    const url = new URL(request.url)
    const pageNo = Number(url.searchParams.get('pageNo') || 1)
    const pageSize = Number(url.searchParams.get('pageSize') || 10)

    const positionList = [
      { id: 1, code: 'ceo', name: '董事长', sort: 1, status: 0, remark: '董事长', createTime: 1672531200000 },
      { id: 2, code: 'se', name: '项目经理', sort: 2, status: 0, remark: '项目经理', createTime: 1672531200000 },
      { id: 3, code: 'hr', name: '人力资源', sort: 3, status: 0, remark: '人力资源', createTime: 1672531200000 },
      { id: 4, code: 'user', name: '普通员工', sort: 4, status: 0, remark: '普通员工', createTime: 1672531200000 },
      { id: 5, code: 'dev', name: '开发人员', sort: 5, status: 0, remark: '开发人员', createTime: 1672531200000 },
    ]

    const start = (pageNo - 1) * pageSize
    const list = positionList.slice(start, start + pageSize)

    return HttpResponse.json({
      code: 0,
      data: { list, total: positionList.length },
      msg: '',
    })
  }),

  http.get(`${BASE_URL}/system/post/list-all-simple`, async () => {
    await delay(100)
    return HttpResponse.json({
      code: 0,
      data: [
        { id: 1, code: 'ceo', name: '董事长' },
        { id: 2, code: 'se', name: '项目经理' },
        { id: 3, code: 'hr', name: '人力资源' },
        { id: 4, code: 'user', name: '普通员工' },
        { id: 5, code: 'dev', name: '开发人员' },
      ],
      msg: '',
    })
  }),

  http.post(`${BASE_URL}/system/post/create`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: true, msg: '' })
  }),
  http.put(`${BASE_URL}/system/post/update`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: true, msg: '' })
  }),
  http.delete(`${BASE_URL}/system/post/delete`, async () => {
    await delay(100)
    return HttpResponse.json({ code: 0, data: true, msg: '' })
  }),
]