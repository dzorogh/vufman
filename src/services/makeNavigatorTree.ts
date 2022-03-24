import { INodeModel } from "@/types/INodeModel";
import { Component } from "vue";
import { Folder24Filled } from "@vicons/fluent";

export interface ITreeNode {
  label: string;
  key: string;
  children?: ReturnType<typeof makeNavigatorTree>;
  icon?: Component;
}

export function makeNavigatorTree(nodes: INodeModel[] | undefined, folderId: INodeModel['folderId']): ITreeNode[] | undefined {
  if (nodes && nodes.length) {
    const result = [];

    for (const node of nodes.filter((item) => item.folderId === folderId)) {
      result.push(
        {
          label: node.name || '',
          key: node.id + '',
          children: makeNavigatorTree(nodes, node.id),
          icon: Folder24Filled
        }
      );
    }

    if (result.length) {
      return result;
    } else {
      return undefined;
    }
  }

  return undefined;
}
