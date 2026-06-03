import React, { useState, useMemo } from 'react';
import { Input, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import SvgIcon from '../SvgIcon';
import icons from './requireIcons';

interface IconSelectProps {
  onSelected: (name: string) => void;
}

const IconSelect: React.FC<IconSelectProps> = ({ onSelected }) => {
  const [name, setName] = useState('');

  const filteredIcons = useMemo(() => {
    return icons.filter(item => item.toLowerCase().includes(name.toLowerCase()));
  }, [name]);

  return (
    // p-2: 内边距, w-[460px]: 固定宽度配合 Antd Popover
    <div className="p-2 w-full max-w-[460px]">
      <div className="mb-3">
        <Input
          allowClear
          value={name}
          placeholder="请输入图标名称"
          prefix={<SearchOutlined className="text-gray-400" />}
          onChange={e => setName(e.target.value)}
          className="rounded-md"
        />
      </div>

      {/* grid: 网格布局
        grid-cols-4: 每一行 4 个图标
        gap-1: 网格间距
        h-[300px]: 固定高度
        overflow-y-auto: 纵向滚动
        custom-scrollbar: (可选) 自定义滚动条样式
      */}
      <div className="grid grid-cols-4 gap-1 h-[300px] overflow-y-auto pr-1">
        {filteredIcons.map((item) => (
          <div
            key={item}
            onClick={() => onSelected(item)}
            className="group flex flex-col items-center justify-center py-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
          >
            {/* 使用 group-hover 实现父级悬浮时图标变色（如果 SvgIcon 支持 color） */}
            <div className="text-2xl mb-1.5 transition-transform duration-200 group-hover:scale-120">
              <SvgIcon iconClass={item} />
            </div>
            
            <span className="text-[12px] w-full px-1 text-center truncate text-gray-500 group-hover:text-blue-600">
              {item}
            </span>
          </div>
        ))}

        {filteredIcons.length === 0 && (
          <div className="col-span-4 py-10">
            <Empty description="暂无图标" />
          </div>
        )}
      </div>
    </div>
  );
};

export default IconSelect;