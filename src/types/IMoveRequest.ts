import { INodeModel } from "@/types/INodeModel";

export interface IMoveRequest {
  id: INodeModel['id'];
  destinationId: INodeModel['id'] | null;
}
