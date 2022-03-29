import { ActionType } from "@/types/ActionType";

export interface ILogRequest {
  action: ActionType | null;
  date: number | null;
  userId: string | number | null;
  page: number;
  perPage: number;
  orderBy: string | null;
  orderDirection: 'asc' | 'desc' | null;
}
