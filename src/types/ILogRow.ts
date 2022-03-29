import { ActionType } from "@/types/ActionType";
import { IUser } from "@/types/IUser";

export interface ILogRow {
  id: number | string;
  key?: ILogRow['id'];
  createdAt: number;
  action: ActionType;
  user: IUser;
  nodeName: string;
}
