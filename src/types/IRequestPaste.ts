import { INodeModel } from "@/types/INodeModel";

export interface IRequestPaste {
  ids: INodeModel['id'][];
  destinationId: INodeModel['id'] | null;
}
