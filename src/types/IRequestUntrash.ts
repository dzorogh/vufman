import { INodeModel } from "@/types/INodeModel";

export interface IRequestUntrash {
  ids: INodeModel['id'][];
}
