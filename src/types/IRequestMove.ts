import { INodeModel } from "@/types/INodeModel";

export interface IRequestMove {
  ids: INodeModel['id'][];
  destinationId: INodeModel['id'] | null;
}
