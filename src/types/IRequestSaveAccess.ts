import { INodeModel } from "@/types/INodeModel";

export interface IRequestSaveAccess {
  id: INodeModel['id'];
  access: INodeModel['access'];
}
