import type { PageParam } from '@/core/types';

export type ExampleProjectCategory = 'console' | 'workflow' | 'report';
export type ExampleProjectStatus = 'enabled' | 'disabled' | 'draft';

export interface ExampleProjectResp {
  id: number;
  name: string;
  owner: string;
  category: ExampleProjectCategory;
  status: ExampleProjectStatus;
  progress: number;
  updatedAt: string;
  description?: string;
}

export interface ExampleProjectPageReq extends Partial<PageParam> {
  keyword?: string;
  category?: ExampleProjectCategory;
  status?: ExampleProjectStatus;
}

export interface ExampleProjectSaveReq {
  id?: number;
  name: string;
  owner: string;
  category: ExampleProjectCategory;
  status: ExampleProjectStatus;
  progress: number;
  description?: string;
}
