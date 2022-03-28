import { INodeModel } from "@/types/INodeModel";

export interface IDestroyRequest {
  ids: INodeModel['id'][];
}
