import React from 'react';
import { Plus, Database, LucideIcon } from 'lucide-react';

// 定义按钮配置的接口
interface HeaderButton {
  label: string;       // 按钮文字
  icon?: 'plus' | 'database'; // 根据需要扩展图标库
  type?: 'blue' | 'green' | 'gray'; 
  clickFunc: () => void;
  loading?: boolean;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  buttons?: HeaderButton[];
}

// 映射图标组件
const IconMap: Record<string, LucideIcon> = {
  plus: Plus,
  database: Database,
};

// 映射颜色样式
const ColorMap: Record<string, string> = {
  blue: "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400",
  green: "bg-green-600 hover:bg-green-700 disabled:bg-green-400",
  gray: "bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400",
};

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, buttons = [] }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {description && <p className="text-gray-600 mt-1">{description}</p>}
      </div>
      
      <div className="flex gap-4">
        {buttons.map((btn, index) => {
          const IconComponent = btn.icon ? IconMap[btn.icon] : null;
          const colorClass = btn.type ? ColorMap[btn.type] : ColorMap.blue;

          return (
            <button
              key={index}
              onClick={btn.clickFunc}
              disabled={btn.loading}
              className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors ${colorClass}`}
            >
              {IconComponent && (
                <IconComponent 
                  size={btn.icon === 'plus' ? 20 : 16} 
                  className={btn.loading ? "animate-spin" : ""}
                />
              )}
              {btn.loading ? "处理中..." : btn.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PageHeader;