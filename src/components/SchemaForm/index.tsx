import React from 'react';
import { 
  Form, Input, Select, DatePicker, Checkbox, Radio, 
  InputNumber, Row, Col, 
} from 'antd';
import { SchemaFormItem, SchemaFormProps } from './types';


/**
 * 映射常见表单组件
 */
const COMPONENT_MAP: Record<string, any> = {
  input: Input,
  password: Input.Password,
  textarea: Input.TextArea,
  number: InputNumber,
  select: Select,
  date: DatePicker,
  rangeDate: DatePicker.RangePicker,
  checkbox: Checkbox.Group,
  radio: Radio.Group,
};

/**
 * @component SchemaForm
 * @description 配置化表单组件
 */
const SchemaForm: React.FC<SchemaFormProps> = ({ 
  items = [], 
  form, 
  initialValues, 
  column = 1, 
  children, 
  ...formProps 
}) => {
  
  const span = 24 / column;

  const renderComponent = (item: SchemaFormItem) => {
    if (item.render) {
      return item.render(item);
    }

    const Component = COMPONENT_MAP[item.type] || Input;
    const componentProps = { ...item.componentProps };

    // 处理下拉、单选、多选的数据源
    if (['select', 'radio', 'checkbox'].includes(item.type)) {
      componentProps.options = item.options || [];
    }
    
    // 处理日期组件样式
    if (['date', 'rangeDate'].includes(item.type)) {
      componentProps.style = { width: '100%', ...componentProps.style };
    }

    // 设置默认 Placeholder
    if (!componentProps.placeholder && item.label && typeof item.label === 'string') {
      componentProps.placeholder = `请输入${item.label}`;
    }

    return <Component {...componentProps} />;
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      {...formProps}
    >
      <Row gutter={16}>
        {items.map((item) => {
          if (item.hidden) return null;

          return (
            <Col span={item.span || span} key={item.name}>
              <Form.Item
                name={item.name}
                label={item.label}
                rules={item.rules}
                // 根据类型动态判断 valuePropName (Antd 中 Checkbox 对应 'checked')
                valuePropName={['checkbox', 'switch'].includes(item.type) ? 'checked' : 'value'}
                tooltip={item.tooltip}
                {...item.formItemProps}
              >
                {renderComponent(item)}
              </Form.Item>
            </Col>
          );
        })}
      </Row>
      {children}
    </Form>
  );
};

export default SchemaForm;