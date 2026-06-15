import React from 'react';
import { useNavigate } from 'react-router-dom';
import { appConfig } from '@/config/app';

interface LogoProps {
  collapsed?: boolean;
  compact?: boolean;
}

const Logo: React.FC<LogoProps> = ({ collapsed = false, compact = false }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`flex items-center gap-2 cursor-pointer select-none ${
        compact ? "h-14 px-0 py-0" : "px-4 py-4"
      }`}
      onClick={() => navigate('/')}
    >
      <div className="flex-shrink-0 w-8 h-8 bg-theme-primary rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">
          {appConfig.shortName.slice(0, 1).toUpperCase()}
        </span>
      </div>
      {!collapsed && (
        <div className="overflow-hidden">
          <h1 className="text-base font-bold whitespace-nowrap leading-tight text-theme-text">
            {appConfig.name}
          </h1>
          <p className="text-[10px] leading-tight text-theme-text-tertiary">
            {appConfig.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo;
