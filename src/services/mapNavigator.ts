import { INodeModel } from "@/types/INodeModel";
import { markRaw } from "vue";
import { Folder24Filled } from "@vicons/fluent";
import { safeParamCompare } from "@/services/safeParamCompare";
import { ITreeNode } from "@/types/ITreeNode";
import { NodeModel } from "@/models/NodeModel";

export function mapNavigatorFolders(folders: INodeModel[] | undefined): ITreeNode[] | undefined {
  if (folders && folders.length) {
    const sorted = folders.sort(safeParamCompare<INodeModel>('name'));

    const result = sorted.map((folder) => {
      return {
        label: folder.name || '',
        key: folder.id + '',
        ancestorsIds: folder.ancestors ? folder.ancestors.map(i => i.id) : [],
        children: folder.children ? mapNavigatorFolders(NodeModel.collection(folder.children)) : undefined,
        icon: markRaw(Folder24Filled)
      };
    });

    if (result.length) {
      return result;
    } else {
      return undefined;
    }
  }

  return undefined;
}
