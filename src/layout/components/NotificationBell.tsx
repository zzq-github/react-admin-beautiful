import React from 'react';
import { Badge, Dropdown } from 'antd';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { appConfig } from '@/config/app';

const NotificationBell: React.FC = () => {
  const navigate = useNavigate();

  const items = [
    {
      key: 'all',
      label: '查看全部通知',
      onClick: () => navigate(appConfig.notifyRoute),
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
      <button
        type="button"
        aria-label="通知消息"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-theme-text-secondary hover:text-theme-text hover:bg-theme-hover transition-colors"
      >
        <Badge size="small" count={0} className="inline-flex items-center justify-center leading-none">
          <Bell size={18} className="block" />
        </Badge>
      </button>
    </Dropdown>
  );
};

export default NotificationBell;
