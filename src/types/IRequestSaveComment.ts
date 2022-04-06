import { INodeModel } from "@/types/INodeModel";

export interface IRequestSaveComment {
  id: INodeModel['id'];
  comment: INodeModel['comment'];
}
