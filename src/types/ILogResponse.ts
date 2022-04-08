import { ILogRow } from "@/types/ILogRow";

export interface ILogResponse {
  data: ILogRow[];
  meta: {
    per_page: number;
    current_page: number;
    total: number;
  };
}
