import { INodeModel } from "@/types/INodeModel";
import { markRaw } from "vue";
import { Folder24Filled } from "@vicons/fluent";
import { safeParamCompare } from "@/services/safeParamCompare";
import { ITreeNode } from "@/types/ITreeNode";

export function makeNavigatorTree(nodes: INodeModel[] | undefined, folderId: INodeModel['folderId']): ITreeNode[] | undefined {
  if (nodes && nodes.length) {
    console.log('%cmakeNavigatorTree', 'color: #61AFEF', { nodes, folderId });

    const result = [] as ITreeNode[];

    let filteredNodes = nodes.filter((item) => item.folderId === folderId);
    filteredNodes = filteredNodes.sort(safeParamCompare<INodeModel>('name'));

    for (const node of filteredNodes) {
      result.push(
        {
          label: node.name || '',
          key: node.id + '',
          ancestorsIds: node.ancestors ? node.ancestors.map(i => i.id) : [],
          children: makeNavigatorTree(nodes, node.id),
          icon: markRaw(Folder24Filled)
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
