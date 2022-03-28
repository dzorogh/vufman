import { EventType } from "@/types/EventType";

export interface ILogRow {
  createdAt: ReturnType<Date['toISOString']>;
  type: EventType;
}
