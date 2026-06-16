import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-theme-bg-base">
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在。"
        extra={
          <Button
            type="primary"
            icon={<Home size={16} />}
            onClick={handleBackHome}
          >
            返回首页
          </Button>
        }
        className="text-center"
      />
    </div>
  );
};

export default NotFoundPage;
