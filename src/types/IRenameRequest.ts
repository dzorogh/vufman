import { INodeModel } from "@/types/INodeModel";

export interface IRenameRequest {
  id: INodeModel['id'];
  name: string;
}
