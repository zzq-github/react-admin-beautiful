import type React from 'react';

export interface MenuItem {
  id: string | number;
  label: string;
  path: string;
  icon?: React.ComponentType<any> | React.ReactElement;
  children?: MenuItem[];
}
