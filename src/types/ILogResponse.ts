import { ILogRow } from "@/types/ILogRow";

export interface ILogResponse {
  data: ILogRow[];
  meta: any; // TODO: set params
}
