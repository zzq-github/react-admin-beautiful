import React, { useEffect, useMemo, useState } from "react";
import { Form, Button, Row, Col, Space } from "antd";
import type { FormProps } from "antd/es/form";
import { ChevronDown, ChevronUp, RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import type { QueryFilterProps } from "./types";

const joinClassNames = (...classNames: Array<string | false | undefined>) =>
  classNames.filter(Boolean).join(" ");

const QueryFilter: React.FC<QueryFilterProps> = ({
  fields = [],
  onSearch,
  onReset,
  onChange,
  initialValues = {},
  span = 6,
  title,
  description,
  extra,
  actions,
  leftActions,
  submitText = "查询",
  resetText = "重置",
  collapsible = true,
  defaultCollapsed = true,
  maxVisibleRows = 1,
  className,
}) => {
  const [form] = Form.useForm();
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  const normalizeValues = (values: any) => {
    const transformedValues: any = {};

    fields.forEach((field) => {
      if (field.transformChangeValue) {
        transformedValues[field.name] = field.transformChangeValue(values[field.name]);
      }
    });

    return Object.assign({}, initialValues, values, transformedValues);
  };

  const { visibleFields, hasHiddenFields } = useMemo(() => {
    if (!collapsible || !collapsed) {
      return { visibleFields: fields, hasHiddenFields: false };
    }

    const maxSpan = 24 * maxVisibleRows;
    let usedSpan = 0;
    const nextVisibleFields = fields.filter((field, index) => {
      const fieldSpan = field.span || span;
      const shouldShow = index === 0 || usedSpan + fieldSpan <= maxSpan;

      if (shouldShow) {
        usedSpan += fieldSpan;
      }

      return shouldShow;
    });

    return {
      visibleFields: nextVisibleFields,
      hasHiddenFields: nextVisibleFields.length < fields.length,
    };
  }, [collapsed, collapsible, fields, maxVisibleRows, span]);

  const handleFinish = (values: any) => {
    const nextValues = normalizeValues(values);
    onChange?.(nextValues);
    onSearch?.(nextValues);
  };

  const handleReset = () => {
    form.resetFields();
    onReset?.();
  };

  const onValuesChange: FormProps["onValuesChange"] = (
    _changedValues,
    allValues
  ) => {
    onChange?.(normalizeValues(allValues));
  };

  const hasHeader = title || description || extra;
  const canToggle = collapsible && (hasHiddenFields || !collapsed);

  return (
    <div className={joinClassNames("query-filter", className)}>
      {hasHeader ? (
        <div className="query-filter-header">
          <div className="min-w-0">
            {title ? (
              <div className="text-sm font-semibold text-theme-text">
                {title}
              </div>
            ) : null}
            {description ? (
              <div className="mt-0.5 text-xs leading-5 text-theme-text-secondary">
                {description}
              </div>
            ) : null}
          </div>
          {extra ? <div className="flex items-center gap-2">{extra}</div> : null}
        </div>
      ) : null}

      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onValuesChange={onValuesChange}
        onFinish={handleFinish}
      >
        <Row gutter={[12, 12]} align="bottom">
          {visibleFields.map((item) => (
            <Col
              xs={24}
              sm={12}
              lg={item.span || span}
              key={item.name}
              className="query-filter-field"
            >
              <Form.Item name={item.name} label={item.label} rules={item.rules}>
                {item.component}
              </Form.Item>
            </Col>
          ))}

          <Col span={24}>
            <div className="query-filter-actions">
              <div className="min-h-8 min-w-0 flex-1">
                {leftActions ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {leftActions}
                  </div>
                ) : null}
              </div>

              <Space wrap size={8}>
                {canToggle ? (
                  <Button
                    type="text"
                    icon={
                      collapsed ? (
                        <ChevronDown size={14} />
                      ) : (
                        <ChevronUp size={14} />
                      )
                    }
                    onClick={() => setCollapsed((value) => !value)}
                  >
                    {collapsed ? "展开" : "收起"}
                  </Button>
                ) : null}
                <Button icon={<RotateCcw size={14} />} onClick={handleReset}>
                  {resetText}
                </Button>
                <Button type="primary" htmlType="submit" icon={<Search size={14} />}>
                  {submitText}
                </Button>
                {actions}
              </Space>
            </div>
          </Col>
        </Row>
      </Form>

      {hasHiddenFields && collapsed ? (
        <div className="query-filter-hint">
          <SlidersHorizontal size={13} />
          还有 {fields.length - visibleFields.length} 个筛选项
        </div>
      ) : null}
    </div>
  );
};

export default QueryFilter;
