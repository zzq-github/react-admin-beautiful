import React, { useEffect, useMemo, useState } from "react";
import { Button, Checkbox, Popover, Segmented, Table, Tooltip } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { Columns, ListChecks, RefreshCw } from "lucide-react";
import PageState from "@/components/PageState";
import type { BaseTableProps } from "./types";

const DEFAULT_PAGE_SIZE = 10;

type TableSize = NonNullable<TableProps<any>["size"]>;

const getColumnKey = (column: any, index: number) =>
  String(column.key ?? column.dataIndex ?? index);

const BaseTable = <T extends Record<string, any>>({
  rowKey = "id",
  columns = [],
  dataSource = [],
  loading = false,
  pagination = true,
  size,
  bordered = false,
  scroll,
  emptyText = "暂无数据",
  onChange,
  showSelection = false,
  onSelectionChange,
  header,
  showToolbar = true,
  toolbarTitle,
  toolbarDescription,
  toolbarExtra,
  toolbarActions,
  onRefresh,
  showRefresh = Boolean(onRefresh),
  refreshLoading = false,
  showDensity = true,
  showColumnSetting = true,
  ...rest
}: BaseTableProps<T>) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [innerSize, setInnerSize] = useState<TableSize>(size || "middle");
  const [visibleColumnKeys, setVisibleColumnKeys] = useState<string[]>([]);

  const columnOptions = useMemo(
    () =>
      columns.map((column, index) => ({
        key: getColumnKey(column, index),
        label:
          typeof column.title === "string"
            ? column.title
            : `列 ${index + 1}`,
      })),
    [columns]
  );

  useEffect(() => {
    setSelectedRowKeys([]);
    onSelectionChange?.([], []);
  }, [dataSource]);

  useEffect(() => {
    if (size) {
      setInnerSize(size);
    }
  }, [size]);

  useEffect(() => {
    setVisibleColumnKeys(columnOptions.map((item) => item.key));
  }, [columnOptions]);

  const rowSelection = showSelection
    ? {
        selectedRowKeys,
        onChange: (keys: React.Key[], rows: T[]) => {
          setSelectedRowKeys(keys);
          onSelectionChange?.(keys, rows);
        },
      }
    : undefined;

  const totalCount = useMemo(() => {
    if (typeof pagination === "object" && typeof pagination.total === "number") {
      return pagination.total;
    }

    return dataSource.length;
  }, [dataSource.length, pagination]);

  const resolvedPagination: TablePaginationConfig | false =
    pagination === false
      ? false
      : {
          pageSize: DEFAULT_PAGE_SIZE,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total: number) => `共 ${total} 条`,
          ...(typeof pagination === "object" ? pagination : {}),
        };

  const resolvedTitle = toolbarTitle ?? header ?? "数据列表";
  const resolvedDescription =
    toolbarDescription ?? `共 ${totalCount} 条记录`;
  const selectedCount = selectedRowKeys.length;
  const effectiveSize = size || innerSize;
  const canChangeDensity = showDensity && !size;
  const canConfigureColumns = showColumnSetting && columnOptions.length > 0;
  const effectiveVisibleColumnKeys =
    visibleColumnKeys.length > 0
      ? visibleColumnKeys
      : columnOptions.map((item) => item.key);
  const visibleColumns = useMemo(
    () =>
      columns.filter((column, index) =>
        effectiveVisibleColumnKeys.includes(getColumnKey(column, index))
      ),
    [columns, effectiveVisibleColumnKeys]
  );

  const shouldRenderToolbar =
    showToolbar &&
    (resolvedTitle ||
      resolvedDescription ||
      toolbarExtra ||
      toolbarActions ||
      showRefresh ||
      canChangeDensity ||
      canConfigureColumns ||
      selectedCount > 0);

  const columnSettingContent = (
    <div className="w-44">
      <div className="mb-2 text-xs font-medium text-theme-text-secondary">
        显示列
      </div>
      <div className="space-y-1">
        {columnOptions.map((item) => {
          const checked = visibleColumnKeys.includes(item.key);
          const disabled = checked && visibleColumnKeys.length <= 1;

          return (
            <Checkbox
              key={item.key}
              checked={checked}
              disabled={disabled}
              onChange={(event) => {
                setVisibleColumnKeys((keys) => {
                  if (event.target.checked) {
                    return Array.from(new Set([...keys, item.key]));
                  }

                  return keys.filter((key) => key !== item.key);
                });
              }}
            >
              <span className="text-sm text-theme-text-secondary">
                {item.label}
              </span>
            </Checkbox>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="base-table-shell">
      {shouldRenderToolbar ? (
        <div className="base-table-toolbar">
          <div className="min-w-0">
            {resolvedTitle ? (
              <div className="flex min-w-0 items-center gap-2">
                <ListChecks size={16} className="text-theme-primary" />
                <h2 className="truncate text-sm font-semibold text-theme-text">
                  {resolvedTitle}
                </h2>
              </div>
            ) : null}
            {resolvedDescription ? (
              <p className="mt-0.5 text-xs text-theme-text-tertiary">
                {resolvedDescription}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {selectedCount > 0 ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-theme-primary-border bg-theme-primary-bg px-2.5 py-1 text-xs font-medium text-theme-primary">
                已选 {selectedCount} 项
              </span>
            ) : null}

            {toolbarExtra}
            {toolbarActions}

            {showRefresh ? (
              <Tooltip title="刷新">
                <Button
                  icon={<RefreshCw size={14} />}
                  loading={refreshLoading || loading}
                  onClick={onRefresh}
                />
              </Tooltip>
            ) : null}

            {canChangeDensity ? (
              <Segmented
                size="small"
                value={effectiveSize}
                onChange={(value) => setInnerSize(value as TableSize)}
                options={[
                  { label: "紧凑", value: "small" },
                  { label: "默认", value: "middle" },
                  { label: "宽松", value: "large" },
                ]}
              />
            ) : null}

            {canConfigureColumns ? (
              <Popover
                trigger="click"
                placement="bottomRight"
                content={columnSettingContent}
              >
                <Tooltip title="列设置">
                  <Button icon={<Columns size={14} />} />
                </Tooltip>
              </Popover>
            ) : null}
          </div>
        </div>
      ) : null}

      <Table<T>
        rowKey={rowKey}
        columns={visibleColumns}
        dataSource={dataSource}
        loading={loading}
        size={effectiveSize}
        bordered={bordered}
        scroll={scroll}
        pagination={resolvedPagination}
        className="base-table"
        locale={{
          emptyText: (
            <PageState
              type="empty"
              compact
              title={emptyText}
              description="调整筛选条件后再试试。"
            />
          ),
        }}
        onChange={onChange}
        rowSelection={rowSelection}
        {...rest}
      />
    </div>
  );
};

export default BaseTable;
