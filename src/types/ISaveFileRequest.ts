import { INodeModel } from "@/types/INodeModel";

export interface ISaveFileRequest {
  id: INodeModel['id'];
  content: INodeModel['content'];
}
