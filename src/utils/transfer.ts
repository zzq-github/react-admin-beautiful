import type { DataNode } from "antd/es/tree";

export const convert = (nodes: any[]): DataNode[] => {
      return nodes.map(node => ({
        key: String(node.id),
        title: node.name,
        children: node.children ? convert(node.children) : undefined,
      }));
    };