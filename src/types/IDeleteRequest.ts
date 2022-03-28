import { INodeModel } from "@/types/INodeModel";

export interface IDeleteRequest {
  ids: INodeModel['id'][];
}
