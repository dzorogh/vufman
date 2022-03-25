import { INodeModel } from "@/types/INodeModel";

export interface IPasteRequest {
  ids: INodeModel['id'][];
  destinationId: INodeModel['id'] | null;
}
