import { IRole } from "@/types/IRole";

export interface IUser {
  id: string | number;
  firstName?: string;
  lastName?: string;
  isAdmin?: boolean;
  role?: IRole;
}
