import { INodeModel } from "@/types/INodeModel";

export interface ISaveContentRequest {
  id: INodeModel['id'];
  content: INodeModel['content'];
}
