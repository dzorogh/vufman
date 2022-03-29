import { ILogRow } from "@/types/ILogRow";

export interface ILogResponse {
  data: ILogRow[];
  meta: {
    perPage: number;
    page: number;
    total: number;
  };
}
