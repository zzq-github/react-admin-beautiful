import React from "react";
import { DICT_TYPE, getDictDatas } from "@/utils/dict";
import {
  Form,
  Input,
  InputNumber,
  Radio,
  TreeSelect,
  Row,
  Col,
  Tooltip,
  Popover,
} from "antd";
import { QuestionCircleOutlined, SearchOutlined } from "@ant-design/icons";
import IconSelect from "@/components/IconSelect";
import SvgIcon from "@/components/SvgIcon";

// 假设这些是从外部导入的常量和工具函数
// import { getDictDatas, DICT_TYPE } from '@/utils/dict';

export const renderEditMenuForm = ({ form, menuTree }) => {
  // 使用 useWatch 监听类型变化，处理表单联动
  const menuType = Form.useWatch("type", form);
  const selectedIcon = Form.useWatch("icon", form);
  const menuOptions = [{ id: 0, name: "主类目", children: menuTree }];
  return (
    <>
      <Row gutter={16}>
        {/* 上级菜单 */}
        <Col span={24}>
          <Form.Item label="上级菜单" name="parentId">
            <TreeSelect
              treeData={menuOptions}
              placeholder="选择上级菜单"
              treeDefaultExpandAll
              fieldNames={{ label: "name", value: "id", children: "children" }} // 根据实际接口调整
            />
          </Form.Item>
        </Col>

        {/* 菜单类型 */}
        <Col span={24}>
          <Form.Item
            label="菜单类型"
            name="type"
            rules={[{ required: true, message: "请选择菜单类型" }]}
          >
            <Radio.Group>
              {getDictDatas(DICT_TYPE.SYSTEM_MENU_TYPE).map((dict) => (
                <Radio key={dict.value} value={parseInt(dict.value)}>
                  {dict.label}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        </Col>

        {/* 菜单图标 - 仅当类型不是按钮(3)时显示 */}
        {menuType !== 3 && (
          <Col span={24}>
            <Form.Item label="菜单图标" name="icon">
              <Popover
                content={
                  <IconSelect
                    onSelected={(icon) => {
                      form.setFieldsValue({ icon });
                    }}
                  />
                }
                trigger="click"
                placement="bottomLeft"
                destroyOnHidden
              >
                <Input
                  placeholder="点击选择图标"
                  readOnly
                  value={selectedIcon} // 这一行其实可以不写，Form.Item 会自动注入 value
                  prefix={
                    selectedIcon ? (
                      <SvgIcon iconClass={selectedIcon} className="w-4 h-4" />
                    ) : (
                      <SearchOutlined className="text-gray-400" />
                    )
                  }
                />
              </Popover>
            </Form.Item>
          </Col>
        )}

        <Col span={12}>
          <Form.Item
            label="菜单名称"
            name="name"
            rules={[{ required: true, message: "请输入菜单名称" }]}
          >
            <Input placeholder="请输入菜单名称" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="显示排序"
            name="sort"
            rules={[{ required: true, message: "请输入显示排序" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Col>

        {/* 路由地址 */}
        {menuType !== 3 && (
          <Col span={12}>
            <Form.Item
              name="path"
              label={
                <span>
                  路由地址&nbsp;
                  <Tooltip title="访问的路由地址，如：`user`。如需外网地址时，则以 `http(s)://` 开头">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              rules={[{ required: true, message: "请输入路由地址" }]}
            >
              <Input placeholder="请输入路由地址" />
            </Form.Item>
          </Col>
        )}

        {/* 权限标识 */}
        {menuType !== 1 && (
          <Col span={12}>
            <Form.Item
              name="permission"
              label={
                <span>
                  权限字符&nbsp;
                  <Tooltip title="Controller 方法上的权限字符，如：@PreAuthorize(`@ss.hasPermission('system:user:list')`)">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
            >
              <Input placeholder="请输入权限标识" maxLength={50} />
            </Form.Item>
          </Col>
        )}

        {/* 组件路径 & 组件名称 - 仅菜单类型(2)显示 */}
        {menuType === 2 && (
          <>
            <Col span={12}>
              <Form.Item label="组件路径" name="component">
                <Input placeholder="例如说：system/user/index" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="组件名称" name="componentName">
                <Input placeholder="例如说：SystemUser" />
              </Form.Item>
            </Col>
          </>
        )}

        {/* 菜单状态 */}
        <Col span={12}>
          <Form.Item
            name="status"
            label={
              <span>
                菜单状态&nbsp;
                <Tooltip title="选择停用时，路由将不会出现在侧边栏，也不能被访问">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
          >
            <Radio.Group>
              {getDictDatas(DICT_TYPE.COMMON_STATUS).map((dict) => (
                <Radio key={dict.value} value={parseInt(dict.value)}>
                  {dict.label}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        </Col>

        {/* 显示状态 */}
        {menuType !== 3 && (
          <Col span={12}>
            <Form.Item
              name="visible"
              label={
                <span>
                  是否显示&nbsp;
                  <Tooltip title="选择隐藏时，路由将不会出现在侧边栏，但仍然可以访问">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
            >
              <Radio.Group>
                <Radio value={true}>显示</Radio>
                <Radio value={false}>隐藏</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        )}

        {/* 总是显示 */}
        {/* {menuType !== 3 && (
          <Col span={12}>
            <Form.Item
              name="alwaysShow"
              label={
                <span>
                  总是显示&nbsp;
                  <Tooltip title="选择不是时，当该菜单只有一个子菜单时，不展示自己，直接展示子菜单">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
            >
              <Radio.Group>
                <Radio value={true}>总是</Radio>
                <Radio value={false}>不是</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        )} */}

        {/* 是否缓存 */}
        {/* {menuType === 2 && (
          <Col span={12}>
            <Form.Item
              name="keepAlive"
              label={
                <span>
                  是否缓存&nbsp;
                  <Tooltip title="选择缓存时，则会被 `keep-alive` 缓存，必须填写「组件名称」字段">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
            >
              <Radio.Group>
                <Radio value={true}>缓存</Radio>
                <Radio value={false}>不缓存</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        )} */}
      </Row>
    </>
  );
};
