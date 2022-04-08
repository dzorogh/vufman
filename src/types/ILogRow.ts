import { ActionType } from "@/types/ActionType";
import { IUser } from "@/types/IUser";
import { INodeModel } from "@/types/INodeModel";

export interface ILogRow {
  id: number | string;
  key?: ILogRow['id'];
  createdAt: number;
  action: ActionType;
  user: IUser;
  node?: INodeModel;
}
