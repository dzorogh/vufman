import { INodeModel } from "@/types/INodeModel";

export interface IRestoreRequest {
  ids: INodeModel['id'][];
}
