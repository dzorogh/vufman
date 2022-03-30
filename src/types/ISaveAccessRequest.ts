import { INodeModel } from "@/types/INodeModel";

export interface ISaveAccessRequest {
  id: INodeModel['id'];
  access: INodeModel['access'];
}
