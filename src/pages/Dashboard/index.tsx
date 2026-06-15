import React from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Users, FileText, Eye, ShoppingCart } from 'lucide-react';
import PageContainer from '@/components/PageContainer';

const Dashboard: React.FC = () => {
  return (
    <PageContainer title="仪表盘" subtitle="数据概览">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm">
            <Statistic
              title="用户总数"
              value={12893}
              prefix={<Users size={18} className="text-theme-primary" />}
              suffix={
                <span className="text-xs text-theme-success">
                  <ArrowUpOutlined /> 12%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm">
            <Statistic
              title="今日订单"
              value={1893}
              prefix={<ShoppingCart size={18} className="text-theme-success" />}
              suffix={
                <span className="text-xs text-theme-success">
                  <ArrowUpOutlined /> 8%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm">
            <Statistic
              title="页面访问"
              value={93000}
              prefix={<Eye size={18} className="text-theme-warning" />}
              suffix={
                <span className="text-xs text-theme-error">
                  <ArrowDownOutlined /> 3%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="shadow-sm">
            <Statistic
              title="内容发布"
              value={456}
              prefix={<FileText size={18} className="text-theme-info" />}
              suffix={
                <span className="text-xs text-theme-success">
                  <ArrowUpOutlined /> 25%
                </span>
              }
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4">
        <Col xs={24} lg={12}>
          <Card
            title="快捷操作"
            className="shadow-sm"
          >
            <div className="text-center py-12 text-theme-text-tertiary">
              <p>此区域可自定义展示图表或快捷入口</p>
              <p className="text-sm mt-2">可集成 Recharts / ECharts 等</p>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title="最近动态"
            className="shadow-sm"
          >
            <div className="space-y-3">
              {[
                { time: '10:30', content: '管理员 更新了系统配置' },
                { time: '09:15', content: '张三 提交了新文章' },
                { time: '昨天', content: '系统完成数据备份' },
                { time: '昨天', content: '李四 创建了新用户' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 py-2 border-b border-theme-border-secondary last:border-0"
                >
                  <span className="text-xs text-theme-text-tertiary w-12 flex-shrink-0">{item.time}</span>
                  <span className="text-sm text-theme-text-secondary">{item.content}</span>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Dashboard;
