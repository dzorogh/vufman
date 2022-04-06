import { INodeModel } from "@/types/INodeModel";

export interface IRequestRename {
  id: INodeModel['id'];
  name: string;
}
