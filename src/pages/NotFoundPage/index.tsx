import React from "react";
import { Button } from "antd";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageState from "@/components/PageState";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageState
      type="not-found"
      fullscreen
      title="404 页面不存在"
      description="你访问的页面不存在或已被移动。"
      action={
        <Button
          type="primary"
          icon={<Home size={16} />}
          onClick={() => navigate("/")}
        >
          返回首页
        </Button>
      }
    />
  );
};

export default NotFoundPage;
