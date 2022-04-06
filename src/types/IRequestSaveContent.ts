import { INodeModel } from "@/types/INodeModel";

export interface IRequestSaveContent {
  id: INodeModel['id'];
  content: INodeModel['content'];
}
