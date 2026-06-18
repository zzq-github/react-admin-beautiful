import { delay, http, HttpResponse } from 'msw';
import type {
  ExampleProjectPageReq,
  ExampleProjectResp,
  ExampleProjectSaveReq,
} from '@/api/examples/project/types';

const BASE_URL = '/api';

let nextProjectId = 7;

let projectList: ExampleProjectResp[] = [
  {
    id: 1,
    name: 'Customer Console',
    owner: 'Alex',
    category: 'console',
    status: 'enabled',
    progress: 86,
    updatedAt: '2026-06-01',
    description: '客户运营控制台示例。',
  },
  {
    id: 2,
    name: 'Operations Desk',
    owner: 'Taylor',
    category: 'workflow',
    status: 'enabled',
    progress: 72,
    updatedAt: '2026-06-08',
    description: '运营流程工作台示例。',
  },
  {
    id: 3,
    name: 'Billing Center',
    owner: 'Morgan',
    category: 'console',
    status: 'disabled',
    progress: 34,
    updatedAt: '2026-06-12',
    description: '账单管理中心示例。',
  },
  {
    id: 4,
    name: 'Release Report',
    owner: 'Casey',
    category: 'report',
    status: 'draft',
    progress: 48,
    updatedAt: '2026-06-13',
    description: '版本发布报表示例。',
  },
  {
    id: 5,
    name: 'Approval Flow',
    owner: 'Jordan',
    category: 'workflow',
    status: 'enabled',
    progress: 91,
    updatedAt: '2026-06-14',
    description: '审批流示例。',
  },
  {
    id: 6,
    name: 'Data Quality Board',
    owner: 'Riley',
    category: 'report',
    status: 'enabled',
    progress: 64,
    updatedAt: '2026-06-15',
    description: '数据质量看板示例。',
  },
];

export const exampleHandlers = [
  http.get(`${BASE_URL}/examples/project/page`, async ({ request }) => {
    await delay(200);
    const query = readProjectQuery(request.url);
    const pageNo = Number(query.pageNo || 1);
    const pageSize = Number(query.pageSize || 10);
    const keyword = query.keyword?.trim().toLowerCase();

    const filteredList = projectList.filter((item) => {
      const matchKeyword = keyword
        ? item.name.toLowerCase().includes(keyword) || item.owner.toLowerCase().includes(keyword)
        : true;
      const matchStatus = query.status ? item.status === query.status : true;
      const matchCategory = query.category ? item.category === query.category : true;

      return matchKeyword && matchStatus && matchCategory;
    });

    const start = (pageNo - 1) * pageSize;
    const list = filteredList.slice(start, start + pageSize);

    return HttpResponse.json({
      code: 200,
      data: {
        list,
        total: filteredList.length,
      },
      msg: '',
    });
  }),

  http.post(`${BASE_URL}/examples/project/create`, async ({ request }) => {
    await delay(120);
    const body = (await request.json()) as ExampleProjectSaveReq;

    projectList.unshift({
      ...body,
      id: nextProjectId,
      updatedAt: getToday(),
    });
    nextProjectId += 1;

    return HttpResponse.json({ code: 200, data: true, msg: '' });
  }),

  http.put(`${BASE_URL}/examples/project/update`, async ({ request }) => {
    await delay(120);
    const body = (await request.json()) as ExampleProjectSaveReq;

    projectList = projectList.map((item) =>
      item.id === body.id
        ? {
            ...item,
            ...body,
            updatedAt: getToday(),
          }
        : item,
    );

    return HttpResponse.json({ code: 200, data: true, msg: '' });
  }),

  http.delete(`${BASE_URL}/examples/project/delete`, async ({ request }) => {
    await delay(120);
    const url = new URL(request.url);
    const id = Number(url.searchParams.get('id'));

    projectList = projectList.filter((item) => item.id !== id);

    return HttpResponse.json({ code: 200, data: true, msg: '' });
  }),

  http.delete(`${BASE_URL}/examples/project/delete-list`, async ({ request }) => {
    await delay(120);
    const ids = ((await request.json()) as number[]) || [];
    const idSet = new Set(ids);

    projectList = projectList.filter((item) => !idSet.has(item.id));

    return HttpResponse.json({ code: 200, data: true, msg: '' });
  }),
];

function readProjectQuery(url: string): ExampleProjectPageReq {
  const searchParams = new URL(url).searchParams;

  return {
    pageNo: Number(searchParams.get('pageNo') || 1),
    pageSize: Number(searchParams.get('pageSize') || 10),
    keyword: searchParams.get('keyword') || undefined,
    category: (searchParams.get('category') as ExampleProjectPageReq['category']) || undefined,
    status: (searchParams.get('status') as ExampleProjectPageReq['status']) || undefined,
  };
}

function getToday() {
  return new Date().toISOString().slice(0, 10);
}
