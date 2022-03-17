import { INodeModel } from "@/types/INodeModel";
import { TreeNode } from "primevue/tree";

export function makeNavigatorTree(nodes: INodeModel[] | undefined, folderId: INodeModel['folderId']): TreeNode[] {
  if (nodes && nodes.length) {
    const result = [] as TreeNode[];

    for (const node of nodes.filter((item) => item.folderId === folderId)) {
      result.push(
        {
          label: node.name,
          icon: 'pi pi-folder',
          key: node.id + '',
          children: makeNavigatorTree(nodes, node.id)
        }
      );
    }

    return result;
  }

  return [];
}
