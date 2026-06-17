import React from "react";
import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Switch,
} from "antd";
import type { SchemaFormItem, SchemaFormProps } from "./types";

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
  switch: Switch,
};

const getPlaceholder = (item: SchemaFormItem) => {
  if (item.placeholder) {
    return item.placeholder;
  }

  if (!item.label || typeof item.label !== "string") {
    return undefined;
  }

  if (["select", "date", "rangeDate"].includes(item.type)) {
    return `请选择${item.label}`;
  }

  if (["checkbox", "radio", "switch"].includes(item.type)) {
    return undefined;
  }

  return `请输入${item.label}`;
};

const SchemaForm: React.FC<SchemaFormProps> = ({
  items = [],
  form,
  initialValues,
  column = 1,
  gutter = [16, 12],
  children,
  className,
  ...formProps
}) => {
  const span = 24 / column;
  const visibleItems = items.filter((item) => !item.hidden);
  const groupedItems = visibleItems.reduce<
    Array<{
      title?: string;
      description?: React.ReactNode;
      items: SchemaFormItem[];
    }>
  >((groups, item) => {
    const title = item.group;
    const lastGroup = groups[groups.length - 1];

    if (lastGroup && lastGroup.title === title) {
      lastGroup.items.push(item);
      return groups;
    }

    groups.push({
      title,
      description: item.groupDescription,
      items: [item],
    });
    return groups;
  }, []);

  const renderComponent = (item: SchemaFormItem) => {
    if (item.render) {
      return item.render(item);
    }

    const Component = COMPONENT_MAP[item.type] || Input;
    const componentProps = { ...item.componentProps };

    if (["select", "radio", "checkbox"].includes(item.type)) {
      componentProps.options = item.options || [];
    }

    if (["date", "rangeDate", "number", "select"].includes(item.type)) {
      componentProps.style = { width: "100%", ...componentProps.style };
    }

    const placeholder = getPlaceholder(item);
    if (placeholder && !componentProps.placeholder) {
      componentProps.placeholder = placeholder;
    }

    return <Component {...componentProps} />;
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      className={["schema-form", className].filter(Boolean).join(" ")}
      {...formProps}
    >
      <div className="space-y-5">
        {groupedItems.map((group, groupIndex) => (
          <section
            key={`${group.title || "default"}-${groupIndex}`}
            className="schema-form-section"
          >
            {group.title ? (
              <div className="schema-form-section-header">
                <div className="text-sm font-semibold text-theme-text">
                  {group.title}
                </div>
                {group.description ? (
                  <div className="mt-0.5 text-xs leading-5 text-theme-text-secondary">
                    {group.description}
                  </div>
                ) : null}
              </div>
            ) : null}

            <Row gutter={gutter}>
              {group.items.map((item) => (
                <Col
                  xs={24}
                  md={item.span || span}
                  key={item.name}
                  className="schema-form-col"
                >
                  <Form.Item
                    name={item.name}
                    label={item.label}
                    rules={item.rules}
                    valuePropName={item.type === "switch" ? "checked" : "value"}
                    tooltip={item.tooltip}
                    extra={item.extra}
                    {...item.formItemProps}
                  >
                    {renderComponent(item)}
                  </Form.Item>
                </Col>
              ))}
            </Row>
          </section>
        ))}
      </div>
      {children}
    </Form>
  );
};

export default SchemaForm;
