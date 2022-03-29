import { INodeModel } from "@/types/INodeModel";

export interface ISaveCommentRequest {
  id: INodeModel['id'];
  comment: INodeModel['comment'];
}
