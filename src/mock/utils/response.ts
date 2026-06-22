import { HttpResponse } from 'msw';

export function ok<T>(data: T, msg = '') {
  return HttpResponse.json({
    code: 200,
    data,
    msg,
  });
}

export function pageOk<T>(list: T[], total: number, msg = '') {
  return ok(
    {
      list,
      total,
    },
    msg,
  );
}

export function fail(code: number, msg: string, data: null = null) {
  return HttpResponse.json({
    code,
    data,
    msg,
  });
}
