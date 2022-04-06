import { INodeModel } from "@/types/INodeModel";

export interface IRequestCreate {
  folderId: INodeModel['folderId'];
  name: INodeModel['name'];
  type: 'file' | 'folder';
}
