import { INodeModel } from "@/types/INodeModel";

export interface ICreateRequest {
  folderId: INodeModel['folderId'];
  name: INodeModel['name'];
  type: 'file' | 'folder';
}
