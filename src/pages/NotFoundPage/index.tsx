import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在。"
        extra={
          <Button
            type="primary"
            icon={<HomeOutlined />}
            onClick={handleBackHome}
            size="large"
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